import type { Metadata } from "next";
import Script from "next/script";
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
import { siteSchema } from "@/utils/schema";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Viaggio – Where Leisure Meets Luxury",
    template: "%s | Viaggio",
  },
  description:
    "Discover breathtaking destinations, luxury hotels, and expertly-guided tours with Viaggio. Leisure meets luxury for unforgettable adventures.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Viaggio – Where Leisure Meets Luxury",
    description:
      "Explore the world in style: curated destinations, premium hotels, and personalized travel experiences by Viaggio.",
    url: "/",
    siteName: "Viaggio",
    images: [
      {
        url: "/opengraph-default.jpg",
        width: 1200,
        height: 630,
        alt: "Viaggio travel banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viaggio – Where Leisure Meets Luxury",
    description:
      "Explore breathtaking destinations and luxury travel experiences with Viaggio.",
    images: ["/opengraph-default.jpg"],
  },
  applicationName: "Viaggio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Global structured data */}
          <Script
            id="site-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c"),
            }}
          />

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
