import { useQuery } from "@tanstack/react-query";
import { StartupService } from "../api_service/startupService";

export const useGetStages = () => {
  return useQuery({
    queryKey: ["stages"],
    queryFn: async () => {
      const response = await StartupService.getStages();
      return response;
    },
  });
};
