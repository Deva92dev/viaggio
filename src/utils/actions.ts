/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { db, tourPlaces, hotels, favorites } from "@/db";
import { and, asc, desc, eq, gte, like, lte, ne, sql, SQL } from "drizzle-orm";
import {
  DestinationsType,
  HotelsType,
  PaginationType,
  PopularDestinations,
} from "./types";
import { revalidatePath, unstable_cache } from "next/cache";
import { getValidatedPage } from "./pagination";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
};

// count(*) uses DrizzleORM’s sql helper to safely run aggregate functions.
const LIMIT = 8;

export const getPopularDestinations = async (): Promise<
  PopularDestinations[]
> => {
  const popularDestinations = await db
    .select({
      id: tourPlaces.id,
      name: tourPlaces.name,
      imageUrl: tourPlaces.imageUrl,
      description: tourPlaces.description,
      createdAt: tourPlaces.createdAt,
      price: tourPlaces.price,
      location: tourPlaces.location,
    })
    .from(tourPlaces)
    .where(eq(tourPlaces.popular, true));
  return popularDestinations;
};

export const getAllDestinations = unstable_cache(
  async (
    pageParams: string
  ): Promise<{
    results: DestinationsType[];
    total: number;
    meta: PaginationType;
  }> => {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(tourPlaces);

    const meta = getValidatedPage(pageParams, count, LIMIT);

    const results = await db
      .select()
      .from(tourPlaces)
      .orderBy(desc(tourPlaces.createdAt), asc(tourPlaces.id))
      .limit(meta.limit)
      .offset(meta.offset);

    return {
      results,
      total: count,
      meta,
    };
  },
  ["getAllDestinations"],
  { revalidate: 3600 }
);

export const getAllHotels = unstable_cache(
  async (
    pageParams: string
  ): Promise<{
    results: HotelsType[];
    total: number;
    meta: PaginationType;
  }> => {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(hotels);
    const meta = getValidatedPage(pageParams, count, LIMIT);

    const results = await db
      .select()
      .from(hotels)
      .orderBy(
        desc(hotels.createdAt),
        asc(hotels.id) // Ensure consistent ordering
      )
      .limit(meta.limit)
      .offset(meta.offset);

    return {
      results,
      total: count,
      meta,
    };
  },
  ["getAllHotels"],
  { revalidate: 3600 }
);

export const getAllCountriesWithData = async () => {
  const allCountries = await db
    .select({ country: tourPlaces.country, image: tourPlaces.imageUrl })
    .from(tourPlaces);

  const uniqueCountries = Array.from(
    new Map(allCountries.map((c) => [c.country, c])).values()
  );

  const data = await Promise.all(
    uniqueCountries.map(async ({ country, image }) => {
      const [destinationCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(tourPlaces)
        .where(eq(tourPlaces.country, country));

      const [hotelCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(hotels)
        .where(eq(hotels.country, country));

      return {
        country,
        image,
        destinationsCount: destinationCount.count,
        hotelsCount: hotelCount.count,
      };
    })
  );

  return data;
};

export const getFilteredDestinations = async ({
  destination,
  country,
  category,
  bestTimeToVisit = [],
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
}: {
  destination?: string;
  country?: string;
  category?: string;
  bestTimeToVisit?: string[];
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) => {
  const conditions: (SQL | undefined)[] = [];

  if (destination && country) {
    // If both are provided and they're different, search for either
    if (destination !== country) {
      conditions.push(
        sql`(${like(
          sql`LOWER(${tourPlaces.location})`,
          `%${destination.toLowerCase()}%`
        )} OR
             ${like(
               sql`LOWER(${tourPlaces.country})`,
               `%${country.toLowerCase()}%`
             )})`
      );
    } else {
      // If they're the same (user entered one term), search both fields
      conditions.push(
        sql`(${like(
          sql`LOWER(${tourPlaces.location})`,
          `%${destination.toLowerCase()}%`
        )} OR
             ${like(
               sql`LOWER(${tourPlaces.country})`,
               `%${destination.toLowerCase()}%`
             )})`
      );
    }
  } else if (destination) {
    // Only destination is provided, search both location and country
    conditions.push(
      sql`(${like(
        sql`LOWER(${tourPlaces.location})`,
        `%${destination.toLowerCase()}%`
      )} OR
           ${like(
             sql`LOWER(${tourPlaces.country})`,
             `%${destination.toLowerCase()}%`
           )})`
    );
  } else if (country) {
    // Only country is provided
    conditions.push(
      like(sql`LOWER(${tourPlaces.country})`, `%${country.toLowerCase()}%`)
    );
  }

  if (category) {
    conditions.push(
      like(sql`LOWER(${tourPlaces.category})`, `%${category.toLowerCase()}%`)
    );
  }

  if (bestTimeToVisit.length > 0) {
    conditions.push(sql`${tourPlaces.bestTimeToVisit} && ${bestTimeToVisit}`);
  }

  if (minPrice !== undefined) {
    conditions.push(gte(tourPlaces.price, minPrice));
  }
  if (maxPrice !== undefined) {
    conditions.push(lte(tourPlaces.price, maxPrice));
  }

  // Run query with all applicable conditions
  const filteredDestinations = await db
    .select()
    .from(tourPlaces)
    .where(and(...conditions));

  return {
    items: filteredDestinations,
    totalCount: filteredDestinations.length,
  };
};

export const getFilteredHotels = async ({
  destination,
  country,
  category,
  amenities = [],
  checkIn,
  checkOut,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
}: {
  destination?: string;
  country?: string;
  category?: string;
  amenities?: string[];
  checkIn?: string;
  checkOut?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) => {
  const conditions: (SQL | undefined)[] = [];

  if (destination && country) {
    // If both are provided and they're different, search for either
    if (destination !== country) {
      conditions.push(
        sql`(${like(
          sql`LOWER(${hotels.location})`,
          `%${destination.toLowerCase()}%`
        )} OR
             ${like(
               sql`LOWER(${hotels.country})`,
               `%${country.toLowerCase()}%`
             )})`
      );
    } else {
      // If they're the same (user entered one term), search both fields
      conditions.push(
        sql`(${like(
          sql`LOWER(${hotels.location})`,
          `%${destination.toLowerCase()}%`
        )} OR
             ${like(
               sql`LOWER(${hotels.country})`,
               `%${destination.toLowerCase()}%`
             )})`
      );
    }
  } else if (destination) {
    // Only destination is provided, search both location and country
    conditions.push(
      sql`(${like(
        sql`LOWER(${hotels.location})`,
        `%${destination.toLowerCase()}%`
      )} OR
           ${like(
             sql`LOWER(${hotels.country})`,
             `%${destination.toLowerCase()}%`
           )})`
    );
  } else if (country) {
    // Only country is provided
    conditions.push(
      like(sql`LOWER(${hotels.country})`, `%${country.toLowerCase()}%`)
    );
  }

  if (category) {
    conditions.push(
      like(sql`LOWER(${hotels.category})`, `%${category.toLowerCase()}%`)
    );
  }

  if (amenities.length > 0) {
    conditions.push(sql`${hotels.amenities} && ${amenities}`);
  }

  if (checkIn !== undefined) {
    conditions.push(gte(hotels.checkInDate, checkIn));
  }

  if (checkOut !== undefined) {
    conditions.push(lte(hotels.checkInDate, checkOut));
  }

  if (minPrice !== undefined) {
    conditions.push(gte(hotels.pricePerNight, minPrice));
  }

  if (maxPrice !== undefined) {
    conditions.push(lte(hotels.pricePerNight, maxPrice));
  }

  const filteredHotels = await db
    .select()
    .from(hotels)
    .where(and(...conditions));

  return { items: filteredHotels, totalCount: filteredHotels.length };
};

export const getFilteredResults = unstable_cache(
  async (filters: {
    destination?: string;
    country?: string;
    category?: string;
    bestTimeToVisit?: string[];
    amenities?: string[];
    checkIn?: string;
    checkOut?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) => {
    try {
      const { page = 1, limit = 10 } = filters;
      const [toursResult, hotelsResult] = await Promise.all([
        getFilteredDestinations({ ...filters, limit: undefined }),
        getFilteredHotels({ ...filters, limit: undefined }),
      ]);

      // combine all the actual returned items
      const allItems = [
        ...toursResult.items.map((item) => ({
          ...item,
          type: "tour" as const,
          price: item.price,
        })),
        ...hotelsResult.items.map((item) => ({
          ...item,
          type: "hotel" as const,
          price: item.pricePerNight,
        })),
      ];

      // Apply pagination to the combined results
      const startIndex = (page - 1) * limit;
      const paginatedItems = allItems.slice(startIndex, startIndex + limit);

      return {
        items: paginatedItems,
        meta: {
          totalItems: toursResult.totalCount + hotelsResult.totalCount, // 68
          page,
          limit,
          totalPages: Math.ceil(
            (toursResult.totalCount + hotelsResult.totalCount) / limit
          ),
        },
      };
    } catch (error) {
      console.error("Error fetching filtered results:", error);
      return {
        items: [],
        meta: {
          totalItems: 0,
          page: 1,
          limit: 8,
          totalPages: 0,
        },
      };
    }
  },
  ["getFilteredResults"],
  {
    revalidate: 360,
  }
);

export const getSingleDestination = async (destinationsId: string) => {
  const destination = await db
    .select()
    .from(tourPlaces)
    .where(eq(tourPlaces.id, destinationsId))
    .limit(1);

  if (!destination.length) {
    redirect("/destinations");
  }

  return destination[0];
};

export const getSimilarDestinations = async (
  category: string,
  currentId: string
) => {
  const similar = await db
    .select({
      id: tourPlaces.id,
      title: tourPlaces.name,
      imageUrl: tourPlaces.imageUrl,
    })
    .from(tourPlaces)
    .where(
      and(eq(tourPlaces.category, category), ne(tourPlaces.id, currentId))
    );
  return similar;
};

export const getSingleHotel = async (hotelsId: string) => {
  const hotel = await db
    .select()
    .from(hotels)
    .where(eq(hotels.id, hotelsId))
    .limit(1);

  if (!hotel.length) {
    redirect("/hotels");
  }

  return hotel[0];
};

export const addFavorite = async (
  itemId: string,
  itemType: "hotel" | "destination"
) => {
  const user = await getAuthUser();
  const userId = user.id;
  if (!userId) {
    throw new Error("You must be logged in to add favorites");
  }

  try {
    await db.insert(favorites).values({
      clerkId: userId,
      itemId,
      itemType,
    });

    revalidatePath("/favorites");
    if (itemType === "destination") {
      revalidatePath("/destinations");
      revalidatePath(`/destinations/${itemId}`);
    } else {
      revalidatePath("/hotels");
      revalidatePath(`/hotels/${itemId}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding favorites: ", error);
    return { success: false, error: "Failed to add Favorites" };
  }
};
