import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingContainer from "@/components/global/LoadingContainer";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import CallToAction from "@/components/home/CallToAction";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import InstagramGallery from "@/components/home/InstagramGallery";
import Popular from "@/components/home/Popular";
import Testimonials from "@/components/home/Testimonials";
import TrustIndicators from "@/components/home/TrustIndicators";

// check on npm run build, then npm run start, check extensively, all google measures then deploy on vercel
// for dynamic pages, if they have more than 200 items, fetch 100 dynamic items at build time using generateStaticParams and rest are build time

export const metadata: Metadata = {
  title: "Viagio - Discover Amazing Travel Destinations & Guided Tours",
  description:
    "Explore breathtaking destinations worldwide with Viagio. Expert-guided tours, personalized travel experiences, and unforgettable adventures await. Book your dream trip today.",
  keywords: [
    "travel",
    "tours",
    "destinations",
    "guided tours",
    "travel booking",
    "vacation",
    "adventure travel",
    "Viagio",
  ],
  alternates: {
    canonical: "/", // adds <link rel="canonical" href="https://your-domain.com/">
  },
  openGraph: {
    title: "Viagio - Discover Amazing Travel Destinations & Guided Tours",
    description:
      "Explore breathtaking destinations worldwide with Viagio. Expert-guided tours, personalized travel experiences, and unforgettable adventures await.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viagio - Discover Amazing Travel Destinations & Guided Tours",
    description:
      "Explore breathtaking destinations worldwide with Viagio. Expert-guided tours, personalized travel experiences, and unforgettable adventures await.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<PopularSkeleton />}>
        <Popular />
      </Suspense>
      <Features />
      <Suspense fallback={<LoadingContainer />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<LoadingContainer />}>
        <InstagramGallery />
      </Suspense>
      <CallToAction />
      <TrustIndicators />
    </>
  );
}
