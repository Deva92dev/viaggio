import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import HotelCard from "@/components/hotels/HotelCard";
import { getAllHotels } from "@/utils/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ page?: string }> | { page?: string };
};

const HotelsPage = async ({ searchParams }: Props) => {
  const params =
    searchParams instanceof Promise ? await searchParams : searchParams;
  const pageParams = params?.page || "1";
  const { results, total, meta } = await getAllHotels(pageParams);

  const currentPage = parseInt(pageParams, 10);
  if (meta.page !== currentPage) {
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
