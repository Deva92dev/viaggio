import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingList from "@/components/bookings/BookingList";
import BookingItems from "@/components/bookings/ItemBookings";
import SingleBookingDetail from "@/components/bookings/SingleBookingDetail";

type BookingsPageProps = {
  params: Promise<{ segments?: string[] }>;
};

const isValidItemType = (type: string): type is "destination" | "hotel" => {
  return type === "destination" || type === "hotel";
};

export async function generateMetadata({
  params,
}: BookingsPageProps): Promise<Metadata> {
  const { segments } = await params;
  const segArray = segments ?? [];
  const baseMetadata = {
    robots: {
      index: false, // Private user page
      follow: false,
    },
  };

  switch (segArray.length) {
    case 0:
      return {
        title: "My Bookings - Manage Your Travel Plans | Viagio",
        description:
          "View and manage all your travel bookings in one place. Access itineraries, booking details, and travel documents with Viagio.",
        keywords: [
          "my bookings",
          "travel bookings",
          "booking management",
          "travel itinerary",
          "Viagio account",
        ],
        alternates: {
          canonical: "/bookings",
        },
        ...baseMetadata,
      };
    case 1:
      const bookingId = segArray[0];
      return {
        title: `Booking Details - ${bookingId} | Viagio`,
        description:
          "View detailed information about your travel booking including itinerary, payment details, and booking status.",
        keywords: [
          "booking details",
          "travel booking",
          "booking information",
          "Viagio booking",
        ],
        alternates: {
          canonical: `/bookings/${bookingId}`,
        },
        ...baseMetadata,
      };
    case 2:
      const [itemType, itemId] = segArray;
      if (!isValidItemType(itemType)) {
        return {
          title: "Booking Not Found | Viagio",
          description: "The requested booking page could not be found.",
          ...baseMetadata,
        };
      }

      const itemTypeTitle =
        itemType === "destination" ? "Destination" : "Hotel";
      return {
        title: `${itemTypeTitle} Bookings - ${itemId} | Viagio`,
        description: `View all your bookings for this ${itemType}. Manage your travel plans and booking details with Viagio.`,
        keywords: [
          `${itemType} bookings`,
          "travel bookings",
          "booking history",
          `${itemType} reservations`,
          "Viagio bookings",
        ],
        alternates: {
          canonical: `/bookings/${itemType}/${itemId}`,
        },
        ...baseMetadata,
      };

    default:
      // Invalid URL structure
      return {
        title: "Booking Not Found | Viagio",
        description: "The requested booking page could not be found.",
        ...baseMetadata,
      };
  }
}

export async function generateStaticParams(): Promise<
  { segments?: string[] }[]
> {
  return [];
}

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
