import { axiosInstance } from "@/src/api/axios";
import type { Category, CreateStartup, Stage, Startup } from "../types";
export const StartupService = {
  async getStages() {
    const response = await axiosInstance.get<Stage[]>("/stage");
    return response.data;
  },
  async getCategories() {
    const response = await axiosInstance.get<Category[]>("/category");
    return response.data;
  },
  async createStartup(data: CreateStartup): Promise<Startup> {
    const response = await axiosInstance.post<Startup>("/startup", data);
    return response.data;
  },
};
