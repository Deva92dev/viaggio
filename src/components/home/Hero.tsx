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
      className="relative overflow-hidden min-h-[700px] lg:min-h-[800px] bg-gradient-to-b from-blue-50 to-white"
    >
      {/* Decorative background elements */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-60 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-200 blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-blue-300 blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center justify-center p-8 md:p-16 gap-y-12 gap-x-12 max-w-7xl mx-auto">
        <article className="flex flex-col gap-8 justify-center items-center md:items-start text-center md:text-left w-full">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-500 font-medium animate-fade-in">
              <Compass size={20} className="animate-spin-slow" />
              <span>Discover the world</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Welcome to
              <span className="relative ml-3 text-blue-500 inline-block">
                Viaggio
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-400 transform scale-x-0 animate-scale-in"></span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed">
              Enjoy the scenic view of natural wonders around the world with
              unforgettable experiences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start w-full md:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-7 text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-300/30 group"
            >
              <Link href="/destinations" className="flex items-center gap-2">
                Explore Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-md border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 px-10 py-7 text-lg rounded-full transition-all duration-300"
            >
              <Link href="/about" className="flex items-center gap-2">
                Learn More
                <Map size={20} className="ml-1" />
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                >
                  {i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold border-2 border-white">
                +
              </div>
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">10,000+</span> travelers joined
              last month
            </p>
          </div>
        </article>

        <article className="w-full flex justify-center items-center relative">
          {/* Animated background effect */}
          <div className="absolute w-full h-full max-w-lg max-h-lg rounded-full animate-pulse z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-100 rounded-full blur-3xl opacity-60"></div>
          </div>

          {/* Main image with floating effect */}
          <div className="w-full max-w-lg h-auto relative z-10 animate-float">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full blur opacity-50"></div>
            <div className="relative rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-blue-400/20">
              <Image
                src="/Woman.webp"
                alt="Woman ready for adventure"
                width={1000}
                height={800}
                priority
                className="rounded-full object-cover w-full h-auto"
              />
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-1/4 -right-4 bg-white p-4 rounded-2xl shadow-lg rotate-12 animate-float-slow z-20">
            <Compass size={28} className="text-blue-500" />
          </div>
          <div className="absolute bottom-1/4 -left-4 bg-white p-4 rounded-2xl shadow-lg -rotate-12 animate-float-delay z-20">
            <Map size={28} className="text-blue-500" />
          </div>
        </article>
      </div>

      <div className="relative z-20 w-full max-w-4xl px-4 mx-auto mt-8 md:mt-12">
        <SearchFilter />
      </div>
    </MotionSection>
  );
};

export default Hero;
