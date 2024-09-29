// LoginForm.tsx
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { login } from "../login/login"; // Import the server action

// Zod schema for login validation
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | undefined>();

  // Initialize the form with zod schema validation
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: LoginFormInputs) => {
    setError(undefined); // Clear previous errors

    try {
      const res = await login(values);

      if (res?.error) {
        // Display error message if authentication fails
        setError(res.error);
      }
      // No need to handle redirection here as it's handled by the server action
    } catch (err: unknown) {
      // Handle unexpected errors
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...form.register("email")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email?.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...form.register("password")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.password?.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded"
      >
        Login
      </button>
    </form>
  );
}
