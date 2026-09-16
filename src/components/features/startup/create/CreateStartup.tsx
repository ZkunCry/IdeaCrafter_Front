"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Building2, Lightbulb, Rocket, Target, Users } from "lucide-react";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/src/lib/api-error";
import StartupForm from "./StartupForm";
import { defaultValues } from "./schema";
import { useCreateStartup } from "./useStartup";
import type { StartupFormValues } from "../types";

const benefits = [
  {
    title: "Найдите команду",
    description: "Привлеките талантливых со-основателей и специалистов",
    Icon: Users,
    className: "bg-sky-100 text-sky-600",
  },
  {
    title: "Получите фидбек",
    description: "Узнайте мнение сообщества о вашей идее",
    Icon: Target,
    className: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Развивайте идею",
    description: "Улучшайте концепцию вместе с экспертами",
    Icon: Lightbulb,
    className: "bg-amber-100 text-amber-600",
  },
  {
    title: "Запустите быстрее",
    description: "Ускорьте путь от идеи до продукта",
    Icon: Rocket,
    className: "bg-violet-100 text-violet-600",
  },
];

const CreateStartup = () => {
  const router = useRouter();
  const { mutateAsync: createStartup, isPending } = useCreateStartup();

  const onSubmit = async (values: StartupFormValues) => {
    try {
      const startup = await createStartup(values);
      toast.success("Стартап успешно создан!");
      router.push(`/account/startups/${startup.id}`);
      router.refresh();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Не удалось создать стартап"));
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 space-y-4 text-center">
        <div className="mb-4 flex items-center justify-center space-x-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Создайте свой стартап
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
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
              {benefits.map(({ title, description, Icon, className }) => (
                <div key={title} className="flex items-start space-x-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${className}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
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
              <StartupForm
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                isPending={isPending}
                submitLabel="Опубликовать стартап"
                pendingLabel="Публикуем..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CreateStartup;
