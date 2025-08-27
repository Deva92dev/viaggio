import { cache } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { getSingleHotel } from "@/utils/actions";
import { db } from "@/db";
import { BASE_URL, buildBreadcrumb, buildHotelDetail } from "@/utils/schema";
import {
  HotelBooking,
  HotelHero,
  HotelMainContent,
  ReviewWrapper,
  SimilarHotelWrapper,
} from "@/components/singleHotel";

const cachedGetSingleHotel = cache(async (hotelsId: string) => {
  return await getSingleHotel(hotelsId);
});

export async function generateStaticParams() {
  const rows = await db.query.hotels.findMany({
    columns: { id: true },
  });
  return rows.map(({ id }) => ({ hotelsId: id.toString() }));
}

type Props = {
  params: Promise<{
    hotelsId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hotelsId } = await params;
  const hotel = await cachedGetSingleHotel(hotelsId);
  const hotelName = hotel.name;

  return {
    title: `${hotelName} - Book Direct with Best Rates | Viagio`,
    description: `Book ${hotelName} with Viagio for guaranteed best rates. View photos, amenities, reviews, and exclusive offers for your perfect stay in ${hotel.location}, ${hotel.country}.`,
    keywords: [
      `${hotelName}`,
      "hotel booking",
      "best rates",
      "hotel reviews",
      "Viagio booking",
      `${hotel.location} hotels`,
      `${hotel.country} accommodation`,
    ],
    alternates: {
      canonical: `/hotels/${hotelsId}`,
    },
    openGraph: {
      title: `${hotelName} - Book Direct with Best Rates`,
      description: `Book ${hotelName} with guaranteed best rates and exclusive offers in ${hotel.location}, ${hotel.country}.`,
      type: "article",
      images: [
        {
          url: hotel.imageUrl,
          width: 1200,
          height: 630,
          alt: `${hotelName} hotel in ${hotel.location}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${hotelName} - Book Direct with Best Rates`,
      description: `Book ${hotelName} with guaranteed best rates and exclusive offers.`,
      images: [hotel.imageUrl],
    },
  };
}

const HotelsDetailsPage = async ({ params }: Props) => {
  const { hotelsId } = await params;
  const hotel = await cachedGetSingleHotel(hotelsId);

  const {
    name,
    category,
    availableRooms,
    amenities,
    country,
    description,
    id,
    imageUrl,
    location,
    pricePerNight,
  } = hotel;

  const hotelSchema = buildHotelDetail({
    id,
    name,
    imageUrl,
    location,
    country,
    pricePerNight,
  });

  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: BASE_URL },
    { name: "Hotels", url: `${BASE_URL}/hotels` },
    { name, url: `${BASE_URL}/hotels/${id}` },
  ]);

  /* 3. Wrap in @context + @graph  */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [hotelSchema, breadcrumb],
  };

  return (
    <>
      <Script
        id="hotels-details-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="relative overflow-hidden bg-[hsl(var(--background))]">
        <HotelHero
          id={id}
          category={category}
          location={location}
          name={name}
          imageUrl={imageUrl}
          country={country}
        />
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-12 w-full">
            <HotelMainContent
              location={location}
              amenities={amenities}
              description={description}
            />
            <div className="lg:col-span-1 w-full">
              <HotelBooking
                id={id}
                name={name}
                location={location}
                country={country}
                availableRooms={availableRooms}
                pricePerNight={pricePerNight}
              />
            </div>
          </div>
          <ReviewWrapper id={id} />
          <SimilarHotelWrapper id={id} category={category} />
        </div>
      </main>
    </>
  );
};

export default HotelsDetailsPage;
