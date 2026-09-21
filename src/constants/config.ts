// Go API origin as seen from the Next.js server. Read at runtime, so one image
// works in any environment (in docker compose: http://api:3001).
export const API_SERVER_URL =
  process.env.API_SERVER_URL || "http://localhost:3001";

export const API = {
  // The browser goes through the same-origin proxy (app/api/[...proxy]) so auth
  // cookies stay first-party; server code calls the API directly.
  BASE_URL:
    typeof window === "undefined" ? `${API_SERVER_URL}/api` : "/api",
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
