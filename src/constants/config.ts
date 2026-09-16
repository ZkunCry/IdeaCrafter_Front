export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
};

/**
 * Centralised react-query keys. Mutations invalidate through these helpers so a
 * renamed key can never silently leave a stale cache behind.
 */
export const QUERY_KEYS = {
  PROFILE: ["profile"] as const,
  POSTS: ["posts"] as const,
  STAGES: ["stages"] as const,
  CATEGORIES: ["categories"] as const,
  ROLES: ["roles"] as const,
  MY_STARTUPS: ["startups", "mine"] as const,
  STARTUP: (startupId: number | string) => ["startup", String(startupId)],
  VACANCIES: (startupId: number | string) => [
    "vacancies",
    String(startupId),
  ],
  STARTUP_APPLICATIONS: (startupId: number | string) => [
    "applications",
    "startup",
    String(startupId),
  ],
  MY_APPLICATIONS: ["applications", "mine"] as const,
  FAVORITE_IDS: ["favorites", "ids"] as const,
  MY_FAVORITES: ["favorites", "mine"] as const,
  FAVORITES_COUNT: (startupId: number | string) => [
    "favorites",
    "count",
    String(startupId),
  ],
};
