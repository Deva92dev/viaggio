import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import PlacesCard from "@/components/destinations/PlacesCard";
import LoadingContainer from "@/components/global/LoadingContainer";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import { getAllDestinations } from "@/utils/actions";
import { Suspense } from "react";

type Props = {
  searchParams: { page?: string };
};

// fix favorite functionality

const DestinationsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const pageParams = params.page || "1";
  const { results, total, meta } = await getAllDestinations(pageParams);

  return (
    <main className="">
      <DestinationImage />
      <Suspense fallback={<LoadingContainer />}>
        <DestinationCard type="destination" />
      </Suspense>
      {/* Places */}
      <Suspense fallback={<LoadingContainer />}>
        <PlacesCard destinations={results} key={`destinations-${meta.page}`} />
      </Suspense>
      <PaginationWrapper
        totalItems={total}
        itemsPerPage={meta.limit}
        currentPage={meta.page}
      />
    </main>
  );
};

export default DestinationsPage;
