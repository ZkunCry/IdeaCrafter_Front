import axios from "axios";
import { API } from "../constants/config";
import { AuthService } from "../components/features/auth/api/authApi";
import { useUserStore } from "../store/user";
import { toast } from "sonner";
export const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const isSSR = typeof window === "undefined";

  if (isSSR) {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();

    const accessToken = (await cookieStore).get("access_token");
    const refreshToken = (await cookieStore).get("refresh_token");

    const cookieParts: string[] = [];
    if (accessToken) cookieParts.push(`access_token=${accessToken.value}`);
    if (refreshToken) cookieParts.push(`refresh_token=${refreshToken.value}`);

    if (cookieParts.length > 0) {
      if (!config.headers) config.headers = {};
      config.headers["cookie"] = cookieParts.join("; ");
    }
  }

  return config;
});
let countRefresh = 0;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isSSR = typeof window === "undefined";
    const originalRequest = error.config;
    console.log("ssss");
    if (!isSSR) {
      toast.error("Something went wrong", {
        description: error.response?.data?.message || error.message,
      });
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      countRefresh < 1
    ) {
      originalRequest._retry = true;
      countRefresh++;
      try {
        const refreshResponse = await AuthService.refresh();

        if (refreshResponse.status === 401) {
          useUserStore.getState().actions.deleteCredentials();

          return Promise.reject(error);
        }

        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        useUserStore.getState().actions.deleteCredentials();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
