import FavoriteToggleButton from "@/components/destinations/FavoriteToggleButton";
import ShareButton from "@/components/singleDestination/ShareButton";
import SimilarDestination from "@/components/singleDestination/SimilarDestination";
import {
  AnimatedCompass,
  Duration,
  JourneyPath,
  Location3DCard,
  PhotoGallery,
  WorldMapBackGround,
} from "@/components/singleDestination/TourAnimation";
import TourRating from "@/components/singleDestination/TourRating";
import { Button } from "@/components/ui/button";
import { getSimilarDestinations, getSingleDestination } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import {
  ArrowRight,
  CalendarSearch,
  Camera,
  Clock,
  Compass,
  MapPin,
  Sun,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    destinationsId: string;
  }>;
};

// fix favorite functionality

const DestinationDetailsPage = async ({ params }: Props) => {
  const { destinationsId } = await params;
  const destination = await getSingleDestination(destinationsId);
  const {
    name,
    category,
    bestTimeToVisit,
    country,
    description,
    duration,
    id,
    imageUrl,
    location,
    price,
  } = destination;
  const similar = await getSimilarDestinations(category, id);

  const travelerCount = 345;
  const guidedTours = 15;

  return (
    <main className="pt-8 pb-16 relative overflow-hidden">
      <WorldMapBackGround />
      <div className="relative w-full h-[60vh] min-h-[500px] mb-16">
        <Image
          src={imageUrl}
          alt={name}
          width={1920}
          height={1080}
          priority
          sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10" />
        <JourneyPath />
        {/* Content Hero */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-4">
                <Duration duration={duration} />
                <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  {category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-text">
                Discover {name}
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-6 max-w-2xl">
                {description.substring(0, 120)}...
              </p>

              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center text-white">
                  <MapPin className="mr-1" size={18} />
                  <span className="font-medium">
                    {location}, {country}
                  </span>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <TourRating />
              </div>

              <div className="flex space-x-4">
                {/* booking page */}
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 transform transition hover:translate-y-[-2px]">
                  <span>Start from {formatCurrency(price)}</span>
                  <ArrowRight size={16} />
                </Button>
                <div className="flex space-x-2">
                  <FavoriteToggleButton destinationId={id} />
                  <ShareButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Destination Experience
                </h2>
                <div className="ml-4">
                  <AnimatedCompass />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="bg-blue-50 rounded-lg p-4 flex-1 min-w-[200px]">
                    <div className="flex items-center mb-2">
                      <Sun className="text-yellow-500 mr-2" size={20} />
                      <h3 className="font-bold text-gray-800">
                        Perfect Time To Visit
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {bestTimeToVisit.map((t, index) => (
                        <div key={index}>
                          <p>{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 flex-1 min-w-[200px]">
                    <div className="flex items-center mb-2">
                      <Clock size={20} className="text-blue-500 mr-2" />
                      <h3 className="font-bold text-gray-800">Tour Duration</h3>
                    </div>
                    <p className="text-gray-700 mt-3">
                      {duration.toUpperCase()} - Perfect for
                      {duration.includes("day")
                        ? "short getaways"
                        : "extended exploration"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Camera size={20} className="text-indigo-500 mr-2" />
                    <h3 className="font-bold text-gray-800">
                      Surroundings Views
                    </h3>
                  </div>
                  <p className="text-gray-700 mt-3">
                    {category.toUpperCase()} - providing breathtaking scenery
                    and unique experiences for travelers
                  </p>
                </div>
              </div>
            </section>

            {/* Photo gallery section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Destination Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhotoGallery imageUrl={imageUrl} name={name} />
                <div className="grid grid-cols-2 gap-4">
                  <PhotoGallery imageUrl={imageUrl} name={name} />
                  <PhotoGallery imageUrl={imageUrl} name={name} />
                </div>
              </div>
            </section>

            {/* similar destination */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Similar Destinations You May Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {similar.map((dest, index) => (
                  <Link href={`/destinations/${dest.id}`} key={index}>
                    <SimilarDestination
                      imageUrl={dest.imageUrl}
                      title={dest.title}
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right column - booking and info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden sticky top-8">
              <div className="bg-blue-600 text-white p-4 ">
                <h3 className="text-xl font-bold mb-1">Book This Tour</h3>
                <p className="opacity-90">Secure Your Spot Today</p>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Starting From</p>
                    <p className="text-3xl font-bold text-blue-600">
                      $ {price}
                    </p>
                  </div>
                  <Duration duration={duration} />
                </div>
                {/* Grab Ticket */}

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Users size={18} className="text-blue-500 mr-2" />
                      <span className="text-gray-700">Travelers</span>
                    </div>
                    <span className="font-bold text-gray-800">
                      {travelerCount}+
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Compass size={18} className="text-blue-500 mr-2" />
                      <span className="text-gray-700">Guided Tours</span>
                    </div>
                    <span className="text-bold text-gray-800">
                      {guidedTours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Location3DCard country={country} location={location} />
            {/* Best time to visit */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <CalendarSearch size={20} className="text-blue-500 mr-2" />
                <h3 className="font-bold text-gray-800">Best Time to Visit</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {bestTimeToVisit.map((t, index) => (
                  <div key={index}>
                    <p>{t}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                The weather is most favorable during these seasons, providing
                the optimal experience for travelers.
              </p>
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Traveler Reviews
          </h2>
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            {/* Review content would go here */}
            <p className="text-gray-500 text-center py-12">
              Reviews will be displayed here
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
