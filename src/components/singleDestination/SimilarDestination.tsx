import { ChevronRight, MapPin, Star } from "lucide-react";
import Image from "next/image";

type RecommendedType = {
  title: string;
  imageUrl: string;
};

const SimilarDestination = async ({ imageUrl, title }: RecommendedType) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden h-52 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
      {/* Enhanced gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>

      <Image
        src={imageUrl}
        alt={title}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        width={300}
        height={200}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Enhanced content */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="font-bold text-base mb-2 line-clamp-2">{title}</p>

            {/* Enhanced explore section */}
            <div className="flex items-center opacity-0 transform translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
                <MapPin size={12} className="mr-1 text-[hsl(var(--accent))]" />
                <span className="text-xs font-medium">Explore</span>
                <ChevronRight
                  size={14}
                  className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Rating badge */}
          <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-2 py-1 border border-white/30">
            <Star
              size={12}
              className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] mr-1"
            />
            <span className="text-xs font-bold">4.9</span>
          </div>
        </div>
      </div>

      {/* Premium shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>

      {/* Floating corner accent */}
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
    </div>
  );
};

export default SimilarDestination;
