import Container from "@/src/components/common/container/Container";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Main from "@/src/components/ui/main";
import Section from "@/src/components/ui/section";
import {
  Rocket,
  Sparkles,
  Users,
  TrendingUp,
  Lightbulb,
  Target,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

import HeaderMain from "@/src/components/widgets/header/HeaderMain";
import {
  Startup,
  type StartupResponse,
} from "@/src/components/features/startup/types";
import { axiosInstance } from "@/src/api/axios";
import StartupCard from "@/src/components/features/startup/create/StartupCard";
import HeroBackground from "@/src/components/common/background/HeroBackground";
import Footer from "@/src/components/common/footer/Footer";

export default async function Home() {
  const response = (
    await axiosInstance.get<StartupResponse>("/startup/list?offset=0&limit=10")
  ).data;

  return (
    <div className="w-full flex flex-col">
      <HeaderMain />

      <Main>
        <Section className="w-full py-[9rem] relative">
          <HeroBackground />

          <Container>
            <div className="flex justify-center  gap-12 items-center">
              <div className="max-w-4xl flex flex-col items-center gap-[1.1rem] z-10">
                <Badge
                  className="py-[0.2rem] animate-fade-in bg-primary/10"
                  variant={"outline"}
                >
                  <Sparkles className="text-primary" size={30} />
                  <h1 className="text-[0.8rem] text-primary ">
                    Welcome to IdeaCrafter
                  </h1>
                </Badge>
                <div className="flex flex-col items-center gap-[0.8rem] text-center">
                  <h1 className="text-6xl sm:text-5xl lg:text-7xl font-bold leading-tight text-center animate-fade-in">
                    Откройте для себя и <br />
                    создайте свой
                    <span className="bg-gradient-hero bg-clip-text text-transparent">
                      {" "}
                      следующий стартап{" "}
                    </span>
                  </h1>
                  <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-delay">
                    Присоединяйтесь к сообществу молодых предпринимателей.
                    Изучайте инновационные идеи, находите единомышленников и
                    воплощайте свои идеи в реальность с помощью аналитики на
                    основе искусственного интеллекта.
                  </p>
                </div>
                <div className="flex gap-[1rem] animate-fade-in-delay">
                  <Link href={"/generate-idea"}>
                    <Button
                      variant={"default"}
                      className=" text-xl py-[1.4rem] cursor-pointer"
                    >
                      <Sparkles />
                      Генерация идеи при помощи AI
                    </Button>
                  </Link>
                  <Link href={"/startups"}>
                    <Button
                      variant={"outline"}
                      className="cursor-pointer text-xl py-[1.4rem]"
                    >
                      Исследовать стартапы
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="w-full py-[8rem]">
          <Container>
            <div className="flex flex-col items-center gap-[2.5rem]">
              <div className="flex flex-col items-center text-center gap-[1rem]">
                <h2 className="text-4xl font-bold text-foreground">
                  Как это работает
                </h2>
                <p className="text-lg text-muted-foreground">
                  Начните свой предпринимательский путь всего за несколько
                  простых шагов
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full">
                    <Lightbulb className="text-primary" size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    1. Находите идеи
                  </h3>
                  <p className="text-muted-foreground">
                    Просматривайте инновационные идеи стартапов или создавайте
                    собственные с помощью искусственного интеллекта{" "}
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full">
                    <Target className="text-primary" size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    2. Выберите свой путь
                  </h3>
                  <p className="text-muted-foreground">
                    Находите идеи, которые соответствуют вашим интересам,
                    навыкам и увлечениям
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full">
                    <Users className="text-primary" size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    3. Сотрудничайте
                  </h3>
                  <p className="text-muted-foreground">
                    Общайтесь с предпринимателями-единомышленниками и создавайте
                    свою команду
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full">
                    <Rocket className="text-primary" size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    4. Запустите
                  </h3>
                  <p className="text-muted-foreground">
                    Воплотите свою идею в реальность и запустите свой стартап
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="w-full py-[8rem] ">
          <Container>
            <div className="flex lg:flex-row flex-col">
              <div className="flex-1 lg:order-1 gap-8">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-foreground">
                      Популярные идеи для стартапов
                    </h2>
                    <p className="text-muted-foreground">
                      Откройте для себя самые популярные и инновационные идеи
                      для стартапов от нашего сообщества
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {response.startups.map((startup) => (
                      <StartupCard startup={startup} key={startup.id} />
                    ))}
                  </div>
                  <Button
                    className="self-center"
                    size={"lg"}
                    variant={"outline"}
                  >
                    <Link href={"/startups"}> Перейти к списку стартапов</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="w-full py-[8rem]">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Часто задаваемые вопросы
                </h2>
                <p className="text-lg text-muted-foreground">
                  Все, что вам нужно знать об IdeaCrafter
                </p>
              </div>

              <div className="space-y-6">
                <div className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Можно ли пользоваться IdeaCrafter бесплатно?
                      </h3>
                      <p className="text-muted-foreground">
                        Да! IdeaCrafter абсолютно бесплатен для всех
                        пользователей. Вы можете просматривать идеи,
                        сотрудничать с другими пользователями и использовать
                        наши функции на базе искусственного интеллекта
                        бесплатно.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Как работает генерация идей с помощью ИИ?
                      </h3>
                      <p className="text-muted-foreground">
                        Наш ИИ анализирует текущие рыночные тенденции,
                        предпочтения пользователей и успешные модели стартапов,
                        чтобы генерировать уникальные, жизнеспособные
                        бизнес-идеи, соответствующие вашим интересам.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Могу ли я защитить идею своего стартапа?
                      </h3>
                      <p className="text-muted-foreground">
                        Мы приветствуем открытое сотрудничество, но вы
                        сохраняете полное право собственности на свои идеи.
                        Делитесь только тем, что вам удобно, и общайтесь
                        конфиденциально с проверенными коллегами.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Как найти соавторов?
                      </h3>
                      <p className="text-muted-foreground">
                        Просто изучите идеи, которые вас интересуют, свяжитесь с
                        их авторами и начните общение. Наша платформа позволяет
                        легко найти людей с дополнительными навыками.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </Main>
      <Footer className="py-[4rem] border-t">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-[1rem]">
            <div className="col-span-1 md:col-span-2 ">
              <div className="flex items-center gap-[1rem] mb-3">
                <div className="logo">
                  <Rocket className="text-primary" size={35} />
                </div>
                <h1 className="text-[1.25rem] font-bold bg-gradient-hero bg-clip-text text-transparent">
                  IdeaCrafter
                </h1>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                Мы помогаем молодым предпринимателям находить, сотрудничать и
                создавать новое поколение инновационных стартапов.
                Присоединяйтесь к нашему сообществу и воплощайте свои идеи в
                реальность.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Платформа
              </h4>
              <ul className="space-y-6">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    О нас
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Как это работает
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Успешные истории
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Комьюнити
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Поддержка
              </h4>
              <ul className="space-y-6">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Свяжитесь с нами
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Справочный центр
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Условия предоставления услуг
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Политика конфиденциальности
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t">
            <p>© 2024 IdeaCrafter. All rights reserved.</p>
          </div>
        </Container>
      </Footer>
    </div>
  );
}
