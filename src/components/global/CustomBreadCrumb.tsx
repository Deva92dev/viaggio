"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Item {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface Props {
  items: Item[];
  className?: string;
}

export default function CustomBreadcrumb({ items, className = "" }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg px-4 py-2 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {/* Home Link */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-white/90 hover:text-white transition-colors font-medium"
          >
            <Home size={16} className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        <li className="flex items-center">
          <ChevronRight size={16} className="text-white/60" />
        </li>

        {/* Dynamic Items */}
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <li className="flex items-center">
              {item.isCurrentPage ? (
                <span className="text-white font-semibold bg-white/20 px-3 py-1 rounded-full">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="text-white/90 hover:text-white transition-colors font-medium hover:bg-white/10 px-3 py-1 rounded-full"
                >
                  {item.label}
                </Link>
              )}
            </li>
            {i < items.length - 1 && (
              <li className="flex items-center">
                <ChevronRight size={16} className="text-white/60" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
