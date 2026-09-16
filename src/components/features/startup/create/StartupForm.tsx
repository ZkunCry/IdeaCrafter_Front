"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import Image from "next/image";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
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
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/src/components/ui/multi-select";
import { FileUploader } from "@/src/components/widgets/fileUploader/FileUploader";
import { CheckCircle2 } from "lucide-react";

import { formSchema } from "./schema";
import { useGetStages } from "./useGetStages";
import { useGetCategories } from "./useGetCategories";
import type { StartupFormValues } from "../types";

type StartupFormProps = {
  defaultValues: StartupFormValues;
  onSubmit: (values: StartupFormValues) => Promise<void> | void;
  isPending: boolean;
  submitLabel: string;
  pendingLabel: string;

  currentLogoUrl?: string;
  secondaryAction?: React.ReactNode;
};

const StartupForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel,
  pendingLabel,
  currentLogoUrl,
  secondaryAction,
}: StartupFormProps) => {
  const { data: stages, isLoading: stagesLoading } = useGetStages();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values as StartupFormValues);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название стартапа *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Например: AI-помощник для обучения"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel>Логотип вашего стартапа</FormLabel>
          {currentLogoUrl ? (
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border bg-muted">
                <Image
                  src={currentLogoUrl}
                  alt="Текущий логотип"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Текущий логотип. Загрузите новый файл, чтобы заменить его.
              </p>
            </div>
          ) : null}
          <FileUploader
            onFileSelect={(file) =>
              form.setValue("files", file, { shouldDirty: true })
            }
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите вашу идею в нескольких предложениях..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Подробное описание того, чем занимается ваш стартап
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Краткое описание *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Одно-два предложения для карточки стартапа..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Этот текст показывается в списке стартапов
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="category_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категории *</FormLabel>
                <MultiSelect
                  values={field.value.map(String)}
                  onValuesChange={(values) =>
                    field.onChange(
                      values
                        .map(Number)
                        .filter((id) => Number.isInteger(id) && id > 0),
                    )
                  }
                >
                  <FormControl>
                    <MultiSelectTrigger>
                      <MultiSelectValue
                        placeholder={
                          categoriesLoading
                            ? "Загружаем категории..."
                            : "Выберите категорию"
                        }
                      />
                    </MultiSelectTrigger>
                  </FormControl>
                  <MultiSelectContent>
                    {categories?.items.map((category) => (
                      <MultiSelectItem
                        key={category.id}
                        value={String(category.id)}
                      >
                        {category.name}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stage_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Стадия развития *</FormLabel>
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          stagesLoading
                            ? "Загружаем стадии..."
                            : "Выберите стадию"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stages?.map((stage) => (
                      <SelectItem key={stage.id} value={String(stage.id)}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="target_audience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Целевая аудитория *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Например: Студенты вузов, малый бизнес"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Какую проблему решает? *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите проблему, которую решает ваш стартап..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше решение *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите, как вы решаете эту проблему..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
          {secondaryAction ?? (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset(defaultValues)}
              disabled={isPending}
            >
              Сбросить
            </Button>
          )}
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary-foreground" />
                {pendingLabel}
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                {submitLabel}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StartupForm;
