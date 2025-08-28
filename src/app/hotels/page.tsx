import dynamic from "next/dynamic";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import HotelCard from "@/components/hotels/HotelCard";
import { getAllHotels } from "@/utils/actions";
import { BASE_URL, buildBreadcrumb, buildHotelIndex } from "@/utils/schema";
import PaginationSkeleton from "@/components/global/PaginationSkeleton";

export const metadata: Metadata = {
  title: "Hotels & Accommodations - Book Your Perfect Stay | Viagio",
  description:
    "Find and book exceptional hotels worldwide with Viagio. From luxury resorts to boutique accommodations, discover your ideal place to stay.",
  keywords: [
    "hotels",
    "accommodations",
    "hotel booking",
    "luxury hotels",
    "boutique hotels",
    "Viagio hotels",
  ],
  alternates: {
    canonical: "/hotels",
  },
  openGraph: {
    title: "Hotels & Accommodations - Book Your Perfect Stay | Viagio",
    description:
      "Find exceptional hotels and accommodations worldwide with personalized recommendations.",
    type: "website",
  },
};

const PaginationWrapper = dynamic(
  () => import("@/components/global/PaginationWrapper"),
  {
    loading: () => <PaginationSkeleton />,
  }
);

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const HotelsPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const pageParams = (resolvedSearchParams.page as string) || "1";
  const { results, total, meta } = await getAllHotels(pageParams);

  const requestedPage = parseInt(pageParams, 10);
  if (meta.page !== requestedPage) {
    notFound();
  }

  const indexSchema = buildHotelIndex(
    `${BASE_URL}/hotels?page=${meta.page}`,
    results.map(({ id, name }) => ({ id, name }))
  );

  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: BASE_URL },
    {
      name: "Hotels",
      url: `${BASE_URL}/hotels`,
    },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [indexSchema, breadcrumb],
  };

  return (
    <>
      <Script
        id="hotels-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <DestinationImage pageType="hotels" />
      <Suspense fallback={<PopularSkeleton />}>
        <DestinationCard type="hotel" />
      </Suspense>
      <Suspense fallback={<PopularSkeleton />}>
        <HotelCard hotels={results} key={`hotels-${meta.page}`} />
      </Suspense>
      <PaginationWrapper
        totalItems={total}
        itemsPerPage={meta.limit}
        currentPage={meta.page}
      />
    </>
  );
};

export default HotelsPage;
