/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SignInButton, SignOutButton } from "@/components/auth/AuthButtons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  LucideAlignLeft,
  LogIn,
  LogOut,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { navLinks, publicNavLinks } from "@/utils/links";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function DropDown({
  hidePublicNavLinks,
}: {
  hidePublicNavLinks?: boolean;
}) {
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // "Safe" signed in check: Must be loaded AND have a user
  const isSignedIn = isLoaded && !!user;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="User Menu"
          className={cn(
            "w-12 h-12 flex items-center justify-center gap-2 rounded-full transition-all",
            "hover:bg-[hsl(216,74%,37%,0.1)] dark:hover:bg-[hsl(216,74%,50%,0.1)]",
            open &&
              "bg-[hsl(216,74%,37%,0.15)] dark:bg-[hsl(216,74%,50%,0.15)] shadow-sm scale-[1.02]"
          )}
        >
          <LucideAlignLeft className="w-5 h-5 text-[hsl(216,74%,37%)] dark:text-[hsl(216,74%,50%)]" />

          {/* AVATAR LOGIC: Layout Shift Protected */}
          <div className="w-6 h-6 flex items-center justify-center">
            {!isLoaded ? (
              // 1. Loading State: Pulse Skeleton
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : isSignedIn && user?.imageUrl ? (
              // 2. Logged In: Avatar
              <img
                src={user.imageUrl}
                className="w-full h-full rounded-full object-cover border border-white/20"
                alt="User"
              />
            ) : (
              // 3. Guest: Empty/Ghost (Retains spacing)
              <div className="w-full h-full rounded-full bg-transparent" />
            )}
          </div>

          <ChevronDown
            className={cn(
              "w-4 h-4 text-[hsl(216,74%,37%)] dark:text-[hsl(216,74%,50%)] transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={isMobile ? 24 : 32}
        className={cn(
          "w-56 bg-white dark:bg-[hsl(217,32%,20%)] border border-[hsl(214,32%,85%)] dark:border-[hsl(217.2,32.6%,25%)] shadow-xl rounded-xl p-1",
          "animate-in fade-in-0 zoom-in-95",
          "animate-out fade-out-0 zoom-out-95"
        )}
      >
        {/* State 1: Loading... (Rarely seen if Clerk is fast) */}
        {!isLoaded && (
          <div className="p-4 text-center text-xs text-muted-foreground">
            Connecting...
          </div>
        )}

        {/* State 2: Guest (Not Signed In) */}
        {isLoaded && !isSignedIn && (
          <>
            <DropdownMenuItem className="rounded-md focus:bg-[hsl(210,20%,94%)] dark:focus:bg-[hsl(217.2,32.6%,17.5%)]">
              <SignInButton mode="modal">
                <div className="flex items-center gap-2 text-[hsl(216,74%,37%)] dark:text-[hsl(216,74%,50%)] cursor-pointer w-full py-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </div>
              </SignInButton>
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-md focus:bg-[hsl(210,20%,94%)] dark:focus:bg-[hsl(217.2,32.6%,17.5%)]">
              <SignInButton mode="modal">
                <div className="flex items-center gap-2 text-[hsl(216,74%,37%)] dark:text-[hsl(216,74%,50%)] cursor-pointer w-full py-2">
                  <UserPlus className="w-4 h-4" />
                  Register
                </div>
              </SignInButton>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[hsl(214,32%,85%)] dark:bg-[hsl(217.2,32.6%,25%)]" />

            {publicNavLinks.map((link) => (
              <DropdownMenuItem
                key={link.href}
                className="rounded-md focus:bg-[hsl(210,20%,94%)] dark:focus:bg-[hsl(217.2,32.6%,17.5%)]"
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-[hsl(222.2,84%,4.9%)] dark:text-[hsl(210,40%,95%)] w-full py-2"
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {/* State 3: User (Signed In) */}
        {isLoaded && isSignedIn && (
          <>
            <div className="px-2 py-1.5 text-xs text-[hsl(215,16%,44%)] dark:text-[hsl(215,20%,75%)] font-medium">
              {user.fullName || user.firstName}
            </div>
            <DropdownMenuSeparator className="bg-[hsl(214,32%,85%)] dark:bg-[hsl(217.2,32.6%,25%)]" />

            {navLinks.map((link) => {
              if (
                hidePublicNavLinks &&
                publicNavLinks.some((p) => p.href === link.href)
              ) {
                return null;
              }

              return (
                <DropdownMenuItem
                  key={link.href}
                  className="rounded-md focus:bg-[hsl(210,20%,94%)] dark:focus:bg-[hsl(217.2,32.6%,17.5%)]"
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-[hsl(222.2,84%,4.9%)] dark:text-[hsl(210,40%,95%)] w-full py-2"
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator className="bg-[hsl(214,32%,85%)] dark:bg-[hsl(217.2,32.6%,25%)]" />

            <DropdownMenuItem className="rounded-md p-0 focus:bg-[hsl(210,20%,94%)] dark:focus:bg-[hsl(217.2,32.6%,17.5%)]">
              <SignOutButton redirectUrl={pathname || "/"}>
                <div className="flex items-center gap-2 text-[hsl(0,84.2%,60.2%)] dark:text-[hsl(0,62.8%,30.6%)] w-full py-2 px-2 cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  Logout
                </div>
              </SignOutButton>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
