import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Camera } from "lucide-react";
import SectionTitle from "../global/SectionTitle";
import { Button } from "../ui/button";
import { getPopularDestinations } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";

const MotionSection = dynamic(() => import("./MotionSection"), {
  loading: () => <div className="opacity-0" />,
});

const Popular = async () => {
  const destinations = await getPopularDestinations();

  return (
    <MotionSection
      parallax={{
        speed: 75,
        direction: "up",
        range: [0, 1],
        offset: ["start end", "end start"],
      }}
      animation={{
        type: "fade",
        duration: 1.0,
        delay: 0.2,
        ease: "easeOut",
      }}
      mobile={{
        disableParallax: true,
        disableAnimations: false,
        simpleAnimation: "fade",
        breakPoint: 768,
        reducedMotion: true,
      }}
      performance={{
        willChange: true,
        gpuAcceleration: true,
        reducedMotionFallback: true,
      }}
      triggerOnce={true}
      threshold={0.1}
      overflow={false}
      className="relative w-full py-16 md:py-20 bg-gradient-to-b from-[hsl(var(--features-bg))] to-[hsl(var(--background))]"
    >
      <MotionSection
        parallax={{
          speed: 20,
          direction: "down",
        }}
        animation={{
          type: "scale",
          duration: 2.0,
          delay: 0,
        }}
        mobile={{
          disableParallax: true,
          simpleAnimation: "none",
        }}
        triggerOnce={true}
        threshold={0.05}
        className="absolute inset-0 overflow-hidden"
      >
        <figure
          className="absolute inset-0 overflow-hidden z-0 hidden lg:block"
          aria-hidden="true"
        >
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-20 animate-pulse-custom" />
          <div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-15 animate-pulse-custom"
            style={{ animationDelay: "2s" }}
          />
        </figure>
      </MotionSection>

      <header className="relative z-10 mb-12 md:mb-16">
        <SectionTitle
          text="Popular Destinations"
          description="Discover breathtaking places where adventure meets luxury"
        />
      </header>

      <main className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 md:px-6 lg:px-12 max-w-7xl mx-auto">
        {destinations.map((destination, index) => (
          <MotionSection
            key={destination.id}
            className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl transition-all duration-500 bg-white/90 md:backdrop-blur-md border border-white/20 hover:-translate-y-1 md:hover:-translate-y-2 animate-fade-in"
            animation={{
              type: "slide",
              direction: "up",
              duration: 0.6,
              delay: 0.5 + index * 0.1,
              ease: "easeOut",
            }}
            mobile={{
              simpleAnimation: "fade",
              disableAnimations: false,
            }}
            triggerOnce={true}
            threshold={[0.3, 0.5]}
          >
            <figure className="relative h-48 md:h-64 xl:h-80">
              <Image
                src={destination.imageUrl}
                alt={`${destination.name} - Premium travel destination`}
                width={1000}
                height={800}
                loading="lazy"
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 42vw, (max-width: 1024px) 28vw, 22vw"
                className="object-cover w-full h-full transition-transform duration-500 md:duration-700 group-hover:scale-105 md:group-hover:scale-110"
                quality={60}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 md:duration-500 group-hover:opacity-80" />
              <div className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-white/20 md:backdrop-blur-md rounded-full items-center justify-center duration-300 hidden sm:flex group-hover:scale-110 transition-transform">
                <Camera size={14} className="md:w-4 md:h-4 text-white" />
              </div>

              <address className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/20 md:backdrop-blur-xl rounded-full px-3 py-1 md:px-4 md:py-2 flex items-center gap-2 border border-white/30 duration-300 group-hover:scale-105 transition-transform not-italic">
                <MapPin
                  size={12}
                  className="md:w-[14px] md:h-[14px] text-white"
                />
                <span className="text-white text-xs md:text-sm font-semibold">
                  {destination.location}
                </span>
              </address>

              <aside className="absolute bottom-3 right-3 md:bottom-4 md:right-6 xl:right-8 bg-[hsl(var(--accent))] md:bg-gradient-to-r md:from-[hsl(var(--accent))] md:to-orange-500 rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md md:shadow-lg duration-300 group-hover:scale-105 transition-transform">
                <span className="text-white text-xs md:text-sm font-bold">
                  {formatCurrency(destination.price)}
                </span>
              </aside>
            </figure>

            <section className="p-4 md:p-6 space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-[hsl(var(--foreground))] transition-colors duration-300 group-hover:text-[hsl(var(--primary))]">
                {destination.name}
              </h3>
              <nav>
                <Link
                  href={`/destinations/${destination.id}`}
                  className="block"
                >
                  <button className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-lg md:rounded-xl py-2 md:py-3 px-4 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 shadow-md hover:shadow-lg font-semibold text-sm md:text-base group cursor-pointer">
                    <span>Explore Adventure</span>
                    <ArrowRight
                      size={16}
                      className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </Link>
              </nav>
            </section>
          </MotionSection>
        ))}
      </main>

      <footer className="relative z-10 flex items-center justify-center mt-12 md:mt-16">
        <Link href="/destinations" className="group">
          <MotionSection
            animation={{
              type: "slide",
              direction: "up",
              duration: 0.8,
              delay: 1.2,
            }}
            mobile={{
              simpleAnimation: "fade",
            }}
            triggerOnce={true}
            threshold={0.4}
          >
            <Button className="btn-accent cursor-pointer px-8 py-3 md:px-10 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
              <span className="flex items-center gap-2 md:gap-3">
                View All Destinations
                <ArrowRight
                  size={18}
                  className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300"
                />
              </span>
            </Button>
          </MotionSection>
        </Link>
      </footer>
    </MotionSection>
  );
};

export default Popular;
