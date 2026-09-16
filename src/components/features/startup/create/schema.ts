import z from "zod";
import type { Startup, StartupFormValues } from "../types";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, "Название должно быть не менее 3 символов")
    .max(100, "Название слишком длинное"),
  description: z
    .string()
    .min(20, "Описание должно быть не менее 20 символов")
    .max(1000, "Описание слишком длинное"),
  short_description: z
    .string()
    .min(20, "Краткое описание должно быть не менее 20 символов")
    .max(255, "Краткое описание слишком длинное"),
  target_audience: z.string().min(3, "Укажите целевую аудиторию").max(200),
  solution: z
    .string()
    .min(10, "Опишите решение (минимум 10 символов)")
    .max(500),
  problem: z
    .string()
    .min(10, "Опишите проблему (минимум 10 символов)")
    .max(500),
  stage_id: z.number().int().min(1, "Выберите стадию развития"),
  files: z.file().nullable(),
  category_ids: z
    .array(z.number().int().min(1))
    .nonempty("Выберите хотя бы одну категорию"),
});

export const defaultValues: StartupFormValues = {
  name: "",
  description: "",
  short_description: "",
  category_ids: [],
  target_audience: "",
  problem: "",
  solution: "",
  stage_id: 0,
  files: null,
};

/**
 * Maps a saved startup onto the form shape. `files` starts empty because the
 * stored logo is a URL, not an upload: leaving it null tells the API to keep
 * the current one.
 */
export const startupToFormValues = (startup: Startup): StartupFormValues => ({
  name: startup.name ?? "",
  description: startup.description ?? "",
  short_description: startup.short_description ?? "",
  // An id that is not a positive number (e.g. the old "ID" key from the API)
  // would become NaN in the multi-select and silently block form submission.
  category_ids: (startup.categories ?? [])
    .map((category) => Number(category.id))
    .filter((id) => Number.isInteger(id) && id > 0),
  target_audience: startup.target_audience ?? "",
  problem: startup.problem ?? "",
  solution: startup.solution ?? "",
  stage_id: startup.stage?.id ?? 0,
  files: null,
});
