import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Inbox } from "lucide-react";
import StartupCard from "@/src/components/features/startup/create/StartupCard";
import { StartupServerService } from "@/src/components/features/startup/api_service/startupServerService";
import type { Startup } from "@/src/components/features/startup/types";

export default async function AccountStartupPage() {
  let startups: Startup[] = [];

  try {
    startups = await StartupServerService.getMyStartups();
  } catch {
    startups = [];
  }
  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex items-center justify-between gap-4 title">
        <h3 className="text-2xl font-semibold">Мои стартапы</h3>
      </div>
      {startups.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          {startups.map((startup) => (
            <StartupCard
              key={startup.id}
              startup={startup}
              manageHref={`/account/startups/${startup.id}`}
            />
          ))}
        </div>
      ) : (
        <Card className="self-center py-16 text-center animate-fade-in col-span-full">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Inbox className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Стартапов пока нет</h3>
              <p className="max-w-md text-muted-foreground">
                Вы ещё не создали ни одного стартапа. Начните свой
                предпринимательский путь с создания первого проекта.
              </p>
            </div>
            <Button className="mt-4" asChild>
              <Link href="/startup/create">
                <Plus className="mr-2 h-4 w-4" />
                Создать свой первый стартап
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
