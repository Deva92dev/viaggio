import {
  Beer,
  Building2,
  Coffee,
  Droplets,
  Dumbbell,
  HandPlatter,
  TorusIcon,
  Utensils,
  WavesLadder,
  Wifi,
  Wine,
  Compass,
} from "lucide-react";

type AmenityProps = {
  name: string;
};

// Enhanced AmenityIcon with brand colors and premium styling
export const AmenityIcon = ({ name }: AmenityProps) => {
  const getIcon = () => {
    switch (name.toLowerCase()) {
      case "wifi":
        return <Wifi size={18} />;
      case "breakfast":
        return <Coffee size={18} />;
      case "restaurants":
        return <Utensils size={18} />;
      case "pool":
        return <WavesLadder size={18} />;
      case "private beach":
        return <WavesLadder size={18} />;
      case "gym":
        return <Dumbbell size={18} />;
      case "spa":
        return <Droplets size={18} />;
      case "historic architecture":
        return <Building2 size={18} />;
      case "fine dining":
        return <HandPlatter size={18} />;
      case "luxury dining":
        return <HandPlatter size={18} />;
      case "guided tours":
        return <TorusIcon size={18} />;
      case "rooftop bar":
        return <Wine size={18} />;
      case "bar":
        return <Beer size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))]/10 hover:from-[hsl(var(--primary))]/20 hover:to-[hsl(var(--accent))]/20 border border-[hsl(var(--primary))]/20 hover:border-[hsl(var(--primary))]/40 text-[hsl(var(--primary))] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/20 cursor-default">
      <div className="w-6 h-6 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center">
        <div className="text-white">{getIcon()}</div>
      </div>
      <span className="text-sm font-semibold group-hover:text-[hsl(var(--accent))] transition-colors duration-300">
        {name}
      </span>
    </div>
  );
};

// Enhanced HorizontalLine with brand gradients
export const HorizontalLine = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[hsl(var(--primary))]/40 via-[hsl(var(--primary))]/20 to-transparent pointer-events-none">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))]"></div>
    </div>
  );
};

// Enhanced FloatingClods with brand colors and animations
export const FloatingClods = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
      {/* Enhanced floating clouds with brand colors */}
      <div className="absolute top-10 left-20 w-24 h-14 bg-gradient-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/30 rounded-full blur-sm opacity-60 animate-float"></div>
      <div className="absolute top-16 right-32 w-32 h-16 bg-gradient-to-l from-[hsl(var(--accent))]/25 to-[hsl(var(--primary))]/20 rounded-full blur-md opacity-50 animate-float-slow"></div>
      <div className="absolute top-6 left-1/3 w-20 h-12 bg-white/30 rounded-full blur-sm opacity-40 animate-float-delay"></div>

      {/* Additional decorative elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-[hsl(var(--accent))]/20 rounded-full blur-2xl opacity-30 animate-pulse"></div>
      <div
        className="absolute top-32 left-16 w-20 h-20 bg-[hsl(var(--primary))]/15 rounded-full blur-3xl opacity-25 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

// Enhanced CompassAnimation with brand styling
export const CompassAnimation = () => {
  return (
    <div className="relative w-12 h-12 group">
      {/* Enhanced background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>

      {/* Glass morphism background */}
      <div className="relative w-full h-full bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
        <Compass className="w-7 h-7 text-[hsl(var(--primary))] animated-compass group-hover:text-[hsl(var(--accent))] transition-colors duration-300" />
      </div>
    </div>
  );
};
