"use client";

import { LazyMotion } from "motion/react";
import { PropsWithChildren } from "react";

// It moves ~30kb of animation logic out of the main bundle.
const loadFeatures = async () => {
  const res = await import("motion/react");
  return res.domAnimation;
};

export const MotionProvider = ({ children }: PropsWithChildren) => {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
};
