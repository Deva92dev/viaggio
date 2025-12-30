import dynamic from "next/dynamic";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { publicNavLinks } from "@/utils/links";
import MobileMenu from "./MobileNav";

const LoadingToggle = () => (
  <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800" />
);

const DarkMode = dynamic(() => import("./DarkMode"), {
  loading: () => <LoadingToggle />,
});

export default function PublicNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] md:transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        {/* Mobile View  */}
        <div className="flex w-full justify-between items-center lg:hidden px-6 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg rounded-full relative">
          <Logo />

          <div className="flex items-center gap-3 justify-end">
            <DarkMode />

            {/* Quick Sign In Icon */}
            <Link href="/sign-in">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full w-9 h-9"
              >
                <LogIn className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                <span className="sr-only">Sign In</span>
              </Button>
            </Link>

            <MobileMenu />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex w-full items-center justify-between rounded-full px-8 py-3 bg-white/80 dark:bg-black/80 border border-white/20 dark:border-white/10 backdrop-blur-0 md:backdrop-blur-md shadow-lg">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="flex flex-1 items-center justify-center space-x-8 px-4">
            {publicNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-500 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 min-w-[120px]">
            <DarkMode />
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="font-semibold text-sm hover:text-orange-600 cursor-pointer"
              >
                Launch App
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-full bg-orange-600 text-white hover:bg-orange-700 text-sm px-5 cursor-pointer shadow-sm hover:shadow-md transition-all">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
