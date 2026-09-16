"use client";

import Link from "next/link";
import { Heart, Loader2, RefreshCw } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { getApiErrorMessage } from "@/src/lib/api-error";

import StartupCard from "@/src/components/features/startup/create/StartupCard";
import { useMyFavorites } from "@/src/components/features/startup/hooks/useFavorites";

export default function MyFavorites() {
  const {
    data: startups = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useMyFavorites();

  return (
    <div className="flex flex-col gap-[2.5rem]">
      <div>
        <h3 className="text-2xl font-semibold">Избранные стартапы</h3>
        <p className="text-sm text-muted-foreground">
          Проекты, которые вы сохранили, чтобы вернуться к ним позже
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Загружаем избранное...
        </div>
      ) : isError ? (
        <Card className="border-destructive/30 shadow-none">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-sm text-destructive">
              {getApiErrorMessage(error, "Не удалось загрузить избранное")}
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
              Повторить
            </Button>
          </CardContent>
        </Card>
      ) : startups.length === 0 ? (
        <Card className="py-16 text-center shadow-none">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">В избранном пусто</h3>
              <p className="max-w-md text-muted-foreground">
                Нажмите на сердечко на карточке стартапа, чтобы сохранить его
                здесь.
              </p>
            </div>
            <Button className="mt-4" asChild>
              <Link href="/startups">Смотреть стартапы</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      )}
    </div>
  );
}
