import Image from "next/image";
import { MapPin, Star, Clock, Users, Camera, ArrowRight } from "lucide-react";
import { DestinationsType } from "@/utils/types";
import SectionTitle from "../global/SectionTitle";
import { Card, CardContent } from "../ui/card";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleWrapper from "../favorites/FavoriteToggleWrapper";
import SmartLink from "../global/SmartLink";

type Props = {
  destinations: DestinationsType[];
  itemType?: "hotel" | "destination";
};

const PlacesCard = ({ destinations, itemType = "destination" }: Props) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[hsl(var(--features-bg))] to-[hsl(var(--background))]  overflow-hidden py-16 sm:py-20">
      {/* decorative background elements */}
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
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12">
        <div className="mb-16">
          <SectionTitle
            text={`${
              itemType === "destination"
                ? "Amazing Destinations"
                : "Premium Hotels"
            }`}
            description={`Discover ${
              itemType === "destination"
                ? "breathtaking places that will create unforgettable memories"
                : "luxurious accommodations for your perfect stay"
            }`}
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-full">
          {destinations.map((place) => (
            <div
              key={place.id}
              className="group h-full min-w-0 overflow-hidden sm:overflow-visible"
            >
              <SmartLink
                href={`/destinations/${place.id}`}
                className="block min-w-0"
              >
                <Card className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-0 cursor-pointer h-full flex flex-col min-w-0">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                  <div className="relative w-full h-64 overflow-hidden rounded-t-3xl flex-shrink-0">
                    <Image
                      src={place.imageUrl}
                      alt={`${place.name} - Premium ${itemType} experience`}
                      fill
                      loading="lazy"
                      quality={60}
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4 z-20">
                      <FavoriteToggleWrapper
                        itemId={place.id}
                        itemType={itemType}
                        className="bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full p-2 border border-white/30 transition-all duration-300 hover:scale-110"
                      />
                    </div>
                    {/* Floating decorative camera icon */}
                    <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                      <Camera size={16} className="text-white" />
                    </div>
                    {/* Enhanced Duration Badge */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--primary))]/90 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-white" />
                        <span className="text-white text-sm font-semibold">
                          {place.duration.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 rounded-2xl px-4 py-2 shadow-lg group-hover:shadow-[hsl(var(--accent))]/50 group-hover:scale-105 transition-all duration-300">
                      <div className="text-white text-center">
                        <div className="font-bold text-lg">
                          {formatCurrency(place.price)}
                        </div>
                        <div className="text-white/90 text-xs font-medium">
                          per person
                        </div>
                      </div>
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-xl rounded-xl px-3 py-1 border border-white/30 flex items-center gap-2">
                      <Star
                        size={14}
                        className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
                      />
                      <span className="text-white text-sm font-semibold">
                        4.9
                      </span>
                    </div>
                    {/* Hover arrow indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <ArrowRight
                        size={20}
                        className="text-white group-hover:translate-x-0.5 transition-transform duration-300"
                      />
                    </div>
                    {/* shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
                  </div>
                  <CardContent className="relative p-6 flex-1 flex flex-col justify-between min-w-0">
                    {/* Title and Location */}
                    <div className="space-y-2 mb-4">
                      <h3 className="font-bold text-xl text-[hsl(var(--foreground))] group-hover:bg-gradient-to-r group-hover:from-[hsl(var(--primary))] group-hover:to-[hsl(var(--accent))] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 min-h-[3.5rem] leading-7">
                        {place.name}
                      </h3>
                      {/* Location */}
                      <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                        <MapPin
                          size={16}
                          className="text-[hsl(var(--primary))] flex-shrink-0"
                        />
                        <span className="text-sm line-clamp-1">
                          {place.location},{" "}
                          <span className="font-semibold text-[hsl(var(--primary))]">
                            {place.country}
                          </span>
                        </span>
                      </div>
                    </div>
                    {/* Bottom section with features and CTA */}
                    <div className="space-y-3">
                      {/* Enhanced Features */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users
                              size={14}
                              className="text-[hsl(var(--muted-foreground))]"
                            />
                            <span className="text-xs text-[hsl(var(--muted-foreground))]">
                              2-8 guests
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Hover CTA */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 border-t border-[hsl(var(--border))]/30">
                        <div className="text-[hsl(var(--primary))] text-sm font-semibold flex items-center gap-2">
                          <span>View Details</span>
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
          ))}
        </div>
        {/* Bottom CTA Section */}
        {destinations.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 inline-block">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <MapPin size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-3">
                    No {itemType}s Found
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-lg">
                    Try adjusting your filters or search criteria to find more
                    options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/*  floating decorative elements */}
      <div className="absolute top-1/4 hidden md:block right-8 w-20 h-20 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-15 animate-float" />
      <div className="absolute bottom-1/4 hidden md:block left-8 w-24 h-24 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-20 animate-float-slow" />
    </section>
  );
};

export default PlacesCard;
