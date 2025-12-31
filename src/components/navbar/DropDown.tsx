/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
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
  User2Icon,
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
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          <LucideAlignLeft className="text-[hsl(216,74%,37%)] dark:text-[hsl(216,74%,50%)] h-10 w-10 flex items-center justify-center" />

          {/* AVATAR LOGIC: Layout Shift Protected */}
          <div className="w-6 h-6 flex items-center justify-center">
            {!isLoaded ? (
              // Loading State: Pulse Skeleton
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : isSignedIn && user?.imageUrl ? (
              // Logged In: Avatar
              <img
                src={user.imageUrl}
                className="w-full h-full rounded-full object-cover border border-white/20"
                alt="User"
              />
            ) : (
              // 3. Guest: Empty/Ghost (Retains spacing)
              <User2Icon className="w-full h-full rounded-full bg-transparent" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={isMobile ? 24 : 32}
        className={cn(
          "w-56 bg-white dark:bg-[hsl(217,32%,20%)] border border-[hsl(214,32%,85%)] dark:border-[hsl(217.2,32.6%,25%)] shadow-xl rounded-xl p-1",
          "md:animate-in md:fade-in-0 md:zoom-in-95",
          "md:animate-out md:fade-out-0 md:zoom-out-95"
        )}
      >
        {/* State 1: Loading... */}
        {!isLoaded && (
          <div className="p-4 text-center text-xs text-muted-foreground">
            Connecting...
          </div>
        )}

        {/* State 2: Guest Not Signed In */}
        {isLoaded && !isSignedIn && (
          <>
            <DropdownMenuItem
              asChild
              className="rounded-md focus:bg-[hsl(210,20%,94%)] dark:focus:bg-[hsl(217.2,32.6%,17.5%)]"
            >
              <Link href="/sign-in" className="w-full cursor-pointer">
                <div className="flex items-center gap-2 text-[hsl(216,74%,37%)] dark:text-[hsl(216,74%,50%)] w-full py-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </div>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="rounded-md focus:bg-[hsl(210,20%,94%)] dark:focus:bg-[hsl(217.2,32.6%,17.5%)]"
            >
              <Link href="/sign-up" className="w-full cursor-pointer">
                <div className="flex items-center gap-2 text-[hsl(216,74%,37%)] dark:text-[hsl(216,74%,50%)] w-full py-2">
                  <UserPlus className="w-4 h-4" />
                  Register
                </div>
              </Link>
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

            <DropdownMenuItem
              onClick={() => signOut({ redirectUrl: pathname || "/" })}
              className="rounded-md p-0 focus:bg-[hsl(210,20%,94%)] dark:focus:bg-[hsl(217.2,32.6%,17.5%)] cursor-pointer"
            >
              <div className="flex items-center gap-2 text-[hsl(0,84.2%,60.2%)] dark:text-[hsl(0,62.8%,30.6%)] w-full py-2 px-2">
                <LogOut className="w-4 h-4" />
                Logout
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
