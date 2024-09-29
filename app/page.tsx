// app/page.tsx

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/new-york/ui/buttonVariants";
import { RegisterForm } from "./authentication/components/RegisterForm"; // Client component
import { auth } from "@/lib/auth"; // Server-side auth function
import LogoutButton from "@/components/LogoutButton"; // Import the LogoutButton component

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the Home Page.",
};

// Make the component asynchronous to fetch session data
export default async function HomePage() {
  const session = await auth(); // Fetch the user session
  console.log("Session in HomePage:", session); // Debugging log

  return (
    <>
      {/* Mobile View Image */}
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Home Page Light Mode"
          className="block"
        />
      </div>

      {/* Desktop View */}
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Login Link or Logout Button */}
        {!session ? (
          <Link
            href="/authentication/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Login
          </Link>
        ) : (
          <LogoutButton />
        )}

        {/* Branding and Conditional Testimonial */}
        {session && (
          <div className="relative hidden h-full flex-col bg-gray-100 p-10 text-gray-800 lg:flex shadow-lg rounded-lg">
            <div className="absolute inset-0 bg-gray-200 opacity-75" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              {/* Logo SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Acme Inc
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;Welcome to our platform, where innovation meets
                  excellence.&rdquo;
                </p>
                <footer className="text-sm">Your Company Tagline</footer>
              </blockquote>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {!session && (
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              {/* Welcome Header */}
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-gray-600">
                  Enter your email and password below to create your account
                </p>
              </div>

              {/* Registration Form */}
              <RegisterForm />

              {/* Terms and Privacy Policy */}
              <p className="px-8 text-center text-sm text-gray-600">
                By registering, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
