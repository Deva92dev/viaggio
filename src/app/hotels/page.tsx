import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import LoadingContainer from "@/components/global/LoadingContainer";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import HotelCard from "@/components/hotels/HotelCard";
import { getAllHotels } from "@/utils/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: { page?: string };
};

// fix favorite functionality
const HotelsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const pageParams = params.page || "1";
  const { results, total, meta } = await getAllHotels(pageParams);

  if (meta.page !== parseInt(params.page || "1", 10)) {
    redirect(`/hotels?page=${meta.page}`);
  }

  return (
    <main className="">
      <DestinationImage />
      <Suspense fallback={<LoadingContainer />}>
        <DestinationCard type="hotel" />
      </Suspense>
      <Suspense fallback={<LoadingContainer />}>
        <HotelCard hotels={results} key={`hotels-${meta.page}`} />
      </Suspense>
      <PaginationWrapper
        totalItems={total}
        itemsPerPage={meta.limit}
        currentPage={meta.page}
      />
    </main>
  );
};

export default HotelsPage;
