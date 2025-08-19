import Image from "next/image";
import SectionTitle from "../global/SectionTitle";
import Link from "next/link";
import { Button } from "../ui/button";
import { MapPin, ArrowRight, Camera } from "lucide-react";
import { getPopularDestinations } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import MotionSection from "./MotionSection";

const Popular = async () => {
  const destinations = await getPopularDestinations();

  return (
    <MotionSection
      scrollSpeed={50}
      className="relative w-full py-16 md:py-20 bg-gradient-to-b from-[hsl(var(--features-bg))] to-[hsl(var(--background))]"
    >
      <figure className="popular-decorative-bg" aria-hidden="true">
        <div className="popular-decorative-blob-primary" />
        <div className="popular-decorative-blob-accent" />
      </figure>

      <header className="relative z-10 mb-12 md:mb-16">
        <SectionTitle
          text="Popular Destinations"
          description="Discover breathtaking places where adventure meets luxury"
        />
      </header>

      <main className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 md:px-6 lg:px-12 max-w-7xl mx-auto">
        {destinations.map((destination, index) => (
          <article
            key={destination.id}
            className="group popular-destination-card" // ADD GROUP CLASS HERE
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <figure className="popular-image-container">
              <Image
                src={destination.imageUrl}
                alt={`${destination.name} - Premium travel destination`}
                width={1000}
                height={800}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-500 md:duration-700 group-hover:scale-105 md:group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={75}
              />

              <div className="popular-image-overlay" />

              <div className="popular-camera-icon">
                <Camera size={14} className="md:w-4 md:h-4 text-white" />
              </div>

              <address className="popular-location-badge not-italic">
                <MapPin
                  size={12}
                  className="md:w-[14px] md:h-[14px] text-white"
                />
                <span className="text-white text-xs md:text-sm font-semibold">
                  {destination.location}
                </span>
              </address>

              <aside className="popular-price-tag">
                <span className="text-white text-xs md:text-sm font-bold">
                  {formatCurrency(destination.price)}
                </span>
              </aside>
            </figure>

            <section className="popular-card-content">
              <h3 className="popular-card-title">{destination.name}</h3>

              <nav>
                <Link
                  href={`/destinations/${destination.id}`}
                  className="block"
                >
                  <button className="popular-explore-button group">
                    <span>Explore Adventure</span>
                    <ArrowRight
                      size={16}
                      className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </Link>
              </nav>
            </section>
          </article>
        ))}
      </main>

      <footer className="relative z-10 flex items-center justify-center mt-12 md:mt-16">
        <Link href="/destinations" className="group">
          <Button className="btn-accent cursor-pointer px-8 py-3 md:px-10 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
            <span className="flex items-center gap-2 md:gap-3">
              View All Destinations
              <ArrowRight
                size={18}
                className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </Button>
        </Link>
      </footer>
    </MotionSection>
  );
};

export default Popular;
