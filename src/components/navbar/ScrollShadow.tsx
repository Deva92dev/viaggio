"use client";

import { useEffect, useState } from "react";

export default function ScrollShadow() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <style jsx global>{`
      nav {
        box-shadow: ${scrolled
          ? "0 4px 12px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.05)"};
        transition: box-shadow 0.3s ease;
      }
    `}</style>
  );
}
