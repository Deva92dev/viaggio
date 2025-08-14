import DestinationCard from "@/components/destinations/DestinationCard";
import DestinationImage from "@/components/destinations/DestinationImage";
import PaginationWrapper from "@/components/global/PaginationWrapper";
import { PopularSkeleton } from "@/components/global/PopularSkeleton";
import HotelCard from "@/components/hotels/HotelCard";
import { getAllHotels } from "@/utils/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const HotelsPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const pageParams = (resolvedSearchParams.page as string) || "1";
  const { results, total, meta } = await getAllHotels(pageParams);

  const requestedPage = parseInt(pageParams, 10);
  if (meta.page !== requestedPage) {
    redirect(`/destinations?page=${meta.page}`);
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
