import axios from "axios";

const FALLBACK_MESSAGE = "Что-то пошло не так. Попробуйте ещё раз.";

export function readApiErrorMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const candidate = record.error ?? record.message;

  return typeof candidate === "string" && candidate.trim().length > 0
    ? candidate
    : null;
}

export function getApiErrorMessage(
  error: unknown,
  fallback: string = FALLBACK_MESSAGE,
): string {
  if (axios.isAxiosError(error)) {
    return (
      readApiErrorMessage(error.response?.data) ?? error.message ?? fallback
    );
  }

  if (error instanceof Error && error.message) return error.message;

  return fallback;
}
