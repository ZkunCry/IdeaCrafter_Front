import { notFound } from "next/navigation";

import { AuthService } from "@/src/components/features/auth/api/authApi";
import { StartupServerService } from "@/src/components/features/startup/api_service/startupServerService";
import StartupManager from "@/src/components/features/startup/manage/StartupManager";
import type { Application } from "@/src/components/features/startup/types";
import { sameId } from "@/src/lib/utils";

type ManageStartupPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = {
  title: "Управление стартапом | IdeaCrafter",
};

export default async function ManageStartupPage({
  params,
}: ManageStartupPageProps) {
  const { id } = await params;

  const [startup, viewer] = await Promise.all([
    StartupServerService.getStartupById(id),
    AuthService.identityMeServer(),
  ]);

  if (!startup || !viewer || !sameId(viewer.id, startup.creator?.id)) {
    notFound();
  }

  let initialApplications: Application[] = [];
  let applicationsError: string | null = null;

  try {
    initialApplications = await StartupServerService.getStartupApplications(id);
  } catch (error) {
    applicationsError =
      error instanceof Error ? error.message : "Не удалось загрузить заявки";
  }

  return (
    <StartupManager
      startup={startup}
      initialApplications={initialApplications}
      applicationsError={applicationsError}
    />
  );
}
