import { API } from "@/src/constants/config";
import type { CategoryResponse } from "../types";
export const CategoryService = {
  async getCategories(
    offset: number,
    limit: number,
    query?: string
  ): Promise<{ data?: CategoryResponse; error?: string }> {
    const params = `?offset=${offset}&limit=${limit}${
      query ? `&searchString=${query}` : ""
    }`;
    const response = await fetch(`${API.BASE_URL}/category/list${params}`);
    const data = await response.json();
    if (data.error) return { error: data.error };
    return { data };
  },
};
