import { useMutation } from "@tanstack/react-query";
import { StartupService } from "../api_service/startupService";
import type { CreateStartup } from "../types";

export const useCreateStartup = () => {
  return useMutation({
    mutationFn: (data: CreateStartup) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "files" && value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, String(v)));
        } else {
          formData.append(key, String(value));
        }
      });

      return StartupService.createStartup(formData);
    },
  });
};
