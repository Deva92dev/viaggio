import Link from "next/link";
import Logo from "../navbar/Logo";
import DarkMode from "./DarkMode";
import DropDown from "./DropDown";
import ScrollShadow from "./ScrollShadow";
import { publicNavLinks } from "@/utils/links";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[hsl(var(--background))] to-[hsl(var(--background))] shadow-sm transition-shadow"
      style={{ contain: "layout style" }}
    >
      <ScrollShadow />
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        {/* Mobile Layout */}
        <div className="flex w-full justify-between items-center lg:hidden">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <DarkMode />
            <DropDown hidePublicNavLinks={false} />
          </div>
        </div>
        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full items-center justify-between rounded-full px-6 py-3 bg-white/70 dark:bg-[hsl(var(--background))]/80 border border-[hsl(var(--border))] backdrop-blur-md">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          {/* Navigation Links */}
          <div className="flex items-center space-x-7">
            {publicNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative font-medium text-[hsl(var(--primary))] dark:text-white px-1 py-2
                           transition-colors duration-300 hover:text-[hsl(var(--accent))]
                           after:content-[''] after:absolute after:left-0 after:-bottom-[2px]
                           after:h-[3px] after:w-0 hover:after:w-full
                           after:bg-[hsl(var(--accent))] after:rounded-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/bookings" className="btn-accent ml-4">
              Book Now
            </Link>
          </div>
          {/* Utilities */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <DarkMode />
            <DropDown hidePublicNavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}
