import { Camera, Clock, Compass, Globe, MapPin, Plane } from "lucide-react";
import Image from "next/image";

export const JourneyPath = () => {
  return (
    <div className="absolute bottom-10 left-10 w-full h-24 pointer-events-none z-10 overflow-hidden">
      <div className="journey-path opacity-30"></div>
      {/*  floating elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 rounded-full blur-2xl animate-pulse"></div>
    </div>
  );
};

export const AnimatedCompass = () => {
  return (
    <div className="relative w-10 h-10 animated-compass">
      {/* gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full blur opacity-30 animate-pulse"></div>
      <div className="relative w-full h-full bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
        <Compass className="w-6 h-6 text-[hsl(var(--primary))]" />
      </div>
    </div>
  );
};

export const WorldMapBackGround = () => {
  return (
    <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-5 pointer-events-none z-0">
      <div className="relative w-full h-full">
        <Globe className="w-full h-full text-[hsl(var(--primary))]" />
        {/* floating decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-[hsl(var(--accent))] rounded-full blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-[hsl(var(--primary))] rounded-full blur-3xl opacity-15 animate-float-slow"></div>
      </div>
    </div>
  );
};

type DurationProps = {
  duration: string;
};

export const Duration = ({ duration }: DurationProps) => {
  const durationText = duration.toLowerCase();

  return (
    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
      <div className="w-5 h-5 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center mr-2">
        <Clock size={12} className="text-white" />
      </div>
      <span className="text-sm font-semibold text-black">{durationText}</span>
    </div>
  );
};

type LocationType = {
  location: string;
  country: string;
};

export const Location3DCard = ({ location, country }: LocationType) => {
  return (
    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 card-hover-lift overflow-hidden">
      {/*  gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-20 -z-10"></div>
      {/*  corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-bl-2xl rounded-tr-2xl flex items-center justify-center shadow-lg">
        <Plane size={20} className="text-white transform rotate-45" />
      </div>
      {/* Floating decorative element */}
      <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-600 rounded-full blur-lg opacity-20"></div>
      <h3 className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-4">
        Destination
      </h3>
      <div className="flex items-start mt-6">
        <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--accent))] to-red-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <MapPin className="text-white" size={16} />
        </div>
        <div>
          <p className="font-bold text-black text-lg">{location}</p>
          <p className="font-medium text-black mt-1">{country}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]"></div>
    </div>
  );
};

type PhotoGalleryProps = {
  imageUrl: string;
  name: string;
};

export const PhotoGallery = ({ imageUrl, name }: PhotoGalleryProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/*  gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={300}
        loading="lazy"
        quality={60}
        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* content overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white z-20">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-lg mb-1">Photo Gallery</p>
            <p className="text-sm text-white/80">Explore {name}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
            <Camera size={20} className="text-white" />
          </div>
        </div>
      </div>
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100 z-30"></div>
    </div>
  );
};
