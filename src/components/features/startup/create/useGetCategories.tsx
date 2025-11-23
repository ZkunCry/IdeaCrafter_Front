import { useQuery } from "@tanstack/react-query";
import { StartupService } from "../api_service/startupService";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await StartupService.getCategories();
      return response;
    },
  });
};
