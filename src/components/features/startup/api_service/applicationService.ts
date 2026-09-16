import { axiosInstance } from "@/src/api/axios";
import type {
  Application,
  ApplicationListResponse,
  CreateApplicationInput,
  UpdateApplicationStatusInput,
} from "../types";

const readItems = (payload: ApplicationListResponse | undefined) =>
  Array.isArray(payload?.items) ? payload.items : [];

export const ApplicationService = {
  async create(input: CreateApplicationInput): Promise<Application> {
    const response = await axiosInstance.post<Application>(
      "/application",
      input,
    );
    return response.data;
  },

  async getMine(): Promise<Application[]> {
    const response =
      await axiosInstance.get<ApplicationListResponse>("/application/my");
    return readItems(response.data);
  },

  async getByStartup(startupId: number): Promise<Application[]> {
    const response = await axiosInstance.get<ApplicationListResponse>(
      `/application/startup/${startupId}`,
    );
    return readItems(response.data);
  },

  async updateStatus({
    id,
    status,
  }: UpdateApplicationStatusInput): Promise<Application> {
    const response = await axiosInstance.put<Application>(
      `/application/status/${id}`,
      { status },
    );
    return response.data;
  },

  async withdraw(id: number): Promise<void> {
    await axiosInstance.delete(`/application/${id}`);
  },
};
