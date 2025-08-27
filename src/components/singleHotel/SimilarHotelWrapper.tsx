import { Building2 } from "lucide-react";
import SimilarHotels from "../hotels/SimilarHotels";
import { getSimilarHotels } from "@/utils/actions";
import Link from "next/link";

type Props = {
  id: string;
  category: string;
};

const SimilarHotelWrapper = async ({ id, category }: Props) => {
  const [similar] = await Promise.all([getSimilarHotels(category, id)]);

  return (
    <section className="mt-12 sm:mt-14 md:mt-16 animate-fade-in w-full overflow-hidden">
      <div className="flex items-center mb-8 sm:mb-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
          <Building2 size={20} className="text-white sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Similar Hotels You May Like
          </h2>
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
  );
};

export default SimilarHotelWrapper;
