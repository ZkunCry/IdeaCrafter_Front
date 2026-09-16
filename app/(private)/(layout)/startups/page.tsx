import Section from "@/src/components/ui/section";
import Container from "@/src/components/common/container/Container";
import StartupList from "@/src/components/features/startup/review/StartupList";
import Filters from "@/src/components/features/startup/review/Filters";
import { StartupService } from "@/src/components/features/startup/api_service/startupService";
import { StartupPagination } from "@/src/components/features/startup/review/StartupPagination";
import type { StartupResponse } from "@/src/components/features/startup/types";
import { Card, CardContent } from "@/src/components/ui/card";
import { Suspense } from "react";

const PAGE_SIZE = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  let response: StartupResponse = { items: [], total_count: 0 };
  let error: string | null = null;
  try {
    response = await StartupService.getStartups(
      currentPage - 1,
      PAGE_SIZE,
      params.query,
      params.category,
    );
  } catch (loadError) {
    error =
      loadError instanceof Error
        ? loadError.message
        : "Не удалось загрузить список стартапов";
  }

  return (
    <>
      <Section className="text-center space-y-4 animate-fade-in pb-[8rem]">
        <Container>
          <h1 className="text-4xl font-bold text-foreground">Стартапы</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Откройте для себя, оцените и поддержите инновационные идеи стартапов
            от предпринимателей со всего мира.
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="flex flex-col-reverse items-start gap-6 lg:flex-row">
            {error ? (
              <Card className="flex-1 self-stretch border-destructive/30 shadow-none">
                <CardContent className="py-12 text-center text-destructive">
                  {error}
                </CardContent>
              </Card>
            ) : response.items.length === 0 ? (
              <Card className="flex-1 self-stretch shadow-none">
                <CardContent className="space-y-1 py-12 text-center">
                  <p className="font-medium">Стартапы не найдены</p>
                  <p className="text-sm text-muted-foreground">
                    Попробуйте изменить запрос или выбрать другую категорию.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <StartupList data={response} />
            )}
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <Suspense>
            <StartupPagination
              currentPage={currentPage}
              totalPages={response.total_count}
            />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
