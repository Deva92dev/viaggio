import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 w-full h-screen">
        <Image
          src="/Hero.webp"
          alt="Travel background"
          fill
          priority
          sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
          className="object-cover"
          style={{ zIndex: 0 }}
        />
      </div>
      <div className="relative z-1 h-screen flex items-center justify-center ">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold">Travel Meets Leisure</h1>
          <p className="mt-4 mb-4">
            Enjoy the Scenic View of Natural Wonders Around The World
          </p>
          <Link href="/products">
            <Button className="cursor-pointer">Explore Now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
