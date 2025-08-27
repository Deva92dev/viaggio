import { Star } from "lucide-react";
import Review from "../reviews/Review";

const DestReviewWrapper = ({ id }: { id: string }) => {
  return (
    <section className="mt-20 animate-fade-in">
      <div className="flex items-center mb-10">
        <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
          <Star size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Traveler Reviews
          </h2>
        </div>
      </div>
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />
        <div className="p-8 md:p-10">
          <Review itemId={id} itemType="destination" />
        </div>
      </div>
    </section>
  );
};

export default DestReviewWrapper;
