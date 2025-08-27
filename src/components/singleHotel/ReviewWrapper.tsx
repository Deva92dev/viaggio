import { Star } from "lucide-react";
import Review from "../reviews/Review";

type ReviewWrapperProps = {
  id: string;
};

const ReviewWrapper = ({ id }: ReviewWrapperProps) => {
  return (
    <div className="mt-16 sm:mt-18 md:mt-20 motion-safe:animate-fade-in w-full">
      <div className="flex items-center mb-8 sm:mb-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
          <Star size={20} className="text-white sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Guest Reviews
          </h2>
        </div>
      </div>
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl sm:rounded-3xl blur opacity-20 -z-10" />
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          <Review itemId={id} itemType="hotel" />
        </div>
      </div>
    </div>
  );
};

export default ReviewWrapper;
