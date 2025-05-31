"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface MotionSectionProps {
  children: ReactNode;
  scrollSpeed?: number;
  className?: string;
}

const MotionSection = ({
  children,
  scrollSpeed = 100,
  className,
}: MotionSectionProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -scrollSpeed]); // moves up on scroll

  // Fade-in effect when the section enters viewport
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default MotionSection;
