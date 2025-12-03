import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import ClipDefs from "@/components/global/ClipDefs";
import { siteSchema } from "@/utils/schema";
import ClientProviders from "./ClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "700"],
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Viaggio – Where Leisure Meets Luxury",
    template: "%s | Viaggio",
  },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="description"
          content="Explore the world in style: curated destinations, premium hotels, and personalized travel experiences by Viaggio."
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${geistMono.variable} antialiased`}
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
