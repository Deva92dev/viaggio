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
} from "drizzle-orm/pg-core";

// change popular destination in footer
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
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

// favorites schema and it will connect both above schemas
export const favorites = pgTable("favorites", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  clerkId: text("clerk_id").notNull(),
  itemId: uuid("item_id").notNull(),
  itemType: varchar("item_type", { length: 20 }).notNull(), // hotels or destinations
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

// Create relations for easier queries
export const favoritesRelations = relations(favorites, ({ one }) => ({
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
