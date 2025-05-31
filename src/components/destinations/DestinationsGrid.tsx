import { formatCurrency } from "@/utils/format";
import { DestinationsType } from "@/utils/types";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { MapPin } from "lucide-react";
import FavoriteToggleButton from "./FavoriteToggleButton";

type DestinationsGridProps = {
  destinations: DestinationsType[];
};

const DestinationsGrid = ({ destinations }: DestinationsGridProps) => {
  return (
    <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {destinations.map((place, index) => {
        const { country, duration, imageUrl, location, name, price } = place;
        const destinationsId = place.id;
        const amount = formatCurrency(price);
        return (
          <article key={destinationsId} className="group relative">
            <Link href={`/destinations/${destinationsId}`}>
              <Card className="group-hover:shadow-2xl group-hover:shadow-blue-200/50">
                <CardContent>
                  <div className="relative h-56 rounded overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={name}
                      width={600}
                      height={400}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Location Pin */}
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1">
                      <MapPin size={14} className="text-white" />
                      <span className="text-white text-sm font-medium">
                        {location}
                      </span>
                    </div>
                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-blue-500 rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">
                        {amount}
                      </span>
                    </div>
                  </div>

                  {/* text content */}
                  <div className="p-6">
                    <div className="flex flex-row justify-between">
                      <h2 className="text-xl font-bold mb-2 text-gray-800">
                        {name}
                      </h2>
                      <FavoriteToggleButton destinationId={destinationsId} />
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="text-white text-sm font-medium">
                        {country}
                      </p>
                      <p className="text-white text-sm font-medium">
                        {duration}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default DestinationsGrid;
