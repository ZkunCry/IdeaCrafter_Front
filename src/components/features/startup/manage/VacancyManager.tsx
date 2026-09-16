"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Loader2,
  Lock,
  LockOpen,
  Pencil,
  Plus,
  Trash2,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { getApiErrorMessage } from "@/src/lib/api-error";

import ConfirmDialog from "./ConfirmDialog";
import VacancyFormDialog from "./VacancyFormDialog";
import {
  useDeleteVacancy,
  useUpdateVacancy,
  useVacancies,
} from "../hooks/useVacancies";
import type { Vacancy } from "../types";

type VacancyManagerProps = {
  startupId: number;
  initialVacancies: Vacancy[];
};

export default function VacancyManager({
  startupId,
  initialVacancies,
}: VacancyManagerProps) {
  const { data: vacancies = [], isFetching } = useVacancies(
    startupId,
    initialVacancies,
  );
  const { mutateAsync: updateVacancy } = useUpdateVacancy(startupId);
  const { mutateAsync: deleteVacancy, isPending: deleting } =
    useDeleteVacancy(startupId);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Vacancy | null>(null);
  const [pendingToggleId, setPendingToggleId] = useState<number | null>(null);
  const [vacancyToDelete, setVacancyToDelete] = useState<Vacancy | null>(null);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (vacancy: Vacancy) => {
    setEditing(vacancy);
    setFormOpen(true);
  };

  const toggleOpenState = async (vacancy: Vacancy) => {
    setPendingToggleId(vacancy.id);
    try {
      await updateVacancy({ id: vacancy.id, is_open: !vacancy.is_open });
      toast.success(
        vacancy.is_open ? "Вакансия закрыта" : "Вакансия снова открыта",
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Не удалось изменить вакансию"));
    } finally {
      setPendingToggleId(null);
    }
  };

  const confirmDelete = async () => {
    if (!vacancyToDelete) return;
    try {
      await deleteVacancy(vacancyToDelete.id);
      toast.success("Вакансия удалена");
      setVacancyToDelete(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Не удалось удалить вакансию"));
    }
  };

  const openCount = vacancies.filter((vacancy) => vacancy.is_open).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold">Вакансии</h3>
          <p className="text-sm text-muted-foreground">
            {vacancies.length} всего, {openCount} открыто
            {isFetching ? " · обновляем..." : ""}
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Добавить вакансию
        </Button>
      </div>

      {vacancies.length === 0 ? (
        <Card className="border-dashed shadow-none">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <BriefcaseBusiness className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">Вакансий пока нет</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Добавьте роли, которые вы ищете в команду. Пользователи смогут
                откликнуться на них прямо со страницы стартапа.
              </p>
            </div>
            <Button variant="outline" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Создать первую вакансию
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {vacancies.map((vacancy) => {
            const assignee = vacancy.user;
            const isToggling = pendingToggleId === vacancy.id;

            return (
              <Card key={vacancy.id} className="shadow-none">
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-semibold">
                        {vacancy.role?.name ?? vacancy.role_name ?? "Роль"}
                      </h4>
                      {assignee ? (
                        <Badge className="gap-1.5 border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                          <UserCheck className="h-3.5 w-3.5" />
                          {assignee.username}
                        </Badge>
                      ) : vacancy.is_open ? (
                        <Badge variant="secondary">Открыта</Badge>
                      ) : (
                        <Badge variant="outline">Закрыта</Badge>
                      )}
                    </div>
                    {vacancy.description ? (
                      <p className="text-sm leading-6 text-muted-foreground">
                        {vacancy.description}
                      </p>
                    ) : (
                      <p className="text-sm italic text-muted-foreground">
                        Описание не заполнено
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(vacancy)}
                    >
                      <Pencil className="h-4 w-4" />
                      Изменить
                    </Button>
                    {!assignee && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isToggling}
                        onClick={() => toggleOpenState(vacancy)}
                      >
                        {isToggling ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : vacancy.is_open ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <LockOpen className="h-4 w-4" />
                        )}
                        {vacancy.is_open ? "Закрыть" : "Открыть"}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setVacancyToDelete(vacancy)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Удалить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <VacancyFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        startupId={startupId}
        vacancy={editing}
      />

      <ConfirmDialog
        open={Boolean(vacancyToDelete)}
        onOpenChange={(open) => !open && setVacancyToDelete(null)}
        title="Удалить вакансию?"
        description={
          vacancyToDelete?.user
            ? `На этой позиции уже работает ${vacancyToDelete.user.username}. Удаление исключит участника из команды, а все заявки на вакансию будут потеряны.`
            : "Вакансия и все полученные по ней заявки будут удалены безвозвратно."
        }
        confirmLabel="Удалить"
        variant="destructive"
        isPending={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
