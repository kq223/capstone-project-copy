"use server";

import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

// Define the shape of the login data
interface LoginData {
  email: string;
  password: string;
}

// Define the return type
interface LoginResponse {
  error?: string;
}

export async function login(data: LoginData): Promise<void | LoginResponse> {
  try {
    await signIn("credentials", {
      redirectTo: "/",
      email: data.email,
      password: data.password,
    });
    // No return needed; signIn likely redirects
  } catch (error) {
    if (isRedirectError(error)) {
      console.error("Standard Redirect Error:", error);
      throw error;
    }

    return { error: "Invalid credentials" };
  }
}
