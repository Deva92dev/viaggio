import FavoriteToggleButton from "@/components/destinations/FavoriteToggleButton";
import BookYourHotel from "@/components/hotels/BookYourHotel";
import {
  AmenityIcon,
  CompassAnimation,
  FloatingClods,
  HorizontalLine,
} from "@/components/hotels/ServerAnimation";
import ShareButton from "@/components/singleDestination/ShareButton";
import { getSingleHotel } from "@/utils/actions";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

type Props = {
  params: Promise<{
    hotelsId: string;
  }>;
};

// favoriteToggleButton must accept destinationId or hotelId fix favorite functionality
const HotelsDetailsPage = async ({ params }: Props) => {
  const { hotelsId } = await params;
  const hotel = await getSingleHotel(hotelsId);
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
  const reviewsCount = 26; // change later

  return (
    <main className="mt-8 pb-16">
      <div className="relative w-full h-[50vh] min-h-[400px] mb-8 overflow-hidden rounded-lg mx-auto max-w-7xl px-4">
        <Image
          src={imageUrl}
          alt={name}
          width={1200}
          height={800}
          priority
          sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
          className="object-cover absolute inset-0 w-full h-full rounded-lg"
        />
        <FloatingClods />
        <HorizontalLine />
        <div className="absolute inset-0 from-blue-900/40 to-transparent"></div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
          <div className="flex justify-between items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {category}
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {destinationTag}
                </span>
              </div>
              <h1 className="capitalize text-4xl md:text-5xl font-bold text-white shadow-text mb-2">
                {name}
              </h1>
              <div className="flex items-center gap-2 text-white/90 mb-4">
                <MapPin size={20} className="text-blue-300" />
                <p className="font-medium">
                  {location} <span className="font-bold">{country}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <FavoriteToggleButton destinationId={id} />
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left column with description and amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trust elements and rating section */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <CompassAnimation />
                    <div>
                      <p className="text-sm text-gray-500">Travelers</p>
                      <p className="font-bold text-blue-800">
                        {travelersCount}+
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-blue-600 w-10 h-10" />
                    <div>
                      <p className="text-sm text-gray-500">Reviews</p>
                      <p className="font-bold text-blue-800">{reviewsCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                About This Hotel
              </h2>
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>
            </div>

            {/* Amenities section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Amenities
              </h2>
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-wrap gap-3">
                  {amenities.map((amenity, index) => (
                    <AmenityIcon key={index} name={amenity} />
                  ))}
                </div>
              </div>
            </div>

            {/* Location map placeholder */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Location
              </h2>
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-blue-500 mb-2" />
                    <p className="text-blue-700 font-medium">
                      {location}, {country}
                    </p>
                  </div>
                </div>
                {/* In production, you would integrate an actual map here */}
              </div>
            </div>
          </div>

          {/* Right column with booking info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 sticky top-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Price Details
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Per night</p>
                  <p className="text-3xl font-bold text-blue-700">
                    ${pricePerNight}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Availability
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Rooms available</p>
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        availableRooms > 5
                          ? "bg-green-500"
                          : availableRooms > 0
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <p className="font-bold">{availableRooms}</p>
                  </div>
                </div>
              </div>

              <BookYourHotel />

              {/* Additional trust elements */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-100 p-1 rounded">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">
                    Free cancellation up to 48 hours
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-100 p-1 rounded">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">No hidden fees</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Instant confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Guest Reviews
          </h2>
          <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
            {/* Review content would go here */}
            <p className="text-gray-500 text-center py-8">
              Reviews will be displayed here
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HotelsDetailsPage;
