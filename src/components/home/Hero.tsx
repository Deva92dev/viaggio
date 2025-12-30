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
          priority
          sizes="100vw"
          className="object-cover opacity-60"
          placeholder="blur"
          quality={75}
        />
        {/* Gradient for text readability at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      <main className="relative z-10 flex items-center justify-center md:justify-end h-full w-full pb-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-xl text-center md:text-right mx-auto md:mr-0 md:ml-auto">
            {/* Added 'min-h' to prevent layout shift before text hydrates */}
            <header className="space-y-6 mt-16 min-h-[200px] flex flex-col justify-center">
              <p className="text-base font-bold text-orange-500 tracking-wider uppercase">
                Discover the world
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1]">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
                  Viaggio
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 font-light max-w-lg ml-auto">
                Enjoy scenic views of natural wonders with unforgettable
                experiences.
              </p>
            </header>

            <nav className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end mt-8">
              <Link
                href="/destinations"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all active:scale-95"
              >
                Explore Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
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
          className="text-white/70 hover:text-white md:transition-colors duration-300 md:animate-bounce motion-reduce:animate-none p-2"
        >
          <ChevronDown size={36} strokeWidth={2.5} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
