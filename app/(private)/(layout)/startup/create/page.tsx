import CreateStartup from "@/src/components/features/startup/create/CreateStartup";
import { StartupService } from "@/src/components/features/startup/api_service/startupService";
export default async function CreateStartupPage() {
  const stages = await StartupService.getStages();
  console.log(stages);
  return (
    <div>
      <CreateStartup stages={stages} />
    </div>
  );
}
