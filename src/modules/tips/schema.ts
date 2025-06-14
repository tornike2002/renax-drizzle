import { z } from "zod";

export const createTipsSchema = z.object({
  title: z.string().min(1, "Title should be at least 1 character"),
  tip: z.string().min(1, "Tip should be at least 1 character"),
});

export const updateTipsSchema = createTipsSchema.partial();

export type CreateTipsType = z.infer<typeof createTipsSchema>;
export type UpdateTipsType = z.infer<typeof updateTipsSchema>;
