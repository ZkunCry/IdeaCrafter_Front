import { axiosInstance } from "@/src/api/axios";
import type {
  Category,
  CreateStartup,
  Stage,
  Startup,
  StartupResponse,
} from "../types";
import { API } from "@/src/constants/config";
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
  async getStartups(offset: number, limit: number): Promise<StartupResponse> {
    console.log(offset, limit);
    const response = await fetch(
      `${API.BASE_URL}/startup/list?offset=${offset}&limit=${limit}`
    );
    const data: StartupResponse = await response.json();
    return data;
  },
};
