// app/layout.tsx

import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import { auth } from "@/lib/auth"; // Ensure the correct path
import { Metadata } from "next";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the Home Page.",
};

// Make RootLayout an async component to fetch session data
export default async function RootLayout({ children }: LayoutProps) {
  const session = await auth(); // Fetch the user session
  console.log("Session in RootLayout:", session); // Server-side logging

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        {/* Conditionally render Sidebar if the user is authenticated */}
        {session && <Sidebar />}

        {/* Main Content Area */}
        <main className={`flex-1 p-8 ${session ? "ml-60" : ""}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
