import z from "zod";
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
    .min(20, "Краткое описание должно быть не менее 10 символов")
    .max(1000, "Краткое описание слишком длинное"),
  target_audience: z.string().min(3, "Укажите целевую аудиторию").max(200),
  solution: z
    .string()
    .min(10, "Опишите решение (минимум 10 символов)")
    .max(500),
  problem: z
    .string()
    .min(10, "Опишите проблему (минимум 10 символов)")
    .max(500),
  stage_id: z
    .number({ invalid_type_error: "Выберите стадию развития" })
    .int()
    .min(1, "Выберите стадию развития"),
  files: z.file().nullable(),
  // category_ids: z
  //   .array(z.number().int().min(1))
  //   .nonempty("Выберите хотя бы одну категорию"),
});

export const defaultValues = {
  name: "",
  description: "",
  short_description: "",
  // category_ids: [],
  target_audience: "",
  problem: "",
  solution: "",
  stage_id: 0,
  files: null,
};
