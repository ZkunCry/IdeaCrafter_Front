"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  Send,
  Settings2,
  XCircle,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { useUser } from "@/src/store/user";
import { sameId } from "@/src/lib/utils";

import JoinStartupDialog from "./JoinStartupDialog";
import { useMyApplications } from "../hooks/useApplications";
import type { Startup, Vacancy } from "../types";

type Props = {
  startupId: number;
  startupName: string;
  creator: Startup["creator"];
  vacancies: Vacancy[];
  compact?: boolean;
};

const roleName = (vacancy?: Vacancy) =>
  vacancy?.role?.name ?? vacancy?.role_name ?? "Участник";

export default function StartupParticipationActions({
  startupId,
  startupName,
  creator,
  vacancies,
  compact = false,
}: Props) {
  const user = useUser();
  const pathname = usePathname();
  const [dialogOpen, setDialogOpen] = useState(false);

  const isCreator = user.isAuth && sameId(user.id, creator?.id);

  const { data: myApplications, isLoading: applicationsLoading } =
    useMyApplications(user.isAuth && !isCreator);

  const assignedVacancy = useMemo(
    () => vacancies.find((vacancy) => sameId(vacancy.user?.id, user.id)),
    [vacancies, user.id],
  );

  const applicationsForStartup = useMemo(
    () =>
      (myApplications ?? []).filter((application) =>
        sameId(application.startup_id, startupId),
      ),
    [myApplications, startupId],
  );

  const pendingApplication = applicationsForStartup.find(
    (application) => application.status === "pending",
  );

  const appliedVacancyIds = new Set(
    applicationsForStartup.map((application) => application.vacancy_id),
  );

  const availableVacancies = vacancies.filter(
    (vacancy) => vacancy.is_open && !appliedVacancyIds.has(vacancy.id),
  );

  const wrapperClassName = compact
    ? "space-y-3"
    : "flex flex-wrap items-center gap-3";

  if (isCreator) {
    return (
      <div className={wrapperClassName}>
        <Badge className="gap-1.5 border border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Вы основатель
        </Badge>
        <Button
          variant="outline"
          size={compact ? "default" : "sm"}
          className={compact ? "w-full" : ""}
          asChild
        >
          <Link href={`/account/startups/${startupId}`}>
            <Settings2 className="h-4 w-4" />
            Управлять стартапом
          </Link>
        </Button>
      </div>
    );
  }

  if (assignedVacancy) {
    return (
      <div className={wrapperClassName}>
        <Badge className="gap-1.5 border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Вы участник
        </Badge>
        <span className="text-sm text-muted-foreground">
          Роль: {roleName(assignedVacancy)}
        </span>
      </div>
    );
  }

  if (!user.isAuth) {
    return (
      <Button className={compact ? "w-full" : ""} asChild>
        <Link
          href={`/auth/signin?redirect=${encodeURIComponent(pathname ?? "/")}`}
        >
          <Send className="h-4 w-4" />
          Войти, чтобы присоединиться
        </Link>
      </Button>
    );
  }

  if (applicationsLoading) {
    return (
      <Button variant="secondary" disabled className={compact ? "w-full" : ""}>
        <Loader2 className="h-4 w-4 animate-spin" />
        Проверяем статус...
      </Button>
    );
  }

  if (pendingApplication) {
    return (
      <div className={wrapperClassName}>
        <Badge className="gap-1.5 border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
          <Clock3 className="h-3.5 w-3.5" />
          Заявка на рассмотрении
        </Badge>
        <span className="text-sm text-muted-foreground">
          Роль: {roleName(pendingApplication.vacancy)}
        </span>
      </div>
    );
  }

  if (availableVacancies.length === 0) {
    const wasRejected = applicationsForStartup.some(
      (application) => application.status === "rejected",
    );

    return (
      <div className={wrapperClassName}>
        {wasRejected ? (
          <Badge className="gap-1.5 border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/5">
            <XCircle className="h-3.5 w-3.5" />
            Заявка отклонена
          </Badge>
        ) : null}
        <Button
          variant="secondary"
          disabled
          className={compact ? "w-full" : ""}
        >
          <Clock3 className="h-4 w-4" />
          Нет доступных позиций
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        className={compact ? "w-full" : ""}
        onClick={() => setDialogOpen(true)}
      >
        <Send className="h-4 w-4" />
        Присоединиться к стартапу
      </Button>

      <JoinStartupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        startupName={startupName}
        vacancies={availableVacancies}
      />
    </>
  );
}
