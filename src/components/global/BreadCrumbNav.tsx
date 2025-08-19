import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface Item {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface Props {
  items: Item[];
  className?: string;
}

export default function BreadcrumbNav({ items, className = "" }: Props) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20
                  shadow-lg px-4 py-3 ${className}`}
    >
      <Breadcrumb>
        {/* <ol> rendered internally */}
        <BreadcrumbList className="flex flex-wrap items-center space-x-2">
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="cursor-pointer">
              <Link
                href="/"
                className="flex items-center text-white/90 hover:text-white transition-colors font-medium"
              >
                <Home size={16} className="mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* first separator */}
          <BreadcrumbSeparator>
            <ChevronRight size={16} className="text-white/60" />
          </BreadcrumbSeparator>
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem className="cursor-pointer">
                {item.isCurrentPage ? (
                  <BreadcrumbPage className="text-white font-semibold bg-white/20 px-3 py-1 rounded-full">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href || "#"}
                      className="text-white/90 hover:text-white transition-colors font-medium hover:bg-white/10 px-3 py-1 rounded-full"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {i < items.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight size={16} className="text-white/60" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
