import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import PlacesCard from "@/components/destinations/PlacesCard";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import { getAllDestinations } from "@/utils/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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

  return (
    <>
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
