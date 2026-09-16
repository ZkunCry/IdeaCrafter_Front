import Container from "@/src/components/common/container/Container";
import { StartupService } from "@/src/components/features/startup/api_service/startupService";
import FavoriteButton from "@/src/components/features/startup/review/FavoriteButton";
import ShareButton from "@/src/components/features/startup/review/ShareButton";
import StartupParticipationActions from "@/src/components/features/startup/review/StartupParticipationActions";
import type {
  Startup,
  StartupFile,
  Vacancy,
} from "@/src/components/features/startup/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import Section from "@/src/components/ui/section";
import { formatDate } from "@/src/lib/date";
import {
  Archive,
  BriefcaseBusiness,
  CheckCircle2,
  File,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  Send,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type StartupPageProps = {
  params: Promise<{ id: string }>;
};

const initials = (name?: string) =>
  name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "IC";

const paragraphList = (value?: string) =>
  value
    ?.split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean) ?? [];

const fileDate = (file: StartupFile) => file.created_at ?? file.CreatedAt;

const fileIcon = (file: StartupFile) => {
  const mime = file.mime_type?.toLowerCase() ?? "";
  const name = file.file_name?.toLowerCase() ?? "";

  if (mime.includes("pdf") || name.endsWith(".pdf")) return FileText;
  if (mime.startsWith("image/")) return ImageIcon;
  if (
    mime.includes("zip") ||
    mime.includes("archive") ||
    [".zip", ".rar", ".7z", ".tar"].some((extension) =>
      name.endsWith(extension),
    )
  ) {
    return Archive;
  }

  return File;
};

const occupiedVacancies = (vacancies: Vacancy[]) =>
  vacancies.filter((vacancy) => vacancy.user);

const getTeamMembers = (startup: Startup) => {
  const members = [
    {
      id: String(startup.creator.id),
      username: startup.creator.username,
      email: startup.creator.email,
      role: "Основатель",
    },
  ];

  occupiedVacancies(startup.vacancies ?? []).forEach((vacancy) => {
    if (
      vacancy.user &&
      !members.some((member) => member.id === String(vacancy.user?.id))
    ) {
      members.push({
        id: String(vacancy.user.id),
        username: vacancy.user.username,
        email: vacancy.user.email,
        role: vacancy.role.name,
      });
    }
  });

  return members;
};

const sectionRows = (startup: Startup) => [
  {
    id: "problem",
    title: "Проблема",
    text: startup.problem,
    Icon: Target,
    iconClassName: "bg-red-50 text-red-600",
  },
  {
    id: "solution",
    title: "Решение",
    text: startup.solution,
    Icon: CheckCircle2,
    iconClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "audience",
    title: "Целевая аудитория",
    text: startup.target_audience,
    Icon: Users,
    iconClassName: "bg-violet-50 text-violet-700",
  },
];

export default async function StartupPage({ params }: StartupPageProps) {
  const { id } = await params;
  const [{ data: startup, error }, favoritesCount] = await Promise.all([
    StartupService.getStartupById(id),
    StartupService.getFavoritesCount(id),
  ]);

  if (error) return <div className="text-destructive">{error}</div>;
  if (!startup) return <div>Стартап не найден</div>;

  const categories = startup.categories ?? [];
  const files = startup.files ?? [];
  const vacancies = startup.vacancies ?? [];
  const openVacancies = vacancies.filter((vacancy) => vacancy.is_open);
  const teamMembers = getTeamMembers(startup);
  const visibleFiles = files;
  const visibleVacancies = openVacancies;
  const visibleMembers = teamMembers;
  const descriptionParagraphs = paragraphList(startup.description);
  const meta = [
    `${teamMembers.length} участников`,
    `${files.length} файлов`,
    formatDate(startup.created_at),
  ];
  return (
    <Section className="w-full">
      <Container>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Card className="rounded-lg border shadow-none">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-lg border bg-muted sm:h-44 sm:w-44">
                  {startup.logo_url ? (
                    <Image
                      src={startup.logo_url}
                      alt={startup.name}
                      fill
                      sizes="176px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-primary">
                      {initials(startup.name)}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 space-y-3">
                      <Badge variant="secondary" className="w-fit">
                        {startup.stage.name}
                      </Badge>
                      <div className="space-y-2">
                        <h1 className="break-words text-3xl font-bold leading-tight tracking-normal text-foreground sm:text-[2rem]">
                          {startup.name}
                        </h1>
                        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                          {startup.short_description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <ShareButton title={startup.name} />
                      <FavoriteButton
                        startupId={startup.id}
                        variant="button"
                        initialCount={favoritesCount}
                      />
                      <StartupParticipationActions
                        startupId={startup.id}
                        startupName={startup.name}
                        creator={startup.creator}
                        vacancies={vacancies}
                      />
                    </div>
                  </div>

                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={`category-${category.id}`}
                          variant="outline"
                          className="rounded-md border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                          asChild
                        >
                          <Link
                            href={
                              category.slug
                                ? `/startups?category=${encodeURIComponent(category.slug)}`
                                : "/startups"
                            }
                          >
                            {category.name}
                          </Link>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                    {meta.map((item, index) => (
                      <span key={item} className="flex items-center gap-3">
                        {index > 0 && <span className="text-border">•</span>}
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <main className="min-w-0 space-y-8">
              <Card className="rounded-lg border shadow-none">
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-5">
                    <h2 className="text-xl font-semibold">О проекте</h2>
                  </div>

                  <div className="space-y-0">
                    {sectionRows(startup).map(
                      ({ id, title, text, Icon, iconClassName }, index) =>
                        text ? (
                          <div key={id}>
                            {index > 0 && <Separator className="my-5" />}
                            <section className="flex gap-4">
                              <div
                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${iconClassName}`}
                              >
                                <Icon className="h-4.5 w-4.5" />
                              </div>
                              <div className="min-w-0 space-y-2">
                                <h3 className="text-lg font-semibold">
                                  {title}
                                </h3>
                                <p className="text-[15px] leading-7 text-muted-foreground">
                                  {text}
                                </p>
                              </div>
                            </section>
                          </div>
                        ) : null,
                    )}

                    {descriptionParagraphs.length > 0 && (
                      <>
                        <Separator className="my-5" />
                        <section className="flex gap-4">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                            <Lightbulb className="h-4.5 w-4.5" />
                          </div>
                          <div className="min-w-0 space-y-2">
                            <h3 className="text-lg font-semibold">
                              Полное описание
                            </h3>
                            <div className="space-y-3">
                              {descriptionParagraphs.map((paragraph, index) => (
                                <p
                                  key={index}
                                  className="text-[15px] leading-7 text-muted-foreground"
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        </section>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-lg border shadow-none">
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">Файлы</h2>
                      <p className="text-sm text-muted-foreground">
                        {files.length} файлов в проекте
                      </p>
                    </div>
                  </div>

                  {visibleFiles.length > 0 ? (
                    <div className="divide-y rounded-lg border">
                      {visibleFiles.map((file) => {
                        const Icon = fileIcon(file);
                        const createdAt = fileDate(file);

                        return (
                          <a
                            key={file.id ?? file.ID ?? file.file_path}
                            href={file.file_path}
                            className="flex items-center gap-3 p-3 transition-colors hover:bg-muted/50"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">
                                {file.file_name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {file.mime_type || "Файл"}
                                {createdAt ? ` · ${formatDate(createdAt)}` : ""}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Файлы пока не добавлены.
                    </p>
                  )}
                </CardContent>
              </Card>
            </main>

            <aside className="space-y-6">
              <Card className="rounded-lg border shadow-none">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">Команда</h2>
                      <p className="text-sm text-muted-foreground">
                        {teamMembers.length} участников
                      </p>
                    </div>
                    <Users className="h-5 w-5 text-primary" />
                  </div>

                  <div className="mb-4 flex -space-x-2">
                    {teamMembers.slice(0, 5).map((member) => (
                      <Avatar
                        key={member.id}
                        className="h-9 w-9 border-2 border-background"
                      >
                        <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                          {initials(member.username)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {teamMembers.length > 5 && (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                        +{teamMembers.length - 5}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {visibleMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" alt={member.username} />
                          <AvatarFallback>
                            {initials(member.username)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {member.username}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {member.role}
                        </Badge>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>

              <Card className="rounded-lg border shadow-none">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">Вакансии</h2>
                      <p className="text-sm text-muted-foreground">
                        {openVacancies.length} открытых позиций
                      </p>
                    </div>
                    <BriefcaseBusiness className="h-5 w-5 text-amber-600" />
                  </div>

                  {visibleVacancies.length > 0 ? (
                    <div className="space-y-3">
                      {visibleVacancies.map((vacancy) => (
                        <div key={vacancy.id} className="rounded-lg border p-3">
                          <div className="mb-2 flex items-start gap-2">
                            <Send className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <h3 className="text-sm font-semibold leading-5">
                              {vacancy.role.name}
                            </h3>
                          </div>
                          {vacancy.description && (
                            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                              {vacancy.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Открытых вакансий сейчас нет.
                    </p>
                  )}

                </CardContent>
              </Card>

              <Card className="rounded-lg border shadow-none">
                <CardContent className="space-y-4 p-5">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold">Участие</h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Хотите присоединиться к проекту? Выберите открытую роль и
                      отправьте заявку команде.
                    </p>
                  </div>
                  <StartupParticipationActions
                    startupId={startup.id}
                    startupName={startup.name}
                    creator={startup.creator}
                    vacancies={vacancies}
                    compact
                  />
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}
