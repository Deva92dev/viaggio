import dynamicImport from "next/dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import Hero from "@/components/home/Hero";
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

// CRITICAL FIX: Lazy load these "Below the Fold" components
// This drastically reduces the initial JS bundle size for mobile.
const Popular = dynamicImport(() => import("@/components/home/Popular"));
const Features = dynamicImport(() => import("@/components/home/Features"));
const InstagramGallery = dynamicImport(
  () => import("@/components/home/InstagramGallery")
);
const CallToAction = dynamicImport(
  () => import("@/components/home/CallToAction")
);
const TrustIndicators = dynamicImport(
  () => import("@/components/home/TrustIndicators")
);

const SearchFilter = dynamicImport(
  () => import("@/components/home/SearchFilter"),
  {
    loading: () => <SearchFilterSkeleton />,
    ssr: true,
  }
);
const Testimonials = dynamicImport(
  () => import("@/components/home/Testimonials"),
  {
    loading: () => <TestimonialsSkeleton />,
  }
);

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <section className="bg-white relative z-10 py-12 md:py-16" id="start">
        <div className="container mx-auto px-4">
          <SearchFilter />
        </div>
      </section>
      <Suspense fallback={<PopularSkeleton />}>
        <Popular />
      </Suspense>
      {/* These will now load lazily as the user scrolls */}
      <Features />
      <Testimonials />
      <InstagramGallery />
      <CallToAction />
      <TrustIndicators />
    </>
  );
}
