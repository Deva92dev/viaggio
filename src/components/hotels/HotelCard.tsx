import { HotelsType } from "@/utils/types";
import SectionTitle from "../global/SectionTitle";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import {
  MapPin,
  Star,
  Camera,
  ArrowRight,
  Bed,
  Home,
  Users,
} from "lucide-react";
import FavoriteToggleWrapper from "../favorites/FavoriteToggleWrapper";
import SmartLink from "../global/SmartLink";
import MotionSection from "../home/MotionSection";

type Props = {
  hotels: HotelsType[];
  itemType?: "hotel" | "destination";
};

const HotelCard = ({ hotels }: Props) => {
  const getDisplayAmenities = (amenities: string[]) => {
    return amenities.slice(0, 2);
  };
  // Function to get remaining amenities count
  const getRemainingCount = (amenities: string[]) => {
    return amenities.length > 2 ? amenities.length - 2 : 0;
  };

  return (
    <MotionSection
      scrollSpeed={50}
      className="relative w-full py-20 bg-gradient-to-b from-[hsl(var(--features-bg))] to-[hsl(var(--background))]"
    >
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-16 left-16 w-80 h-80 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-15 animate-pulse" />
        <div
          className="absolute bottom-16 right-16 w-96 h-96 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-12 animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <SectionTitle
            text="Premium Hotels"
            description="Experience luxury accommodations with exceptional service and breathtaking views"
          />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hotels.map((hotel, index) => {
            const displayAmenities = getDisplayAmenities(hotel.amenities);
            const remainingCount = getRemainingCount(hotel.amenities);

            return (
              <div
                key={hotel.id}
                className="group animate-fade-in h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <SmartLink
                  href={`/hotels/${hotel.id}`}
                  className="block h-full"
                >
                  <Card className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-0 cursor-pointer h-full flex flex-col">
                    {/* Gradient border effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                    {/*  Image Container  */}
                    <div className="relative w-full h-56 overflow-hidden rounded-t-3xl flex-shrink-0">
                      <Image
                        src={hotel.imageUrl}
                        alt={`${hotel.name} - Premium luxury hotel accommodation`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      {/* Favorite Button */}
                      <div className="absolute top-4 right-4 z-20">
                        <FavoriteToggleWrapper
                          itemId={hotel.id}
                          itemType="hotel"
                          className="bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full p-2 border border-white/30 transition-all duration-300 hover:scale-110"
                        />
                      </div>
                      {/* Floating decorative camera icon */}
                      <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                        <Camera size={16} className="text-white" />
                      </div>
                      {/* Hotel Star Rating */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--primary))]/90 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={12}
                                className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
                              />
                            ))}
                          </div>
                          <span className="text-white text-xs font-semibold">
                            5★
                          </span>
                        </div>
                      </div>
                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 rounded-2xl px-4 py-2 shadow-lg group-hover:shadow-[hsl(var(--accent))]/50 group-hover:scale-105 transition-all duration-300">
                        <div className="text-white text-center">
                          <div className="font-bold text-lg">
                            {formatCurrency(hotel.pricePerNight)}
                          </div>
                          <div className="text-white/90 text-xs font-medium">
                            per night
                          </div>
                        </div>
                      </div>
                      {/* Premium Category Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-xl rounded-xl px-3 py-1 border border-white/30 flex items-center gap-2">
                        <Bed size={14} className="text-[hsl(var(--accent))]" />
                        <span className="text-white text-sm font-semibold truncate max-w-[60px]">
                          {hotel.category}
                        </span>
                      </div>
                      {/* Hover arrow indicator */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <ArrowRight
                          size={20}
                          className="text-white group-hover:translate-x-0.5 transition-transform duration-300"
                        />
                      </div>
                      {/* Premium shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
                    </div>
                    {/*Card Content with Flex-Grow */}
                    <CardContent className="relative p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Hotel name with gradient hover effect */}
                        <div className="space-y-2">
                          <h3 className="font-bold text-xl text-[hsl(var(--foreground))] group-hover:bg-gradient-to-r group-hover:from-[hsl(var(--primary))] group-hover:to-[hsl(var(--accent))] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-1 min-h-[28px]">
                            {hotel.name}
                          </h3>
                          {/* Location */}
                          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] min-h-[20px]">
                            <MapPin
                              size={16}
                              className="text-[hsl(var(--primary))] flex-shrink-0"
                            />
                            <span className="text-sm truncate">
                              {hotel.location},{" "}
                              <span className="font-semibold text-[hsl(var(--primary))]">
                                {hotel.country}
                              </span>
                            </span>
                          </div>
                        </div>
                        {/*Hotel Amenities Section */}
                        <div className="space-y-2 min-h-[80px] flex flex-col justify-start">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-4 bg-[hsl(var(--accent))] rounded-full flex-shrink-0"></div>
                            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                              Amenities
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {displayAmenities.map((amenity, amenityIndex) => (
                              <div
                                key={amenityIndex}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 flex-shrink-0 ${
                                  amenityIndex % 2 === 0
                                    ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                                    : "bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] border border-[hsl(var(--accent))]/20"
                                }`}
                              >
                                <span className="truncate max-w-[80px] block">
                                  {amenity}
                                </span>
                              </div>
                            ))}
                            {remainingCount > 0 && (
                              <div className="px-3 py-1 rounded-full text-xs font-medium bg-[hsl(var(--muted))]/20 text-[hsl(var(--muted-foreground))] border border-[hsl(var(--muted))]/30 transition-all duration-300 hover:scale-105 flex-shrink-0">
                                +{remainingCount}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Available Rooms Section */}
                      <div className="space-y-3 mt-auto pt-4">
                        <div className="flex items-center justify-between">
                          <div className="bg-white/50 backdrop-blur-md rounded-xl px-3 py-2 border border-[hsl(var(--border))]/30 shadow-sm group-hover:shadow-md transition-all duration-300 flex-1 mr-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))/0.8] rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                                <Home size={14} className="text-white" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-base text-[hsl(var(--primary))]">
                                  {hotel.availableRooms}
                                </div>
                                <div className="text-xs text-[hsl(var(--muted-foreground))] font-medium truncate">
                                  Available
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Capacity Badge */}
                          <div className="bg-[hsl(var(--accent))]/10 backdrop-blur-md px-3 py-2 rounded-xl border border-[hsl(var(--accent))]/20 flex items-center gap-1 flex-shrink-0">
                            <Users
                              size={12}
                              className="text-[hsl(var(--accent))]"
                            />
                            <span className="text-xs font-semibold text-[hsl(var(--accent))]">
                              2-4
                            </span>
                          </div>
                        </div>
                        {/* Status Indicator */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold flex-1 mr-2 ${
                              hotel.availableRooms > 5
                                ? "bg-green-100 text-green-800"
                                : hotel.availableRooms > 2
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                hotel.availableRooms > 5
                                  ? "bg-green-500 animate-pulse"
                                  : hotel.availableRooms > 2
                                  ? "bg-yellow-500 animate-pulse"
                                  : "bg-red-500 animate-pulse"
                              }`}
                            />
                            <span className="truncate">
                              {hotel.availableRooms > 5
                                ? "Available"
                                : hotel.availableRooms > 2
                                ? "Limited"
                                : "Few Left"}
                            </span>
                          </div>
                        </div>
                        {/* Hover CTA */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-[hsl(var(--primary))] text-sm font-semibold flex items-center gap-2">
                            <span>Book Now</span>
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    {/* Floating corner accent */}
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  </Card>
                </SmartLink>
              </div>
            );
          })}
        </div>
        {/* Empty State */}
        {hotels.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 inline-block">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Bed size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-3">
                    No Hotels Found
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-lg">
                    Try adjusting your search criteria or explore different
                    destinations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Additional floating decorative elements */}
      <div className="absolute top-1/4 right-8 w-20 h-20 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-15 animate-float" />
      <div className="absolute bottom-1/4 left-8 w-24 h-24 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-20 animate-float-slow" />
    </MotionSection>
  );
};

export default HotelCard;
