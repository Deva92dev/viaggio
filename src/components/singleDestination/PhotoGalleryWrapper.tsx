import { Camera } from "lucide-react";
import { PhotoGallery } from "./TourAnimation";

type Props = {
  imageUrl: string;
  name: string;
};

const PhotoGalleryWrapper = ({ imageUrl, name }: Props) => {
  return (
    <section className="animate-fade-in">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
          <Camera size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Destination Gallery
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 image-zoom-hover">
          <PhotoGallery imageUrl={imageUrl} name={name} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 image-zoom-hover">
            <PhotoGallery imageUrl={imageUrl} name={name} />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 image-zoom-hover">
            <PhotoGallery imageUrl={imageUrl} name={name} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGalleryWrapper;
