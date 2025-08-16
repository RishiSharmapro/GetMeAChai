import { z } from "zod";

export const signInSchema = z.object({
  name: z.string(),
  email: z.email({ message: "Invalid email address" }),
  password: z.string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
}).strip();