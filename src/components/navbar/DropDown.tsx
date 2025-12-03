/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
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

type DropDownProps = {
  hidePublicNavLinks?: boolean;
};

export default function DropDown({ hidePublicNavLinks }: DropDownProps) {
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showAvatar = isMounted && isLoaded && user;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="User Menu"
          className={cn(
            "w-12 h-12 flex items-center justify-center gap-2 rounded-full transition-all",
            "hover:bg-[hsl(var(--primary))/0.1]",
            open && "bg-[hsl(var(--primary))/0.15] shadow-sm scale-[1.02]"
          )}
        >
          <LucideAlignLeft className="w-5 h-5 text-[hsl(var(--primary))]" />
          {showAvatar && (
            <img
              src={user.imageUrl}
              className="w-6 h-6 rounded-full object-cover border border-white/20"
              alt="User Avatar"
            />
          )}
          {/* Animated Chevron */}
          <ChevronDown
            className={cn(
              "w-4 h-4 text-[hsl(var(--primary))] transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className={cn(
          "w-56 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-xl rounded-xl p-1",
          "animate-in fade-in-0 zoom-in-95",
          "animate-out fade-out-0 zoom-out-95"
        )}
      >
        <SignedOut>
          <DropdownMenuItem className="rounded-md">
            <SignInButton mode="modal">
              <div className="flex items-center gap-2 text-[hsl(var(--primary))] cursor-pointer w-full py-2">
                <LogIn className="w-4 h-4" />
                Login
              </div>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuItem className="rounded-md">
            <SignInButton mode="modal">
              <div className="flex items-center gap-2 text-[hsl(var(--primary))] cursor-pointer w-full py-2">
                <UserPlus className="w-4 h-4" />
                Register
              </div>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {publicNavLinks.map((link) => (
            <DropdownMenuItem key={link.href} className="rounded-md">
              <Link
                href={link.href}
                className="flex items-center gap-2 text-[hsl(var(--foreground))] w-full py-2"
              >
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </SignedOut>
        <SignedIn>
          {navLinks.map((link) => {
            if (
              hidePublicNavLinks &&
              publicNavLinks.some((p) => p.href === link.href)
            ) {
              return null;
            }

            return (
              <DropdownMenuItem key={link.href} className="rounded-md">
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-[hsl(var(--foreground))] w-full py-2"
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem className="rounded-md p-0">
            <SignOutButton redirectUrl="/">
              <div className="flex items-center gap-2 text-[hsl(var(--destructive))] w-full py-2 px-2 cursor-pointer">
                <LogOut className="w-4 h-4" />
                Logout
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
