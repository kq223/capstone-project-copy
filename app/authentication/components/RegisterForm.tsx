// /app/authentication/components/RegisterForm.tsx

"use client";

import { createUser } from "../register/createUser"; // Adjust the path if necessary
import { buttonVariants } from "@/registry/new-york/ui/buttonVariants";

export function RegisterForm({ error }: { error?: Error }) {
  return (
    <>
      {error && (
        <div className="text-red-500">
          {error.message || "An error occurred during registration."}
        </div>
      )}
      <form action={createUser} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className={buttonVariants({
            variant: "default",
            className: "w-full",
          })}
        >
          Register
        </button>
      </form>
    </>
  );
}
