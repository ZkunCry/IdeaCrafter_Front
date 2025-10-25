import StartupList from "@/src/components/features/startup/review/StartupList";
import Section from "@/src/components/ui/section";
import { axiosInstance } from "@/src/api/axios";
import { Startup } from "@/src/components/features/startup/types";
import Container from "@/src/components/common/container/Container";
import Filters from "@/src/components/features/startup/review/Filters";
import { StartupPagination } from "@/src/components/features/startup/review/StartupPagination";
export default async function StartupsPage() {
  const startups = (
    await axiosInstance.get<Startup[]>("/startup/list?offset=0&limit=10")
  ).data;

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
          <div className="flex items-start gap-6">
            <StartupList initialData={startups} />
            <Filters />
          </div>
          <StartupPagination totalPages={10} currentPage={1} />
        </Container>
      </Section>
    </>
  );
}
