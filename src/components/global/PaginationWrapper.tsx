"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Prev */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        className="cursor-pointer"
        asChild
      >
        <Link
          href={createPageUrl(currentPage - 1)}
          scroll={false}
          aria-disabled={currentPage === 1}
          onClick={(e) => currentPage === 1 && e.preventDefault()}
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
      </Button>

      {/* Pages number */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          asChild
        >
          <Link href={createPageUrl(page)} scroll={false}>
            {page}
          </Link>
        </Button>
      ))}

      {/* next Page */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        className="cursor-pointer"
        asChild
      >
        <Link
          href={createPageUrl(currentPage + 1)}
          scroll={false}
          aria-disabled={currentPage === totalPages}
          onClick={(e) => currentPage === totalPages && e.preventDefault()}
        >
          <ChevronRight className="w-6 h-6" />
        </Link>
      </Button>
    </div>
  );
};

export default PaginationWrapper;
