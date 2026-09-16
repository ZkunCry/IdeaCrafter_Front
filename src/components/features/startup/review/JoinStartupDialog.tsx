"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { getApiErrorMessage } from "@/src/lib/api-error";

import { useCreateApplication } from "../hooks/useApplications";
import type { Vacancy } from "../types";

const joinSchema = z.object({
  vacancy_id: z.number().int().min(1, "Выберите роль"),
  message: z
    .string()
    .trim()
    .min(20, "Расскажите о себе хотя бы в 20 символах")
    .max(1000, "Сообщение слишком длинное"),
});

type JoinFormValues = z.infer<typeof joinSchema>;

type JoinStartupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupName: string;
  vacancies: Vacancy[];
};

export default function JoinStartupDialog({
  open,
  onOpenChange,
  startupName,
  vacancies,
}: JoinStartupDialogProps) {
  const { mutateAsync: apply, isPending } = useCreateApplication();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      vacancy_id: vacancies.length === 1 ? vacancies[0].id : 0,
      message: "",
    },
  });

  useEffect(() => {
    if (open) {
      setSubmitError(null);
      form.reset({
        vacancy_id: vacancies.length === 1 ? vacancies[0].id : 0,
        message: "",
      });
    }
  }, [open]);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await apply({ vacancy_id: values.vacancy_id, message: values.message });
      toast.success("Заявка отправлена", {
        description: `Команда «${startupName}» рассмотрит её в ближайшее время.`,
      });
      onOpenChange(false);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, "Не удалось отправить заявку"));
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Заявка в команду «{startupName}»</DialogTitle>
          <DialogDescription>
            Выберите роль и расскажите, чем вы можете быть полезны проекту.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            <FormField
              control={form.control}
              name="vacancy_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Роль *</FormLabel>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите открытую вакансию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vacancies.map((vacancy) => (
                        <SelectItem key={vacancy.id} value={String(vacancy.id)}>
                          {vacancy.role?.name ?? vacancy.role_name ?? "Роль"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сопроводительное сообщение *</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Опишите ваш опыт, мотивацию и сколько времени готовы уделять проекту..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Это сообщение увидит основатель стартапа.
                  </FormDescription>
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
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Отправить заявку
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
