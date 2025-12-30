"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LenisProvider } from "./LenisProvider";
import { MotionProvider } from "./motionProvider";
import ClerkClientProvider from "./ClerkClientProvider";
import { ThemeProvider } from "./theme-provider";

const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false }
);

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LenisProvider>
          <MotionProvider>
            <ClerkClientProvider>
              {children}
              <Toaster />
            </ClerkClientProvider>
          </MotionProvider>
        </LenisProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
