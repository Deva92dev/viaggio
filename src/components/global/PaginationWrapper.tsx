"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
};

const PaginationWrapper = ({
  currentPage,
  itemsPerPage,
  totalItems,
}: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create page URL while preserving existing search params
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate visible page numbers - mobile optimized
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 2) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 1) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage, "...", totalPages];
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <section className="relative w-screen py-8 sm:py-12 md:py-16 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--features-bg))]">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-5 animate-pulse" />
        <div
          className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-8 animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>
      <div className="relative z-10 w-full px-3 sm:px-6 md:px-12">
        <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Results Info - Mobile optimized */}
          <div className="text-center">
            <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base lg:text-lg">
              Showing{" "}
              <span className="font-bold text-[hsl(var(--primary))]">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>
              {" - "}
              <span className="font-bold text-[hsl(var(--primary))]">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>
              {" of "}
              <span className="font-bold text-[hsl(var(--primary))]">
                {totalItems}
              </span>
              {" results"}
            </p>
          </div>
          {/* Main Pagination Container - Mobile responsive */}
          <div className="relative w-full max-w-lg">
            {/* Enhanced decorative background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-20" />
            {/* Pagination Content */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-2 sm:p-4">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {/* Previous Button - Mobile optimized */}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === 1}
                  className={`px-2 sm:px-3 py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm ${
                    currentPage === 1
                      ? "text-[hsl(var(--muted-foreground))] cursor-not-allowed opacity-40"
                      : "text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 hover:scale-105 shadow-md"
                  }`}
                  asChild
                >
                  <Link
                    href={createPageUrl(currentPage - 1)}
                    scroll={false}
                    aria-disabled={currentPage === 1}
                    onClick={(e) => currentPage === 1 && e.preventDefault()}
                    className="flex items-center gap-1 sm:gap-2"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </Link>
                </Button>
                {/* Page Numbers - Mobile responsive */}
                <div className="flex items-center gap-1">
                  {visiblePages.map((page, index) => {
                    if (page === "...") {
                      return (
                        <div
                          key={`dots-${index}`}
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-[hsl(var(--muted-foreground))]"
                        >
                          <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      );
                    }
                    const isActive = page === currentPage;
                    return (
                      <Button
                        key={page}
                        variant="ghost"
                        size="sm"
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-xl transition-all duration-300 font-semibold text-xs sm:text-sm ${
                          isActive
                            ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))/0.9] text-white shadow-lg scale-110"
                            : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]/10 hover:text-[hsl(var(--accent))] hover:scale-105 hover:shadow-md"
                        }`}
                        asChild
                      >
                        <Link
                          href={createPageUrl(page as number)}
                          scroll={false}
                          className="flex items-center justify-center w-full h-full"
                        >
                          {page}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
                {/* Next Button - Mobile optimized */}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === totalPages}
                  className={`px-2 sm:px-3 py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm ${
                    currentPage === totalPages
                      ? "text-[hsl(var(--muted-foreground))] cursor-not-allowed opacity-40"
                      : "text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 hover:scale-105 shadow-md"
                  }`}
                  asChild
                >
                  <Link
                    href={createPageUrl(currentPage + 1)}
                    scroll={false}
                    aria-disabled={currentPage === totalPages}
                    onClick={(e) =>
                      currentPage === totalPages && e.preventDefault()
                    }
                    className="flex items-center gap-1 sm:gap-2"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Enhanced Progress Bar - Mobile responsive */}
          <div className="w-32 sm:w-48 md:w-64 h-1 sm:h-2 bg-[hsl(var(--border))] rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
          {/* Page Jump Info - Mobile responsive */}
          <div className="text-center">
            <p className="text-[hsl(var(--muted-foreground))] text-xs sm:text-sm">
              Page{" "}
              <span className="font-bold text-[hsl(var(--accent))]">
                {currentPage}
              </span>
              {" of "}
              <span className="font-bold text-[hsl(var(--accent))]">
                {totalPages}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaginationWrapper;
