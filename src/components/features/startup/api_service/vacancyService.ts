import { axiosInstance } from "@/src/api/axios";
import type {
  CreateVacancyInput,
  UpdateVacancyInput,
  Vacancy,
} from "../types";

export const VacancyService = {
  async getByStartup(startupId: number): Promise<Vacancy[]> {
    const response = await axiosInstance.get<Vacancy[]>(
      `/vacancy/startup/${startupId}`,
    );
    return Array.isArray(response.data) ? response.data : [];
  },

  async create(input: CreateVacancyInput): Promise<Vacancy> {
    const response = await axiosInstance.post<Vacancy>("/vacancy", input);
    return response.data;
  },

  async update({ id, ...payload }: UpdateVacancyInput): Promise<Vacancy> {
    const response = await axiosInstance.put<Vacancy>(
      `/vacancy/${id}`,
      payload,
    );
    return response.data;
  },

  async remove(id: number): Promise<void> {
    await axiosInstance.delete(`/vacancy/${id}`);
  },
};
