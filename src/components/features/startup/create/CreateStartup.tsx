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
const formSchema = z.object({
  title: z
    .string()
    .min(3, "Название должно быть не менее 3 символов")
    .max(100, "Название слишком длинное"),
  description: z
    .string()
    .min(20, "Описание должно быть не менее 20 символов")
    .max(1000, "Описание слишком длинное"),
  category: z.string().min(1, "Выберите категорию"),
  targetAudience: z.string().min(3, "Укажите целевую аудиторию").max(200),
  problem: z
    .string()
    .min(10, "Опишите проблему (минимум 10 символов)")
    .max(500),
  solution: z
    .string()
    .min(10, "Опишите решение (минимум 10 символов)")
    .max(500),
  stage: z.string().min(1, "Выберите стадию развития"),
  tags: z.string().min(1, "Добавьте хотя бы один тег"),
  teamSize: z.string().min(1, "Укажите размер команды"),
  lookingFor: z.string().min(1, "Укажите, кого вы ищете"),
});

const CreateStartup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      targetAudience: "",
      problem: "",
      solution: "",
      stage: "",
      tags: "",
      teamSize: "",
      lookingFor: "",
    },
  });

  const categories = [
    "Технологии",
    "Здравоохранение",
    "Финансы",
    "Образование",
    "E-commerce",
    "Еда и напитки",
    "Путешествия",
    "Развлечения",
    "Социальное влияние",
    "Другое",
  ];

  const stages = [
    "Идея",
    "MVP разработка",
    "Бета-тестирование",
    "Запущен продукт",
    "Раннее развитие",
    "Масштабирование",
  ];

  const lookingForOptions = [
    "Со-основатель",
    "Разработчики",
    "Дизайнеры",
    "Маркетологи",
    "Инвесторы",
    "Менторы",
    "Советники",
  ];

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center space-y-4 mb-12 animate-fade-in">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Создайте свой стартап
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Поделитесь своей идеей с сообществом, найдите единомышленников и
          начните свой путь к успеху
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Benefits */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Преимущества публикации</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    Найдите команду
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Привлеките талантливых со-основателей и специалистов
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full flex-shrink-0">
                  <Target className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    Получите фидбек
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Узнайте мнение сообщества о вашей идее
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-full flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    Развивайте идею
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Улучшайте концепцию вместе с экспертами
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full flex-shrink-0">
                  <Rocket className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
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
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
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

                  <FormField
                    control={form.control}
                    name="description"
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
                          Краткое и понятное описание того, чем занимается ваш
                          стартап
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Категория *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите категорию" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
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
                      name="stage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Стадия развития *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите стадию" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {stages.map((stage) => (
                                <SelectItem key={stage} value={stage}>
                                  {stage}
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
                    name="targetAudience"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>

                  <FormField
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
                  />

                  <div className="flex items-center justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Сбросить
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      variant={"primary"}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
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
