import Image from "next/image";
import { ArrowRight, MapPin, Star, Users } from "lucide-react";
import FavoriteToggleWrapper from "../favorites/FavoriteToggleWrapper";
import ShareButton from "./ShareButton";
import { formatCurrency } from "@/utils/format";
import { Button } from "../ui/button";
import { Duration, JourneyPath } from "./TourAnimation";
import BreadcrumbNav from "../global/BreadCrumbNav";

type DestinationHeroProps = {
  id: string;
  duration: string;
  category: string;
  price: number;
  imageUrl: string;
  name: string;
  location: string;
  description: string;
  country: string;
};

const DestinationHero = ({
  category,
  duration,
  id,
  imageUrl,
  location,
  name,
  price,
  description,
  country,
}: DestinationHeroProps) => {
  const travelerCount = 345;

  const breadcrumbItems = [
    { label: "Destinations", href: "/destinations" },
    { label: name, isCurrentPage: true },
  ];

  return (
    <div className="relative w-full h-[70vh] min-h-[600px] mb-16 overflow-hidden">
      <Image
        src={imageUrl}
        alt={name}
        fill
        priority
        quality={75}
        sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
        className="object-cover absolute inset-0 w-full h-full"
      />
      {/* gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.4] via-transparent to-[hsl(var(--accent))/0.2] z-10" />
      <JourneyPath />
      <div className="absolute top-0 left-0 z-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <BreadcrumbNav
          items={breadcrumbItems}
          className="motion-safe:animate-fade-in max-w-fit"
        />
      </div>
      {/*  Hero Content */}
      <div className="absolute inset-0 flex items-center z-20 pt-16 sm:pt-20 md:pt-24 lg:pt-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl w-full">
            <div className="hidden md:flex items-center flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 w-full relative z-40 mt-4 sm:mt-6 md:mt-8 animate-fade-in">
              <div className="inline-block opacity-100">
                <Duration duration={duration} />
              </div>
              <span className="bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold shadow-lg">
                {category}
              </span>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/30">
                <Star
                  size={12}
                  className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] sm:w-3.5 sm:h-3.5"
                />
                <span>Premium Experience</span>
              </div>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black text-white mb-6 shadow-text leading-tight animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Discover
              <span className="pl-2 bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <p
              className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed drop-shadow-md animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {description.substring(0, 150)}...
            </p>
            <div
              className="flex items-center flex-wrap gap-6 mb-8 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center text-white bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                <MapPin className="mr-2" size={18} />
                <span className="font-semibold">
                  {location}, {country}
                </span>
              </div>
              <div className="flex items-center text-white bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                <Users className="mr-2" size={18} />
                <span className="font-semibold">
                  {travelerCount}+ Travelers
                </span>
              </div>
            </div>
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <Button className="btn-accent px-8 py-4 text-lg shadow-2xl shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="flex items-center gap-3 relative z-10 font-bold">
                  Start from {formatCurrency(price)}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
              </Button>
              <div className="flex gap-3">
                <FavoriteToggleWrapper
                  itemId={id}
                  itemType="destination"
                  className="bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full p-3 cursor-pointer border border-white/30 transition-all duration-300 hover:scale-110"
                />
                <ShareButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationHero;
