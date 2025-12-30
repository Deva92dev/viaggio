/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import "@/utils/leafletIcons";
import {
  db,
  tourPlaces,
  hotels,
  favorites,
  bookings,
  reviews,
  reviewHelpful,
} from "@/db";
import {
  and,
  asc,
  desc,
  eq,
  gte,
  isNotNull,
  like,
  lt,
  lte,
  ne,
  sql,
  SQL,
} from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_cache } from "next/cache";
import {
  BookingEligibilityType,
  CreateBookingData,
  CreateReviewType,
  DestinationsType,
  HotelsType,
  PaginationType,
  PopularDestinations,
  ReviewItemType,
  UpdateBookingData,
  UpdateReviewType,
} from "./types";
import { getValidatedPage } from "./pagination";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access.");
  }
  return user;
};

// count(*) uses DrizzleORM’s sql helper to safely run aggregate functions.
const LIMIT = 6;

export const getPopularDestinations = unstable_cache(
  async (): Promise<PopularDestinations[]> => {
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
  },
  ["getPopularDestinations"],
  { revalidate: 3600 }
);

const fetchGalleryImagesInternal = async () => {
  try {
    const [hotelPool, destinationPool] = await Promise.all([
      db
        .select({
          id: hotels.id,
          name: hotels.name,
          imageUrl: hotels.imageUrl,
        })
        .from(hotels)
        .where(isNotNull(hotels.imageUrl))
        .orderBy(desc(hotels.id))
        .limit(20),
      db
        .select({
          id: tourPlaces.id,
          name: tourPlaces.name,
          imageUrl: tourPlaces.imageUrl,
        })
        .from(tourPlaces)
        .where(isNotNull(tourPlaces.imageUrl))
        .orderBy(desc(tourPlaces.id))
        .limit(20),
    ]);

    // Format the pool
    const combinedPool = [
      ...hotelPool.map((img) => ({
        id: `hotel-${img.id}`,
        url: img.imageUrl!,
        name: img.name,
        type: "hotel" as const,
      })),
      ...destinationPool.map((img) => ({
        id: `dest-${img.id}`,
        url: img.imageUrl!,
        name: img.name,
        type: "destination" as const,
      })),
    ];

    // Extremely Fast for small arrays
    // This is the Fisher-Yates Shuffle algorithm (better than Math.random() - 0.5)
    for (let i = combinedPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedPool[i], combinedPool[j]] = [combinedPool[j], combinedPool[i]];
    }

    return combinedPool.slice(0, 8);
  } catch (error) {
    console.error("Error in fetchGalleryImages:", error);
    return [];
  }
};

export const getGalleryImages = unstable_cache(
  fetchGalleryImagesInternal,
  ["homepage-gallery-images"],
  {
    revalidate: 3600,
    tags: ["gallery"],
  }
);

export const fetchAllDestinationsForSitemap = unstable_cache(
  async () =>
    await db
      .select({ id: tourPlaces.id, updatedAt: tourPlaces.updatedAt })
      .from(tourPlaces),
  ["destinations-sitemap"],
  { revalidate: 3600 }
);

export const fetchAllHotelsForSitemap = unstable_cache(
  async () =>
    await db
      .select({ id: hotels.id, updatedAt: hotels.updatedAt })
      .from(hotels),
  ["hotels-sitemap"],
  { revalidate: 3600 }
);

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
  try {
    // Get unique countries from BOTH tables
    const [tourPlacesCountries, hotelCountries] = await Promise.all([
      db
        .select({
          country: tourPlaces.country,
          image: sql<string>`MIN(${tourPlaces.imageUrl})`,
        })
        .from(tourPlaces)
        .groupBy(tourPlaces.country),

      db
        .select({
          country: hotels.country,
          image: sql<string>`MIN(${hotels.imageUrl})`, // Fallback image from hotels if needed
        })
        .from(hotels)
        .groupBy(hotels.country),
    ]);

    // Create a combined set of all unique countries
    const allCountriesMap = new Map();

    // Add countries from tourPlaces (with their images)
    tourPlacesCountries.forEach(({ country, image }) => {
      allCountriesMap.set(country, { country, image });
    });

    // Add countries from hotels (only if not already added)
    hotelCountries.forEach(({ country, image }) => {
      if (!allCountriesMap.has(country)) {
        allCountriesMap.set(country, { country, image });
      }
    });

    // Get all counts in parallel
    const [destinationCounts, hotelCounts] = await Promise.all([
      db
        .select({
          country: tourPlaces.country,
          count: sql<number>`count(*)`,
        })
        .from(tourPlaces)
        .groupBy(tourPlaces.country),

      db
        .select({
          country: hotels.country,
          count: sql<number>`count(*)`,
        })
        .from(hotels)
        .groupBy(hotels.country),
    ]);

    // Create lookup maps for O(1) access
    const destCountMap = new Map(
      destinationCounts.map((d) => [d.country, d.count])
    );
    const hotelCountMap = new Map(hotelCounts.map((h) => [h.country, h.count]));

    // Convert map to array and add counts
    const data = Array.from(allCountriesMap.values()).map(
      ({ country, image }) => ({
        country,
        image,
        destinationsCount: destCountMap.get(country) || 0,
        hotelsCount: hotelCountMap.get(country) || 0,
      })
    );

    // Sort by country name for consistency
    return data.sort((a, b) => a.country.localeCompare(b.country)).slice(0, 6);
  } catch (error) {
    console.error("Error in getAllCountriesWithData:", error);
    return [];
  }
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
    .where(and(eq(tourPlaces.category, category), ne(tourPlaces.id, currentId)))
    .limit(4);

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

export const getSimilarHotels = async (category: string, currentId: string) => {
  const similar = await db
    .select({
      id: hotels.id,
      title: hotels.name,
      image: hotels.imageUrl,
    })
    .from(hotels)
    .where(and(eq(hotels.category, category), ne(hotels.id, currentId)))
    .limit(4);

  return similar;
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

  // check if item is already favorited
  const existingFavorites = await db
    .select()
    .from(favorites)
    .where(
      and(
        eq(favorites.clerkId, userId),
        eq(favorites.itemId, itemId),
        eq(favorites.itemType, itemType)
      )
    )
    .limit(1);

  if (existingFavorites.length > 0) {
    return { success: false, error: "Item already added to favorites" };
  }

  // add to favorites
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

export const removeFavorite = async (
  itemId: string,
  itemType: "hotel" | "destination"
) => {
  const user = await getAuthUser();
  const userId = user.id;
  if (!userId) {
    throw new Error("You must be logged in to remove favorite");
  }

  try {
    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.clerkId, userId),
          eq(favorites.itemId, itemId),
          eq(favorites.itemType, itemType)
        )
      );

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
    console.error("Error removing favorites: ", error);
    return { success: false, error: "Failed to remove Favorites" };
  }
};

// check if the item is favorite by the current user
export const IsFavorited = async (
  itemId: string,
  itemType: "hotel" | "destination"
) => {
  const user = await getAuthUser();
  const userId = user.id;
  if (!userId) {
    return false;
  }

  try {
    const favorite = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.clerkId, userId),
          eq(favorites.itemId, itemId),
          eq(favorites.itemType, itemType)
        )
      )
      .limit(1);

    return favorite.length > 0;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};

// get user favorites
export const getUserFavorites = async () => {
  const user = await getAuthUser();
  const userId = user.id;
  if (!userId) {
    throw new Error("You must be logged in to view favorites");
  }

  try {
    const userFavorites = await db
      .select()
      .from(favorites)
      .where(eq(favorites.clerkId, userId));

    return userFavorites;
  } catch (error) {
    console.error("Error fetching favorites", error);
    return [];
  }
};

// get all favorite destinations for a user
export const getFavoriteDestinations = async () => {
  const user = await getAuthUser();
  const userId = user.id;
  if (!userId) {
    return [];
  }

  try {
    const favoriteDestinations = await db
      .select({
        destination: tourPlaces,
        favoriteId: favorites.id,
      })
      .from(favorites)
      .innerJoin(tourPlaces, eq(favorites.itemId, tourPlaces.id))
      .where(
        and(
          eq(favorites.clerkId, userId),
          eq(favorites.itemType, "destination")
        )
      );

    return favoriteDestinations.map((item) => ({
      ...item.destination,
      favoriteId: item.favoriteId,
    }));
  } catch (error) {
    console.error("Error getting favorite destinations", error);
    return [];
  }
};

// get all favorites hotel of a user
export const getFavoriteHotels = async () => {
  const user = await getAuthUser();
  const userId = user.id;
  if (!userId) {
    return [];
  }

  try {
    const favoriteHotels = await db
      .select({
        hotel: hotels,
        favoriteId: favorites.id,
      })
      .from(favorites)
      .innerJoin(hotels, eq(favorites.itemId, hotels.id))
      .where(
        and(eq(favorites.clerkId, userId), eq(favorites.itemType, "hotel"))
      );

    return favoriteHotels.map((item) => ({
      ...item.hotel,
      favoriteId: item.favoriteId,
    }));
  } catch (error) {
    console.error("Error at getting favorite hotels", error);
    return [];
  }
};

// toggle favorite status
export const toggleFavorite = async (
  itemId: string,
  itemType: "hotel" | "destination"
) => {
  const isFavorite = await IsFavorited(itemId, itemType);

  if (isFavorite) {
    return removeFavorite(itemId, itemType);
  } else {
    return addFavorite(itemId, itemType);
  }
};

type GeoCoords = { lat: number; lon: number };
const memoryCache: Record<string, GeoCoords> = {};

// replace user agent with your vercel website url
export const GeoLocation = async (location: string): Promise<GeoCoords> => {
  const key = location.toLocaleLowerCase().trim();

  if (memoryCache[key]) {
    return memoryCache[key];
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    location
  )}`;

  const res = await fetch(url, {
    headers: {
      "user-agent": "buildwith92deva@gmail.com",
    },
  });

  if (!res.ok) throw new Error("Failed to get geoCodeLocation");
  const data = await res.json();
  if (!data || data.length === 0) throw new Error("Location not found");

  const coords = {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };

  memoryCache[key] = coords;

  return coords;
};

export const checkReviewEligibility = async (
  userId: string,
  itemId: string,
  itemType: ReviewItemType
) => {
  try {
    if (!userId || !itemId || !itemType) {
      console.error("Invalid parameters for eligibility check", {
        userId,
        itemId,
        itemType,
      });
      return {
        eligible: false,
        reason: "Invalid parameters for eligibility check.",
      };
    }

    const completedBookings = await db.query.bookings.findMany({
      where: and(
        eq(bookings.clerkId, userId),
        eq(bookings.itemId, itemId),
        eq(bookings.itemType, itemType),
        eq(bookings.bookingStatus, "confirmed") // be very sure of it
      ),
      orderBy: desc(bookings.checkOutDate),
    });

    if (completedBookings.length === 0) {
      return {
        eligible: false,
        reason: "You must have completed a booking to leave a review",
      };
    }

    // Check if user already reviewed any of these bookings
    const existingReview = await db.query.reviews.findFirst({
      where: and(
        eq(reviews.clerkId, userId),
        eq(reviews.itemId, itemId),
        eq(reviews.itemType, itemType)
      ),
    });

    if (existingReview) {
      return {
        eligible: false,
        reason: "You have already reviewed this Item",
      };
    }

    // you can change time for any period here, for now set for 1 day
    const checkoutDate = new Date(completedBookings[0].checkOutDate);
    const now = new Date();

    return {
      eligible: true,
      booking: completedBookings[0],
      bookingId: completedBookings[0].id,
    };
  } catch (error) {
    console.error("Error checking review eligibility:", error);
    return {
      eligible: false,
      reason: "Unable to verify booking eligibility.",
    };
  }
};

// Helper function to validate booking belongs to user and is eligible
export const validateBookingForReview = async (
  userId: string,
  bookingId: string
): Promise<{ valid: boolean; booking?: any; reason?: string }> => {
  try {
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
    });

    if (!booking) {
      return {
        valid: false,
        reason: "Booking not found",
      };
    }

    if (booking.clerkId !== userId) {
      return {
        valid: false,
        reason: "This booking does not belong to you",
      };
    }

    // Accept both confirmed and completed statuses
    if (!["completed", "confirmed"].includes(booking.bookingStatus)) {
      return {
        valid: false,
        reason: "You can only review completed bookings",
      };
    }

    const checkoutDate = new Date(booking.checkOutDate);
    const now = new Date();

    // you can change it to different dates for hotel and destinations
    if (now < checkoutDate) {
      const daysUntilEligible = Math.ceil(
        (checkoutDate.getTime() - now.getTime()) * 1000 * 60 * 60 * 24
      );

      return {
        valid: false,
        reason: `You can leave a review after ${daysUntilEligible} day(s) after your checkout.`,
      };
    }

    // Check if this booking has already been reviewed
    const existingReview = await db.query.reviews.findFirst({
      where: eq(reviews.bookingId, bookingId),
    });

    if (existingReview) {
      return {
        valid: false,
        reason: "You have already reviewed this booking.",
      };
    }

    return {
      valid: true,
      booking,
    };
  } catch (error) {
    console.error("Error validating booking:", error);
    return { valid: false, reason: "Unable to validate booking." };
  }
};

// Helper function to update average rating
export const updateAverageRating = async (
  itemId: string,
  itemType: ReviewItemType
) => {
  const result = await db
    .select({
      averageRating: sql<number>`ROUND(AVG(${reviews.rating}), 2)`,
      totalReviews: sql<number>`COUNT(*)`,
    })
    .from(reviews)
    .where(and(eq(reviews.itemId, itemId), eq(reviews.itemType, itemType)));

  let { averageRating, totalReviews } = result[0];

  if (averageRating === null || averageRating === undefined) {
    averageRating = 0;
  }

  if (totalReviews === null || totalReviews === undefined) {
    totalReviews = 0;
  }

  const ratingStr = String(averageRating);

  if (itemType === "destination") {
    await db
      .update(tourPlaces)
      .set({
        averageRating: ratingStr,
        totalReviews: totalReviews,
      })
      .where(eq(tourPlaces.id, itemId));
  } else {
    await db
      .update(hotels)
      .set({
        averageRating: ratingStr,
        totalReviews: totalReviews,
      })
      .where(eq(hotels.id, itemId));
  }
};

// CHECK REVIEW ELIGIBILITY
export const checkUserReviewEligibility = async (
  itemId: string,
  itemType: ReviewItemType
): Promise<BookingEligibilityType> => {
  try {
    const user = await getAuthUser().catch(() => null);
    if (!user || !user.id) {
      return {
        eligible: false,
        reason: "Please sign in to leave a review.",
        requiresAuth: true,
      };
    }

    const userId = user.id;
    const result = await checkReviewEligibility(userId, itemId, itemType);

    return {
      ...result,
      // Only use fallback reason when NOT eligible
      reason: result.eligible
        ? result.reason || ""
        : result.reason || "Unable to determine eligibility",
    };
  } catch (error) {
    console.error("Error checking review eligibility:", error);
    return {
      eligible: false,
      reason: "Unable to check review eligibility at this time.",
    };
  }
};

// GET USER'S ELIGIBLE BOOKINGS FOR REVIEW
export const getEligibleBookingsForReviews = async () => {
  try {
    const user = await getAuthUser();
    const userId = user.id;
    if (!userId) {
      return { error: "Unauthorized. Please sign in." };
    }

    const today = new Date().toISOString().split("T")[0];

    const eligibleBookings = await db.query.bookings.findMany({
      where: and(
        eq(bookings.clerkId, userId),
        eq(bookings.bookingStatus, "completed"),
        lt(bookings.checkOutDate, today)
      ),
      with: {
        tourPlace: {
          columns: {
            name: true,
            location: true,
            imageUrl: true,
          },
        },
        hotel: {
          columns: {
            name: true,
            location: true,
            imageUrl: true,
          },
        },
      },
      orderBy: desc(bookings.checkOutDate),
    });

    // Filter out bookings that already have reviews
    const reviewedBookingIds = await db
      .select({ bookingId: reviews.bookingId })
      .from(reviews)
      .where(eq(reviews.clerkId, userId));

    const reviewedIds = new Set(reviewedBookingIds.map((r) => r.bookingId));
    const unReviewed = eligibleBookings.filter(
      (booking) => !reviewedIds.has(booking.id)
    );

    return { success: true, booking: unReviewed };
  } catch (error) {
    console.error("Error fetching eligible bookings:", error);
    return { error: "Failed to fetch eligible bookings." };
  }
};

export const createReview = async (data: CreateReviewType) => {
  try {
    const user = await getAuthUser();
    const userId = user.id;
    const author = user.firstName || "Anonymous";
    const authorImageUrl = user.imageUrl || "/default-avatar.png";
    if (!userId) {
      return { error: "Unauthorized. Please sign in to give a review." };
    }

    // validating rating
    if (data.rating < 1 || data.rating > 5) {
      return { error: "Rating must be between 1 to 5" };
    }

    // validate booking for review
    const validation = await validateBookingForReview(userId, data.bookingId);
    if (!validation.valid) {
      return { error: validation.reason };
    }

    const booking = validation.booking;

    const [newReview] = await db
      .insert(reviews)
      .values({
        clerkId: userId,
        bookingId: data.bookingId,
        author: author,
        authorImageUrl: authorImageUrl,
        itemId: booking.itemId,
        itemType: booking.itemType,
        rating: data.rating,
        comment: data.comment,
        visitDate: data.visitDate || booking.checkoutDate,
      })
      .returning();

    await updateAverageRating(booking.itemId, booking.itemType);

    revalidatePath(`/${booking.itemType}s/${booking.itemId}`);
    revalidatePath(`/${booking.itemType}s`);

    return { success: true, review: newReview };
  } catch (error) {
    console.error("Error creating review:", error);
    return { error: "Failed to create review. Please try again." };
  }
};

export const getReviews = async (
  itemId: string,
  itemType: ReviewItemType,
  sortBy: "newest" | "oldest" | "rating_high" | "rating_low" = "newest"
) => {
  try {
    const currentUser = await getAuthUser().catch(() => null); // allow not logged in
    const currentUserId = currentUser?.id ?? null;
    let orderBy;
    switch (sortBy) {
      case "oldest":
        orderBy = asc(reviews.createdAt);
        break;
      case "rating_high":
        orderBy = desc(reviews.rating);
        break;
      case "rating_low":
        orderBy = asc(reviews.rating);
        break;
      default:
        orderBy = desc(reviews.createdAt);
    }

    const reviewsData = await db.query.reviews.findMany({
      where: and(eq(reviews.itemId, itemId), eq(reviews.itemType, itemType)),
      orderBy,
      columns: {
        id: true,
        itemId: true,
        author: true,
        authorImageUrl: true,
        itemType: true,
        bookingId: true,
        clerkId: true,
        rating: true,
        comment: true,
        createdAt: true,
        helpful: true,
      },
      with: {
        user: {
          columns: {
            firstName: true,
            lastName: true,
            profileImageUrl: true,
          },
        },
        booking: {
          columns: {
            checkInDate: true,
            checkOutDate: true,
            numberOfGuests: true,
          },
        },
        helpfulVotes: {
          // <-- relation from schema (reviewHelpful)
          columns: {
            clerkId: true,
          },
        },
      },
    });

    // Map to include helpfulCount & helpfulByMe
    const enhancedReviews = reviewsData.map((rev) => ({
      ...rev,
      helpfulCount:
        rev.helpful != null
          ? Number(rev.helpful)
          : rev.helpfulVotes?.length ?? 0,
      helpfulByMe: currentUserId
        ? rev.helpfulVotes?.some((h) => h.clerkId === currentUserId)
        : false,
    }));

    return { success: true, reviews: enhancedReviews };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { error: "Failed to fetch reviews." };
  }
};

export const getUserReviews = async () => {
  try {
    const user = await getAuthUser().catch(() => null);
    if (!user || !user.id) {
      return {
        success: true,
        reviews: [],
        message: "Sign in to see your reviews",
      };
    }
    const userId = user.id;

    const userReviews = await db.query.reviews.findMany({
      where: eq(reviews.clerkId, userId),
      orderBy: desc(reviews.createdAt),
      with: {
        booking: {
          columns: {
            checkInDate: true,
            checkOutDate: true,
            numberOfGuests: true,
          },
        },
        tourPlace: {
          columns: {
            name: true,
            location: true,
            imageUrl: true,
          },
        },
        hotel: {
          columns: {
            name: true,
            location: true,
            imageUrl: true,
          },
        },
      },
    });

    return { success: true, reviews: userReviews };
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return { error: "Failed to fetch your reviews." };
  }
};

export const updateReview = async (
  reviewId: string,
  data: UpdateReviewType
) => {
  try {
    const user = await getAuthUser();
    const userId = user.id;

    if (!userId) {
      return { error: "Unauthorized. Please sign in to update your review." };
    }

    // Find existing review
    const existingReview = await db.query.reviews.findFirst({
      where: eq(reviews.id, reviewId),
    });

    if (!existingReview) {
      return { error: "Review not found..." };
    }

    // Verify ownership
    if (existingReview.clerkId !== userId) {
      return { error: "Unauthorized. You can only edit your own review." };
    }

    // Validate rating if provided
    if (data.rating && (data.rating < 1 || data.rating > 5)) {
      return { error: "Rating must be between 1 and 5 stars." };
    }

    // Validate comment if provided
    if (data.comment && data.comment.trim().length < 10) {
      return { error: "Comment must be at least 10 characters long." };
    }

    // Prepare update data (only include fields that are provided and valid)
    const updateData: Partial<typeof reviews.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (data.rating !== undefined) {
      updateData.rating = data.rating;
    }

    if (data.comment !== undefined) {
      updateData.comment = data.comment.trim();
    }

    // Update review
    const [updatedReview] = await db
      .update(reviews)
      .set(updateData)
      .where(eq(reviews.id, reviewId))
      .returning();

    // Update average rating if rating changed
    const itemType = existingReview.itemType as ReviewItemType;
    if (data.rating !== undefined) {
      await updateAverageRating(existingReview.itemId, itemType);
    }

    revalidatePath(`/${existingReview.itemType}s/${existingReview.itemId}`);
    revalidatePath(`/${existingReview.itemType}s`);

    return { success: true, review: updatedReview };
  } catch (error) {
    console.error("Error updating review:", error);
    return { error: "Failed to update review. Please try again." };
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const user = await getAuthUser();
    const userId = user.id;
    if (!userId) {
      return { error: "Unauthorized. Please sign in to delete your review." };
    }

    const existingReview = await db.query.reviews.findFirst({
      where: eq(reviews.id, reviewId),
    });
    if (!existingReview) {
      return { error: "Review not found." };
    }

    if (existingReview.clerkId !== userId) {
      return { error: "Unauthorized. You can only delete your reviews." };
    }
    // delete helpful review first
    await db.delete(reviewHelpful).where(eq(reviewHelpful.reviewId, reviewId));
    // delete review
    await db.delete(reviews).where(eq(reviews.id, reviewId));
    // update average rating
    const itemType = existingReview.itemType as ReviewItemType;
    await updateAverageRating(existingReview.itemId, itemType);

    revalidatePath(`/${existingReview.itemType}s/${existingReview.itemId}`);
    revalidatePath(`/${existingReview.itemType}s`);

    return { success: true, message: "Review deleted successfully." };
  } catch (error) {
    console.error("Error deleting review:", error);
    return { error: "Failed to delete review. Please try again." };
  }
};

// make review as helpful
export const makeReviewHelpful = async (reviewId: string) => {
  try {
    const user = await getAuthUser();
    const userId = user.id;
    if (!userId) {
      return {
        error: "Unauthorized. Please sign in to mark reviews as helpful.",
      };
    }

    // Check if user already marked this review as helpful
    const existingVote = await db.query.reviewHelpful.findFirst({
      where: and(
        eq(reviewHelpful.reviewId, reviewId),
        eq(reviewHelpful.clerkId, userId)
      ),
    });

    if (existingVote) {
      // Remove the helpful vote
      await db
        .delete(reviewHelpful)
        .where(eq(reviewHelpful.id, existingVote.id));
      // Update review helpful count
      await db
        .update(reviews)
        .set({
          helpful: sql`${reviews.helpful} - 1`,
        })
        .where(eq(reviews.id, reviewId));

      await revalidatePath(`/${reviews.itemType}s/${reviews.itemId}`);
      await revalidatePath(`/${reviews.itemType}s`);
      return { success: true, action: "removed" };
    } else {
      // add helpful vote
      await db.insert(reviewHelpful).values({
        reviewId,
        clerkId: userId,
      });

      // Update review helpful count
      await db
        .update(reviews)
        .set({
          helpful: sql`${reviews.helpful} + 1`,
        })
        .where(eq(reviews.id, reviewId));
      await revalidatePath(`/${reviews.itemType}s/${reviews.itemId}`);
      await revalidatePath(`/${reviews.itemType}s`);

      return { success: true, action: "added" };
    }
  } catch (error) {
    console.error("Error marking review as helpful:", error);
    return { error: "Failed to update helpful status." };
  }
};

export const getReviewStats = async (
  itemId: string,
  itemType: ReviewItemType
) => {
  try {
    const stats = await db
      .select({
        averageRating: sql<number>`ROUND(AVG(${reviews.rating}), 2)`,
        totalReviews: sql<number>`COUNT(*)`,
        fiveStars: sql<number>`COUNT(CASE WHEN ${reviews.rating} = 5 THEN 1 END)`,
        fourStars: sql<number>`COUNT(CASE WHEN ${reviews.rating} = 4 THEN 1 END)`,
        threeStars: sql<number>`COUNT(CASE WHEN ${reviews.rating} = 3 THEN 1 END)`,
        twoStars: sql<number>`COUNT(CASE WHEN ${reviews.rating} = 2 THEN 1 END)`,
        oneStar: sql<number>`COUNT(CASE WHEN ${reviews.rating} = 1 THEN 1 END)`,
      })
      .from(reviews)
      .where(and(eq(reviews.itemId, itemId), eq(reviews.itemType, itemType)));

    return { success: true, stats: stats[0] };
  } catch (error) {
    console.error("Error fetching review stats:", error);
    return { error: "Failed to fetch review statistics." };
  }
};

// bookings
export const createBooking = async (data: CreateBookingData) => {
  try {
    const user = await getAuthUser();
    const userId = user?.id;
    if (!userId) {
      return { error: "Unauthorized. Please sign in to create a booking." };
    }

    // Validate dates
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return { error: "Check-in date cannot be in the past." };
    }
    if (checkOut <= checkIn) {
      return { error: "Check-out date must be after check-in date." };
    }
    if (data.numberOfGuests < 1 || data.numberOfGuests > 5) {
      return { error: "Number of guests must be between 1 and 5." };
    }

    // Verify item & availability
    let hotelItem: any = null;
    if (data.itemType === "destination") {
      const item = await db.query.tourPlaces.findFirst({
        where: eq(tourPlaces.id, data.itemId),
      });
      if (!item) return { error: "Destination not found." };
    } else {
      hotelItem = await db.query.hotels.findFirst({
        where: eq(hotels.id, data.itemId),
      });
      if (!hotelItem) return { error: "Hotel not found." };

      if (data.numberOfRooms && data.numberOfRooms > hotelItem.availableRooms) {
        return { error: "Not enough rooms available." };
      }
    }

    // Create booking
    const [newBooking] = await db
      .insert(bookings)
      .values({
        clerkId: userId,
        itemId: data.itemId,
        itemType: data.itemType,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        numberOfGuests: data.numberOfGuests,
        totalAmount: data.totalAmount.toString(),
        paymentId: data.paymentId,
        specialRequests: data.specialRequests,
        roomType: data.roomType,
        numberOfRooms: data.numberOfRooms || 1,
        bookingStatus: data.paymentId ? "confirmed" : "pending",
        paymentStatus: data.paymentId ? "completed" : "pending",
      })
      .returning();

    if (!newBooking) {
      console.error("Booking insert returned empty");
      return { error: "Failed to create booking record" };
    }

    // Update hotel availability
    if (data.itemType === "hotel" && data.numberOfRooms && hotelItem) {
      await db
        .update(hotels)
        .set({
          availableRooms: hotelItem.availableRooms - data.numberOfRooms,
        })
        .where(eq(hotels.id, data.itemId));
    }

    // Revalidate pages to refresh UI
    revalidatePath(`/${data.itemType}s/${data.itemId}`);
    revalidatePath("/bookings");

    return { success: true, booking: newBooking };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { error: "Failed to create booking. Please try again." };
  }
};

export const updateBooking = async (
  bookingId: string,
  data: UpdateBookingData
) => {
  try {
    const user = await getAuthUser();
    const userId = user.id;
    if (!userId) {
      return { error: "Unauthorized. Please sign in to update your booking." };
    }

    // check if booking exists and belong to user
    const existingBooking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
    });
    if (!existingBooking) {
      return { error: "Booking not found" };
    }
    if (existingBooking.clerkId !== userId) {
      return { error: "Unauthorized. You can update only your own booking." };
    }

    const [updatedBooking] = await db
      .update(bookings)
      .set({
        ...data,
        createdAt: new Date(),
      })
      .where(eq(bookings.id, bookingId))
      .returning();

    // If booking is cancelled, restore hotel room availability
    if (
      data.bookingStatus === "cancelled" &&
      existingBooking.itemType === "hotel"
    ) {
      const hotel = await db.query.hotels.findFirst({
        where: eq(hotels.id, existingBooking.itemId),
      });
      if (hotel) {
        await db
          .update(hotels)
          .set({
            availableRooms:
              hotel.availableRooms + (existingBooking.numberOfRooms || 1),
          })
          .where(eq(hotels.id, existingBooking.itemId));
      }
    }

    // change after @modal pages
    revalidatePath("/bookings");
    return { success: true, booking: updatedBooking };
  } catch (error) {
    console.error("Error updating booking:", error);
    return { error: "Failed to update booking. Please try again." };
  }
};

export const getUserBookings = async () => {
  try {
    const user = await getAuthUser();
    const userId = user.id;
    if (!userId) {
      return { error: "Unauthorized. Please sign in to get your bookings." };
    }

    const userBookings = await db.query.bookings.findMany({
      where: eq(bookings.clerkId, userId),
      orderBy: desc(bookings.createdAt),
      with: {
        tourPlace: {
          columns: {
            name: true,
            location: true,
            imageUrl: true,
            country: true,
          },
        },
        hotel: {
          columns: {
            name: true,
            location: true,
            imageUrl: true,
            country: true,
          },
        },
      },
    });

    return { success: true, bookings: userBookings };
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return { error: "Failed to fetch your bookings." };
  }
};

export const getSingleBooking = async (bookingId: string) => {
  try {
    const user = await getAuthUser();
    const userId = user.id;
    if (!userId) {
      return { error: "Unauthorized. Please sign in." };
    }

    const booking = await db.query.bookings.findFirst({
      where: and(eq(bookings.id, bookingId), eq(bookings.clerkId, userId)),
      with: {
        tourPlace: true,
        hotel: true,
      },
    });
    if (!booking) {
      return { error: "Booking not found." };
    }

    return { success: true, booking };
  } catch (error) {
    console.error("Error fetching booking:", error);
    return { error: "Failed to fetch booking." };
  }
};

export const cancelBooking = async (bookingId: string) => {
  try {
    const user = await getAuthUser();
    const userId = user.id;
    if (!userId) {
      return { error: "Unauthorized. Please sign in." };
    }
    // Check if booking exists and belongs to user
    const existingBooking = await db.query.bookings.findFirst({
      where: and(eq(bookings.id, bookingId), eq(bookings.clerkId, userId)),
    });
    if (!existingBooking) {
      return { error: "Booking not found" };
    }
    if (existingBooking.bookingStatus === "cancelled") {
      return { error: "Booking is already cancelled" };
    }
    if (existingBooking.bookingStatus === "completed") {
      return { error: "Cannot cancel completed booking" };
    }

    // Check if cancellation is allowed (e.g., not within 24 hours of check-in)
    const checkInDate = new Date(existingBooking.checkInDate);
    const now = new Date();
    const timeDifference = checkInDate.getTime() - now.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);
    if (hoursDifference < 24) {
      return { error: "Cannot cancel booking within 24 hours of check-in" };
    }

    await updateBooking(bookingId, {
      bookingStatus: "cancelled",
      paymentStatus: "refunded",
    });

    return { success: true, message: "Booking cancelled successfully." };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return { error: "Failed to cancel booking. Please try again." };
  }
};

export const updatePaymentStatus = async (
  bookingId: string,
  paymentId: string,
  status: "completed" | "failed"
) => {
  try {
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
    });

    if (!booking) {
      return { error: "Booking not found" };
    }

    await db
      .update(bookings)
      .set({
        paymentId,
        paymentStatus: status,
        bookingStatus: status === "completed" ? "completed" : "pending",
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, bookingId));

    return { success: true };
  } catch (error) {
    console.error("Error updating payment status:", error);
    return { error: "Failed to update payment status." };
  }
};
