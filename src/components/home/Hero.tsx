import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative min-h-[500px] md:min-h-[750px] overflow-hidden"
      aria-label="Welcome to Viaggio"
    >
      {/* Full-width banner image */}
      <Image
        src="/Hero.webp"
        alt="Breathtaking travel destination banner"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSk..."
        quality={85}
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Right-aligned content on all devices */}
      <main className="relative z-10 flex items-center justify-end min-h-[500px] md:min-h-[750px]">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-xl text-right text-white mr-4 md:mr-12">
            {/* Header */}
            <header className="space-y-3 md:space-y-6">
              {/* Tagline (brand accent, subtle) */}
              <p className="text-sm md:text-base font-semibold">
                <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--accent))]/80 to-[hsl(var(--primary))] bg-clip-text text-transparent">
                  Discover the world
                </span>
              </p>

              {/* H1: brand gradient + readable base */}
              <h1 className="text-2xl md:text-7xl font-bold md:font-black leading-tight">
                <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  Welcome to{" "}
                </span>
                <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
                  Viaggio
                </span>
              </h1>

              {/* Description: solid text for readability (keep premium tone) */}
              <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8 text-white/90">
                Enjoy scenic views of natural wonders with unforgettable
                experiences.
              </p>
            </header>

            {/* CTAs */}
            <nav
              className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-end mb-6 md:mb-8"
              aria-label="Primary"
            >
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center btn-accent px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-full shadow-md hover:shadow-lg transition-[colors,transform,shadow] duration-200 group"
              >
                Explore Now
                <ArrowRight
                  size={18}
                  className="ml-2 md:ml-3 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-full border border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
              >
                Find Us
                <Map size={18} className="ml-2 md:ml-3" aria-hidden="true" />
              </Link>
            </nav>

            {/* Trust indicator */}
            <aside aria-label="Recent activity">
              <p className="text-xs md:text-base text-white/90">
                <span className="font-bold bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
                  10,000+
                </span>{" "}
                travelers joined last month
              </p>
            </aside>
          </article>
        </div>
      </main>
    </section>
  );
};

export default Hero;
