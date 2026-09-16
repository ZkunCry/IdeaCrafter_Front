import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/constants/config";
import { StartupService } from "../api_service/startupService";

export const useGetStages = () =>
  useQuery({
    queryKey: QUERY_KEYS.STAGES,
    queryFn: () => StartupService.getStages(),
    staleTime: 1000 * 60 * 30,
  });
