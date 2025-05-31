import { Compass } from "lucide-react";
import { Camera, Clock, Globe, MapPin, Plane } from "lucide-react";
import Image from "next/image";

export const JourneyPath = () => {
  return (
    <div className="absolute bottom-10 left-10 w-full h-24 pointer-events-none z-10 overflow-hidden">
      <div className="journey-path"></div>
    </div>
  );
};

export const AnimatedCompass = () => {
  return (
    <div className="relative w-8 h-8 animated-compass">
      <Compass className="w-full h-full text-blue-600" />
    </div>
  );
};

export const WorldMapBackGround = () => {
  return (
    <div className="absolute right-0 bottom-0 w-1/3 h-1/3 opacity-5 pointer-events-none z-0">
      <Globe className="w-full h-full" />
    </div>
  );
};

type DurationProps = {
  duration: string;
};

export const Duration = ({ duration }: DurationProps) => {
  const durationText = duration.toLowerCase();

  return (
    <div className="inline-flex items-center px-3 py-1 bg-indigo-100 border border-indigo-200 text-indigo-800 rounded-full">
      <Clock size={16} className="mr-1" />
      <span className="text-sm font-medium">{durationText}</span>
    </div>
  );
};

type LocationType = {
  location: string;
  country: string;
};

export const Location3DCard = ({ location, country }: LocationType) => {
  return (
    <div className="relative bg-white rounded-lg border border-gray-200 shadow-md p-4 transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 rounded-bl-lg rounded-tr-lg flex items-center justify-center">
        <Plane size={24} className="text-white transform rotate-45" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">Destination</h3>
      <div className="flex items-start mt-4">
        <MapPin className="text-red-500 mt-1 mr-2 flex-shrink-0" size={20} />
        <div>
          <p className="font-bold text-gray-800">{location}</p>
          <p className="font-medium text-gray-600">{country}</p>
        </div>
      </div>
    </div>
  );
};

type PhotoGalleryProps = {
  imageUrl: string;
  name: string;
};

export const PhotoGallery = ({ imageUrl, name }: PhotoGalleryProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden group cursor-pointer">
      <div className="absolute  inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover transition duration-700 group-hover:scale-100"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
        <div className="flex justify-between items-center">
          <p className="font-medium">Photo Gallery</p>
          <Camera size={20} />
        </div>
      </div>
    </div>
  );
};
