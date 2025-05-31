import { DestinationsType } from "@/utils/types";
import SectionTitle from "../global/SectionTitle";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import { FaLocationArrow } from "react-icons/fa";
import Link from "next/link";

type Props = {
  destinations: DestinationsType[];
};

const PlacesCard = ({ destinations }: Props) => {
  return (
    <section className="py-20">
      <SectionTitle
        text="Favorite Places"
        description="Enjoy the dreamy destinations"
      />
      <div className="grid grid-cols-1 gap-8 px-6 md:px-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {destinations.map((place) => (
          <Link href={`/destinations/${place.id}`} key={place.id}>
            <Card className="p-0 overflow-hidden relative shadow-md">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={place.imageUrl}
                  alt={place.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                  className="object-cover"
                />
                {/* price badge */}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 top-[11rem] z-10">
                <span className="bg-yellow-400 text-white font-semibold px-4 py-3 rounded-4xl text-sm shadow-md">
                  {formatCurrency(place.price)} / Person
                </span>
              </div>
              <CardContent className="relative px-4 pb-4">
                <p className="font-normal py-2">
                  {place.duration.toLocaleUpperCase()}
                </p>
                <div className="flex flex-row gap-2 items-center">
                  <FaLocationArrow />
                  <h3 className="font-bold text-lg pb-2">{place.name}</h3>
                </div>
                <p className="text-sm">
                  {place.location},
                  <span className="font-bold"> {place.country} </span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PlacesCard;
