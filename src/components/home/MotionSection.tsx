/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  parallax?: {
    speed?: number;
    direction?: "up" | "down" | "left" | "right";
    range?: [number, number];
    offset?: [string, string];
  };
  animation?: {
    type?: "fade" | "slide" | "scale" | "rotate" | "bounce" | "none";
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    delay?: number;
    stagger?: number; // for child elements
    ease?: string; // custom ease
  };
  triggerOnce?: boolean;
  threshold?: number | number[];
  overflow?: boolean;
  mobile?: {
    disableParallax?: boolean;
    disableAnimations?: boolean;
    simpleAnimation: "fade" | "none";
    breakPoint?: number;
    reducedMotion?: boolean;
  };
  performance?: {
    willChange?: boolean;
    gpuAcceleration?: boolean;
    reducedMotionFallback?: boolean;
  };
  // Custom variants (for advanced users)
  customVariants?: {
    initial: any;
    animate: any;
    exit?: any;
  };
}

const MotionSection = ({
  children,
  className = "",
  parallax = { speed: 0, direction: "up" },
  animation = { type: "fade", direction: "up", duration: 0.8 },
  triggerOnce = true,
  threshold = 0.2,
  overflow = false,
  mobile = {
    disableParallax: true,
    disableAnimations: false,
    simpleAnimation: "fade",
    breakPoint: 768,
    reducedMotion: true,
  },
  performance = {
    willChange: true,
    gpuAcceleration: true,
    reducedMotionFallback: true,
  },
  customVariants,
}: MotionSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Check mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < (mobile.breakPoint || 768));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [mobile.breakPoint]);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce,
    threshold: isMobile
      ? Array.isArray(threshold)
        ? threshold.map((t) => Math.max(t * 0.3, 0.1))
        : Math.max(threshold * 0.3, 0.1)
      : threshold,
    rootMargin: isMobile ? "20px" : "50px",
  });

  const combinedRef = (node: HTMLElement) => {
    if (node) {
      inViewRef(node);
      (ref as any).current = node;
    }
  };

  const offsetValue = parallax.offset || ["start end", "end start"];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offsetValue as any,
  });

  const GetParallaxTransform = () => {
    const disableParallax =
      parallax.speed === 0 ||
      (isMobile && mobile.disableParallax) ||
      (prefersReducedMotion && mobile.reducedMotion);

    const moveDistance = parallax.speed ?? 0;
    const scrollRange = parallax.range || [0, 1];

    // Always call useTransform once
    return useTransform(
      scrollYProgress,
      scrollRange,
      disableParallax
        ? [0, 0]
        : (() => {
            switch (parallax.direction) {
              case "up":
                return [0, -moveDistance];
              case "down":
                return [0, moveDistance];
              case "left":
                return [0, -moveDistance];
              case "right":
                return [0, moveDistance];
              default:
                return [0, -moveDistance];
            }
          })()
    );
  };

  const getAnimationVariants = () => {
    if (customVariants) {
      return {
        ...customVariants,
        transition: {
          duration: animation.duration || 0.8,
          delay: animation.delay || 0,
          ease: animation.ease || "easeOut",
        },
      };
    }

    let currentAnimation = animation;
    // Handle mobile and reduced motion overrides
    if (isMobile || prefersReducedMotion) {
      if (mobile.disableAnimations || prefersReducedMotion) {
        currentAnimation = { ...animation, type: "none" };
      } else if (mobile.simpleAnimation) {
        currentAnimation = {
          ...animation,
          type: mobile.simpleAnimation,
          duration: Math.min(animation.duration || 0.8, 0.5),
          delay: Math.min(animation.delay || 0, 0.2),
        };
      }
    }

    const {
      type = "fade",
      direction = "up",
      duration = 0.8,
      delay = 0,
      ease = "easeOut",
      stagger = 0,
    } = currentAnimation;

    const variants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      },
      slide: {
        initial: {
          opacity: 0,
          // Reduce slide distance on mobile to prevent viewport overflow
          x:
            direction === "left"
              ? isMobile
                ? -20
                : -60
              : direction === "right"
              ? isMobile
                ? 20
                : 60
              : 0,
          y:
            direction === "up"
              ? isMobile
                ? 20
                : 60
              : direction === "down"
              ? isMobile
                ? -20
                : -60
              : 0,
        },
        animate: { opacity: 1, x: 0, y: 0 },
      },
      scale: {
        initial: { opacity: 0, scale: isMobile ? 0.95 : 0.8 },
        animate: { opacity: 1, scale: 1 },
      },
      rotate: {
        initial: {
          opacity: 0,
          rotate: isMobile ? -5 : -10,
          scale: isMobile ? 0.95 : 0.9,
        },
        animate: { opacity: 1, rotate: 0, scale: 1 },
      },
      bounce: {
        initial: {
          opacity: 0,
          y: isMobile ? 20 : 60,
          scale: isMobile ? 0.95 : 0.9,
        },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        },
      },
      none: {
        initial: {},
        animate: {},
      },
    };

    return {
      ...variants[type],
      transition: {
        duration,
        delay,
        ease,
        staggerChildren: stagger > 0 ? stagger : undefined,
      },
    };
  };

  const parallaxTransform = GetParallaxTransform();
  const animationVariants = getAnimationVariants();

  const shouldAnimate =
    !prefersReducedMotion &&
    !(isMobile && mobile.disableAnimations) &&
    animation.type !== "none";

  // Motion style for parallax
  const getMotionStyle = () => {
    const baseStyle: any = {};

    // Parallax transform
    if (
      parallax.speed !== 0 &&
      !(isMobile && mobile.disableParallax) &&
      !prefersReducedMotion
    ) {
      switch (parallax.direction) {
        case "left":
        case "right":
          baseStyle.x = parallaxTransform;
          break;
        default:
          baseStyle.y = parallaxTransform;
      }
    }

    // Performance optimizations
    if (performance.willChange) {
      baseStyle.willChange = "transform, opacity";
    }

    return baseStyle;
  };

  const getEnhancedClassName = () => {
    let classes = className;
    if (isMobile) {
      // Always allow overflow on mobile to prevent content cutoff
      classes += " overflow-visible";
      // Ensure full width utilization
      classes += " w-full min-w-0";
    } else {
      // Desktop behavior
      if (overflow) {
        classes += " overflow-visible";
      } else {
        classes += " overflow-hidden";
      }
    }

    // Add performance class if enabled.
    if (performance.gpuAcceleration && !isMobile) {
      classes += " motion-safe:transform-gpu";
    }
    if (prefersReducedMotion) {
      classes += " motion-reduce:transform-none";
    }

    return classes.trim();
  };

  return (
    <motion.section
      ref={combinedRef}
      style={getMotionStyle()}
      initial={shouldAnimate ? animationVariants.initial : false}
      animate={
        shouldAnimate
          ? inView
            ? animationVariants.animate
            : animationVariants.initial
          : false
      }
      transition={animationVariants.transition}
      className={getEnhancedClassName()}
    >
      {children}
    </motion.section>
  );
};

export default MotionSection;
