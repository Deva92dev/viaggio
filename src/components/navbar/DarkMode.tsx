"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon, Monitor } from "lucide-react";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button className="darkmode-button">
        <span className="relative w-5 h-5 flex items-center justify-center">
          <SunIcon className="w-5 h-5 opacity-0" />
        </span>
        <span className="sr-only">Toggle Theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="darkmode-button hover:bg-[hsl(var(--primary))/0.1] transition-colors duration-150 cursor-pointer">
          <span className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
            <SunIcon
              className="absolute w-5 h-5 text-[hsl(var(--primary))] transition-all duration-150 ease-out"
              style={{
                transform:
                  theme === "dark"
                    ? "rotate(-90deg) scale(0)"
                    : "rotate(0deg) scale(1)",
                opacity: theme === "dark" ? 0 : 1,
              }}
            />
            <MoonIcon
              className="absolute w-5 h-5 text-[hsl(var(--accent))] transition-all duration-150 ease-out"
              style={{
                transform:
                  theme === "dark"
                    ? "rotate(0deg) scale(1)"
                    : "rotate(90deg) scale(0)",
                opacity: theme === "dark" ? 1 : 0,
              }}
            />
          </span>
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={8}
        alignOffset={0}
        className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-lg min-w-[140px] z-50"
        avoidCollisions={true}
        collisionPadding={8}
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer flex items-center gap-2"
        >
          <SunIcon className="w-4 h-4 text-[hsl(var(--primary))]" />
          <span>Light</span>
          {theme === "light" && (
            <div className="ml-auto w-2 h-2 bg-[hsl(var(--primary))] rounded-full"></div>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer flex items-center gap-2"
        >
          <MoonIcon className="w-4 h-4 text-[hsl(var(--accent))]" />
          <span>Dark</span>
          {theme === "dark" && (
            <div className="ml-auto w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer flex items-center gap-2"
        >
          <Monitor className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          <span>System</span>
          {theme === "system" && (
            <div className="ml-auto w-2 h-2 bg-[hsl(var(--muted-foreground))] rounded-full"></div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DarkMode;
