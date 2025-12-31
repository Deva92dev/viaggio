import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import HeroImage from "@/assets/Hero.webp";

export default function Hero() {
  return (
    <section
      aria-label="Welcome to Viaggio"
      className="relative bg-black overflow-hidden min-h-screen md:h-screen"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-28 pb-16 text-center md:text-right md:ml-auto md:mr-16">
        <p className="text-lg font-normal tracking-widest uppercase text-orange-400">
          Discover the world
        </p>

        <h1 className="mt-4 text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
          Welcome to <br />
          <span className="text-orange-400">Viaggio</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-200 max-w-xl md:ml-auto">
          Enjoy scenic views of natural wonders with unforgettable experiences.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center px-7 py-4 text-base font-bold rounded-full bg-orange-700 text-white hover:bg-orange-800 transition-colors"
          >
            Explore Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center justify-center px-7 py-4 text-base font-medium rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            Find Us
            <Map className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src={HeroImage}
          alt="Hero Image"
          priority
          fill
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
