import { ChevronRight } from "lucide-react";
import Image from "next/image";

type RecommendedType = {
  title: string;
  imageUrl: string;
};

const SimilarDestination = async ({ imageUrl, title }: RecommendedType) => {
  return (
    <div className="group relative rounded-lg overflow-hidden h-44 shadow-md">
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={200}
        className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full p-3 text-white ">
        <p className="font-medium text-sm">{title}</p>
        <div className="flex items-center mt-1 opacity-0 transform translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="text-xs">Explore</span>
          <ChevronRight size={14} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default SimilarDestination;
