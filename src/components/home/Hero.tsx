import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map, ChevronDown } from "lucide-react";

const btnAccentClass = `
    bg-[hsl(14_100%_64%)] text-[hsl(0_0%_0%)]
         hover:bg-[hsl(14_100%_64%)/0.9] 
         transition-colors duration-200 rounded-[0.5rem]
         px-5 py-3 min-w-[110px] text-center font-semibold;
  `;

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden"
      aria-label="Welcome to Viaggio"
    >
      <Image
        src="/Hero.webp"
        alt="Breathtaking travel destination banner"
        fill
        priority
        sizes="100vw"
        className="object-cover z-0"
        placeholder="blur"
        blurDataURL="data:image/octet-stream;base64,UklGRjgAAABXRUJQVlA4ICwAAADwAQCdASoJAAYABUB8JQBOgCIGzttRogAA/ievKXVO+jsrJC6h0X4P5heAAA=="
        quality={75}
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true" />
      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-end h-[100dvh] w-full pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-xl text-right text-white mr-4 md:mr-12">
            <header className="space-y-3 md:space-y-6">
              <p className="text-sm md:text-base font-semibold">
                <span className="bg-gradient-to-r from-[hsl(14_100%_64%)] via-[hsl(14_100%_64%)]/80 to-[hsl(216_74%_37%)] bg-clip-text text-transparent">
                  Discover the world
                </span>
              </p>
              <h1 className="text-2xl md:text-7xl font-bold md:font-black leading-tight">
                <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  Welcome to{" "}
                </span>
                <span className="bg-gradient-to-r from-[hsl(14_100%_64%)] via-[hsl(14_100%_64%)] to-[hsl(216_74%_37%)] bg-clip-text text-transparent">
                  Viaggio
                </span>
              </h1>
              <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8 text-white/90">
                Enjoy scenic views of natural wonders with unforgettable
                experiences.
              </p>
            </header>
            <nav
              className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-end mb-6 md:mb-8"
              aria-label="Primary"
            >
              <Link
                href="/destinations"
                className={`inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-full shadow-md hover:shadow-lg transition-[colors,transform,shadow] duration-200 group ${btnAccentClass}`}
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
            <aside aria-label="Recent activity">
              <p className="text-xs md:text-base text-white/90">
                <span className="font-bold bg-gradient-to-r from-[hsl(14_100%_64%)] to-[hsl(216_74%_37%)] bg-clip-text text-transparent">
                  10,000+
                </span>{" "}
                travelers joined last month
              </p>
            </aside>
          </article>
        </div>
      </main>
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <a
          href="#start"
          aria-label="Scroll down to search"
          className="text-white/70 hover:text-white transition-colors duration-300 animate-bounce motion-reduce:animate-none p-2"
        >
          <ChevronDown size={36} strokeWidth={2.5} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
