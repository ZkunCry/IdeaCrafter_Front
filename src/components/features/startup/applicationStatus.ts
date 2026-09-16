import type { ApplicationStatus } from "./types";

export const APPLICATION_STATUS_BADGE: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "На рассмотрении",
    className: "border border-amber-200 bg-amber-50 text-amber-700",
  },
  accepted: {
    label: "Принята",
    className: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  rejected: {
    label: "Отклонена",
    className: "border border-destructive/20 bg-destructive/5 text-destructive",
  },
};
