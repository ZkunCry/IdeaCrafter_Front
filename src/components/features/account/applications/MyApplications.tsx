"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Loader2,
  RefreshCw,
  Send,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { getApiErrorMessage } from "@/src/lib/api-error";
import { formatDate } from "@/src/lib/date";

import ConfirmDialog from "@/src/components/features/startup/manage/ConfirmDialog";
import { APPLICATION_STATUS_BADGE } from "@/src/components/features/startup/applicationStatus";
import {
  useMyApplications,
  useWithdrawApplication,
} from "@/src/components/features/startup/hooks/useApplications";
import type {
  Application,
  ApplicationStatus,
} from "@/src/components/features/startup/types";

type FilterKey = ApplicationStatus | "all";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "pending", label: "На рассмотрении" },
  { key: "accepted", label: "Принятые" },
  { key: "rejected", label: "Отклонённые" },
];

const STATUS_HINT: Record<ApplicationStatus, string> = {
  pending: "Основатель ещё не ответил на заявку.",
  accepted: "Вы в команде! Роль закреплена за вами.",
  rejected:
    "Основатель отклонил заявку. Можно откликнуться на другую вакансию проекта.",
};

const initials = (name?: string) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "IC";

export default function MyApplications() {
  const {
    data: applications = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useMyApplications(true);
  const { mutateAsync: withdraw, isPending: isWithdrawing } =
    useWithdrawApplication();

  const [filter, setFilter] = useState<FilterKey>("all");
  const [toWithdraw, setToWithdraw] = useState<Application | null>(null);

  const counts = useMemo(
    () => ({
      all: applications.length,
      pending: applications.filter((item) => item.status === "pending").length,
      accepted: applications.filter((item) => item.status === "accepted")
        .length,
      rejected: applications.filter((item) => item.status === "rejected")
        .length,
    }),
    [applications],
  );

  const visible = useMemo(
    () =>
      filter === "all"
        ? applications
        : applications.filter((item) => item.status === filter),
    [applications, filter],
  );

  const confirmWithdraw = async () => {
    if (!toWithdraw) return;
    try {
      await withdraw(toWithdraw);
      toast.success("Заявка отозвана");
      setToWithdraw(null);
    } catch (withdrawError) {
      toast.error(
        getApiErrorMessage(withdrawError, "Не удалось отозвать заявку"),
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Загружаем заявки...
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-destructive/30 shadow-none">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-sm text-destructive">
            {getApiErrorMessage(error, "Не удалось загрузить заявки")}
          </p>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
            Повторить
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold">Мои заявки</h3>
          <p className="text-sm text-muted-foreground">
            История откликов на вакансии стартапов и их статусы
            {isFetching ? " · обновляем..." : ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Обновить
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map(({ key, label }) => (
          <Button
            key={key}
            size="sm"
            variant={filter === key ? "default" : "outline"}
            onClick={() => setFilter(key)}
          >
            {label}
            <span className="ml-1 text-xs opacity-70">{counts[key]}</span>
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <Card className="border-dashed shadow-none">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <Send className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">
                {applications.length === 0
                  ? "Вы ещё не отправляли заявок"
                  : "В этом разделе заявок нет"}
              </p>
              <p className="max-w-md text-sm text-muted-foreground">
                Найдите интересный проект и откликнитесь на открытую вакансию —
                заявка появится здесь.
              </p>
            </div>
            {applications.length === 0 ? (
              <Button asChild className="mt-2">
                <Link href="/startups">Смотреть стартапы</Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {visible.map((application) => {
            const badge = APPLICATION_STATUS_BADGE[application.status];
            const startup = application.startup;
            const startupName = startup?.name || "Стартап";
            const roleLabel =
              application.vacancy?.role?.name ??
              application.vacancy?.role_name ??
              "Роль удалена";
            const canOpenStartup = Boolean(
              application.startup_id && !startup?.deleted,
            );

            return (
              <Card key={application.id} className="shadow-none">
                <CardContent className="space-y-4 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-sm font-semibold text-primary">
                        {startup?.logo_url ? (
                          <img
                            src={startup.logo_url}
                            alt=""
                            className="size-full object-cover"
                          />
                        ) : (
                          initials(startupName)
                        )}
                      </div>
                      <div className="min-w-0">
                        {canOpenStartup ? (
                          <Link
                            href={`/startup/${application.startup_id}`}
                            className="flex items-center gap-1 truncate font-medium hover:text-primary"
                          >
                            {startupName}
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                          </Link>
                        ) : (
                          <p className="truncate font-medium">
                            {startupName}
                            {startup?.deleted ? (
                              <span className="ml-2 text-xs font-normal text-muted-foreground">
                                (удалён)
                              </span>
                            ) : null}
                          </p>
                        )}
                        <p className="truncate text-xs text-muted-foreground">
                          Роль: {roleLabel}
                        </p>
                      </div>
                    </div>

                    <Badge className={`${badge.className} hover:opacity-100`}>
                      {badge.label}
                    </Badge>
                  </div>

                  {application.message ? (
                    <p className="line-clamp-4 whitespace-pre-line rounded-md bg-muted/50 p-3 text-sm leading-6">
                      {application.message}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5" />
                        Отправлена {formatDate(application.created_at)}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {STATUS_HINT[application.status]}
                      </p>
                    </div>

                    {application.status === "pending" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setToWithdraw(application)}
                      >
                        <Undo2 className="h-4 w-4" />
                        Отозвать
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(toWithdraw)}
        onOpenChange={(open) => !open && setToWithdraw(null)}
        title="Отозвать заявку?"
        description={`Заявка в «${
          toWithdraw?.startup?.name ?? "стартап"
        }» будет удалена. Позже вы сможете откликнуться снова, пока вакансия открыта.`}
        confirmLabel="Отозвать"
        variant="destructive"
        isPending={isWithdrawing}
        onConfirm={confirmWithdraw}
      />
    </div>
  );
}
