import CreateStartup from "@/src/components/features/startup/create/CreateStartup";
import { StartupService } from "@/src/components/features/startup/api_service/startupService";
import { API } from "@/src/constants/config";
export default async function CreateStartupPage() {
  return (
    <div>
      <CreateStartup />
    </div>
  );
}
