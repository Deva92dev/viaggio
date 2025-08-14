import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Map, Compass } from "lucide-react";
import MotionSection from "./MotionSection";
import SearchFilter from "./SearchFilter";

const Hero = () => {
  return (
    <MotionSection
      scrollSpeed={100}
      className="relative overflow-hidden min-h-[700px] lg:min-h-[800px] bg-gradient-to-br from-[hsl(var(--hero-bg))] to-[hsl(var(--background))]"
      aria-label="Hero section with introduction and call to action"
    >
      {/* Simplified background - only essential elements */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-30 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-25 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-center justify-center">
        {/* Text Content - Simplified for faster render */}
        <article className="flex flex-col gap-6 justify-center items-center md:items-start text-center md:text-left w-full">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-[hsl(var(--accent))] font-semibold animate-fade-in">
              <Compass size={24} className="animate-spin-slow" />
              <span>Discover the world</span>
            </div>

            {/* Simplified heading - faster to render */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
              Welcome to
              <span className="relative ml-3 inline-block text-[hsl(var(--accent))]">
                Viaggio
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[hsl(var(--accent))] scale-x-0 animate-scale-in origin-left rounded-full" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Enjoy the scenic view of natural wonders around the world with
              unforgettable experiences.
            </p>
          </div>

          {/* Simplified buttons - faster hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start w-full md:w-auto">
            <Button
              asChild
              size="lg"
              className="btn-accent px-12 py-5 text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-xl group"
            >
              <Link href="/destinations" className="flex items-center gap-3">
                Explore Now
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 px-12 py-5 rounded-full"
            >
              <Link href="/about" className="flex items-center gap-3">
                Learn More
                <Map size={22} className="ml-1" />
              </Link>
            </Button>
          </div>

          {/* Simplified social proof */}
          <section className="mt-6 flex flex-col gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] border-2 border-white flex items-center justify-center text-white text-sm font-bold"
                >
                  {i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold border-2 border-white">
                +
              </div>
            </div>
            <p className="text-sm text-white/90">
              <span className="font-bold text-[hsl(var(--accent))]">
                10,000+
              </span>{" "}
              travelers joined last month
            </p>
          </section>
        </article>

        {/* Image Section - LCP Optimized */}
        <article className="w-full flex justify-center items-center relative">
          {/* Single background glow - minimal impact */}
          <div className="absolute inset-0 max-w-lg max-h-lg rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-40 animate-pulse z-0" />

          {/* Main image - LCP optimized */}
          <div className="relative rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-[hsl(var(--primary))/0.25] animate-float max-w-lg">
            <Image
              src="/Main.jpg"
              alt="Couple enjoying breathtaking mountain adventure"
              width={1000}
              height={800}
              priority // Critical for LCP
              className="rounded-full object-cover w-full h-auto"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes="(max-width: 768px) 90vw, 600px"
              fetchPriority="high" // Additional LCP hint
            />
          </div>

          {/* Minimal floating icons - lazy loaded via CSS */}
          <div className="absolute top-1/4 -right-6 bg-white p-4 rounded-2xl shadow-xl rotate-12 animate-float-slow z-20">
            <Compass size={28} className="text-[hsl(var(--primary))]" />
          </div>
          <div className="absolute bottom-1/4 -left-6 bg-white p-4 rounded-2xl shadow-xl -rotate-12 animate-float-delay z-20">
            <Map size={28} className="text-[hsl(var(--accent))]" />
          </div>
        </article>
      </div>

      {/* Search Filter */}
      <div className="relative z-20 w-full max-w-4xl px-4 mx-auto mt-12 md:mt-16">
        <SearchFilter />
      </div>
    </MotionSection>
  );
};

export default Hero;
