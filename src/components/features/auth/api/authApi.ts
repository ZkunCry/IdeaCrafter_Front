import { axiosInstance } from "@/src/api/axios";

export interface AuthCredentials {
  email: string;
  password: string;
}
export interface AuthResponse {
  id: string;
  username: string;
  email: string;
}

export const AuthService = {
  async signIn(data: AuthCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/signin",
      data
    );
    return response.data;
  },
  async signUp(data: AuthCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/signup",
      data
    );
    return response.data;
  },
  async identityMe() {
    const response = await axiosInstance.post<AuthResponse>("/auth/me");
    return response.data;
  },
  async refresh() {
    const response = await axiosInstance.post<AuthResponse>("/auth/refresh");
    return response.data;
  },
};
