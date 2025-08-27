import Script from "next/script";
import { cache } from "react";
import type { Metadata } from "next";
import { db } from "@/db";
import { getSingleDestination } from "@/utils/actions";
import {
  BASE_URL,
  buildBreadcrumb,
  buildDestinationDetail,
} from "@/utils/schema";
import {
  BestTimecard,
  BookDestination,
  DestinationExperience,
  DestinationHero,
  DestReviewWrapper,
  DestSimilarWrapper,
  Location3DCard,
  PhotoGalleryWrapper,
  WorldMapBackGround,
} from "@/components/singleDestination";

const cachedGetSingleDestination = cache(async (destinationsId: string) => {
  return await getSingleDestination(destinationsId);
});

export async function generateStaticParams() {
  const rows = await db.query.tourPlaces.findMany({
    columns: { id: true },
  });
  return rows.map(({ id }) => ({ destinationsId: id.toString() }));
}

type Props = {
  params: Promise<{
    destinationsId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destinationsId } = await params;
  const destination = await cachedGetSingleDestination(destinationsId);
  const destinationName = destination.name;

  return {
    title: `${destinationName} Travel Guide - Tours & Experiences | Viagio`,
    description: `Discover ${destinationName} with Viagio's expert-guided tours. Best attractions, local experiences, and personalized itineraries for an unforgettable adventure.`,
    keywords: [
      `${destinationName} travel`,
      `${destinationName} tours`,
      `${destinationName} guide`,
      "travel experiences",
      "Viagio",
    ],
    alternates: {
      canonical: `/destinations/${destinationsId}`,
    },
    openGraph: {
      title: `${destinationName} Travel Guide - Tours & Experiences`,
      description: `Explore ${destinationName} with expert guides and personalized experiences.`,
      type: "article",
      images: [
        {
          url: destination.imageUrl,
          width: 1200,
          height: 630,
          alt: `${destinationName} travel destination`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${destinationName} Travel Guide - Tours & Experiences`,
      description: `Explore ${destinationName} with expert guides and personalized experiences.`,
      images: [destination.imageUrl],
    },
  };
}
// color ratio not good.
const DestinationDetailsPage = async ({ params }: Props) => {
  const { destinationsId } = await params;
  const destination = await cachedGetSingleDestination(destinationsId);

  const {
    name,
    category,
    bestTimeToVisit,
    country,
    description,
    duration,
    id,
    imageUrl,
    location,
    price,
  } = destination;

  const destinationSchema = buildDestinationDetail({
    id,
    name,
    description,
    imageUrl,
    location,
    country,
  });

  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: BASE_URL },
    { name: "Destinations", url: `${BASE_URL}/destinations` },
    { name, url: `${BASE_URL}/destinations/${id}` },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [destinationSchema, breadcrumb],
  };

  return (
    <>
      <Script
        id="destinations-details-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="relative overflow-hidden bg-[hsl(var(--background))]">
        <WorldMapBackGround />
        <DestinationHero
          id={id}
          name={name}
          location={location}
          country={country}
          description={description}
          price={price}
          category={category}
          duration={duration}
          imageUrl={imageUrl}
        />
        <div className="container mx-auto px-6 md:px-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              <DestinationExperience
                bestTimeToVisit={bestTimeToVisit}
                category={category}
                description={description}
                duration={duration}
              />
              <PhotoGalleryWrapper imageUrl={imageUrl} name={name} />
            </div>
            {/* Right Column */}
            <div className="lg:col-span-1 space-y-8">
              <BookDestination
                country={country}
                id={id}
                duration={duration}
                location={location}
                name={name}
                price={price}
              />
              <Location3DCard country={country} location={location} />
              <BestTimecard bestTimeToVisit={bestTimeToVisit} />
            </div>
          </div>
          <DestReviewWrapper id={id} />
          <DestSimilarWrapper category={category} id={id} />
        </div>
      </main>
    </>
  );
};

export default DestinationDetailsPage;
