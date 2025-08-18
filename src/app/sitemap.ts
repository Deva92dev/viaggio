import { MetadataRoute } from "next";
import {
  fetchAllDestinationsForSitemap,
  fetchAllHotelsForSitemap,
} from "@/utils/actions";

const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: {
    path: string;
    changeFrequency: ChangeFrequency;
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/destinations", changeFrequency: "weekly", priority: 0.9 },
    { path: "/hotels", changeFrequency: "weekly", priority: 0.9 },
    { path: "/search", changeFrequency: "daily", priority: 0.9 },
    { path: "/about", changeFrequency: "yearly", priority: 0.6 },
    { path: "/cancellation-refunds", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/booking-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-conditions", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })
  );

  const destinations = await fetchAllDestinationsForSitemap();
  const destinationEntries: MetadataRoute.Sitemap = destinations.map(
    (d: { id: string; updatedAt: Date }) => ({
      url: `${BASE_URL}/destinations/${d.id}`,
      lastModified: new Date(d.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const hotels = await fetchAllHotelsForSitemap();
  const hotelEntries: MetadataRoute.Sitemap = hotels.map(
    (h: { id: string; updatedAt: Date }) => ({
      url: `${BASE_URL}/hotels/${h.id}`,
      lastModified: new Date(h.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [...staticEntries, ...destinationEntries, ...hotelEntries];
}
