import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import CallToAction from "@/components/home/CallToAction";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import InstagramGallery from "@/components/home/InstagramGallery";
import Popular from "@/components/home/Popular";
import TrustIndicators from "@/components/home/TrustIndicators";
import TestimonialsSkeleton from "@/components/home/TestimonialSkeleton";
import SearchFilterSkeleton from "@/components/home/SearchFilterSkeleton";

export const metadata: Metadata = {
  title: "Viagio - Discover Amazing Travel Destinations & Guided Tours",
  description:
    "Discover breathtaking destinations, luxury hotels, and expertly-guided tours with Viaggio. Leisure meets luxury for unforgettable adventures.",
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

const SearchFilter = dynamic(() => import("@/components/home/SearchFilter"), {
  loading: () => <SearchFilterSkeleton />,
});
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => <TestimonialsSkeleton />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <SearchFilter />
        </div>
      </section>
      <Suspense fallback={<PopularSkeleton />}>
        <Popular />
      </Suspense>
      <Features />
      <Testimonials />
      <InstagramGallery />
      <CallToAction />
      <TrustIndicators />
    </>
  );
}
