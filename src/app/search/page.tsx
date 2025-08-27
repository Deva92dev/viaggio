import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { SearchSkeleton } from "@/components/search/SearchSkeleton";
import { buildSearchResults } from "@/utils/schema";
import { getFilteredResults } from "@/utils/actions";
import dynamic from "next/dynamic";

const SearchContent = dynamic(
  () => import("@/components/search/SearchContent"),
  {
    loading: () => <SearchSkeleton />,
  }
);

type SearchProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: SearchProps): Promise<Metadata> {
  const sp = await searchParams;

  const destination =
    typeof sp.destination === "string" ? sp.destination : undefined;
  const country = typeof sp.country === "string" ? sp.country : undefined;

  // Build dynamic title and description
  let title = "Search Results - Find Your Perfect Trip | Viagio";
  let description =
    "Search destinations, hotels and travel experiences. Find exactly what you're looking for with Viagio's comprehensive search.";

  if (destination) {
    title = `${destination} - Search Results | Viagio`;
    description = `Find the best destinations, hotels and experiences in ${destination}. Discover your perfect trip with Viagio.`;
  } else if (country) {
    title = `${country} Travel - Search Results | Viagio`;
    description = `Explore ${country} destinations and hotels. Find amazing travel experiences in ${country} with Viagio.`;
  }

  // Check if we have no search parameters at all
  const hasAnyParams = Object.keys(sp).length > 0;

  if (!hasAnyParams) {
    title = "Search - Find Your Perfect Trip | Viagio";
    description =
      "Search for destinations, hotels and travel experiences worldwide. Start planning your perfect trip with Viagio's comprehensive search.";
  }

  return {
    title,
    description,
    keywords: [
      "search results",
      "find destinations",
      "search hotels",
      "travel search",
      "Viagio search",
      ...(destination ? [`${destination} travel`] : []),
      ...(country ? [`${country} tourism`] : []),
    ],
    alternates: { canonical: "/search" },
  };
}

/* helper: convert possibly-array params to string[][] for URLSearchParams */
const paramsToEntries = (
  obj: Record<string, string | string[] | undefined>
): string[][] =>
  Object.entries(obj).flatMap(([k, v]) =>
    Array.isArray(v) ? v.map((item) => [k, item]) : v ? [[k, v]] : []
  );

export default async function SearchPage({ searchParams }: SearchProps) {
  const sp = await searchParams;
  /* helpers to normalise values */
  const str = (k: string) =>
    typeof sp[k] === "string" && sp[k]!.trim() !== ""
      ? (sp[k] as string).trim()
      : undefined;

  const list = (k: string): string[] | undefined => {
    const v = sp[k];
    if (Array.isArray(v)) return v.filter(Boolean) as string[];
    if (typeof v === "string" && v) return v.split(",").map((s) => s.trim());
    return undefined;
  };

  /* 2. build filter object exactly like SearchContent uses */
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

  /* drop empty keys */
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0)
    )
  );

  let jsonLd: Record<string, unknown> | null = null;
  if (Object.keys(cleanFilters).length) {
    /* get true total count (no limit) */
    const { meta } = await getFilteredResults({
      ...cleanFilters,
      limit: undefined,
    });
    const resultCount = meta.totalItems;

    const queryString = new URLSearchParams(paramsToEntries(sp)).toString();
    const searchSchema = buildSearchResults(queryString, resultCount);

    jsonLd = { "@context": "https://schema.org", "@graph": [searchSchema] };
  }

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
      <Suspense fallback={<SearchSkeleton />}>
        <SearchContent />
      </Suspense>
    </>
  );
}
