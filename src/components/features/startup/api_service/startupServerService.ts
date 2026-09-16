import { cookies } from "next/headers";
import { API } from "@/src/constants/config";
import { readApiErrorMessage } from "@/src/lib/api-error";
import type { Application, Startup } from "../types";

async function authorizedFetch(path: string): Promise<Response> {
  const cookieHeader = (await cookies())
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  return fetch(`${API.BASE_URL}${path}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    cache: "no-store",
  });
}

async function readJson(response: Response): Promise<unknown> {
  return response.json().catch(() => null);
}

export const StartupServerService = {
  async getMyStartups(): Promise<Startup[]> {
    const response = await authorizedFetch("/startup/my-startups");
    const data = await readJson(response);

    if (!response.ok) {
      throw new Error(
        readApiErrorMessage(data) ?? "Не удалось загрузить ваши стартапы",
      );
    }

    return data &&
      typeof data === "object" &&
      "items" in data &&
      Array.isArray(data.items)
      ? (data.items as Startup[])
      : [];
  },

  async getStartupById(id: string | number): Promise<Startup | null> {
    const response = await authorizedFetch(`/startup/${id}`);
    const data = await readJson(response);

    if (!response.ok) return null;
    if (!data || typeof data !== "object" || "error" in data) return null;

    return data as Startup;
  },

  async getStartupApplications(id: string | number): Promise<Application[]> {
    const response = await authorizedFetch(`/application/startup/${id}`);
    const data = await readJson(response);

    if (!response.ok) {
      throw new Error(
        readApiErrorMessage(data) ?? "Не удалось загрузить заявки",
      );
    }

    return data &&
      typeof data === "object" &&
      "items" in data &&
      Array.isArray(data.items)
      ? (data.items as Application[])
      : [];
  },
};
