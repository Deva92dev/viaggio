"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type SmartLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const SmartLink = ({ href, children, className }: SmartLinkProps) => {
  const router = useRouter();
  const [prefetched, setPrefetched] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (!prefetched) {
      // Small delay prevents accidental hovers from triggering
      timeoutRef.current = setTimeout(() => {
        router.prefetch(href);
        setPrefetched(true);
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
};

export default SmartLink;
