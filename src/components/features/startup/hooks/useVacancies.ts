import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/src/constants/config";
import { RoleService } from "../api_service/roleService";
import { VacancyService } from "../api_service/vacancyService";
import type { CreateVacancyInput, UpdateVacancyInput, Vacancy } from "../types";

export const useRoles = () =>
  useQuery({
    queryKey: QUERY_KEYS.ROLES,
    queryFn: () => RoleService.getRoles(),
    staleTime: 1000 * 60 * 30,
  });

export const useVacancies = (startupId: number, initialData?: Vacancy[]) =>
  useQuery({
    queryKey: QUERY_KEYS.VACANCIES(startupId),
    queryFn: () => VacancyService.getByStartup(startupId),
    initialData,
  });

const useVacancyInvalidation = (startupId: number) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.VACANCIES(startupId),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STARTUP(startupId) });
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.STARTUP_APPLICATIONS(startupId),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_STARTUPS });
  };
};

export const useCreateVacancy = (startupId: number) => {
  const invalidate = useVacancyInvalidation(startupId);

  return useMutation({
    mutationFn: (input: CreateVacancyInput) => VacancyService.create(input),
    onSuccess: invalidate,
  });
};

export const useUpdateVacancy = (startupId: number) => {
  const invalidate = useVacancyInvalidation(startupId);

  return useMutation({
    mutationFn: (input: UpdateVacancyInput) => VacancyService.update(input),
    onSuccess: invalidate,
  });
};

export const useDeleteVacancy = (startupId: number) => {
  const invalidate = useVacancyInvalidation(startupId);

  return useMutation({
    mutationFn: (id: number) => VacancyService.remove(id),
    onSuccess: invalidate,
  });
};
