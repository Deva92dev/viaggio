import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map, ChevronDown } from "lucide-react";
import HeroImage from "@/assets/Hero.webp";

const btnAccentClass = `
    bg-[hsl(14_100%_64%)] text-[hsl(0_0%_0%)] 
    transition-transform duration-200 rounded-[0.5rem] 
    px-5 py-3 min-w-[110px] text-center font-bold
    active:scale-95 select-none touch-manipulation
    md:hover:bg-[hsl(14_100%_64%)/0.9] 
  `;

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden"
      aria-label="Welcome to Viaggio"
    >
      <Image
        src={HeroImage}
        alt="Breathtaking travel destination banner"
        fill
        priority={true}
        sizes="100vw"
        className="object-cover z-0"
        placeholder="empty"
        quality={60}
      />

      <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true" />
      <main className="relative z-10 flex items-center justify-center md:justify-end h-[100dvh] w-full pb-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-xl text-center md:text-right text-white mx-auto md:mr-12 md:ml-auto">
            <header className="space-y-4 md:space-y-6">
              <p className="text-sm md:text-base font-bold">
                <span className="text-orange-500 md:text-[hsl(14_100%_64%)] md:bg-gradient-to-r md:from-[hsl(14_100%_64%)] md:via-[hsl(14_100%_64%)]/80 md:to-[hsl(216_74%_37%)] md:bg-clip-text">
                  Discover the world
                </span>
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-white md:bg-gradient-to-r md:from-white md:to-white/90 md:bg-clip-text md:text-transparent">
                  Welcome to{" "}
                </span>
                <span className="text-orange-500 md:bg-gradient-to-r md:from-[hsl(14_100%_64%)] md:to-[hsl(216_74%_37%)] md:bg-clip-text md:text-transparent">
                  Viaggio
                </span>
              </h1>
              <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8 text-gray-200 font-normal">
                Enjoy scenic views of natural wonders with unforgettable
                experiences.
              </p>
            </header>
            <nav
              className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center md:justify-end mb-6 md:mb-8"
              aria-label="Primary"
            >
              <Link
                href="/destinations"
                className={`inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-full shadow-none border border-white/20 md:shadow-md md:hover:shadow-lg md:transition-[colors,transform,shadow] duration-200 group ${btnAccentClass}`}
              >
                Explore Now
                <ArrowRight
                  size={18}
                  className="ml-2 md:ml-3 transition-transform duration-200 group-active:translate-x-1 md:group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-full border border-white/30 text-white bg-white/10 backdrop-blur-none md:backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 select-none touch-manipulation"
              >
                Find Us
                <Map size={18} className="ml-2 md:ml-3" aria-hidden="true" />
              </Link>
            </nav>

            <aside aria-label="Recent activity">
              <p className="text-xs md:text-base text-white/90">
                <span className="font-bold text-[hsl(14_100%_64%)] md:bg-gradient-to-r md:from-[hsl(14_100%_64%)] md:to-[hsl(216_74%_37%)] md:bg-clip-text md:text-transparent">
                  5,000+
                </span>{" "}
                travelers joined last month
              </p>
            </aside>
          </article>
        </div>
      </main>

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <a
          href="#start"
          aria-label="Scroll down to search"
          className="text-white/70 hover:text-white transition-colors duration-300 md:animate-bounce motion-reduce:animate-none p-2 will-change-transform active:scale-90"
        >
          <ChevronDown size={36} strokeWidth={2.5} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
