import BookingList from "@/components/bookings/BookingList";
import BookingItems from "@/components/bookings/ItemBookings";
import SingleBookingDetail from "@/components/bookings/SingleBookingDetail";
import { notFound } from "next/navigation";

export async function generateStaticParams(): Promise<
  { segments?: string[] }[]
> {
  return [];
}

type BookingsPageProps = {
  params: Promise<{ segments?: string[] }>;
};

const isValidItemType = (type: string): type is "destination" | "hotel" => {
  return type === "destination" || type === "hotel";
};

const BookingsPage = async ({ params }: BookingsPageProps) => {
  const { segments } = await params;
  const segArray = segments ?? [];

  switch (segArray.length) {
    case 0:
      return <BookingList />;
    case 1:
      return <SingleBookingDetail bookingId={segArray[0]} />;
    case 2:
      const [itemType, itemId] = segArray;
      if (!isValidItemType(itemType)) {
        notFound();
      }
      return <BookingItems itemType={itemType} itemId={itemId} />;
    default:
      notFound();
  }
};

export default BookingsPage;
