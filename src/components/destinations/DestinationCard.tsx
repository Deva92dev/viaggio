import { getAllCountriesWithData } from "@/utils/actions";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../global/SectionTitle";
import { MapPin, ArrowRight, Users, Camera, Star, Globe } from "lucide-react";
import MotionSection from "../home/MotionSection";

type Props = {
  type: "destination" | "hotel";
};

const DestinationCard = async ({ type }: Props) => {
  const countries = await getAllCountriesWithData();

  return (
    <MotionSection
      scrollSpeed={50}
      className="relative w-full py-20 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--features-bg))]"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-16 right-20 w-72 h-72 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-10 animate-pulse" />
        <div
          className="absolute bottom-16 left-20 w-80 h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-8 animate-pulse"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Enhanced Section Title */}
        <div className="mb-16">
          <SectionTitle
            text={`Best ${
              type === "destination" ? "Destination" : "Hotel"
            } Countries`}
            description={`Explore our handpicked ${type}s across these amazing countries worldwide`}
          />
        </div>

        {/* Enhanced Country Cards Grid - LESS CRAMPED */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {countries.map((country, index) => (
            <Link
              key={country.country}
              href={`/destinations?country=${encodeURIComponent(
                country.country
              )}`}
              className="group block animate-fade-in hover:no-underline"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 aspect-[4/3] p-0 cursor-pointer">
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />

                {/* Enhanced Image Container */}
                <div className="relative w-full h-full overflow-hidden rounded-3xl">
                  <Image
                    src={country.image}
                    alt={`${
                      country.country
                    } - Premium travel destination with ${
                      type === "destination"
                        ? country.destinationsCount
                        : country.hotelsCount
                    } ${type}s`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                  {/* Floating decorative camera icon - Better positioning */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <Camera size={18} className="text-white" />
                  </div>

                  {/* Enhanced Country Name - More space */}
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 px-5 py-3 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-[hsl(var(--accent))]" />
                      <h3 className="font-bold text-white text-xl tracking-wide">
                        {country.country}
                      </h3>
                    </div>
                  </div>

                  {/* Enhanced Count Badge - Better spacing */}
                  <div className="absolute bottom-6 left-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))/0.9] rounded-2xl px-6 py-4 shadow-lg group-hover:shadow-[hsl(var(--primary))]/40 group-hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        {type === "destination" ? (
                          <Star size={16} className="text-white fill-white" />
                        ) : (
                          <Users size={16} className="text-white" />
                        )}
                      </div>
                      <div className="text-white">
                        <div className="font-bold text-xl">
                          {type === "destination"
                            ? country.destinationsCount
                            : country.hotelsCount}
                        </div>
                        <div className="text-white/80 text-sm font-medium">
                          {type === "destination" ? "Destinations" : "Hotels"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Arrow - Better positioning */}
                  <div className="absolute bottom-6 right-6 w-14 h-14 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <ArrowRight
                      size={20}
                      className="text-white group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                  </div>

                  {/* Premium shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
                </div>

                {/* Floating corner accent */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              </Card>
            </Link>
          ))}
        </div>

        {/* Enhanced Call-to-Action Section */}
        <div className="mt-20 text-center">
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 inline-block">
            {/* Decorative gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />

            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe size={32} className="text-[hsl(var(--primary))]" />
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Can not Decide Where to Go?
                </h3>
              </div>

              <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto leading-relaxed">
                Let our travel experts help you find the perfect destination
                based on your interests, budget, and travel dates.
              </p>

              <Link href="/contact">
                <button className="btn-accent px-10 py-4 text-lg shadow-lg shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                  {/* Button shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <span className="flex items-center gap-3 relative z-10 font-semibold">
                    Get Travel Recommendations
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating decorative elements */}
      <div className="absolute top-1/3 left-8 w-16 h-16 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-10 animate-float" />
      <div className="absolute bottom-1/3 right-8 w-20 h-20 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-15 animate-float-slow" />
    </MotionSection>
  );
};

export default DestinationCard;
