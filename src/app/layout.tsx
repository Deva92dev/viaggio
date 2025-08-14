import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/global/Footer";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/components/global/QueryProvider";
import ClipDefs from "@/components/global/ClipDefs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viaggio",
  description: "Where Leisure meets Luxury",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClipDefs />
          <QueryProvider>
            <Providers>
              <Navbar />
              {children}
              <Toaster />
              <Footer />
            </Providers>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
