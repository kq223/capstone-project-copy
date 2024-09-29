// components/LogoutButton.tsx

"use client";

import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/new-york/ui/buttonVariants";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to homepage after logout
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8"
      )}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
