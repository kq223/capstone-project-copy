// /app/authentication/schemas/loginSchema.ts

import * as z from "zod";

// Define the login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// Infer TypeScript type from the schema
export type LoginFormData = z.infer<typeof loginSchema>;
