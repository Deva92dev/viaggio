import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import SearchContent from "@/components/search/SearchContent";
import { SearchPageSkeleton } from "@/components/search/SearchSkeleton";
import { buildSearchResults } from "@/utils/schema";
import { getFilteredResults } from "@/utils/actions";

export const metadata: Metadata = {
  title: "Search Results - Find Your Perfect Trip | Viagio",
  description:
    "Search destinations, hotels and travel experiences. Find exactly what you're looking for with Viagio's comprehensive search.",
  keywords: [
    "search results",
    "find destinations",
    "search hotels",
    "travel search",
    "Viagio search",
  ],
  alternates: { canonical: "/search" },
};

const paramsToEntries = (
  obj: Record<string, string | string[] | undefined>
): [string, string][] => {
  const out: [string, string][] = [];
  Object.entries(obj).forEach(([k, v]) => {
    if (Array.isArray(v)) v.forEach((item) => item && out.push([k, item]));
    else if (typeof v === "string" && v) out.push([k, v]);
  });
  return out;
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = async ({ searchParams }: Props) => {
  /* quick helpers */
  const str = (k: string) =>
    typeof searchParams[k] === "string" && searchParams[k]!.trim() !== ""
      ? (searchParams[k] as string).trim()
      : undefined;

  const list = (k: string): string[] | undefined => {
    const v = searchParams[k];
    if (Array.isArray(v)) return v.filter(Boolean) as string[];
    if (typeof v === "string" && v) return v.split(",").map((s) => s.trim());
    return undefined;
  };

  const filters = {
    destination: str("destination") ?? str("q"),
    country: str("country"),
    category: str("category"),
    bestTimeToVisit: list("bestTimeToVisit"),
    amenities: list("amenities"),
    checkIn: str("checkIn"),
    checkOut: str("checkOut"),
    minPrice: str("minPrice") ? Number(str("minPrice")) : undefined,
    maxPrice: str("maxPrice") ? Number(str("maxPrice")) : undefined,
    page: str("page") ? Number(str("page")) : undefined,
    limit: str("limit") ? Number(str("limit")) : undefined,
  };

  /* drop empty values so cache key stays deterministic */
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0)
    )
  );

  let jsonLd: Record<string, unknown> | null = null;
  if (Object.keys(cleanFilters).length) {
    /* call your cached helper WITHOUT pagination limit for true total */
    const { meta } = await getFilteredResults({
      ...cleanFilters,
      limit: undefined,
    });
    const resultCount = meta.totalItems;

    const queryString = new URLSearchParams(
      paramsToEntries(searchParams)
    ).toString();

    const searchSchema = buildSearchResults(queryString, resultCount);
    jsonLd = { "@context": "https://schema.org", "@graph": [searchSchema] };
  }

  /* 3. render */
  return (
    <>
      {jsonLd && (
        <Script
          id="search-results-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <Suspense fallback={<SearchPageSkeleton />}>
        <SearchContent />
      </Suspense>
    </>
  );
};

export default SearchPage;
