// /app/authentication/register/createUser.ts

"use server";

import { redirect } from "next/navigation";
import { db } from "@/db"; // Adjust the import path if necessary

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Optional: Add input validation here

  try {
    await db.user.create({
      data: { email, password },
    });
    redirect("/"); // Redirect to homepage after successful registration
  } catch (error) {
    console.error("Error creating user:", error);
    // Throw the error to re-render the form with the error message
    throw error;
  }
}
