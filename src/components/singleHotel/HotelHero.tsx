import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import ShareButton from "../singleDestination/ShareButton";
import FavoriteToggleWrapper from "../favorites/FavoriteToggleWrapper";
import { FloatingClods, HorizontalLine } from "../hotels/ServerAnimation";
import CustomBreadcrumb from "../global/CustomBreadCrumb";

type HotelHeroProps = {
  id: string;
  category: string;
  location: string;
  country: string;
  name: string;
  imageUrl: string;
};

const HotelHero = ({
  category,
  country,
  id,
  imageUrl,
  location,
  name,
}: HotelHeroProps) => {
  const destinationTag = "Popular Destination";

  return (
    <div className="relative w-full h-[70vh] min-h-[600px] mb-16 overflow-hidden">
      <Image
        src={imageUrl}
        alt={name}
        fill
        priority
        quality={75}
        sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
        className="object-cover"
      />
      {/* Gradient overlays  */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.4] via-transparent to-[hsl(var(--accent))/0.2] z-10" />
      <FloatingClods />
      <HorizontalLine />
      <div className="absolute top-28 left-12 right-0 z-50 pt-4">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <CustomBreadcrumb
            items={[
              { label: "Hotels", href: "/hotels" },
              { label: name, isCurrentPage: true },
            ]}
            className="animate-fade-in inline-block"
          />
        </div>
      </div>
      {/* Hero Content  */}
      <div className="absolute inset-0 flex items-end z-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-12 w-full">
          <div className="flex justify-between items-end flex-wrap gap-4 sm:gap-6 w-full">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold shadow-lg">
                  {category}
                </span>
                <span className="bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold shadow-lg">
                  {destinationTag}
                </span>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/30">
                  <Star
                    size={12}
                    className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] sm:w-3.5 sm:h-3.5"
                  />
                  <span>Premium Hotel</span>
                </div>
              </div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 shadow-text leading-tight animate-fade-in capitalize"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="bg-gradient-to-r from-white via-white to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>
              <div
                className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center text-white bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30">
                  <MapPin
                    size={16}
                    className="mr-2 text-[hsl(var(--accent))] sm:w-5 sm:h-5"
                  />
                  <span className="font-semibold text-sm sm:text-base lg:text-lg">
                    {location},{" "}
                    <span className="text-[hsl(var(--accent))]">{country}</span>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="flex gap-2 sm:gap-3 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <FavoriteToggleWrapper
                itemId={id}
                itemType="hotel"
                className="bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full p-2.5 sm:p-3 cursor-pointer border border-white/30 transition-all duration-300 hover:scale-110"
              />
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelHero;
