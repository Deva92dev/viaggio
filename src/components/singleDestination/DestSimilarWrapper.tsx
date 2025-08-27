import Link from "next/link";
import SimilarDestination from "./SimilarDestination";
import { Compass } from "lucide-react";
import { getSimilarDestinations } from "@/utils/actions";

type Props = {
  id: string;
  category: string;
};

const DestSimilarWrapper = async ({ category, id }: Props) => {
  const [similar] = await Promise.all([getSimilarDestinations(category, id)]);
  return (
    <section className="mt-16 animate-fade-in">
      <div className="flex items-center mb-10">
        <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
          <Compass size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Similar Destinations You May Like
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {similar.map((dest, index) => (
          <Link href={`/destinations/${dest.id}`} key={index} className="group">
            <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-hover-lift">
              <SimilarDestination imageUrl={dest.imageUrl} title={dest.title} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DestSimilarWrapper;
