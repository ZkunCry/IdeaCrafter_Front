import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Inbox } from "lucide-react";

export default function AccountStartupPage() {
  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div className="flex justify-between title">
        <h3 className="text-2xl font-semibold">Мои стартапы</h3>
        <Button size={"lg"}>
          <Plus />
          Создать стартап
        </Button>
      </div>
      <Card className="self-center text-center py-16 animate-fade-in col-span-full">
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-muted p-6">
            <Inbox className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Стартапов пока нет</h3>
            <p className="text-muted-foreground max-w-md">
              Вы ещё не создали ни одного стартапа. Начните свой
              предпринимательский путь с создания своего первого стартапа!
            </p>
          </div>
          <Button className="mt-4 hover-scale" asChild>
            <a href="/create-startup">
              <Plus className="h-4 w-4 mr-2" />
              Создать свой первый стартап
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
