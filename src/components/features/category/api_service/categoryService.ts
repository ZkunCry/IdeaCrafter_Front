import { API } from "@/src/constants/config";
import { readApiErrorMessage } from "@/src/lib/api-error";
import type { CategoryResponse } from "../types";

export const CategoryService = {
  async getCategories(
    offset: number,
    limit: number,
    query?: string,
  ): Promise<{ data?: CategoryResponse; error?: string }> {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });
    if (query) params.set("searchString", query);

    try {
      const response = await fetch(`${API.BASE_URL}/category/list?${params}`, {
        cache: "no-store",
      });
      const data = (await response.json().catch(() => null)) as unknown;

      if (!response.ok) {
        return {
          error: readApiErrorMessage(data) ?? "Не удалось загрузить категории",
        };
      }
      if (
        !data ||
        typeof data !== "object" ||
        !("items" in data) ||
        !Array.isArray(data.items)
      ) {
        return { error: "API вернул некорректный список категорий" };
      }

      return { data: data as CategoryResponse };
    } catch {
      return { error: "Сервер API недоступен" };
    }
  },
};
