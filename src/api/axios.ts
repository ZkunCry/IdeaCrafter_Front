import axios from "axios";
import { API } from "../constants/config";
import { useUserStore } from "../store/user";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshClient
            .post("/auth/refresh")
            .then(() => undefined)
            .finally(() => {
              refreshPromise = null;
            });
        }

        await refreshPromise;

        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        useUserStore.getState().actions.deleteCredentials();

        return Promise.reject(refreshError);
      }
    }
    toast("Something went wrong", {
      description: error.response?.data?.message || error.message,
    });

    return Promise.reject(error);
  },
);
