import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Map, Compass } from "lucide-react";
import MotionSection from "./MotionSection";
import SearchFilterSkeleton from "./SearchFilterSkeleton";

const SearchFilter = dynamic(() => import("./SearchFilter"), {
  loading: () => <SearchFilterSkeleton />,
});

const Hero = () => {
  return (
    <MotionSection
      scrollSpeed={100}
      className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-bg))] to-[hsl(var(--background))] min-h-[500px] md:min-h-[750px]"
      aria-label="Hero"
    >
      {/* Decorative background (desktop only) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block"
        aria-hidden="true"
      >
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-30 motion-safe:animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-25 motion-safe:animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <article className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
          <div className="space-y-3 md:space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-[hsl(var(--accent))] font-semibold motion-safe:animate-fade-in">
              <Compass
                size={20}
                className="md:w-6 md:h-6 motion-safe:animate-spin-slow"
              />
              <span className="text-sm md:text-base">Discover the world</span>
            </div>
            <h1 className="text-2xl font-bold text-white md:text-7xl md:font-black md:tracking-tight md:leading-tight">
              Welcome to{" "}
              <span className="text-[hsl(var(--accent))] md:bg-gradient-to-r md:from-[hsl(var(--primary))] md:to-[hsl(var(--accent))] md:bg-clip-text md:text-transparent">
                Viaggio
              </span>
            </h1>
            <p className="text-sm text-white/80 leading-normal md:text-xl md:text-white/90 md:leading-relaxed">
              Enjoy scenic views of natural wonders with unforgettable
              experiences.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-6">
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center btn-accent px-6 py-3 text-base md:px-12 md:py-5 md:text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-xl group"
            >
              Explore Now
              <ArrowRight
                size={18}
                className="md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300 ml-2 md:ml-3"
              />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 text-base md:px-12 md:py-5 md:text-lg border border-white/30 text-white bg-white/10 backdrop-blur-md rounded-full transition-all duration-300 hover:bg-white/20"
            >
              Find Us
              <Map size={18} className="md:w-6 md:h-6 ml-2 md:ml-3" />
            </Link>
          </div>
          <section className="mt-4 md:mt-6 flex flex-col gap-2">
            <div className="flex -space-x-1 md:-space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] border border-white md:border-2 flex items-center justify-center text-white text-xs font-bold"
                >
                  {i}
                </div>
              ))}
              <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold border border-white md:border-2">
                +
              </div>
            </div>
            <p className="text-xs md:text-sm text-white/90">
              <span className="font-bold text-[hsl(var(--accent))]">
                10,000+
              </span>
              travelers joined last month
            </p>
          </section>
        </article>
        {/* Image block - smaller on mobile */}
        <article className="relative flex justify-center items-center">
          <div className="hidden md:block absolute inset-0 max-w-lg max-h-lg rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-40 motion-safe:animate-pulse" />
          <div className="relative rounded-full overflow-hidden border-2 md:border-4 border-white shadow-lg md:shadow-2xl md:shadow-[hsl(var(--primary))/0.25] motion-safe:animate-float max-w-[250px] md:max-w-lg">
            <Image
              src="/Main.jpg"
              alt="Couple enjoying breathtaking mountain adventure"
              width={600} // Smaller base size
              height={480}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 250px, 600px"
              className="rounded-full object-cover w-full h-auto"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSk..."
            />
          </div>
          {/* Floating icons - desktop only */}
          <div className="absolute top-1/4 -right-6 hidden md:block bg-white p-3 rounded-2xl shadow-xl rotate-12 motion-safe:animate-float-slow">
            <Compass size={24} className="text-[hsl(var(--primary))]" />
          </div>
          <div className="absolute bottom-1/4 -left-6 hidden md:block bg-white p-3 rounded-2xl shadow-xl -rotate-12 motion-safe:animate-float-delay">
            <Map size={24} className="text-[hsl(var(--accent))]" />
          </div>
        </article>
      </div>
      <div className="relative z-20 w-full max-w-4xl px-4 mx-auto mt-6 md:mt-14">
        <SearchFilter />
      </div>
    </MotionSection>
  );
};

export default Hero;
