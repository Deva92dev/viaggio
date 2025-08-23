import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Compass,
  Globe,
  Star,
  ArrowDown,
  Users,
  Bed,
  Wifi,
} from "lucide-react";

interface DestinationImageProps {
  pageType: "destinations" | "hotels";
}

const DestinationImage = ({ pageType }: DestinationImageProps) => {
  const content = {
    destinations: {
      imageSrc: "/Zermat.webp",
      altText:
        "Discover amazing travel destinations - Zermatt mountain adventure",
      badgeText: "Your Adventure Awaits",
      titleParts: ["Discover", "Dream Destinations"],
      description:
        "From breathtaking mountain peaks to pristine beaches, explore destinations that will create unforgettable memories",
      stats: [
        { label: "Destinations", value: "500+" },
        { label: "Rating", value: "4.9" },
      ],
      scrollHint: "Browse 500+ Destinations Below",
      breadcrumb: "Destinations",
      floatingIcons: [
        {
          Icon: Compass,
          position: "top-1/4 right-4 sm:right-8 lg:right-12 xl:right-24",
          rotation: "rotate-12",
          color: "text-[hsl(var(--primary))]",
          animation: "animate-spin-slow",
        },
        {
          Icon: MapPin,
          position: "bottom-1/4 left-4 sm:left-8 lg:left-12 xl:left-24",
          rotation: "-rotate-12",
          color: "text-[hsl(var(--accent))]",
          animation: "",
        },
        {
          Icon: Star,
          position: "top-1/3 left-1/4",
          rotation: "",
          color: "text-[hsl(var(--accent))] fill-[hsl(var(--accent))]",
          animation: "",
        },
        {
          Icon: Users,
          position: "bottom-1/3 right-1/4",
          rotation: "",
          color: "text-[hsl(var(--primary))]",
          animation: "",
        },
      ],
    },
    hotels: {
      imageSrc: "/Hotels.webp",
      altText:
        "Experience luxury accommodations with premium amenities and stunning views",
      badgeText: "Your Perfect Stay Awaits",
      titleParts: ["Experience", "Luxury Hotels"],
      description:
        "Stay in the finest accommodations with breathtaking views, exceptional service, and world-class amenities that define luxury",
      stats: [
        { label: "Hotels", value: "300+" },
        { label: "Rating", value: "4.8" },
      ],
      scrollHint: "Browse Premium Hotels Below",
      breadcrumb: "Hotels",
      floatingIcons: [
        {
          Icon: Bed,
          position: "top-1/4 right-4 sm:right-8 lg:right-12 xl:right-24",
          rotation: "rotate-12",
          color: "text-[hsl(var(--primary))]",
          animation: "",
        },
        {
          Icon: Wifi,
          position: "bottom-1/4 left-4 sm:left-8 lg:left-12 xl:left-24",
          rotation: "-rotate-12",
          color: "text-[hsl(var(--accent))]",
          animation: "",
        },
        {
          Icon: Star,
          position: "top-1/3 left-1/4",
          rotation: "",
          color: "text-[hsl(var(--accent))] fill-[hsl(var(--accent))]",
          animation: "",
        },
        {
          Icon: Users,
          position: "bottom-1/3 right-1/4",
          rotation: "",
          color: "text-[hsl(var(--primary))]",
          animation: "",
        },
      ],
    },
  };

  const {
    imageSrc,
    altText,
    badgeText,
    titleParts,
    description,
    stats,
    scrollHint,
    breadcrumb,
    floatingIcons,
  } = content[pageType];

  return (
    <section className="relative w-screen min-h-screen bg-gradient-to-br from-[hsl(var(--hero-bg))] to-[hsl(var(--background))] overflow-hidden">
      {/* Background Image - Full screen coverage */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority
          className="object-cover w-full h-full"
          sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Enhanced overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.3] via-transparent to-[hsl(var(--accent))/0.2]" />
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-10" aria-hidden="true">
        <div className="absolute top-4 sm:top-10 lg:top-20 left-4 sm:left-10 lg:left-20 w-32 sm:w-64 lg:w-96 h-32 sm:h-64 lg:h-96 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-20 motion-safe:animate-pulse-custom" />
        <div
          className="absolute bottom-4 sm:bottom-10 lg:bottom-20 right-4 sm:right-10 lg:right-20 w-40 sm:w-72 lg:w-80 h-40 sm:h-72 lg:h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-15 motion-safe:animate-pulse-custom"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main Content - Full mobile optimization */}
      <div className="relative z-20 w-full h-full min-h-screen flex flex-col justify-center items-center px-3 sm:px-6 md:px-12 py-4 sm:py-8">
        {/* Top Navigation - Mobile optimized */}
        <div className="absolute top-3 sm:top-6 md:top-8 left-3 sm:left-6 md:left-12 animate-fade-in">
          <nav className="flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm">
            <Link
              href="/"
              className="hover:text-[hsl(var(--accent))] transition-colors duration-300"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-[hsl(var(--accent))] font-medium">
              {breadcrumb}
            </span>
          </nav>
        </div>

        {/* Top Stats - Mobile responsive */}
        <div
          className="absolute top-3 sm:top-6 md:top-8 right-3 sm:right-6 md:right-12 flex gap-1 sm:gap-2 lg:gap-4 motion-safe:animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/20 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-center"
            >
              <div className="text-white font-bold text-xs sm:text-sm lg:text-lg">
                {value}
              </div>
              <div className="text-white/80 text-xs">{label}</div>
            </div>
          ))}
        </div>

        {/* Hero Content - Enhanced mobile spacing */}
        <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-full px-2 sm:px-4">
          {/* Badge - Mobile optimized */}
          <div
            className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20 motion-safe:animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Globe
              size={16}
              className="sm:w-5 sm:h-5 text-[hsl(var(--accent))] motion-safe:animate-spin-slow"
            />
            <span className="text-white font-semibold text-xs sm:text-sm lg:text-base">
              {badgeText}
            </span>
          </div>

          {/* Main Heading - Better mobile scaling */}
          <div
            className="space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tight">
              <span className="block text-white drop-shadow-lg">
                {titleParts[0]}
              </span>
              <span className="block bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                {titleParts[1]}
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md px-2 sm:px-4">
              {description}
            </p>
          </div>
        </div>

        {/* Bottom Scroll Hint - Mobile positioning */}
        <div
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3 text-white/80">
            <div className="bg-white/10 backdrop-blur-xl rounded-full px-3 sm:px-4 py-1 sm:py-2 border border-white/20">
              <span className="text-xs sm:text-sm font-medium">
                {scrollHint}
              </span>
            </div>
            <ArrowDown
              size={16}
              className="sm:w-5 sm:h-5 animate-bounce text-[hsl(var(--accent))] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Floating Icons - Hidden on small screens */}
      {floatingIcons.map(
        ({ Icon, position, rotation, color, animation }, index) => (
          <div
            key={index}
            className={`absolute ${position} bg-white/10 backdrop-blur-xl p-2 sm:p-3 lg:p-4 rounded-xl shadow-2xl ${rotation} motion-safe:animate-spin-slow z-30 hidden lg:block`}
            style={{ animationDelay: `${1 + index * 0.2}s` }}
          >
            <Icon
              size={20}
              className={`sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${color} ${animation}`}
            />
          </div>
        )
      )}
    </section>
  );
};

export default DestinationImage;
