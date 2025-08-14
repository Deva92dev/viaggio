import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import PlacesCard from "@/components/destinations/PlacesCard";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import { getAllDestinations } from "@/utils/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: { page?: string };
};
// fix spacing on smaller screens because on small screens there is unusual space
const DestinationsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const pageParams = params.page || "1";
  const { results, total, meta } = await getAllDestinations(pageParams);

  if (meta.page !== parseInt(params.page || "1", 10)) {
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
