import { cache, Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarSearch,
  Camera,
  Clock,
  Compass,
  MapPin,
  Sun,
  Users,
  Star,
  Shield,
  Award,
} from "lucide-react";
import { db } from "@/db";
import BookingForm from "@/components/bookings/BookingForm";
import FavoriteToggleWrapper from "@/components/favorites/FavoriteToggleWrapper";
import Review from "@/components/reviews/Review";
import ShareButton from "@/components/singleDestination/ShareButton";
import SimilarDestination from "@/components/singleDestination/SimilarDestination";
import {
  Duration,
  JourneyPath,
  Location3DCard,
  PhotoGallery,
  WorldMapBackGround,
} from "@/components/singleDestination/TourAnimation";
import { Button } from "@/components/ui/button";
import { getSimilarDestinations, getSingleDestination } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import BookingFormSkeleton from "@/components/bookings/BookingFormSkeleton";
import BreadcrumbNav from "@/components/global/BreadCrumbNav";
import {
  BASE_URL,
  buildBreadcrumb,
  buildDestinationDetail,
} from "@/utils/schema";
import Script from "next/script";

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
// fix review section height of review list
const DestinationDetailsPage = async ({ params }: Props) => {
  const { destinationsId } = await params;
  const destination = await cachedGetSingleDestination(destinationsId);
  const [similar] = await Promise.all([
    getSimilarDestinations(destination.category, destination.id),
  ]);

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

  const travelerCount = 345;
  const guidedTours = 15;

  const breadcrumbItems = [
    { label: "Destinations", href: "/destinations" },
    { label: name, isCurrentPage: true },
  ];

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
        {/*  Hero Section */}
        <div className="relative w-full h-[70vh] min-h-[600px] mb-16 overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="object-cover absolute inset-0 w-full h-full"
          />
          {/* gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.4] via-transparent to-[hsl(var(--accent))/0.2] z-10" />
          <JourneyPath />
          {/* BreadCrumb fix positioning, it should align with hero text content */}
          <div className="absolute container mx-auto top-0 left-0 right-0 z-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <BreadcrumbNav
              items={breadcrumbItems}
              className="animate-fade-in max-w-fit"
            />
          </div>
          {/*  Hero Content */}
          <div className="absolute inset-0 flex items-center z-20 pt-16 sm:pt-20 md:pt-24 lg:pt-16">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="max-w-4xl w-full">
                {/*  badges */}
                <div className="hidden md:flex items-center flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 w-full relative z-40 mt-4 sm:mt-6 md:mt-8 animate-fade-in">
                  <div className="inline-block opacity-100">
                    <Duration duration={duration} />
                  </div>
                  <span className="bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold shadow-lg">
                    {category}
                  </span>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/30">
                    <Star
                      size={12}
                      className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] sm:w-3.5 sm:h-3.5"
                    />
                    <span>Premium Experience</span>
                  </div>
                </div>
                {/*  title */}
                <h1
                  className="text-5xl md:text-7xl font-black text-white mb-6 shadow-text leading-tight animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  Discover
                  <span className="pl-2 bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    {name}
                  </span>
                </h1>
                <p
                  className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed drop-shadow-md animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  {description.substring(0, 150)}...
                </p>
                {/*  location info */}
                <div
                  className="flex items-center flex-wrap gap-6 mb-8 animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="flex items-center text-white bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                    <MapPin className="mr-2" size={18} />
                    <span className="font-semibold">
                      {location}, {country}
                    </span>
                  </div>
                  <div className="flex items-center text-white bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                    <Users className="mr-2" size={18} />
                    <span className="font-semibold">
                      {travelerCount}+ Travelers
                    </span>
                  </div>
                </div>
                {/*  action buttons */}
                <div
                  className="flex flex-col sm:flex-row gap-4 animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Button className="btn-accent px-8 py-4 text-lg shadow-2xl shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="flex items-center gap-3 relative z-10 font-bold">
                      Start from {formatCurrency(price)}
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </Button>
                  <div className="flex gap-3">
                    <FavoriteToggleWrapper
                      itemId={id}
                      itemType="destination"
                      className="bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full p-3 cursor-pointer border border-white/30 transition-all duration-300 hover:scale-110"
                    />
                    <ShareButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Main Content */}
        <div className="container mx-auto px-6 md:px-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Experience Section */}
              <section className="animate-fade-in">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Compass size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Destination Experience
                    </h2>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />
                  <div className="p-8 md:p-10">
                    <div className="prose max-w-none">
                      <p className="text-[hsl(var(--foreground))] text-lg leading-relaxed mb-8">
                        {description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                      {/* info cards */}
                      <div className="bg-gradient-to-br from-[hsl(var(--features-bg))] to-white rounded-2xl p-6 border border-[hsl(var(--border))] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--accent))] to-orange-500 rounded-xl flex items-center justify-center mr-3">
                            <Sun className="text-white" size={20} />
                          </div>
                          <h3 className="font-bold text-[hsl(var(--foreground))] text-lg">
                            Perfect Time To Visit
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {bestTimeToVisit.map((time, index) => (
                            <span
                              key={index}
                              className="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] px-3 py-1 rounded-full text-sm font-semibold"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-[hsl(var(--features-bg))] to-white rounded-2xl p-6 border border-[hsl(var(--border))] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-600 rounded-xl flex items-center justify-center mr-3">
                            <Clock size={20} className="text-white" />
                          </div>
                          <h3 className="font-bold text-[hsl(var(--foreground))] text-lg">
                            Tour Duration
                          </h3>
                        </div>
                        <p className="text-[hsl(var(--muted-foreground))] mt-4 leading-relaxed">
                          <span className="font-bold text-[hsl(var(--primary))]">
                            {duration.toUpperCase()}
                          </span>
                          - Perfect for{" "}
                          {duration.includes("day")
                            ? "short getaways"
                            : "extended exploration"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white rounded-2xl p-6 border border-[hsl(var(--border))] shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                          <Camera size={20} className="text-white" />
                        </div>
                        <h3 className="font-bold text-[hsl(var(--foreground))] text-lg">
                          Surroundings Views
                        </h3>
                      </div>
                      <p className="text-[hsl(var(--muted-foreground))] mt-4 leading-relaxed">
                        <span className="font-bold text-[hsl(var(--primary))]">
                          {category.toUpperCase()}
                        </span>
                        - providing breathtaking scenery and unique experiences
                        for travelers
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* Photo Gallery */}
              <section className="animate-fade-in">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Camera size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Destination Gallery
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 image-zoom-hover">
                    <PhotoGallery imageUrl={imageUrl} name={name} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 image-zoom-hover">
                      <PhotoGallery imageUrl={imageUrl} name={name} />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 image-zoom-hover">
                      <PhotoGallery imageUrl={imageUrl} name={name} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* Right Column */}
            <div className="lg:col-span-1 space-y-8">
              {/* Booking Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden sticky top-8 hover-glow">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />
                <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        Book This Tour
                      </h3>
                      <p className="text-white/95 tracking-tight text-sm sm:text-base">
                        Secure Your Spot Today
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <Shield size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Suspense fallback={<BookingFormSkeleton />}>
                    <BookingForm
                      itemId={id}
                      itemType="destination"
                      itemData={{
                        name,
                        price,
                        priceLabel: `From $${price}`,
                        location,
                        country,
                      }}
                    />
                  </Suspense>
                </div>
                <div className="p-6 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm font-medium">
                        Starting From
                      </p>
                      <p className="text-4xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                        ${price}
                      </p>
                    </div>
                    <Duration duration={duration} />
                  </div>
                  <div className="space-y-4 pt-6 border-t border-[hsl(var(--border))]">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[hsl(var(--border))] shadow-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[hsl(var(--primary))]/10 rounded-lg flex items-center justify-center mr-3">
                          <Users
                            size={16}
                            className="text-[hsl(var(--primary))]"
                          />
                        </div>
                        <span className="text-[hsl(var(--foreground))] font-medium">
                          Travelers
                        </span>
                      </div>
                      <span className="font-bold text-[hsl(var(--foreground))]">
                        {travelerCount}+
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[hsl(var(--border))] shadow-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[hsl(var(--accent))]/10 rounded-lg flex items-center justify-center mr-3">
                          <Compass
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                        </div>
                        <span className="text-[hsl(var(--foreground))] font-medium">
                          Guided Tours
                        </span>
                      </div>
                      <span className="font-bold text-[hsl(var(--foreground))]">
                        {guidedTours}
                      </span>
                    </div>
                  </div>
                  {/* Trust indicators */}
                  <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[hsl(var(--border))]">
                    <div className="flex items-center gap-2 text-green-600">
                      <Shield size={16} />
                      <span className="text-xs font-medium">Secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-[hsl(var(--accent))]">
                      <Award size={16} />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-[hsl(var(--primary))]">
                      <Star size={16} />
                      <span className="text-xs font-medium">Premium</span>
                    </div>
                  </div>
                </div>
              </div>
              <Location3DCard country={country} location={location} />
              {/*  Best Time Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 hover-glow">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-600 rounded-xl flex items-center justify-center mr-3">
                    <CalendarSearch size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[hsl(var(--foreground))] text-xl">
                    Best Time to Visit
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  {bestTimeToVisit.map((time, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md"
                    >
                      {time}
                    </span>
                  ))}
                </div>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                  The weather is most favorable during these seasons, providing
                  the optimal experience for travelers.
                </p>
              </div>
            </div>
          </div>
          {/* Review Section */}
          <div className="mt-20 animate-fade-in">
            <div className="flex items-center mb-10">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Star size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Traveler Reviews
                </h2>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />
              <div className="p-8 md:p-10">
                <Review itemId={id} itemType="destination" />
              </div>
            </div>
          </div>
          {/* Similar Destinations */}
          <section className="mt-16 animate-fade-in">
            <div className="flex items-center mb-10">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Compass size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Similar Destinations You May Like
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similar.map((dest, index) => (
                <Link
                  href={`/destinations/${dest.id}`}
                  key={index}
                  className="group"
                >
                  <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-hover-lift">
                    <SimilarDestination
                      imageUrl={dest.imageUrl}
                      title={dest.title}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DestinationDetailsPage;
