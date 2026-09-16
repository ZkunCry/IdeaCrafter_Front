import type { User } from "../../auth/types";

export type Stage = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  slug?: string;
  count?: number;
};

export type Role = {
  id: number;
  name: string;
};

export type Vacancy = {
  id: number;
  startup_id: number;
  role_id: number;
  role: Role;
  role_name?: string;
  description: string;
  is_open: boolean;
  /** Set once an application is accepted: the member holding the seat. */
  user_id: number | null;
  user: User | null;
};

export type StartupFile = {
  ID?: number;
  id?: number;
  startup_id: number;
  file_path: string;
  file_name: string;
  mime_type: string;
  CreatedAt?: string;
  created_at?: string;
};

export interface Startup {
  id: number;
  name: string;
  short_description: string;
  description: string;
  target_audience: string;
  problem: string;
  solution: string;
  stage: Stage;
  categories?: Category[];
  files?: StartupFile[];
  vacancies: Vacancy[];
  creator: User;
  created_at: string;
  logo_url: string;
}

export type CategoryResponse = {
  items: Category[];
  total_count: number;
};

export type StartupResponse = {
  items: Startup[];
  total_count: number;
};

/** Shape produced by the create/edit form before it becomes multipart data. */
export type StartupFormValues = {
  name: string;
  short_description: string;
  description: string;
  target_audience: string;
  problem: string;
  solution: string;
  stage_id: number;
  files: File | null;
  category_ids: number[];
};

export type CreateStartup = StartupFormValues;

export type ApplicationStatus = "pending" | "accepted" | "rejected";

/** Present on the applicant's own history (`/application/my`) only. */
export type ApplicationStartup = {
  id: number;
  name: string;
  short_description: string;
  logo_url: string;
  deleted: boolean;
};

export type Application = {
  id: number;
  vacancy_id: number;
  vacancy: Vacancy;
  startup_id: number;
  startup?: ApplicationStartup;
  user_id: number;
  user: User;
  message: string;
  status: ApplicationStatus;
  created_at: string;
};

export type ApplicationListResponse = {
  items: Application[];
};

export type CreateApplicationInput = {
  vacancy_id: number;
  message: string;
};

export type UpdateApplicationStatusInput = {
  id: number;
  status: Exclude<ApplicationStatus, "pending">;
};

export type CreateVacancyInput = {
  startup_id: number;
  role_id: number;
  description: string;
};

export type UpdateVacancyInput = {
  id: number;
  description?: string;
  is_open?: boolean;
};

export type FavoriteListResponse = {
  items: Startup[];
};

export type FavoriteIdsResponse = {
  items: number[];
};

export type FavoriteToggleResponse = {
  startup_id: number;
  is_favorite: boolean;
  count: number;
};
