import { ChevronRight, Star, Bed } from "lucide-react";
import Image from "next/image";

type SimilarHotelProps = {
  title: string;
  image: string;
};

const SimilarHotels = ({ image, title }: SimilarHotelProps) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden h-44 sm:h-48 md:h-52 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer w-full max-w-none">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
      <Image
        src={image}
        alt={title}
        width={300}
        height={200}
        loading="lazy"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
        <div className="flex items-start justify-between gap-2 w-full">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
              {title}
            </p>
            <div className="flex items-center opacity-0 transform translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 border border-white/30">
                <Bed
                  size={10}
                  className="mr-1 text-[hsl(var(--accent))] sm:w-3 sm:h-3"
                />
                <span className="text-xs font-medium">Book Now</span>
                <ChevronRight
                  size={12}
                  className="ml-1 group-hover:translate-x-1 transition-transform duration-300 sm:w-3.5 sm:h-3.5"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-2 py-1 border border-white/30 flex-shrink-0">
            <Star
              size={10}
              className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] mr-1 sm:w-3 sm:h-3"
            />
            <span className="text-xs font-bold">4.8</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>
      <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
    </div>
  );
};

export default SimilarHotels;
