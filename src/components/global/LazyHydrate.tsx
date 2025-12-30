"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyHydrate({
  children,
  offset = "200px",
}: {
  children: React.ReactNode;
  offset?: string;
}) {
  const [hydrated, setHydrated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported (very old browsers), hydrate immediately
    if (!window.IntersectionObserver) {
      setHydrated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHydrated(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: offset }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [offset]);

  // If hydrated, render children normally.
  // If NOT hydrated, we render the HTML (Server Side Rendered content)
  // but we suppress React's effect on it using `suppressHydrationWarning`.
  // Note: In a simpler "skip rendering" approach, we just return a div until visible.

  if (hydrated) {
    return <>{children}</>;
  }

  return (
    <div ref={ref} suppressHydrationWarning>
      {/* This is the magic. We render a placeholder that matches the height 
        or simply nothing if we want to defer purely. 
        For max performance, we often just render a minimal skeleton or empty div
        to keep the DOM completely empty until scroll.
      */}
    </div>
  );
}
