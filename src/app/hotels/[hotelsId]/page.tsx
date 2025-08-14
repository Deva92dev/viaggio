import BookingForm from "@/components/bookings/BookingForm";
import FavoriteToggleWrapper from "@/components/favorites/FavoriteToggleWrapper";
import MapViewWrapper from "@/components/global/MapViewWrapper";
import {
  AmenityIcon,
  CompassAnimation,
  FloatingClods,
  HorizontalLine,
} from "@/components/hotels/ServerAnimation";
import SimilarHotels from "@/components/hotels/SimilarHotels";
import Review from "@/components/reviews/Review";
import ShareButton from "@/components/singleDestination/ShareButton";
import { getSimilarHotels, getSingleHotel } from "@/utils/actions";
import {
  Calendar,
  MapPin,
  Star,
  Shield,
  Award,
  CheckCircle,
  Clock,
  CreditCard,
  Building2,
  Bed,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    hotelsId: string;
  }>;
};

const HotelsDetailsPage = async ({ params }: Props) => {
  const { hotelsId } = await params;
  const hotel = await getSingleHotel(hotelsId);
  const [similar] = await Promise.all([
    getSimilarHotels(hotel.category, hotel.id),
  ]);

  const {
    name,
    category,
    availableRooms,
    amenities,
    country,
    description,
    id,
    imageUrl,
    location,
    pricePerNight,
  } = hotel;

  const travelersCount = 695;
  const destinationTag = "Popular Destination";
  const reviewsCount = 26;

  return (
    <main className="relative overflow-hidden bg-[hsl(var(--background))]">
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[600px] mb-16 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="object-cover absolute inset-0 w-full h-full"
        />

        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.4] via-transparent to-[hsl(var(--accent))/0.2] z-10" />

        <FloatingClods />
        <HorizontalLine />

        {/* Enhanced Hero Content */}
        <div className="absolute inset-0 flex items-end z-20">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-12 w-full">
            <div className="flex justify-between items-end flex-wrap gap-4 sm:gap-6 w-full">
              <div className="flex-1 min-w-0">
                {/* Enhanced badges */}
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

                {/* Enhanced title */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 shadow-text leading-tight animate-fade-in capitalize"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="bg-gradient-to-r from-white via-white to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    {name}
                  </span>
                </h1>

                {/* Enhanced location */}
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
                      {location},
                      <span className="text-[hsl(var(--accent))]">
                        {country}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced action buttons */}
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

      {/* Enhanced Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-16 w-full">
        {/* FIXED: Enhanced grid layout with proper gaps for all breakpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-12 w-full">
          {/* Enhanced Left Column */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10 md:space-y-12 w-full">
            {/* Enhanced Trust Elements Section */}
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

            {/* Enhanced Description Section */}
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

            {/* Enhanced Amenities Section */}
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

            {/* FIXED: Enhanced Location Section with bottom margin for mobile spacing */}
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
                <MapViewWrapper location={location} />
              </div>
            </section>
          </div>

          {/* FIXED: Enhanced Right Column - Booking Sidebar with proper mobile spacing */}
          <div className="lg:col-span-1 w-full">
            {/* Added margin top for mobile spacing when stacked */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden sticky top-8 w-full mt-8 lg:mt-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl sm:rounded-3xl blur opacity-20 -z-10" />

              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                      Book This Hotel
                    </h3>
                    <p className="opacity-90 text-sm sm:text-base">
                      Secure Your Stay Today
                    </p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Shield size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>

              {/* Enhanced Price Section */}
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
                    <span className="text-[hsl(var(--muted-foreground))] font-medium text-sm sm:text-base">
                      Per night
                    </span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      ${pricePerNight}
                    </span>
                  </div>
                </div>

                {/* Enhanced Availability Section */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                    <Bed
                      size={18}
                      className="text-[hsl(var(--accent))] sm:w-5 sm:h-5"
                    />
                    Availability
                  </h3>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white rounded-xl border border-[hsl(var(--border))] shadow-sm">
                    <span className="text-[hsl(var(--muted-foreground))] font-medium text-sm sm:text-base">
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
                      <span className="font-bold text-[hsl(var(--foreground))] text-base sm:text-lg">
                        {availableRooms}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Trust Elements */}
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
                        <item.icon
                          size={14}
                          className="text-white sm:w-4 sm:h-4"
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-[hsl(var(--foreground))] font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Enhanced Booking Form */}
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

                {/* Trust indicators */}
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
          </div>
        </div>

        {/* Rest of your sections remain the same... */}
        {/* Enhanced Reviews Section */}
        <div className="mt-16 sm:mt-18 md:mt-20 animate-fade-in w-full">
          <div className="flex items-center mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <Star size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                Guest Reviews
              </h2>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl sm:rounded-3xl blur opacity-20 -z-10" />
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <Review itemId={hotel.id} itemType="hotel" />
            </div>
          </div>
        </div>

        {/* Enhanced Similar Hotels Section */}
        <section className="mt-12 sm:mt-14 md:mt-16 animate-fade-in w-full overflow-hidden">
          <div className="flex items-center mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <Building2 size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                Similar Hotels You May Like
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 rounded-full mt-2" />
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 w-full">
              {similar.map((sim, index) => (
                <Link
                  href={`/hotels/${sim.id}`}
                  key={index}
                  className="group w-full block"
                >
                  <SimilarHotels image={sim.image} title={sim.title} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HotelsDetailsPage;
