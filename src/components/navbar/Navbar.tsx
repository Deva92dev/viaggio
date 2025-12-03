import Link from "next/link";
import Logo from "./Logo";
import { publicNavLinks } from "@/utils/links";
import dynamic from "next/dynamic";

const DarkMode = dynamic(() => import("./DarkMode"));
const DropDown = dynamic(() => import("./DropDown"));

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[hsl(var(--background))] to-[hsl(var(--background))] shadow-sm">
      {/* CSS-only scroll shadow */}
      <div className="pointer-events-none sticky top-0 h-[1px] shadow-[0_1px_4px_0_rgba(0,0,0,0.03)]" />
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        {/* Mobile Layout */}
        <div className="flex w-full justify-between items-center lg:hidden">
          <Logo />
          <div className="flex items-center gap-3">
            <DarkMode />
            <DropDown hidePublicNavLinks={false} />
          </div>
        </div>
        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full items-center justify-between rounded-full px-6 py-3 bg-white/70 dark:bg-[hsl(var(--background))]/80 border border-[hsl(var(--border))] backdrop-blur-md">
          <Logo />

          <div className="flex items-center space-x-7">
            {publicNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-background dark:text-foreground px-1 py-2 hover:text-[hsl(var(--accent))] border-b-2 border-transparent 
                hover:border-[hsl(var(--accent))] transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/destinations" className="btn-accent ml-4">
              Book Now
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <DarkMode />
            <DropDown hidePublicNavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}
