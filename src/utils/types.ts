/* eslint-disable @typescript-eslint/no-explicit-any */
import { type InferSelectModel } from "drizzle-orm";
import { hotels, tourPlaces } from "@/db";

type TourPlace = InferSelectModel<typeof tourPlaces>;
export type PopularDestinations = Pick<
  TourPlace,
  | "id"
  | "name"
  | "createdAt"
  | "description"
  | "imageUrl"
  | "price"
  | "location"
>;

export type DestinationsType = InferSelectModel<typeof tourPlaces>;
export type HotelsType = InferSelectModel<typeof hotels>;

export type PaginationType = {
  page: number;
  offset: number;
  limit: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

export type ReviewItemType = "destination" | "hotel";

export type CreateReviewType = {
  bookingId: string;
  author: string;
  authorImageUrl: string;
  rating: number;
  comment: string;
  visitDate?: string;
};

export type UpdateReviewType = {
  rating?: number;
  comment?: string;
  visitDate?: string;
};

export type BookingEligibilityType = {
  eligible: boolean;
  reason?: string;
  requiresAuth?: boolean;
  booking?: any;
  daysUntilEligible?: number;
};

export type BookingItemType = "destination" | "hotel";

export type CreateBookingData = {
  itemId: string;
  itemType: BookingItemType;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalAmount: number;
  paymentId?: string;
  specialRequests?: string;
  roomType?: string;
  numberOfRooms?: number;
};

export type UpdateBookingData = {
  bookingStatus?: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus?: "pending" | "failed" | "refunded" | "completed";
  paymentId?: string;
  specialRequest?: string;
};
