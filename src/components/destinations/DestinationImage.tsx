import Image from "next/image";
import React from "react";

const DestinationImage = () => {
  return (
    <div className="relative max-h-dvh overflow-hidden shadow-2xl shadow-blue-400/20">
      <Image
        src="/Zermatt.jpg"
        alt="destination page image"
        width={800}
        height={600}
        priority
        className="rounded-md object-cover w-full h-auto"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <h1 className="text-2xl md:text-7xl font-bold text-white text-center">
          Places To Travel
        </h1>
      </div>
    </div>
  );
};

export default DestinationImage;
