import { getAllCountriesWithData } from "@/utils/actions";
import { Card } from "../ui/card";
import Image from "next/image";
import SectionTitle from "../global/SectionTitle";

type Props = {
  type: "destination" | "hotel";
};

const DestinationCard = async ({ type }: Props) => {
  const countries = await getAllCountriesWithData();

  return (
    <section className="py-20">
      <SectionTitle text="Best Place Destination" description="" />
      <div className="grid gap-8 px-6 md:px-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {countries.map((c) => (
          <Card
            key={c.country}
            className="p-0 overflow-hidden aspect-video"
            style={{
              clipPath: "url(#destinationCardClip)",
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={c.image}
                alt={c.country}
                fill
                loading="lazy"
                sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                className="object-cover overflow-hidden"
              />
              <div className="absolute inset-0 flex justify-center z-10 shadow-md">
                <p className="font-bold p-2 text-secondary">{c.country}</p>
              </div>
              <div className="absolute bottom-8 left-0 rounded-tr-3xl rounded-br-3xl bg-white/80 backdrop-blur-sm z-10 shadow-md">
                <p className="font-bold p-2 text-secondary">
                  {type === "destination"
                    ? `${c.destinationsCount} Destinations`
                    : `${c.hotelsCount} Hotels`}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DestinationCard;
