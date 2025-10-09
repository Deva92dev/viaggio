import dynamic from "next/dynamic";
import {
  Award,
  Bed,
  CheckCircle,
  Clock,
  CreditCard,
  Shield,
  Star,
} from "lucide-react";
import { Suspense } from "react";
import BookingFormSkeleton from "../bookings/BookingFormSkeleton";

const BookingForm = dynamic(() => import("@/components/bookings/BookingForm"), {
  loading: () => <BookingFormSkeleton />,
});

type HotelBookingProps = {
  name: string;
  id: string;
  location: string;
  country: string;
  pricePerNight: number;
  availableRooms: number;
};

const HotelBooking = ({
  availableRooms,
  country,
  id,
  location,
  pricePerNight,
  name,
}: HotelBookingProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden sticky top-8 w-full mt-8 lg:mt-0">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl sm:rounded-3xl blur opacity-20 -z-10" />
      <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
              Book This Hotel
            </h3>
            <p className="text-white/95 tracking-tight text-sm sm:text-base">
              Secure Your Stay Today
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-white sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
            <CreditCard
              size={18}
              className="text-[hsl(var(--primary))] sm:w-5 sm:h-5"
            />
            Price Details
          </h3>
          <div className="flex justify-between items-center p-3 sm:p-4 bg-white rounded-xl border border-[hsl(var(--border))] shadow-sm">
            <span className="text-black font-medium text-sm sm:text-base">
              Per night
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              ${pricePerNight}
            </span>
          </div>
        </div>
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
            <Bed
              size={18}
              className="text-[hsl(var(--accent))] sm:w-5 sm:h-5"
            />
            Availability
          </h3>
          <div className="flex justify-between items-center p-3 sm:p-4 bg-white rounded-xl border border-[hsl(var(--border))] shadow-sm">
            <span className="text-black font-medium text-sm sm:text-base">
              Rooms available
            </span>
            <div className="flex items-center">
              <span
                className={`inline-block w-3 h-3 rounded-full mr-3 ${
                  availableRooms > 5
                    ? "bg-green-500"
                    : availableRooms > 0
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></span>
              <span className="font-bold text-black text-base sm:text-lg">
                {availableRooms}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pt-4 sm:pt-6 border-t border-[hsl(var(--border))]">
          {[
            {
              text: "Free cancellation up to 48 hours",
              icon: CheckCircle,
            },
            { text: "No hidden fees", icon: Shield },
            { text: "Instant confirmation", icon: Clock },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-[hsl(var(--border))] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center">
                <item.icon size={14} className="text-white sm:w-4 sm:h-4" />
              </div>
              <span className="text-xs sm:text-sm text-black font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
        <Suspense fallback={<BookingFormSkeleton />}>
          <BookingForm
            itemId={id}
            itemType="hotel"
            itemData={{
              name,
              price: pricePerNight,
              priceLabel: `From $${pricePerNight} / night`,
              location,
              country,
              availableRooms,
            }}
          />
        </Suspense>
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[hsl(var(--border))]">
          <div className="flex items-center gap-1.5 sm:gap-2 text-green-600">
            <Shield size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs font-medium">Secure</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[hsl(var(--accent))]">
            <Award size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs font-medium">Verified</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[hsl(var(--primary))]">
            <Star size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs font-medium">Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
