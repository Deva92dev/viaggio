import LoadingContainer from "@/components/global/LoadingContainer";
import Blog from "@/components/home/Blog";
import Hero from "@/components/home/Hero";
import Popular from "@/components/home/Popular";
import { Suspense } from "react";

// upon navigating down cool animation using framer at every place of the website using inspirations from colorlib, after finishing the project
export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <Popular />
      </Suspense>
      <Blog />
    </>
  );
}
