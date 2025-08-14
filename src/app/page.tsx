import LoadingContainer from "@/components/global/LoadingContainer";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import CallToAction from "@/components/home/CallToAction";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import InstagramGallery from "@/components/home/InstagramGallery";
import Popular from "@/components/home/Popular";
import Testimonials from "@/components/home/Testimonials";
import TrustIndicators from "@/components/home/TrustIndicators";
import { Suspense } from "react";

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
