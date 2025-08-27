import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Heart,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";
import SectionTitle from "../global/SectionTitle";
import { Button } from "../ui/button";
import { getGalleryImages } from "@/utils/actions";

const MotionSection = dynamic(() => import("./MotionSection"), {
  loading: () => <div className="opacity-0" />,
});

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
    <MotionSection
      animation={{
        type: "scale",
        direction: "up",
        duration: 0.6,
        delay: 0.5 + index * 0.1,
        ease: "easeInOut",
      }}
      mobile={{
        simpleAnimation: "fade",
        disableAnimations: false,
      }}
      triggerOnce={true}
      threshold={0.1}
      className="relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 aspect-square animate-fade-in group hover:-translate-y-1"
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
      <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),rgba(0,0,0,0.2)_60%,transparent_100%)]">
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
      <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full opacity-20 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-xl pointer-events-none transition-opacity duration-500 group-hover:opacity-40" />
    </MotionSection>
  );
}

const InstagramGallery = async () => {
  const images: GalleryImage[] = await getGalleryImages();

  return (
    <MotionSection
      parallax={{
        speed: 25,
        direction: "down",
        range: [0, 0.7],
      }}
      animation={{
        type: "fade",
        duration: 1.2,
        delay: 0.1,
        ease: "easeInOut",
      }}
      mobile={{
        disableParallax: true,
        simpleAnimation: "fade",
        disableAnimations: false,
        breakPoint: 768,
        reducedMotion: true,
      }}
      triggerOnce={true}
      threshold={0.1}
      overflow={true}
      className="relative w-full py-20 bg-gradient-to-b from-[hsl(var(--testimonials-bg))] to-[hsl(var(--background))]"
    >
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <figure className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center shadow-lg">
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
          <article className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 inline-block relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <header className="flex items-center justify-center gap-3 mb-4">
                <figure className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center shadow-lg">
                  <Instagram size={32} className="text-white" />
                </figure>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  @ViaggioTravel
                </h3>
              </header>

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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Button className="px-8 py-3 shadow-lg hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 relative overflow-hidden btn-accent group">
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

                <aside className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                  #ViaggioAdventures #TravelWithUs
                </aside>
              </div>
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-15 -z-10" />
          </article>
        </section>
      </main>
    </MotionSection>
  );
};

export default InstagramGallery;
