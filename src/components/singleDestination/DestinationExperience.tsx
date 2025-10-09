import { Camera, Clock, Compass, Sun } from "lucide-react";

type Props = {
  description: string;
  bestTimeToVisit: string[];
  duration: string;
  category: string;
};

const DestinationExperience = ({
  bestTimeToVisit,
  category,
  description,
  duration,
}: Props) => {
  return (
    <section className="animate-fade-in">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
          <Compass size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Destination Experience
          </h2>
        </div>
      </div>
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />
        <div className="p-8 md:p-10">
          <div className="prose max-w-none">
            <p className="text-black text-lg leading-relaxed mb-8">
              {description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* info cards */}
            <div className="bg-gradient-to-br from-[hsl(var(--features-bg))] to-white rounded-2xl p-6 border border-[hsl(var(--border))] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-xl flex items-center justify-center mr-3">
                  <Sun className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-[hsl(var(--foreground))] text-lg">
                  Perfect Time To Visit
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {bestTimeToVisit.map((time, index) => (
                  <span
                    key={index}
                    className="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[hsl(var(--features-bg))] to-white rounded-2xl p-6 border border-[hsl(var(--border))] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <Clock size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-[hsl(var(--foreground))] text-lg">
                  Tour Duration
                </h3>
              </div>
              <p className="text-black mt-4 leading-relaxed">
                <span className="font-bold text-[hsl(var(--primary))]">
                  {duration.toUpperCase()}
                </span>
                - Perfect for{" "}
                {duration.includes("day")
                  ? "short getaways"
                  : "extended exploration"}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white rounded-2xl p-6 border border-[hsl(var(--border))] shadow-lg hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <Camera size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-[hsl(var(--foreground))] text-lg">
                Surroundings Views
              </h3>
            </div>
            <p className="text-black mt-4 leading-relaxed">
              <span className="font-bold text-[hsl(var(--primary))]">
                {category.toUpperCase()}
              </span>
              - providing breathtaking scenery and unique experiences for
              travelers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationExperience;
