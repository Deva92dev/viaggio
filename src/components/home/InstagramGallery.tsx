import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Heart,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";

import MotionSection from "./MotionSection";
import SectionTitle from "../global/SectionTitle";
import { Button } from "../ui/button";
import { getGalleryImages } from "@/utils/actions";

const InstagramGallery = async () => {
  const images = await getGalleryImages();

  return (
    <MotionSection
      scrollSpeed={50}
      className="relative w-full py-20 bg-gradient-to-b from-[hsl(var(--testimonials-bg))] to-[hsl(var(--background))]"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-10 animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-12 animate-pulse"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Enhanced Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center shadow-lg">
              <Instagram size={24} className="text-white" />
            </div>
            <SectionTitle
              text="Follow Our Adventures"
              description="Real moments from travelers exploring the world with Viaggio"
            />
          </div>
        </div>

        {/* Enhanced Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in aspect-square"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />

              {/* Image */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src={image.url}
                  alt={`${image.name} - ${
                    image.type === "hotel"
                      ? "Premium accommodation"
                      : "Travel destination"
                  }`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Instagram-style interaction icons */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-3">
                    <Heart
                      size={16}
                      className="text-white hover:text-red-400 transition-colors cursor-pointer"
                    />
                    <MessageCircle
                      size={16}
                      className="text-white hover:text-blue-400 transition-colors cursor-pointer"
                    />
                    <Send
                      size={16}
                      className="text-white hover:text-green-400 transition-colors cursor-pointer"
                    />
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                        image.type === "hotel"
                          ? "bg-[hsl(var(--primary))]/80"
                          : "bg-[hsl(var(--accent))]/80"
                      }`}
                    >
                      {image.type === "hotel" ? "Hotel" : "Destination"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating corner accent */}
              <div
                className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br ${
                  image.type === "hotel"
                    ? "from-[hsl(var(--primary))] to-blue-600"
                    : "from-[hsl(var(--accent))] to-orange-600"
                } rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 inline-block">
            {/* Decorative gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />

            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Instagram size={32} className="text-[hsl(var(--primary))]" />
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  @ViaggioTravel
                </h3>
              </div>

              <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto leading-relaxed">
                Join our community of adventurous travelers and share your
                amazing moments. Tag us for a chance to be featured!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://instagram.com/viaggiotravel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="btn-accent px-8 py-3 shadow-lg shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                    {/* Button shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <span className="flex items-center gap-3 relative z-10 font-semibold">
                      <Instagram size={20} />
                      Follow Us
                      <ExternalLink
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </Button>
                </Link>

                <div className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                  #ViaggioAdventures #TravelWithUs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating decorative elements */}
      <div className="absolute top-1/3 left-8 w-16 h-16 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-15 animate-float" />
      <div className="absolute bottom-1/3 right-8 w-20 h-20 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-20 animate-float-slow" />
    </MotionSection>
  );
};

export default InstagramGallery;
