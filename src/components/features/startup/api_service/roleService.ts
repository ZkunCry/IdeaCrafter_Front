import { axiosInstance } from "@/src/api/axios";
import type { Role } from "../types";

export const RoleService = {
  async getRoles(): Promise<Role[]> {
    const response = await axiosInstance.get<Role[]>("/role");
    return Array.isArray(response.data) ? response.data : [];
  },

  async create(name: string): Promise<Role> {
    const response = await axiosInstance.post<Role>("/role", { name });
    return response.data;
  },
};
