import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/constants/config";
import { StartupService } from "../api_service/startupService";

export const useGetCategories = () =>
  useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: () => StartupService.getCategories(),
    staleTime: 1000 * 60 * 30,
  });
