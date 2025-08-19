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

interface GalleryImage {
  id: string;
  url: string;
  name: string;
  type: "hotel" | "destination";
}

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
}

function GalleryCard({ image, index }: GalleryCardProps) {
  return (
    <article
      className="gallery-card group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Image
        src={image.url}
        alt={`${image.name} - ${
          image.type === "hotel"
            ? "Premium accommodation"
            : "Travel destination"
        }`}
        width={300}
        height={300}
        className="object-cover w-full h-full rounded-2xl group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQY..."
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
      />

      {/* Overlay with social interactions */}
      <div className="gallery-overlay">
        <div className="flex justify-end">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
              image.type === "hotel"
                ? "bg-[hsl(var(--primary))]/80"
                : "bg-[hsl(var(--accent))]/80"
            }`}
          >
            {image.type === "hotel" ? "Hotel" : "Destination"}
          </span>
        </div>

        <nav className="flex gap-3" aria-label="Social interactions">
          <button
            className="text-white hover:text-red-400 transition-colors cursor-pointer"
            aria-label="Like this image"
          >
            <Heart size={16} />
          </button>
          <button
            className="text-white hover:text-blue-400 transition-colors cursor-pointer"
            aria-label="Comment on this image"
          >
            <MessageCircle size={16} />
          </button>
          <button
            className="text-white hover:text-green-400 transition-colors cursor-pointer"
            aria-label="Share this image"
          >
            <Send size={16} />
          </button>
        </nav>
      </div>
    </article>
  );
}

const InstagramGallery = async () => {
  const images: GalleryImage[] = await getGalleryImages();

  return (
    <MotionSection scrollSpeed={50} className="instagram-gallery-bg">
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <figure className="instagram-header-icon">
              <Instagram size={24} className="text-white" />
            </figure>
            <SectionTitle
              text="Follow Our Adventures"
              description="Real moments from travelers exploring the world with Viaggio"
            />
          </div>
        </header>

        {/* Gallery Grid */}
        <section
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12"
          aria-label="Instagram photo gallery"
        >
          {images.map((image, index) => (
            <GalleryCard image={image} index={index} key={image.id} />
          ))}
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <article className="instagram-cta-card">
            <div className="space-y-6 relative z-10">
              <header className="flex items-center justify-center gap-3 mb-4">
                <figure className="instagram-header-icon">
                  <Instagram size={32} className="text-white" />
                </figure>
                <h3 className="instagram-title">@ViaggioTravel</h3>
              </header>

              <p className="instagram-description">
                Join our community of adventurous travelers and share your
                amazing moments. Tag us for a chance to be featured!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://instagram.com/viaggiotravel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="instagram-follow-button btn-accent group">
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

                <aside className="instagram-hashtags">
                  #ViaggioAdventures #TravelWithUs
                </aside>
              </div>
            </div>
          </article>
        </section>
      </main>
    </MotionSection>
  );
};

export default InstagramGallery;
