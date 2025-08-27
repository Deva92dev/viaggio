import { CalendarSearch } from "lucide-react";

type Props = {
  bestTimeToVisit: string[];
};

const BestTimecard = ({ bestTimeToVisit }: Props) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 hover-glow hover:-translate-y-2">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-600 rounded-xl flex items-center justify-center mr-3">
          <CalendarSearch size={20} className="text-white" />
        </div>
        <h3 className="font-bold text-[hsl(var(--foreground))] text-xl">
          Best Time to Visit
        </h3>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        {bestTimeToVisit.map((time, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md"
          >
            {time}
          </span>
        ))}
      </div>
      <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
        The weather is most favorable during these seasons, providing the
        optimal experience for travelers.
      </p>
    </div>
  );
};

export default BestTimecard;
