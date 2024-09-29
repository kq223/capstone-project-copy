// /app/authentication/schemas/registerSchema.ts

import * as z from "zod";

// Define the registration schema
export const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Points to the confirmPassword field
  });

// Infer TypeScript type from the schema
export type RegisterFormData = z.infer<typeof registerSchema>;
