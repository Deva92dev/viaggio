"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/global/Footer";
import { LenisProvider } from "./LenisProvider";
import { MotionProvider } from "./motionProvider";
import ClerkClientProvider from "./ClerkClientProvider";

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
      <LenisProvider>
        <MotionProvider>
          <ClerkClientProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </ClerkClientProvider>
        </MotionProvider>
      </LenisProvider>
    </QueryClientProvider>
  );
}
