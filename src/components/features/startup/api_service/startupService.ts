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
  async getStartupById(
    id: string
  ): Promise<{ data?: Startup; error?: string }> {
    const response = await fetch(`${API.BASE_URL}/startup/${id}`);
    const data = await response.json();

    if (data.error) return { error: data.error };
    return { data };
  },
  async getStartups(
    offset: number,
    limit: number,
    query?: string
  ): Promise<StartupResponse> {
    console.log(offset, limit, query);
    const params = `?offset=${offset}&limit=${limit}${
      query ? `&searchString=${query}` : ""
    }`;
    const response = await fetch(`${API.BASE_URL}/startup/list${params}`, {
      next: { revalidate: 60 },
    });
    const data: StartupResponse = await response.json();
    console.log(data);
    return data;
  },
};
