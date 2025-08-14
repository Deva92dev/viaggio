import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import HotelCard from "@/components/hotels/HotelCard";
import { getAllHotels } from "@/utils/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: { page?: string };
};

// fix spacing on smaller screens because on small screens there is unusual space
const HotelsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const pageParams = params.page || "1";
  const { results, total, meta } = await getAllHotels(pageParams);

  if (meta.page !== parseInt(params.page || "1", 10)) {
    redirect(`/hotels?page=${meta.page}`);
  }

  return (
    <main className="">
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
    </main>
  );
};

export default HotelsPage;
