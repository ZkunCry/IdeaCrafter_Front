"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
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
  Rocket,
  Users,
  Target,
  Lightbulb,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import {
  MultiSelect,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
} from "@/src/components/ui/multi-select";
import { Stage } from "../types";
import { formSchema, defaultValues } from "./schema";
import { useCreateStartup } from "./useStartup";
import axios, { type AxiosError } from "axios";
import { useGetStages } from "./useGetStages";
import { FileUploader } from "@/src/components/widgets/fileUploader/FileUploader";
import { useGetCategories } from "./useGetCategories";
const CreateStartup = () => {
  const { mutateAsync: createStartup, isPending } = useCreateStartup();
  const { data: stages } = useGetStages();
  const { data: categories } = useGetCategories();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  console.log(form.getValues());
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      console.log(values);
      const response = await createStartup(values);
      toast.success("Стартап успешно создан!");
      // revalidatePath("/startups");
    } catch (error: Error | AxiosError) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <main className="container px-4 py-8 mx-auto">
      <div className="mb-12 space-y-4 text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4 space-x-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Создайте свой стартап
          </h1>
        </div>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
          Поделитесь своей идеей с сообществом, найдите единомышленников и
          начните свой путь к успеху
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Преимущества публикации</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-sky-500/50">
                  <Users
                    className="w-4 h-4 text-primary"
                    color="oklch(58.5% 0.169 237.323)"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Найдите команду
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Привлеките талантливых со-основателей и специалистов
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-success/10">
                  <Target className="w-4 h-4 text-success" color="green" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Получите фидбек
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Узнайте мнение сообщества о вашей идее
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-accent">
                  <Lightbulb className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Развивайте идею
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Улучшайте концепцию вместе с экспертами
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-muted">
                  <Rocket className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Запустите быстрее
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Ускорьте путь от идеи до продукта
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Информация о стартапе</CardTitle>
              <CardDescription>
                Заполните форму, чтобы опубликовать свой стартап в сообществе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("onSubmit wrapper triggered");
                    form.handleSubmit(onSubmit)(e);
                  }}
                  className="space-y-6"
                >
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
                  <FormLabel>Логотип вашего стартапа *</FormLabel>
                  <FileUploader
                    onFileSelect={(file) => form.setValue("files", file)}
                  />
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
                          Описание в двух словах того, чем занимается ваш
                          стартап
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
                            placeholder="Опишите вашу идею в нескольких предложениях..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Краткое описание того, чем занимается ваш стартап
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
                          <FormLabel>Категория *</FormLabel>
                          <MultiSelect
                            onValuesChange={field.onChange}
                            defaultValues={field.value}
                          >
                            <FormControl>
                              <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Выберите категорию" />
                              </MultiSelectTrigger>
                            </FormControl>
                            <MultiSelectContent>
                              {categories?.items.map((category) => (
                                <MultiSelectItem
                                  key={category.id}
                                  value={category.id}
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
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите стадию" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {stages === undefined ? (
                                <SelectItem value="0">Нет стадий</SelectItem>
                              ) : (
                                stages.map((stage) => {
                                  return (
                                    <SelectItem
                                      key={stage.ID}
                                      value={String(stage.ID)}
                                    >
                                      {stage.name}
                                    </SelectItem>
                                  );
                                })
                              )}
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

                  {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Размер команды *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите размер" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="solo">Только я</SelectItem>
                              <SelectItem value="2-3">2-3 человека</SelectItem>
                              <SelectItem value="4-7">4-7 человек</SelectItem>
                              <SelectItem value="8+">8+ человек</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lookingFor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Кого вы ищете? *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lookingForOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}

                  {/* <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Теги *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="AI, SaaS, B2B (разделите запятыми)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Добавьте ключевые слова для лучшей видимости
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <div className="flex items-center justify-end pt-4 space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Сбросить
                    </Button>
                    <Button type="submit" size="lg">
                      {isPending ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-b-2 rounded-full animate-spin border-primary-foreground"></div>
                          Публикуем...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Опубликовать стартап
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CreateStartup;
