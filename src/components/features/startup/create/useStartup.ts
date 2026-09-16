import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StartupService } from "../api_service/startupService";
import { QUERY_KEYS } from "@/src/constants/config";
import type { StartupFormValues } from "../types";

export const buildStartupFormData = (values: StartupFormValues): FormData => {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("short_description", values.short_description);
  formData.append("description", values.description);
  formData.append("target_audience", values.target_audience);
  formData.append("problem", values.problem);
  formData.append("solution", values.solution);
  formData.append("stage_id", String(values.stage_id));
  formData.append("category_ids", values.category_ids.join(","));

  if (values.files instanceof File) {
    formData.append("files", values.files);
  }

  return formData;
};

export const useCreateStartup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: StartupFormValues) =>
      StartupService.createStartup(buildStartupFormData(values)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_STARTUPS });
    },
  });
};

export const useUpdateStartup = (startupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: StartupFormValues) =>
      StartupService.updateStartup(startupId, buildStartupFormData(values)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.STARTUP(startupId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_STARTUPS });
    },
  });
};
