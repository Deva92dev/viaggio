import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map, ChevronDown } from "lucide-react";
import HeroImage from "@/assets/Hero.webp";

const Hero = () => {
  return (
    <section
      className="relative w-full h-[100dvh] overflow-hidden bg-black"
      aria-label="Welcome to Viaggio"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={HeroImage}
          alt="Breathtaking travel destination banner"
          fill
          priority={true}
          quality={60}
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover opacity-60"
        />
        {/* CSS Gradient is faster than Image Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
      </div>

      <main className="relative z-10 flex items-center justify-center md:justify-end h-full w-full pb-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-xl text-center md:text-right mx-auto md:mr-0 md:ml-auto">
            <header className="space-y-6 mt-16 min-h-[200px] flex flex-col justify-center">
              <p className="text-base font-bold text-orange-400 tracking-wider uppercase md:drop-shadow-sm">
                Discover the world
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] md:drop-shadow-lg">
                Welcome to <br />
                <span className="text-orange-400 md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-orange-400 md:to-amber-600">
                  Viaggio
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-100 font-medium max-w-lg ml-auto md:drop-shadow-md">
                Enjoy scenic views of natural wonders with unforgettable
                experiences.
              </p>
            </header>

            <nav className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end mt-8">
              <Link
                href="/destinations"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-orange-700 text-white md:shadow-lg hover:bg-orange-800 transition-all active:scale-95"
              >
                Explore Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full border border-white/30 bg-neutral-900/60 md:bg-white/10 md:backdrop-blur-sm text-white hover:bg-white/20 transition-all"
              >
                Find Us
                <Map className="ml-2 w-5 h-5" />
              </Link>
            </nav>
          </article>
        </div>
      </main>

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <a
          href="#start"
          aria-label="Scroll down to search"
          className="hidden md:block text-white/80 hover:text-white transition-colors duration-300 animate-bounce p-2"
        >
          <ChevronDown size={36} strokeWidth={2.5} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
