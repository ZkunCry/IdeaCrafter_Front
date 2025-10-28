import Section from "@/src/components/ui/section";
import Container from "@/src/components/common/container/Container";
import StartupList from "@/src/components/features/startup/review/StartupList";
import Filters from "@/src/components/features/startup/review/Filters";
import { StartupService } from "@/src/components/features/startup/api_service/startupService";
import { StartupPagination } from "@/src/components/features/startup/review/StartupPagination";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
export const revalidate = 60;
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  const paramsS = await searchParams;
  console.log(paramsS);
  const currentPage = Number(paramsS.page) || 1;
  const offset = currentPage > 0 ? currentPage - 1 : 0;
  const response = await StartupService.getStartups(offset, 10);
  return (
    <>
      <Section className="text-center space-y-4 animate-fade-in py-[8rem]">
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
          <div className="flex items-start gap-6">
            <Suspense
              fallback={
                <LoaderCircle size={40} className="animate-spin w-full" />
              }
            >
              <StartupList data={response} />
              <Filters />
            </Suspense>
          </div>

          <StartupPagination
            currentPage={offset}
            totalPages={response.total_count}
          />
        </Container>
      </Section>
    </>
  );
}
