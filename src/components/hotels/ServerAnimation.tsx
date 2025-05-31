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

// add all category icons here
export const AmenityIcon = ({ name }: AmenityProps) => {
  const getIcon = () => {
    switch (name.toLowerCase()) {
      case "wifi":
        return <Wifi size={20} />;
      case "breakfast":
        return <Coffee size={20} />;
      case "restaurants":
        return <Utensils size={20} />;
      case "pool":
        return <WavesLadder size={20} />;
      case "private beach":
        return <WavesLadder size={20} />;
      case "gym":
        return <Dumbbell size={20} />;
      case "spa":
        return <Droplets size={20} />;
      case "historic architecture":
        return <Building2 size={20} />;
      case "fine dining":
        return <HandPlatter size={20} />;
      case "luxury dining":
        return <HandPlatter size={20} />;
      case "guided tours":
        return <TorusIcon size={20} />;
      case "rooftop bar":
        return <Wine size={20} />;
      case "bar":
        return <Beer size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
      {getIcon()}
      <span className="text-sm">{name}</span>
    </div>
  );
};

export const HorizontalLine = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-900/30 to-transparent pointer-events-none"></div>
  );
};

// Clouds
export const FloatingClods = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
      <div className="cloud-1 absolute w-20 h-12 bg-white/30 rounded-full opacity-70"></div>
      <div className="cloud-2 absolute w-20 h-10 bg-white/20 rounded-full opacity-60"></div>
    </div>
  );
};

export const CompassAnimation = () => {
  return (
    <div className="relative w-12 h-12 text-blue-600 compass-animation">
      <Compass className="w-full h-full" />
    </div>
  );
};
