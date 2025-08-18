import Script from "next/script";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import PlacesCard from "@/components/destinations/PlacesCard";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import { getAllDestinations } from "@/utils/actions";
import {
  BASE_URL,
  buildBreadcrumb,
  buildDestinationIndex,
} from "@/utils/schema";

export const metadata: Metadata = {
  title: "Travel Destinations - Discover Amazing Places with Viagio",
  description:
    "Explore our curated collection of breathtaking travel destinations worldwide. From exotic beaches to mountain adventures, find your perfect getaway with Viagio.",
  keywords: [
    "travel destinations",
    "vacation spots",
    "tourist attractions",
    "travel guides",
    "Viagio destinations",
  ],
  alternates: {
    canonical: "/destinations",
  },
  openGraph: {
    title: "Travel Destinations - Discover Amazing Places with Viagio",
    description:
      "Explore breathtaking destinations worldwide with expert-guided tours and personalized experiences.",
    type: "website",
  },
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const DestinationsPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const pageParams = (resolvedSearchParams.page as string) || "1";
  const { results, total, meta } = await getAllDestinations(pageParams);

  const requestedPage = parseInt(pageParams, 10);
  if (meta.page !== requestedPage) {
    redirect(`/destinations?page=${meta.page}`);
  }

  const indexSchema = buildDestinationIndex(
    `${BASE_URL}/destinations?page=${meta.page}`,
    results.map((d) => ({ id: d.id, name: d.name }))
  );

  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: BASE_URL },
    {
      name: "Destinations",
      url: `${BASE_URL}/destinations`,
    },
  ]);

  /* wrapper with @context + @graph */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [indexSchema, breadcrumb],
  };

  return (
    <>
      <Script
        id="destinations-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <DestinationImage pageType="destinations" />
      <Suspense fallback={<PopularSkeleton />}>
        <DestinationCard type="destination" />
      </Suspense>
      <Suspense fallback={<PopularSkeleton />}>
        <PlacesCard destinations={results} key={`destinations-${meta.page}`} />
      </Suspense>
      <PaginationWrapper
        totalItems={total}
        itemsPerPage={meta.limit}
        currentPage={meta.page}
      />
    </>
  );
};

export default DestinationsPage;
