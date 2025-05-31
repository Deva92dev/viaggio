import { HotelsType } from "@/utils/types";
import SectionTitle from "../global/SectionTitle";
import { Card, CardContent } from "../ui/card";
import { FaHotel } from "react-icons/fa";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

type Props = {
  hotels: HotelsType[];
};

const HotelCard = ({ hotels }: Props) => {
  return (
    <section>
      <SectionTitle text="Favorite Hotels" description="" />
      <div className="grid grid-cols-1 gap-8 px-6 md:px-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotels.map((hotel) => (
          <Link key={hotel.id} href={`/hotels/${hotel.id}`}>
            <Card className="p-0 overflow-hidden relative shadow-md">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                  className="object-cover"
                />
                {/* price badge */}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 top-[11rem] z-10">
                <span className="bg-yellow-400 text-white font-semibold px-4 py-3 rounded-4xl text-sm shadow-md">
                  {formatCurrency(hotel.pricePerNight)} / Night
                </span>
              </div>
              <CardContent className="relative px-4 pb-4">
                <div className="flex flex-row gap-2 items-center">
                  <FaHotel />
                  <h3 className="font-bold text-lg pb-2">{hotel.name}</h3>
                </div>
                <p className="text-sm">
                  {hotel.location},
                  <span className="font-bold"> {hotel.country} </span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HotelCard;
