import { publicNavLinks } from "@/utils/links";
import Logo from "../navbar/Logo";
import Link from "next/link";
import DarkMode from "./DarkMode";
import DropDown from "./DropDown";
import { Suspense } from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-[#eef4ff] to-[#e0ebff] dark:bg-[#0f2942] z-10 relative shadow-sm">
      {/* Decorative line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4682b440] to-transparent"></div>
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        {/* Mobile devices */}
        <div className="flex flex-row w-full justify-between items-center md:hidden">
          <Logo />
          <Suspense fallback={<div className="h-10 w-10"></div>}>
            <DarkMode />
          </Suspense>
          <Suspense fallback={<div className="h-10 w-10"></div>}>
            <DropDown />
          </Suspense>
        </div>
        {/* Big Screen */}
        <div className="hidden md:flex w-full items-center justify-between rounded-full px-6 py-3 bg-white/60 dark:bg-[#1a365d]/40 border border-[#4682b420] dark:border-[#87ceeb20]">
          <Logo />

          <div className="flex items-center space-x-8">
            {publicNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#1a365d] dark:text-white hover:text-[#4682b4] dark:hover:text-[#87ceeb] font-medium transition-colors relative pb-1 border-b-2 border-transparent hover:border-[#4682b4] dark:hover:border-[#87ceeb]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/booking"
              className="px-5 py-2 bg-gradient-to-r from-[#4682b4] to-[#87ceeb] text-white rounded-full"
            >
              Book Now
            </Link>
            <Suspense fallback={<div className="h-10 w-10"></div>}>
              <DarkMode />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
