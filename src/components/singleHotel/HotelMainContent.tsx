import { Suspense } from "react";
import MapViewWrapper from "../global/MapViewWrapper";
import MapViewSkeleton from "../global/MapViewSkeleton";
import { AmenityIcon, CompassAnimation } from "../hotels/ServerAnimation";
import { Award, Building2, Calendar, MapPin } from "lucide-react";

type HotelContentProps = {
  description: string;
  amenities: string[];
  location: string;
};

const HotelMainContent = ({
  amenities,
  description,
  location,
}: HotelContentProps) => {
  const travelersCount = 695;
  const reviewsCount = 26;
  return (
    <div className="lg:col-span-2 space-y-8 sm:space-y-10 md:space-y-12 w-full">
      <section className="animate-fade-in w-full">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl sm:rounded-3xl blur opacity-20 -z-10" />
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
                <div className="flex items-center gap-3 sm:gap-4">
                  <CompassAnimation />
                  <div>
                    <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground))] font-medium">
                      Travelers
                    </p>
                    <p className="font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      {travelersCount}+
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground))] font-medium">
                      Reviews
                    </p>
                    <p className="font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      {reviewsCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="animate-fade-in w-full">
        <div className="flex items-center mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
            <Building2 size={20} className="text-white sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              About This Hotel
            </h2>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl sm:rounded-3xl blur opacity-20 -z-10" />
          <div className="p-4 sm:p-6 md:p-8">
            <p className="text-[hsl(var(--foreground))] text-base sm:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>
      <section className="animate-fade-in w-full">
        <div className="flex items-center mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
            <Award size={20} className="text-white sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Amenities
            </h2>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl sm:rounded-3xl blur opacity-20 -z-10" />
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AmenityIcon name={amenity} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="animate-fade-in w-full mb-8 lg:mb-0">
        <div className="flex items-center mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
            <MapPin size={20} className="text-white sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Location
            </h2>
          </div>
        </div>
        <div className="h-48 sm:h-56 md:h-64 w-full">
          <Suspense fallback={<MapViewSkeleton />}>
            <MapViewWrapper location={location} />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default HotelMainContent;
