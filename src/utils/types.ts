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
