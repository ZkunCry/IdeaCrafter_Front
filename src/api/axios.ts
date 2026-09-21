import axios from "axios";
import { API } from "../constants/config";
import { toast } from "sonner";
import { readApiErrorMessage } from "../lib/api-error";

export const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

declare module "axios" {

  interface AxiosRequestConfig<D = any> {
    skipErrorToast?: boolean;
  }
}

export const silentRequest = { skipErrorToast: true } as const;

type RetriableConfig = {
  _retry?: boolean;
  skipErrorToast?: boolean;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
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

        return axiosInstance(error.config);
      } catch (refreshError: unknown) {
        return Promise.reject(refreshError);
      }
    }

    if (!originalRequest?.skipErrorToast) {
      toast.error("Что-то пошло не так", {
        description:
          readApiErrorMessage(error.response?.data) ?? error.message,
      });
    }

    return Promise.reject(error);
  },
);
