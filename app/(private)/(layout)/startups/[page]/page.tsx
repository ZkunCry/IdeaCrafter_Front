import Section from "@/src/components/ui/section";
import Container from "@/src/components/common/container/Container";
import StartupList from "@/src/components/features/startup/review/StartupList";
import Filters from "@/src/components/features/startup/review/Filters";
import { getQueryClient } from "@/src/providers/get-query-client";
import { StartupService } from "@/src/components/features/startup/api_service/startupService";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
export const revalidate = 60;
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const res = await params;
  const paramsS = await searchParams;

  const offsetChange = +res.page != 0 ? +res.page - 1 : +res.page;
  console.log(offsetChange);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["startups", offsetChange, 10],
    queryFn: () => StartupService.getStartups(offsetChange, 10),
  });

  return (
    <>
      <Section className="text-center space-y-4 animate-fade-in mb-4">
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
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex items-start gap-6">
              <StartupList offset={+res.page} limit={10} />
              <Filters />
            </div>
          </HydrationBoundary>
        </Container>
      </Section>
    </>
  );
}
