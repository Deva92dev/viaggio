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
      className="relative w-full min-h-screen py-20 bg-gradient-to-b from-[hsl(var(--features-bg))] to-[hsl(var(--background))]"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s", transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Enhanced Section Title */}
      <div className="relative z-10 mb-16">
        <SectionTitle
          text="Popular Destinations"
          description="Discover breathtaking places where adventure meets luxury"
        />
      </div>

      {/* Enhanced Destination Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 md:px-12 max-w-7xl mx-auto">
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className="group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-md border border-white/20 card-hover-lift hover-glow animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Enhanced Image Section with zoom effect */}
            <div className="relative h-64 xl:h-80 image-zoom-hover">
              <Image
                src={destination.imageUrl}
                alt={`${destination.name} - Premium travel destination`}
                width={1000}
                height={800}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />

              {/* Enhanced overlay with smooth transitions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Floating decorative elements with staggered animations */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 group-hover:backdrop-blur-lg">
                <Camera size={16} className="text-white" />
              </div>

              {/* Enhanced badges with micro-animations */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-2 border border-white/30 transition-all duration-300 group-hover:bg-white/30 group-hover:border-white/50 group-hover:scale-105">
                <MapPin size={14} className="text-white" />
                <span className="text-white text-sm font-semibold">
                  {destination.location}
                </span>
              </div>

              {/* Price tag with bounce effect */}
              <div className="absolute bottom-4 right-6 xl:right-8 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 rounded-full px-4 py-2 shadow-lg transition-all duration-300 group-hover:shadow-[hsl(var(--accent))]/50 group-hover:scale-105 group-hover:-translate-y-1">
                <span className="text-white text-sm font-bold">
                  {formatCurrency(destination.price)}
                </span>
              </div>
            </div>

            {/* Enhanced content section */}
            <div className="p-6 space-y-4">
              {/* Title with subtle hover animation */}
              <h3 className="text-xl font-bold text-[hsl(var(--foreground))] transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[hsl(var(--primary))] group-hover:to-[hsl(var(--accent))] group-hover:bg-clip-text group-hover:text-transparent">
                {destination.name}
              </h3>

              {/* Enhanced CTA button with multiple hover states */}
              <Link href={`/destinations/${destination.id}`} className="block">
                <button className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))/0.9] hover:from-[hsl(var(--accent))] hover:to-[hsl(var(--accent))/0.9] text-white border-0 rounded-xl py-3 px-4 transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-lg hover:shadow-[hsl(var(--accent))]/40 hover:scale-[1.02] font-semibold relative overflow-hidden">
                  {/* Enhanced shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

                  <span className="relative z-10 transition-all duration-300 group-hover/btn:scale-105">
                    Explore Adventure
                  </span>
                  <ArrowRight
                    size={18}
                    className="relative z-10 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110"
                  />
                </button>
              </Link>
            </div>

            {/* Enhanced floating corner accent */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-full blur-lg opacity-20 transition-all duration-500 group-hover:opacity-50 group-hover:scale-125" />
          </div>
        ))}
      </div>

      {/* Enhanced View More Button */}
      <div className="relative z-10 flex items-center justify-center mt-16">
        <Link href="/destinations" className="group">
          <Button className="btn-accent cursor-pointer px-10 py-4 text-lg shadow-2xl shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 relative overflow-hidden">
            {/* Button background animation */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="flex items-center gap-3 relative z-10 font-semibold">
              View All Destinations
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </Button>
        </Link>
      </div>

      {/* Enhanced floating decorative elements */}
      <div className="absolute top-1/4 right-8 w-20 h-20 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-20 animate-float" />
      <div className="absolute bottom-1/4 left-8 w-24 h-24 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-15 animate-float-slow" />
    </MotionSection>
  );
};

export default Popular;
