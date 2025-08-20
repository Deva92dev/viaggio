/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFilteredResults } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { RefreshCcw, MapPin, DollarSign, Hotel, Compass } from "lucide-react";
import { Pagination } from "@/components/search/Pagination";
import { useEffect, useMemo, useState } from "react";

// improve image loading fill or not fill priority for 4 cards images

const SearchContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ITEM_PER_PAGE = 6;
  const [isParamsProcessed, setIsParamsProcessed] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );

  const query = useMemo(
    () => ({
      destination: searchParams.get("destination") || undefined,
      country: searchParams.get("country") || undefined,
      checkIn: searchParams.get("checkIn") || undefined,
      checkOut: searchParams.get("checkOut") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      page: currentPage,
      limit: ITEM_PER_PAGE,
    }),
    [searchParams, currentPage]
  );

  const hasSearchParams = Object.values({
    destination: query.destination,
    country: query.country,
    checkIn: query.checkIn,
    checkOut: query.checkOut,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
  }).some((param) => param !== undefined);

  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page") || "1");
    if (currentPage !== urlPage) {
      setCurrentPage(urlPage);
    }
    setIsParamsProcessed(true);
  }, [currentPage, searchParams]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "filteredResults",
      query.destination,
      query.country,
      query.checkIn,
      query.checkOut,
      query.minPrice,
      query.maxPrice,
      currentPage,
    ],
    queryFn: () => {
      const fetchQuery = { ...query, page: currentPage };
      return getFilteredResults(fetchQuery);
    },
    enabled: isParamsProcessed,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/search?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render search parameters summary
  const renderSearchSummary = () => {
    const summaryParts = [];
    if (
      query.destination &&
      query.country &&
      query.destination !== query.country
    ) {
      summaryParts.push(`Location: ${query.destination}`);
      summaryParts.push(`Country: ${query.country}`);
    } else if (query.destination) {
      summaryParts.push(`Location: ${query.destination}`);
    } else if (query.country) {
      summaryParts.push(`Country: ${query.country}`);
    }

    if (query.checkIn) summaryParts.push(`Check-in: ${query.checkIn}`);
    if (query.checkOut) summaryParts.push(`Check-out: ${query.checkOut}`);
    if (query.minPrice) summaryParts.push(`Min Price: $${query.minPrice}`);
    if (query.maxPrice) summaryParts.push(`Max Price: $${query.maxPrice}`);

    return summaryParts.length > 0 ? (
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          Search Filters
        </h2>
        <div className="flex flex-wrap gap-2">
          {summaryParts.map((part, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {part}
            </span>
          ))}
        </div>
      </div>
    ) : null;
  };

  // Render skeleton loader
  const renderSkeletonLoader = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <Skeleton key={item} className="h-36 w-full rounded-xl" />
      ))}
    </div>
  );

  // Render result card
  const renderResultCard = (item: any, index: number) => {
    const isHotel = item.type === "hotel";
    const iconClassName = "w-5 h-5 mr-2 text-blue-600";

    return (
      <Link
        href={`/${item.type === "hotel" ? "hotels" : "destinations"}/${
          item.id
        }`}
        key={item.id}
        className="group"
      >
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="relative h-56 overflow-hidden rounded-t-xl">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              priority={index < 3}
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" // for cards
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                  {isHotel ? (
                    <Hotel className={iconClassName} />
                  ) : (
                    <Compass className={iconClassName} />
                  )}
                  {item.name}
                </h2>
                <div className="text-sm text-gray-600 flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  {item.location || "Location not specified"}
                  {item.country && `, ${item.country}`}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-700 flex items-center justify-end">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {item.price}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  const showSkeleton = !isParamsProcessed || (isLoading && !data);

  const renderPagination = () => {
    if (!data?.meta || data.meta.totalItems <= ITEM_PER_PAGE) return null;

    return (
      <div className="mt-8">
        <Pagination
          totalItems={data.meta.totalItems}
          currentPage={currentPage}
          itemsPerPage={ITEM_PER_PAGE}
          onPageChange={handlePageChange}
        />
        <div className="mt-2 text-sm text-gray-500 text-center">
          Showing {(currentPage - 1) * ITEM_PER_PAGE + 1}-
          {Math.min(currentPage * ITEM_PER_PAGE, data.meta.totalItems)} of{" "}
          {data.meta.totalItems} results
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Results
        </h1>
        {renderSearchSummary()}
      </div>

      {showSkeleton && renderSkeletonLoader()}

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
          Error fetching results: {error.message}
        </div>
      )}

      {!showSkeleton && data && (
        <div>
          {data.items.length === 0 && data.items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600">No results found</p>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your search filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.items.map((item, index) => renderResultCard(item, index))}
            </div>
          )}
          {renderPagination()}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="flex items-center gap-2 hover:bg-blue-50 cursor-pointer"
          disabled={isLoading}
        >
          <RefreshCcw className="w-4 h-4" />
          {isLoading ? "Refreshing..." : "Refresh Results"}
        </Button>
      </div>
    </section>
  );
};

export default SearchContent;
