import React from "react";
import Link from "next/link";
import { BriefcaseBusiness, Lightbulb, Settings2 } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import FavoriteButton from "../review/FavoriteButton";
import type { Startup } from "../types";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getRelativeDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Недавно";

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfTarget = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const differenceInDays = Math.round(
    (startOfToday.getTime() - startOfTarget.getTime()) / 86_400_000,
  );

  if (differenceInDays <= 0) return "Сегодня";
  if (differenceInDays === 1) return "Вчера";
  if (differenceInDays < 7) {
    const dayLabel = differenceInDays >= 5 ? "дней" : "дня";
    return `${differenceInDays} ${dayLabel} назад`;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function getVacancyLabel(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return "вакансия";
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return "вакансии";
  }

  return "вакансий";
}

type StartupCardProps = {
  startup: Startup;
  manageHref?: string;
};

const StartupCard = ({ startup, manageHref }: StartupCardProps) => {
  const authorName = startup.creator?.username || `Команда ${startup.name}`;
  const vacanciesCount = startup.vacancies?.length ?? 0;
  const hasLogo = Boolean(startup.logo_url?.trim());

  return (
    <Card className="group relative gap-0 overflow-hidden rounded-[10px] border-border/80 py-0 shadow-none transition-colors duration-200 hover:border-primary/35 hover:shadow-sm">
      <div className="relative aspect-[3/1] w-full overflow-hidden bg-muted">
        {hasLogo ? (
          <img
            alt={`Логотип ${startup.name}`}
            className="size-full object-cover"
            src={startup.logo_url}
          />
        ) : (
          <div className="flex size-full items-center justify-center gap-2 bg-muted text-muted-foreground">
            <div className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-primary">
              <Lightbulb aria-hidden="true" size={18} />
            </div>
            <span className="max-w-32 truncate text-sm font-medium">
              {startup.name}
            </span>
          </div>
        )}

        <Badge
          className="absolute right-3 top-3 rounded-md border-border/80 bg-background/95 px-2 py-0.5 text-[11px] font-medium leading-none text-muted-foreground shadow-none"
          variant="outline"
        >
          {startup.stage?.name}
        </Badge>
      </div>

      <CardHeader className="gap-2 px-4 pb-2 pt-3">
        <div className="flex h-5 flex-nowrap gap-1.5 overflow-hidden">
          {startup.categories?.slice(0, 2).map((category) => (
            <Badge
              key={`${category.id}-${category.name}`}
              className="max-w-28 shrink-0 truncate rounded-md border-border bg-background px-1.5 py-0 text-[11px] font-medium leading-5 text-muted-foreground"
              title={category.name}
              variant="outline"
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-2 min-h-10 text-[17px] font-semibold leading-5 text-foreground transition-colors group-hover:text-primary">
          {startup.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4">
        <p className="line-clamp-2 min-h-10 text-[13px] leading-5 text-muted-foreground">
          {startup.short_description}
        </p>
      </CardContent>

      <CardFooter className="mt-3 justify-between border-t border-border/70 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-7 border border-border bg-background">
            <AvatarFallback className="bg-muted text-[10px] font-semibold text-foreground">
              {getInitials(authorName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[13px] font-medium text-foreground">
              {authorName}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {getRelativeDate(startup.created_at)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
          <span
            className="flex items-center gap-1 text-[11px]"
            title={`${vacanciesCount} ${getVacancyLabel(vacanciesCount)}`}
          >
            <BriefcaseBusiness aria-hidden="true" size={14} />
            {vacanciesCount}
          </span>
          <CardAction className="relative z-10 flex items-center gap-1">
            {manageHref ? (
              <Button
                asChild
                className="h-7 px-2 text-[11px]"
                size="sm"
                variant="outline"
              >
                <Link href={manageHref}>
                  <Settings2 aria-hidden="true" size={14} />
                  Управлять
                </Link>
              </Button>
            ) : (
              <FavoriteButton startupId={startup.id} />
            )}
          </CardAction>
        </div>
      </CardFooter>

      <Link
        aria-label={`Открыть стартап ${startup.name}`}
        className="absolute inset-0 z-[5]"
        href={`/startup/${startup.id}`}
      />
    </Card>
  );
};

export default StartupCard;
