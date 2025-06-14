import z from "zod";

export const registerAdminSchema = z.object({
  name: z.string().min(1, "Name should be at least 1 character"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export const loginAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export type RegisterAdminSchema = z.infer<typeof registerAdminSchema>;
export type LoginAdminSchema = z.infer<typeof loginAdminSchema>;
