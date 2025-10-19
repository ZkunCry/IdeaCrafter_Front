import { useMutation } from "@tanstack/react-query";
import { StartupService } from "../api_service/startupService";
import type { CreateStartup } from "../types";

export const useCreateStartup = () => {
  return useMutation({
    mutationFn: (data: CreateStartup) => {
      return StartupService.createStartup(data);
    },
  });
};
