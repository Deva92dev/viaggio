"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LucideAlignLeft, LogIn, UserPlus, LogOut } from "lucide-react";
import UserIcon from "./UserIcon";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { navLinks, publicNavLinks } from "@/utils/links";
import Link from "next/link";
import SignOutLink from "./SignOutLink";

type DropDownProps = {
  hidePublicNavLinks?: boolean;
};

const DropDown = ({ hidePublicNavLinks }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const profileImage = user.user?.imageUrl || null;

  const closeDropdown = () => setIsOpen(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="dropdown-trigger hover:bg-[hsl(var(--primary))/0.1] transition-colors duration-150 cursor-pointer"
          aria-label="User Options"
        >
          <LucideAlignLeft className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
          <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <UserIcon profileImage={profileImage} />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={8}
        alignOffset={0}
        className="w-52 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg rounded-lg z-50"
        avoidCollisions={true}
        collisionPadding={8}
      >
        <SignedOut>
          <DropdownMenuItem
            onClick={closeDropdown}
            className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer"
          >
            <SignInButton mode="modal">
              <button className="w-full text-left text-[hsl(var(--primary))] font-medium flex items-center gap-2 cursor-pointer">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={closeDropdown}
            className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer"
          >
            <SignInButton mode="modal">
              <button className="w-full text-left text-[hsl(var(--primary))] font-medium flex items-center gap-2 cursor-pointer">
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {publicNavLinks.map((link) => (
            <DropdownMenuItem
              key={link.href}
              className="cursor-pointer hover:bg-[hsl(var(--accent))/0.1] rounded-md"
              onClick={closeDropdown}
            >
              <Link
                href={link.href}
                className="w-full flex items-center gap-2 text-[hsl(var(--foreground))]"
              >
                <span>{link.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </SignedOut>

        <SignedIn>
          {navLinks.map((link) => {
            if (
              hidePublicNavLinks &&
              publicNavLinks.some((pl) => pl.href === link.href)
            ) {
              return null;
            }
            return (
              <DropdownMenuItem
                key={link.href}
                className="cursor-pointer hover:bg-[hsl(var(--accent))/0.1] rounded-md"
                onClick={closeDropdown}
              >
                <Link
                  href={link.href}
                  className="w-full flex items-center gap-2 text-[hsl(var(--foreground))]"
                >
                  <span>{link.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={closeDropdown}
            className="hover:bg-[hsl(var(--destructive))/0.1] cursor-pointer"
          >
            <div className="w-full flex items-center gap-2 text-[hsl(var(--destructive))]">
              <LogOut className="w-4 h-4" />
              <SignOutLink />
            </div>
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
