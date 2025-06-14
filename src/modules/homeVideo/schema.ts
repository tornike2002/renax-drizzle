import { z } from "zod";

export const createHomeVideoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  carModel: z.string().min(1, "Car model is required"),
  monthlyPrice: z.string().min(1, "Monthly price is required"),
  carType: z.enum(["premium", "economy", "luxury"]),
  videoUrl: z.string().min(1, "Video URL is required"),
});
export const updateHomeVideoSchema = createHomeVideoSchema.partial();

export type CreateHomeVideoType = z.infer<typeof createHomeVideoSchema>;
export type UpdateHomeVideoType = z.infer<typeof updateHomeVideoSchema>;
