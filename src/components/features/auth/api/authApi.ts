import { axiosInstance } from "@/src/api/axios";
import { API } from "@/src/constants/config";
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
      data,
    );
    return response.data;
  },
  async signUp(data: AuthCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/signup",
      data,
    );
    return response.data;
  },
  async identityMeServer() {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    if (!cookieString) return null;
    const response = await fetch(`${API.BASE_URL}/auth/me`, {
      headers: {
        Cookie: cookieString,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as AuthResponse;
    return data;
  },
  async identityMeClient() {
    const response = await axiosInstance.get<AuthResponse>("/auth/me");
    return response.data;
  },
  async logout() {
    await axiosInstance.post("/auth/logout", undefined, {
      skipErrorToast: true,
    });
  },
  async refresh() {
    const response = await axiosInstance.post<AuthResponse>("/auth/refresh");
    return response.data;
  },
};
