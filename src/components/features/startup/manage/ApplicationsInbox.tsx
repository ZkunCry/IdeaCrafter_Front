"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Clock3,
  Inbox,
  Loader2,
  Mail,
  RefreshCw,
  X,
} from "lucide-react";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { getApiErrorMessage } from "@/src/lib/api-error";
import { formatDate } from "@/src/lib/date";

import ConfirmDialog from "./ConfirmDialog";
import { APPLICATION_STATUS_BADGE } from "../applicationStatus";
import {
  useStartupApplications,
  useUpdateApplicationStatus,
} from "../hooks/useApplications";
import type { Application, ApplicationStatus } from "../types";

type ApplicationsInboxProps = {
  startupId: number;
  initialApplications?: Application[];
};

type FilterKey = ApplicationStatus | "all";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "pending", label: "Новые" },
  { key: "accepted", label: "Принятые" },
  { key: "rejected", label: "Отклонённые" },
  { key: "all", label: "Все" },
];


const initials = (name?: string) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "??";

type PendingDecision = {
  application: Application;
  status: Exclude<ApplicationStatus, "pending">;
};

export default function ApplicationsInbox({
  startupId,
  initialApplications,
}: ApplicationsInboxProps) {
  const {
    data: applications = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useStartupApplications(startupId, initialApplications);

  const { mutateAsync: updateStatus, isPending } =
    useUpdateApplicationStatus(startupId);

  const [filter, setFilter] = useState<FilterKey>("pending");
  const [decision, setDecision] = useState<PendingDecision | null>(null);

  const counts = useMemo(
    () => ({
      pending: applications.filter((item) => item.status === "pending").length,
      accepted: applications.filter((item) => item.status === "accepted").length,
      rejected: applications.filter((item) => item.status === "rejected").length,
      all: applications.length,
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

  const confirmDecision = async () => {
    if (!decision) return;
    try {
      await updateStatus({
        id: decision.application.id,
        status: decision.status,
      });
      toast.success(
        decision.status === "accepted"
          ? `${decision.application.user.username} принят в команду`
          : "Заявка отклонена",
      );
      setDecision(null);
    } catch (submitError) {
      toast.error(
        getApiErrorMessage(submitError, "Не удалось обновить заявку"),
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
          <h3 className="text-xl font-semibold">Заявки на вступление</h3>
          <p className="text-sm text-muted-foreground">
            {counts.pending} ждут ответа из {counts.all}
            {isFetching ? " · обновляем..." : ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
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
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">
                {filter === "pending"
                  ? "Новых заявок нет"
                  : "Здесь пока пусто"}
              </p>
              <p className="max-w-md text-sm text-muted-foreground">
                Как только кто-то откликнется на вашу вакансию, заявка появится
                в этом списке.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {visible.map((application) => {
            const badge = APPLICATION_STATUS_BADGE[application.status];
            const roleLabel =
              application.vacancy?.role?.name ??
              application.vacancy?.role_name ??
              "Роль удалена";

            return (
              <Card key={application.id} className="shadow-none">
                <CardContent className="space-y-4 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {initials(application.user?.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {application.user?.username ?? "Пользователь"}
                        </p>
                        <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {application.user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{roleLabel}</Badge>
                      <Badge className={`${badge.className} hover:opacity-100`}>
                        {badge.label}
                      </Badge>
                    </div>
                  </div>

                  {application.message ? (
                    <p className="whitespace-pre-line rounded-md bg-muted/50 p-3 text-sm leading-6">
                      {application.message}
                    </p>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      Кандидат не оставил сообщения.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />
                      {formatDate(application.created_at)}
                    </span>

                    {application.status === "pending" ? (
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() =>
                            setDecision({ application, status: "rejected" })
                          }
                        >
                          <X className="h-4 w-4" />
                          Отклонить
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            setDecision({ application, status: "accepted" })
                          }
                        >
                          <Check className="h-4 w-4" />
                          Принять
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(decision)}
        onOpenChange={(open) => !open && setDecision(null)}
        title={
          decision?.status === "accepted"
            ? "Принять кандидата в команду?"
            : "Отклонить заявку?"
        }
        description={
          decision?.status === "accepted"
            ? `${decision?.application.user.username} займёт позицию «${
                decision?.application.vacancy?.role?.name ?? "вакансия"
              }». Вакансия закроется, а остальные заявки на неё будут автоматически отклонены.`
            : `Заявка ${decision?.application.user.username} будет отклонена. Кандидат сможет откликнуться на другую открытую вакансию.`
        }
        confirmLabel={
          decision?.status === "accepted" ? "Принять" : "Отклонить"
        }
        variant={decision?.status === "accepted" ? "default" : "destructive"}
        isPending={isPending}
        onConfirm={confirmDecision}
      />
    </div>
  );
}
