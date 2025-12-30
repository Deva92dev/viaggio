"use client";

import Link from "next/link";
import { publicNavLinks } from "@/utils/links";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PublicMobileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2">
        {publicNavLinks.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link
              href={link.href}
              className="w-full cursor-pointer font-medium py-2 px-2"
            >
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          <Link
            href="/sign-up"
            className="w-full cursor-pointer font-bold text-orange-600 py-2 px-2"
          >
            Sign Up
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PublicMobileMenu;
