import { axiosInstance, silentRequest } from "@/src/api/axios";
import type {
  FavoriteIdsResponse,
  FavoriteListResponse,
  FavoriteToggleResponse,
  Startup,
} from "../types";

export const FavoriteService = {
  async getMine(): Promise<Startup[]> {
    const response =
      await axiosInstance.get<FavoriteListResponse>("/favorite/my");
    return Array.isArray(response.data?.items) ? response.data.items : [];
  },

  async getIds(): Promise<number[]> {
    const response = await axiosInstance.get<FavoriteIdsResponse>(
      "/favorite/ids",
      silentRequest,
    );
    return Array.isArray(response.data?.items) ? response.data.items : [];
  },

  async getCount(startupId: number): Promise<number> {
    const response = await axiosInstance.get<{ count: number }>(
      `/favorite/startup/${startupId}/count`,
      silentRequest,
    );
    return typeof response.data?.count === "number" ? response.data.count : 0;
  },

  async add(startupId: number): Promise<FavoriteToggleResponse> {
    const response = await axiosInstance.post<FavoriteToggleResponse>(
      `/favorite/startup/${startupId}`,
    );
    return response.data;
  },

  async remove(startupId: number): Promise<FavoriteToggleResponse> {
    const response = await axiosInstance.delete<FavoriteToggleResponse>(
      `/favorite/startup/${startupId}`,
    );
    return response.data;
  },
};
