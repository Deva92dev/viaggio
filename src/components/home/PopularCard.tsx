"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { motion } from "motion/react";

interface PopularCardProps {
  destination: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    location: string;
  };
  index: number;
}

export default function PopularCard({ destination, index }: PopularCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl bg-white/90 border border-white/20 h-full flex flex-col"
    >
      <div className="relative h-64 xl:h-80 overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          // Optimized sizes for grid layout
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          quality={75}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2 border border-white/30">
          <MapPin size={12} className="text-white" />
          <span className="text-white text-xs font-semibold">
            {destination.location}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 bg-orange-500 rounded-full px-3 py-1 shadow-lg">
          <span className="text-white text-sm font-bold">
            {formatCurrency(destination.price)}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-4">{destination.name}</h3>
        <div className="mt-auto">
          <Link
            href={`/destinations/${destination.id}`}
            className="w-full bg-slate-900 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Explore
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
