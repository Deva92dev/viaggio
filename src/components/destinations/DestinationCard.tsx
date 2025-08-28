import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Users, Camera, Star, Globe } from "lucide-react";
import { getAllCountriesWithData } from "@/utils/actions";
import { Card } from "../ui/card";
import SectionTitle from "../global/SectionTitle";

const MotionSection = dynamic(() => import("@/components/home/MotionSection"), {
  loading: () => <div className="opacity-0" />,
});

type Props = {
  type: "destination" | "hotel";
};

const DestinationCard = async ({ type }: Props) => {
  const countries = await getAllCountriesWithData();

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--features-bg))]">
      <div
        className="absolute inset-0 overflow-hidden z-0 hidden md:block"
        aria-hidden="true"
      >
        <div className="absolute top-16 right-20 w-72 h-72 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-10 animate-pulse-custom" />
        <div
          className="absolute bottom-16 left-20 w-80 h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-15 animate-pulse-custom"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <SectionTitle
            text={`Best ${
              type === "destination" ? "Destination" : "Hotel"
            } Countries`}
            description={`Explore our handpicked ${type}s across these amazing countries worldwide`}
          />
        </div>

        <div className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {countries.map((country, index) => (
            <MotionSection
              key={country.country}
              animation={{
                type: "slide",
                direction: "up",
                duration: 0.6,
                delay: 0.4 + index * 0.1,
                ease: "easeOut",
              }}
              mobile={{
                simpleAnimation: "fade",
                disableAnimations: false,
                disableParallax: true,
                breakPoint: 768,
                reducedMotion: true,
              }}
              triggerOnce={true}
              threshold={0.2}
              overflow={true}
              className="w-full"
            >
              <Link
                href={`/${
                  type === "destination" ? "destinations" : "hotels"
                }?country=${encodeURIComponent(country.country)}`}
                className="group block animate-fade-in hover:no-underline"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 aspect-[4/3] p-0 cursor-pointer">
                  <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl">
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
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                      quality={60}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/*  gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/30 group-hover:scale-110 transition-all duration-300 hidden sm:flex">
                      <Camera
                        size={16}
                        className="md:w-[18px] md:h-[18px] text-white"
                      />
                    </div>
                    {/* Country Name */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/20 px-3 py-2 md:px-5 md:py-3 group-hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center gap-2 md:gap-3">
                        <MapPin
                          size={16}
                          className="md:w-[18px] md:h-[18px] text-[hsl(var(--accent))]"
                        />
                        <h3 className="font-bold text-white text-lg md:text-xl tracking-wide">
                          {country.country}
                        </h3>
                      </div>
                    </div>
                    {/* Count Badge */}
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))/0.9] rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-lg group-hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                          {type === "destination" ? (
                            <Star
                              size={14}
                              className="md:w-4 md:h-4 text-white fill-white"
                            />
                          ) : (
                            <Users
                              size={14}
                              className="md:w-4 md:h-4 text-white"
                            />
                          )}
                        </div>
                        <div className="text-white">
                          <div className="font-bold text-lg md:text-xl">
                            {type === "destination"
                              ? country.destinationsCount
                              : country.hotelsCount}
                          </div>
                          <div className="text-white/80 text-xs md:text-sm font-medium">
                            {type === "destination" ? "Destinations" : "Hotels"}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Hover Arrow  */}
                    <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-[hsl(var(--accent))] rounded-full items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg hidden sm:flex">
                      <ArrowRight
                        size={18}
                        className="md:w-5 md:h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            </MotionSection>
          ))}
        </div>
        {/*  Call-to-Action */}
        <div className="mt-16 md:mt-20 text-center relative">
          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 shadow-xl md:shadow-2xl p-6 md:p-8 lg:p-12 inline-block">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
                <Globe
                  size={24}
                  className="md:w-8 md:h-8 text-[hsl(var(--primary))]"
                />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Can not Decide Where to Go?
                </h3>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Let our travel experts help you find the perfect destination
                based on your interests, budget, and travel dates.
              </p>
              <Link href="/contact">
                <button className="btn-accent px-6 py-3 md:px-10 md:py-4 text-base md:text-lg shadow-lg shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                  <span className="flex items-center gap-2 md:gap-3 relative z-10 font-semibold">
                    Get Travel Recommendations
                    <ArrowRight
                      size={18}
                      className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </button>
              </Link>
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-15 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationCard;
