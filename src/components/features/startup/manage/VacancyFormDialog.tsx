"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { getApiErrorMessage } from "@/src/lib/api-error";

import { RoleService } from "../api_service/roleService";
import {
  useCreateVacancy,
  useRoles,
  useUpdateVacancy,
} from "../hooks/useVacancies";
import type { Vacancy } from "../types";

const CUSTOM_ROLE = "custom";

const vacancySchema = z
  .object({
    role_id: z.string(),
    custom_role: z.string().trim().max(60, "Название роли слишком длинное"),
    description: z
      .string()
      .trim()
      .min(20, "Опишите вакансию хотя бы в 20 символах")
      .max(1000, "Описание слишком длинное"),
  })
  .refine(
    (values) =>
      values.role_id === CUSTOM_ROLE
        ? values.custom_role.length >= 2
        : values.role_id.length > 0,
    {
      message: "Выберите роль или введите свою",
      path: ["role_id"],
    },
  );

type VacancyFormValues = z.infer<typeof vacancySchema>;

type VacancyFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: number;
  vacancy?: Vacancy | null;
};

export default function VacancyFormDialog({
  open,
  onOpenChange,
  startupId,
  vacancy,
}: VacancyFormDialogProps) {
  const isEdit = Boolean(vacancy);
  const { data: roles, isLoading: rolesLoading } = useRoles();
  const { mutateAsync: createVacancy, isPending: creating } =
    useCreateVacancy(startupId);
  const { mutateAsync: updateVacancy, isPending: updating } =
    useUpdateVacancy(startupId);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [creatingRole, setCreatingRole] = useState(false);

  const form = useForm<VacancyFormValues>({
    resolver: zodResolver(vacancySchema),
    defaultValues: {
      role_id: vacancy ? String(vacancy.role_id ?? vacancy.role?.id ?? "") : "",
      custom_role: "",
      description: vacancy?.description ?? "",
    },
  });

  useEffect(() => {
    if (!open) return;
    setSubmitError(null);
    form.reset({
      role_id: vacancy ? String(vacancy.role_id ?? vacancy.role?.id ?? "") : "",
      custom_role: "",
      description: vacancy?.description ?? "",
    });
  }, [open, vacancy?.id]);

  const selectedRole = form.watch("role_id");
  const isPending = creating || updating || creatingRole;

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      if (isEdit && vacancy) {
        await updateVacancy({
          id: vacancy.id,
          description: values.description,
        });
        toast.success("Вакансия обновлена");
        onOpenChange(false);
        return;
      }

      let roleId = Number(values.role_id);

      if (values.role_id === CUSTOM_ROLE) {
        setCreatingRole(true);
        try {
          const role = await RoleService.create(values.custom_role);
          roleId = role.id;
        } finally {
          setCreatingRole(false);
        }
      }

      if (!roleId || Number.isNaN(roleId)) {
        setSubmitError("Не удалось определить роль");
        return;
      }

      await createVacancy({
        startup_id: startupId,
        role_id: roleId,
        description: values.description,
      });
      toast.success("Вакансия добавлена");
      onOpenChange(false);
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(error, "Не удалось сохранить вакансию"),
      );
    }
  });

  return (
    <Dialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактирование вакансии" : "Новая вакансия"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Уточните описание, чтобы кандидатам было понятнее."
              : "Опишите, кого вы ищете в команду и чем предстоит заниматься."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            {isEdit ? (
              <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Роль: </span>
                <span className="font-medium">
                  {vacancy?.role?.name ?? vacancy?.role_name}
                </span>
              </div>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="role_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Роль *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                rolesLoading
                                  ? "Загружаем роли..."
                                  : "Выберите роль"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles?.map((role) => (
                            <SelectItem key={role.id} value={String(role.id)}>
                              {role.name}
                            </SelectItem>
                          ))}
                          <SelectItem value={CUSTOM_ROLE}>
                            Другая роль...
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedRole === CUSTOM_ROLE ? (
                  <FormField
                    control={form.control}
                    name="custom_role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название роли *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Например: Backend-разработчик"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Роль станет доступна и другим стартапам.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
              </>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание вакансии *</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Задачи, требуемый опыт, ожидаемая загрузка..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitError ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {submitError}
              </p>
            ) : null}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {isEdit ? "Сохранить" : "Добавить вакансию"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
