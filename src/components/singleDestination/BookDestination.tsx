import dynamic from "next/dynamic";
import { Award, Compass, Shield, Star, Users } from "lucide-react";
import { Suspense } from "react";
import BookingFormSkeleton from "../bookings/BookingFormSkeleton";
import { Duration } from "./TourAnimation";

const BookingForm = dynamic(() => import("@/components/bookings/BookingForm"), {
  loading: () => <BookingFormSkeleton />,
});

type Props = {
  id: string;
  name: string;
  price: number;
  location: string;
  country: string;
  duration: string;
};

const BookDestination = ({
  country,
  id,
  location,
  name,
  price,
  duration,
}: Props) => {
  const travelerCount = 345;
  const guidedTours = 15;
  return (
    <section className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden sticky top-8 hover-glow">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />
      <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-1">Book This Tour</h3>
            <p className="text-white/95 tracking-tight text-sm sm:text-base">
              Secure Your Spot Today
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
            <Shield size={24} className="text-white" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <Suspense fallback={<BookingFormSkeleton />}>
          <BookingForm
            itemId={id}
            itemType="destination"
            itemData={{
              name,
              price,
              priceLabel: `From $${price}`,
              location,
              country,
            }}
          />
        </Suspense>
      </div>
      <div className="p-6 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[hsl(var(--muted-foreground))] text-sm font-medium">
              Starting From
            </p>
            <p className="text-4xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              ${price}
            </p>
          </div>
          <Duration duration={duration} />
        </div>
        <div className="space-y-4 pt-6 border-t border-[hsl(var(--border))]">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[hsl(var(--border))] shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[hsl(var(--primary))]/10 rounded-lg flex items-center justify-center mr-3">
                <Users size={16} className="text-[hsl(var(--primary))]" />
              </div>
              <span className="text-[hsl(var(--foreground))] font-medium">
                Travelers
              </span>
            </div>
            <span className="font-bold text-[hsl(var(--foreground))]">
              {travelerCount}+
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[hsl(var(--border))] shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[hsl(var(--accent))]/10 rounded-lg flex items-center justify-center mr-3">
                <Compass size={16} className="text-[hsl(var(--accent))]" />
              </div>
              <span className="text-[hsl(var(--foreground))] font-medium">
                Guided Tours
              </span>
            </div>
            <span className="font-bold text-[hsl(var(--foreground))]">
              {guidedTours}
            </span>
          </div>
        </div>
        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 text-green-600">
            <Shield size={16} />
            <span className="text-xs font-medium">Secure</span>
          </div>
          <div className="flex items-center gap-2 text-[hsl(var(--accent))]">
            <Award size={16} />
            <span className="text-xs font-medium">Verified</span>
          </div>
          <div className="flex items-center gap-2 text-[hsl(var(--primary))]">
            <Star size={16} />
            <span className="text-xs font-medium">Premium</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDestination;
