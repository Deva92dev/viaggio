import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
};

export const Pagination = ({
  currentPage = 1,
  itemsPerPage = 6,
  onPageChange,
  totalItems = 0,
  maxPagesToShow = 5,
}: PaginationProps) => {
  const safeItemsPerPage = Math.max(1, itemsPerPage);
  const totalPages = Math.max(
    1,
    Math.ceil(Math.max(0, totalItems) / safeItemsPerPage)
  );

  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1 || totalItems === 0) return null;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfway = Math.floor(maxPagesToShow / 2);
    // Always show first page
    pages.push(1);
    // calculate window around current page
    let startPage = Math.max(2, currentPage - halfway);
    let endPage = Math.min(totalPages - 1, currentPage + halfway);
    // Adjust if we're at the beginning
    if (currentPage <= halfway + 1) {
      endPage = Math.min(maxPagesToShow, totalPages - 1);
    }
    // Adjust if we're at the end
    if (currentPage >= totalPages - halfway) {
      startPage = Math.max(totalPages - maxPagesToShow + 1, 2);
    }
    // Add ellipsis if needed after first page
    if (startPage > 2) {
      pages.push("...");
    }
    // middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    // Add ellipsis if needed before last page
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer"
        aria-label="left-button"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {generatePageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            className="min-w-10 cursor-pointer"
            aria-label="next page buttons"
          >
            {page}
          </Button>
        ) : (
          <Button
            key={`ellipsis-${index}`}
            variant="outline"
            size="icon"
            disabled
            className="cursor-default"
            aria-label="ellipsis buttons"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer"
        aria-label="right button"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
