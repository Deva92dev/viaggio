import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import PlacesCard from "@/components/destinations/PlacesCard";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import { getAllDestinations } from "@/utils/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ page?: string }> | { page?: string };
};

const DestinationsPage = async ({ searchParams }: Props) => {
  const params =
    searchParams instanceof Promise ? await searchParams : searchParams;
  const pageParams = params?.page || "1";
  const { results, total, meta } = await getAllDestinations(pageParams);

  const currentPage = parseInt(pageParams, 10);
  if (meta.page !== currentPage) {
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
