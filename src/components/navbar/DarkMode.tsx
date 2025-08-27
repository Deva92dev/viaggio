"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useResponsive } from "@/hooks/useResponsive";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useResponsive();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Button styles - consistent with DropDown
  const buttonStyles = {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    minHeight: "48px",
    maxWidth: "48px",
    maxHeight: "48px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    margin: "0",
    flexShrink: 0,
    flexGrow: 0,
    position: "relative" as const,
    overflow: "hidden",
    contain: "none" as const,
  };

  // Icon positioning styles
  const iconContainerStyles = {
    position: "relative" as const,
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const getIconStyles = (isVisible: boolean, rotation: string) => ({
    position: "absolute" as const,
    width: "20px",
    height: "20px",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) ${rotation}`,
    opacity: isVisible ? 1 : 0,
    transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  });

  if (!mounted) {
    return (
      <Button className="opacity-50" style={buttonStyles}>
        <span style={iconContainerStyles}>
          <SunIcon className="w-5 h-5 opacity-0" />
        </span>
        <span className="sr-only">Toggle Theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="hover:bg-[hsl(var(--primary))/0.1] transition-colors duration-150 cursor-pointer"
          style={buttonStyles}
        >
          <span style={iconContainerStyles}>
            <SunIcon
              className="text-[hsl(var(--primary))]"
              style={getIconStyles(
                theme !== "dark",
                theme === "dark"
                  ? "rotate(-90deg) scale(0)"
                  : "rotate(0deg) scale(1)"
              )}
            />
            <MoonIcon
              className="text-[hsl(var(--accent))]"
              style={getIconStyles(
                theme === "dark",
                theme === "dark"
                  ? "rotate(0deg) scale(1)"
                  : "rotate(90deg) scale(0)"
              )}
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
        style={{
          position: "fixed",
          top: `${isMobile ? "16px" : "24px"}`,
          right: "36px",
          left: "auto",
          maxWidth: "calc(100vw - 88px)",
          transform: "none",
        }}
        avoidCollisions={false}
        collisionPadding={0}
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer flex items-center gap-2 transition-colors duration-150"
        >
          <SunIcon className="w-4 h-4 text-[hsl(var(--primary))]" />
          <span>Light</span>
          {theme === "light" && (
            <div className="ml-auto w-2 h-2 bg-[hsl(var(--primary))] rounded-full"></div>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer flex items-center gap-2 transition-colors duration-150"
        >
          <MoonIcon className="w-4 h-4 text-[hsl(var(--accent))]" />
          <span>Dark</span>
          {theme === "dark" && (
            <div className="ml-auto w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer flex items-center gap-2 transition-colors duration-150"
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
