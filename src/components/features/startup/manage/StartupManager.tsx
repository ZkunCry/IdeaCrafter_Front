"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, BriefcaseBusiness, Inbox, Pencil } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

import ApplicationsInbox from "./ApplicationsInbox";
import EditStartupSection from "./EditStartupSection";
import VacancyManager from "./VacancyManager";
import type { Application, Startup } from "../types";

type StartupManagerProps = {
  startup: Startup;
  initialApplications: Application[];

  applicationsError?: string | null;
};

const TABS = ["edit", "vacancies", "applications"] as const;
type TabKey = (typeof TABS)[number];

const isTabKey = (value: string | null): value is TabKey =>
  value !== null && (TABS as readonly string[]).includes(value);

const initials = (name?: string) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "IC";

export default function StartupManager({
  startup,
  initialApplications,
  applicationsError,
}: StartupManagerProps) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<TabKey>(() => {
    const requested = searchParams.get("tab");
    return isTabKey(requested) ? requested : "edit";
  });

  const vacancies = startup.vacancies ?? [];
  const pendingCount = initialApplications.filter(
    (application) => application.status === "pending",
  ).length;

  const handleTabChange = (value: string) => {
    if (!isTabKey(value)) return;
    setTab(value);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", value);
      window.history.replaceState(null, "", url);
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" className="-ml-2 w-fit" asChild>
        <Link href="/account/startups">
          <ArrowLeft className="h-4 w-4" />К моим стартапам
        </Link>
      </Button>

      <Card className="shadow-none">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
            {startup.logo_url ? (
              <Image
                src={startup.logo_url}
                alt={startup.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-primary">
                {initials(startup.name)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-2xl font-semibold">
                {startup.name}
              </h2>
              {startup.stage?.name ? (
                <Badge variant="secondary">{startup.stage.name}</Badge>
              ) : null}
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {startup.short_description}
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="edit" className="gap-1.5">
            <Pencil className="h-4 w-4" />
            Редактирование
          </TabsTrigger>
          <TabsTrigger value="vacancies" className="gap-1.5">
            <BriefcaseBusiness className="h-4 w-4" />
            Вакансии
            <span className="ml-1 text-xs opacity-70">{vacancies.length}</span>
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-1.5">
            <Inbox className="h-4 w-4" />
            Заявки
            {pendingCount > 0 ? (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                {pendingCount}
              </span>
            ) : null}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <EditStartupSection startup={startup} />
        </TabsContent>

        <TabsContent value="vacancies">
          <VacancyManager startupId={startup.id} initialVacancies={vacancies} />
        </TabsContent>

        <TabsContent value="applications">
          <ApplicationsInbox
            startupId={startup.id}
            initialApplications={
              applicationsError ? undefined : initialApplications
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
