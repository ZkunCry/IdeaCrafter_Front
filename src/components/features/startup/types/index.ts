import type { User } from "../../auth/types";

export type Stage = {
  ID: number;
  name: string;
};
export type Category = {
  id: number;
  name: string;
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
  description: string;
  is_open_: boolean;
  user_id: number;
  user: User;
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
  vacancies: Vacancy[];
}

export type CreateStartup = {
  name: string;
  shortDescription: string;
  description: string;
  targetAudience: string;
  problem: string;
  solution: string;
  stage_id: number;
};
