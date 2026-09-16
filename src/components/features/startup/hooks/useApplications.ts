import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/src/constants/config";
import { ApplicationService } from "../api_service/applicationService";
import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationStatusInput,
} from "../types";

export const useMyApplications = (enabled: boolean) =>
  useQuery({
    queryKey: QUERY_KEYS.MY_APPLICATIONS,
    queryFn: () => ApplicationService.getMine(),
    enabled,
    staleTime: 1000 * 30,
  });

export const useStartupApplications = (
  startupId: number,
  initialData?: Application[],
) =>
  useQuery({
    queryKey: QUERY_KEYS.STARTUP_APPLICATIONS(startupId),
    queryFn: () => ApplicationService.getByStartup(startupId),
    initialData,
    staleTime: 1000 * 15,
  });

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateApplicationInput) =>
      ApplicationService.create(input),
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPLICATIONS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.STARTUP(application.startup_id),
      });
    },
  });
};

export const useUpdateApplicationStatus = (startupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateApplicationStatusInput) =>
      ApplicationService.updateStatus(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.STARTUP_APPLICATIONS(startupId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VACANCIES(startupId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.STARTUP(startupId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_STARTUPS });
    },
  });
};

export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (application: Application) =>
      ApplicationService.withdraw(application.id),
    onSuccess: (_, application) => {
      queryClient.setQueryData<Application[]>(
        QUERY_KEYS.MY_APPLICATIONS,
        (previous) => previous?.filter((item) => item.id !== application.id),
      );
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPLICATIONS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.STARTUP(application.startup_id),
      });
    },
  });
};
