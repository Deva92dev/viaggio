import Image from "next/image";
import SectionTitle from "../global/SectionTitle";
import Link from "next/link";
import { Button } from "../ui/button";
import { MapPin, ArrowRight } from "lucide-react"; // Icons
import { getPopularDestinations } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import MotionSection from "./MotionSection";

const Popular = async () => {
  const destinations = await getPopularDestinations();

  return (
    <MotionSection
      scrollSpeed={50}
      className="relative w-full min-h-screen py-20 bg-[linear-gradient(to_bottom,#eef4ff_0%,#e0ebff_100%)]"
    >
      <SectionTitle
        text="Popular Destinations"
        description="Places where you can enjoy"
      />

      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url('data:image/svg+xml,%3Csvg_width...')] before:bg-cover before:bg-repeat -z-10"></div>

      {/* Destination Cards Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/50 bg-white"
          >
            {/* Destination Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                width={1000}
                height={800}
                loading="lazy"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

              {/* Location Pin*/}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1">
                <MapPin size={14} className="text-white" />
                <span className="text-white text-sm font-medium">
                  {destination.location}
                </span>
              </div>

              {/* Price Tag */}
              <div className="absolute top-4 right-4 bg-blue-500 rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">
                  {formatCurrency(destination.price)}
                </span>
              </div>
            </div>

            {/* Destination Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {destination.name}
              </h3>

              {/* Rating */}
              {/* <div className="flex items-center gap-1 mb-3">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600">{destination.rating} ({destination.reviews} reviews)</span>
              </div> */}

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-2">
                {destination.description}
              </p>
              {/* Call to Action */}
              <button className="w-full bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 rounded-lg py-2 transition-colors duration-300 flex items-center justify-center gap-2 group">
                Explore
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <Link
        href="/destinations"
        className="flex items-center justify-center mt-12"
      >
        <Button
          variant="outline"
          size="lg"
          className="bg-blue-400 hover:bg-gray-600 cursor-pointer"
        >
          View More
        </Button>
      </Link>
    </MotionSection>
  );
};

export default Popular;
