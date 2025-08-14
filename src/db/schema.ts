import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  uuid,
  varchar,
  date,
  decimal,
} from "drizzle-orm/pg-core";

// npx drizzle-kit generate, then
// npx drizzle-kit push

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  clerkId: text("clerk_id").unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

// text for longer strings, varchar for short strings in characters
export const tourPlaces = pgTable("tourPlaces", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  duration: varchar("duration", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  bestTimeToVisit: varchar("best_time_to_visit", { length: 255 })
    .array()
    .notNull()
    .default([]),
  category: varchar("category", { length: 100 }).notNull().default("adventure"),
  popular: boolean("popular").default(false),
  averageRating: decimal("average_rating", { precision: 3, scale: 2 }).default(
    "0.00"
  ),
  totalReviews: integer("total_reviews").default(0),
  clerkId: text("clerk_id").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

// add favorites now,  rating later,
export const hotels = pgTable("hotels", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  clerkId: text("clerk_id").notNull(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  imageUrl: text("imageUrl").notNull(),
  pricePerNight: integer("price_per_night").notNull(),
  availableRooms: integer("available_rooms").notNull().default(0),
  amenities: text("amenities").array().notNull().default([]),
  category: varchar("category", { length: 100 }).notNull().default("standard"),
  checkInDate: date("check_in_date").notNull().defaultNow(), // Default: Today
  checkOutDate: date("check_out_date").notNull(),
  averageRating: decimal("average_rating", { precision: 3, scale: 2 }).default(
    "0.00"
  ),
  totalReviews: integer("total_reviews").default(0),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const favorites = pgTable("favorites", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  clerkId: text("clerk_id").notNull(),
  itemId: uuid("item_id").notNull(),
  itemType: varchar("item_type", { length: 20 }).notNull(), // hotels or destinations
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  clerkId: text("clerk_id").notNull(),
  itemId: uuid("item_id").notNull(),
  itemType: varchar("item_type", { length: 20 }).notNull(), // hotel or destination
  bookingDate: timestamp({ withTimezone: true }).notNull().defaultNow(),
  checkInDate: date("check_in_date").notNull(),
  checkOutDate: date("check_out_date").notNull(),
  numberOfGuests: integer("number_of_guests").notNull().default(1),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  bookingStatus: varchar("booking_status", { length: 20 })
    .notNull()
    .default("confirmed"), // confirmed, pending, cancelled, completed
  paymentStatus: varchar("payment_status", { length: 20 })
    .notNull()
    .default("pending"), // pending, failed, completed, refunded
  paymentId: varchar("payment_id", { length: 255 }), // For payment gateway reference
  specialRequests: text("special_requests"),
  roomType: varchar("room_type", { length: 100 }),
  numberOfRooms: integer("number_of_rooms").default(1),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  clerkId: text("clerk_id").notNull(),
  bookingId: uuid("booking_id").notNull(), // LINK TO BOOKING
  itemId: uuid("item_id").notNull(),
  itemType: varchar("item_type", { length: 20 }).notNull(), // destination or hotel
  rating: integer("rating").notNull(),
  author: text("author").notNull(),
  authorImageUrl: text("authorImageUrl").notNull(),
  comment: text("comment").notNull(),
  visitDate: date("visit_date"),
  isVerified: boolean("is_verified").default(true), // Auto-verified since booking is required
  helpful: integer("helpful").default(0), // number of helpful reviews
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

// Review helpful votes table (to track who found a review helpful)
export const reviewHelpful = pgTable("review_helpful", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  reviewId: uuid("review_id").notNull(),
  clerkId: text("clerk_id").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

// Create relations for easier queries
export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.clerkId],
    references: [users.clerkId],
  }),

  tourPlace: one(tourPlaces, {
    fields: [favorites.itemId],
    references: [tourPlaces.id],
    relationName: "favorite_tour_place",
  }),

  hotel: one(hotels, {
    fields: [favorites.itemId],
    references: [hotels.id],
    relationName: "favorites_hotels",
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  reviews: many(reviews),
  favorites: many(favorites),
  reviewHelpful: many(reviewHelpful),
}));

export const tourPlacesRelations = relations(tourPlaces, ({ many }) => ({
  bookings: many(bookings, {
    relationName: "destination_bookings",
  }),
  reviews: many(reviews, {
    relationName: "destination_reviews",
  }),
  favorites: many(favorites, {
    relationName: "favorite_destinations",
  }),
}));

export const hotelsRelations = relations(hotels, ({ many }) => ({
  bookings: many(bookings, {
    relationName: "hotel_bookings",
  }),
  reviews: many(reviews, {
    relationName: "hotel_reviews",
  }),
  favorites: many(favorites, {
    relationName: "favorite_hotels",
  }),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.clerkId],
    references: [users.clerkId],
  }),
  tourPlace: one(tourPlaces, {
    fields: [bookings.itemId],
    references: [tourPlaces.id],
    relationName: "destination_bookings",
  }),
  hotel: one(hotels, {
    fields: [bookings.itemId],
    references: [hotels.id],
    relationName: "hotel_bookings",
  }),
  reviews: many(reviews),
}));

export const reviewRelations = relations(reviews, ({ one, many }) => ({
  user: one(users, {
    fields: [reviews.clerkId],
    references: [users.clerkId],
  }),

  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id],
  }),

  tourPlace: one(tourPlaces, {
    fields: [reviews.itemId],
    references: [tourPlaces.id],
    relationName: "destination_reviews",
  }),

  hotel: one(hotels, {
    fields: [reviews.itemId],
    references: [hotels.id],
    relationName: "hotel_reviews",
  }),
  helpfulVotes: many(reviewHelpful),
}));

export const reviewHelpfulRelations = relations(reviewHelpful, ({ one }) => ({
  review: one(reviews, {
    fields: [reviewHelpful.reviewId],
    references: [reviews.id],
  }),
  user: one(users, {
    fields: [reviewHelpful.clerkId],
    references: [users.clerkId],
  }),
}));
