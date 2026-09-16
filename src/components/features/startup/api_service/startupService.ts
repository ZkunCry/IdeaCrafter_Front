import { axiosInstance } from "@/src/api/axios";
import type {
  CategoryResponse,
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
    const response = await axiosInstance.get<CategoryResponse>(
      "/category/list",
      { params: { offset: 0, limit: 100 } },
    );
    return response.data;
  },
  async getFavoritesCount(id: string | number): Promise<number | undefined> {
    try {
      const response = await fetch(
        `${API.BASE_URL}/favorite/startup/${id}/count`,
        { cache: "no-store" },
      );
      if (!response.ok) return undefined;
      const data = (await response.json()) as { count?: unknown };
      return typeof data.count === "number" ? data.count : undefined;
    } catch {
      return undefined;
    }
  },
  async createStartup(data: FormData): Promise<Startup> {
    const response = await axiosInstance.post<Startup>("/startup", data);
    return response.data;
  },
  async updateStartup(id: number, data: FormData): Promise<Startup> {
    const response = await axiosInstance.put<Startup>(`/startup/${id}`, data);
    return response.data;
  },
  async getStartupById(
    id: string,
  ): Promise<{ data?: Startup; error?: string }> {
    let response: Response;
    try {
      response = await fetch(`${API.BASE_URL}/startup/${id}`, {
        cache: "no-store",
      });
    } catch {
      return { error: "Сервер API недоступен" };
    }
    const data = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      const errorMessage =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof data.error === "string"
          ? data.error
          : "Не удалось загрузить стартап";
      return { error: errorMessage };
    }

    if (!data || typeof data !== "object" || "error" in data) {
      return { error: "Некорректный ответ сервера" };
    }

    return { data: data as Startup };
  },
  async getStartups(
    offset: number,
    limit: number,
    query?: string,
    categorySlug?: string,
  ): Promise<StartupResponse> {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });
    if (query) params.set("searchString", query);
    if (categorySlug) params.set("category", categorySlug);

    const response = await fetch(`${API.BASE_URL}/startup/list?${params}`, {
      next: { revalidate: 60, tags: ["startups"] },
    });
    const data = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      const message =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof data.error === "string"
          ? data.error
          : "Не удалось загрузить список стартапов";
      throw new Error(message);
    }

    if (
      !data ||
      typeof data !== "object" ||
      !("items" in data) ||
      !Array.isArray(data.items)
    ) {
      throw new Error("API вернул некорректный список стартапов");
    }

    return {
      items: data.items as StartupResponse["items"],
      total_count:
        "total_count" in data && typeof data.total_count === "number"
          ? data.total_count
          : 0,
    };
  },
};
