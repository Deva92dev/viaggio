// import dynamicImport from "next/dynamic";
// import type { Metadata } from "next";
// import { Suspense } from "react";
// import { PopularSkeleton } from "@/components/global/PopularSkeleton";
// import Hero from "@/components/home/Hero";
// import TestimonialsSkeleton from "@/components/home/TestimonialSkeleton";
// import SearchFilterSkeleton from "@/components/home/SearchFilterSkeleton";

// const Popular = dynamicImport(() => import("@/components/home/Popular"));
// const Features = dynamicImport(() => import("@/components/home/Features"));
// const InstagramGallery = dynamicImport(
//   () => import("@/components/home/InstagramGallery")
// );
// const CallToAction = dynamicImport(
//   () => import("@/components/home/CallToAction")
// );
// const TrustIndicators = dynamicImport(
//   () => import("@/components/home/TrustIndicators")
// );

// const SearchFilter = dynamicImport(
//   () => import("@/components/home/SearchFilter"),
//   {
//     loading: () => <SearchFilterSkeleton />,
//   }
// );
// const Testimonials = dynamicImport(
//   () => import("@/components/home/Testimonials"),
//   {
//     loading: () => <TestimonialsSkeleton />,
//   }
// );

// export default function Home() {
//   return (
//     <main>
//       <Hero />
//       <section
//         className="bg-white relative z-10 py-12 md:py-16 min-h-[450px] md:min-h-[350px] flex flex-col justify-center"
//         id="start"
//       >
//         <div className="container mx-auto px-4">
//           <SearchFilter />
//         </div>
//       </section>
//       <div className="[content-visibility:auto] [contain-intrinsic-size:1px_1000px]">
//         <Suspense fallback={<PopularSkeleton />}>
//           <Popular />
//         </Suspense>
//         <Features />
//         <Testimonials />
//         <InstagramGallery />
//         <CallToAction />
//         <TrustIndicators />
//       </div>
//     </main>
//   );
// }
import dynamicImport from "next/dynamic";
import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import TestimonialsSkeleton from "@/components/home/TestimonialSkeleton";
import SearchFilterSkeleton from "@/components/home/SearchFilterSkeleton";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import LazyHydrate from "@/components/global/LazyHydrate";
import { Metadata } from "next";

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

export const revalidate = 3600;

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
  }
);
const Testimonials = dynamicImport(
  () => import("@/components/home/Testimonials"),
  {
    loading: () => <TestimonialsSkeleton />,
  }
);

export default function Home() {
  return (
    <main>
      <Hero />
      <section
        className="bg-white relative z-10 py-12 md:py-16 min-h-[450px] md:min-h-[350px] flex flex-col justify-center"
        id="start"
      >
        <div className="container mx-auto px-4">
          <SearchFilter />
        </div>
      </section>

      <LazyHydrate>
        <div className="[content-visibility:auto] [contain-intrinsic-size:1px_1000px]">
          <Suspense fallback={<PopularSkeleton />}>
            <Popular />
          </Suspense>

          <Suspense fallback={<div className="h-96" />}>
            <Features />
          </Suspense>

          <Suspense fallback={<TestimonialsSkeleton />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<div className="h-64" />}>
            <InstagramGallery />
          </Suspense>

          <CallToAction />
          <TrustIndicators />
        </div>
      </LazyHydrate>
    </main>
  );
}
