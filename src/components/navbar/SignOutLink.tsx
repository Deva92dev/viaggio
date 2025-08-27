"use client";

import { SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const SignOutLink = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    toast("Logging out....");
  };

  return (
    <SignOutButton redirectUrl={pathname}>
      <button
        className="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium text-gray-700 dark:text-gray-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </SignOutButton>
  );
};

export default SignOutLink;
