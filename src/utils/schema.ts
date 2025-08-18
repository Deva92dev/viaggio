export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#org`,
      name: "Viagio",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.instagram.com/viagio",
        "https://www.facebook.com/viagio",
        "https://twitter.com/viagio",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Viagio – Where Leisure Meets Luxury",
      publisher: { "@id": `${BASE_URL}/#org` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

/* 2.1 — Breadcrumbs (use inside any detail page) */
export function buildBreadcrumb(
  paths: { name: string; url: string }[]
): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: paths.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      item: p.url,
    })),
  };
}

/* 2.2 — Destinations Hub  (/destinations) */
export function buildDestinationIndex(
  pageUrl: string,
  destinations: { id: string; name: string }[]
): object {
  return {
    "@type": "CollectionPage",
    "@id": pageUrl,
    url: pageUrl,
    name: "Destinations – Viagio",
    hasPart: destinations.slice(0, 20).map((d) => ({
      "@type": "TouristDestination",
      "@id": `${BASE_URL}/destinations/${d.id}`,
      name: d.name,
      url: `${BASE_URL}/destinations/${d.id}`,
    })),
  };
}

/* 2.3 — Single Destination (/destinations/[id]) */
export function buildDestinationDetail(dest: {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  lat?: number;
  lng?: number;
  location: string;
  country: string;
}): object {
  return {
    "@type": "TouristDestination",
    "@id": `${BASE_URL}/destinations/${dest.id}`,
    url: `${BASE_URL}/destinations/${dest.id}`,
    name: dest.name,
    description: dest.description,
    image: dest.imageUrl,
    // geo: {
    //   "@type": "GeoCoordinates",
    //   latitude: dest.lat,
    //   longitude: dest.lng,
    // },
    address: {
      "@type": "PostalAddress",
      addressLocality: dest.location,
      addressCountry: dest.country,
    },
  };
}

/* 2.4 — Hotels Hub  (/hotels) */
export function buildHotelIndex(
  pageUrl: string,
  hotels: { id: string; name: string }[]
): object {
  return {
    "@type": "CollectionPage",
    "@id": pageUrl,
    url: pageUrl,
    name: "Hotels – Viagio",
    hasPart: hotels.slice(0, 20).map((h) => ({
      "@type": "Hotel",
      "@id": `${BASE_URL}/hotels/${h.id}`,
      name: h.name,
      url: `${BASE_URL}/hotels/${h.id}`,
    })),
  };
}

/* 2.5 — Single Hotel (/hotels/[id]) */
export function buildHotelDetail(hotel: {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  country: string;
  pricePerNight: number;
  //   rating optional for now
  stars?: number;
}): object {
  return {
    "@type": "Hotel",
    "@id": `${BASE_URL}/hotels/${hotel.id}`,
    url: `${BASE_URL}/hotels/${hotel.id}`,
    name: hotel.name,
    image: hotel.imageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: hotel.location,
      addressCountry: hotel.country,
    },
    priceRange: `$${hotel.pricePerNight} per night`,
    // starRating: {
    //   "@type": "Rating",
    //   ratingValue: hotel.stars,
    // },
  };
}

/* 2.6 — Generic Static Page (about, policies, etc.) */
export function buildWebPage(
  title: string,
  url: string,
  description: string
): object {
  return {
    "@type": "WebPage",
    url,
    name: title,
    description,
  };
}

/* 2.7 — FAQ Page (if policy pages contain FAQs) */
export function buildFAQ(
  faqEntries: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/* 2.8 — Search Results Page */
export function buildSearchResults(query: string, resultCount: number): object {
  return {
    "@type": "SearchResultsPage",
    query,
    numberOfItems: resultCount,
    url: `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
  };
}
