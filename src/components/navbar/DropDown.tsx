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
import { LucideAlignLeft } from "lucide-react";
import UserIcon from "./UserIcon";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { publicNavLinks } from "@/utils/links";
import Link from "next/link";
import SignOutLink from "./SignOutLink";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const profileImage = user.user?.imageUrl || null;

  const closeDropdown = () => setIsOpen(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-4 max-w-[100px]"
          aria-label="User Options"
        >
          <LucideAlignLeft className="w-6 h-6" />
          <UserIcon profileImage={profileImage} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 z-[60] bg-gray-400"
        align="start"
        sideOffset={10}
      >
        <SignedOut>
          <DropdownMenuItem onClick={closeDropdown}>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={closeDropdown}>
            <SignInButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="py-2">
            {publicNavLinks.map((link) => {
              return (
                <Link href={link.href} key={link.label} onClick={closeDropdown}>
                  <DropdownMenuItem className="cursor-pointer">
                    {link.label}
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </div>
        </SignedOut>
        <SignedIn>
          <div className="py-2">
            {publicNavLinks.map((link) => {
              return (
                <Link href={link.href} key={link.label} onClick={closeDropdown}>
                  <DropdownMenuItem className="cursor-pointer">
                    {link.label}
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={closeDropdown}>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
