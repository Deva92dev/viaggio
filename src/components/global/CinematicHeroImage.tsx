"use client";
import { m, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type CinematicHeroImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function CinematicHeroImage({
  src,
  alt,
  priority = true,
}: CinematicHeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // This prevents the image from "drifting" too far from the scroll position
  const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 };

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 1.15]),
    springConfig
  );

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
    springConfig
  );

  // ref and animations must be on different divs
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden w-full h-full"
    >
      <m.div
        style={{ scale, y }}
        className="relative w-full h-full will-change-transform origin-center"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
          // Safari often needs this to prevent flickering during 3D transforms
          style={{ transform: "translateZ(0)" }}
        />
      </m.div>
    </div>
  );
}
