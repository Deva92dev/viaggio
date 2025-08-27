/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { db, hotels, tourPlaces } from "@/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import BookingForm from "./BookingForm";

type BookingItemsProps = {
  itemType: "destination" | "hotel";
  itemId: string;
};

const BookingItems = async ({ itemId, itemType }: BookingItemsProps) => {
  // fetch item data
  let item;
  if (itemType === "destination") {
    item = await db.query.tourPlaces.findFirst({
      where: eq(tourPlaces.id, itemId),
    });
  } else if (itemType === "hotel") {
    item = await db.query.hotels.findFirst({ where: eq(hotels.id, itemId) });
  }

  if (!item) {
    notFound();
  }

  // Format item data for consistent display
  const formatItemData = () => {
    if (itemType === "destination") {
      return {
        name: item.name,
        description: item.description,
        location: item.location,
        country: item.country,
        imageUrl: item.imageUrl,
        price: item.price,
        duration: item.duration,
        category: item.category,
        averageRating: parseFloat(item.averageRating || "0"),
        totalReviews: item.totalReviews || 0,
        priceLabel: "per person",
        additionalInfo: `Duration: ${item.duration}`,
      };
    } else {
      return {
        name: item.name,
        description: item.description,
        location: item.location,
        country: item.country,
        imageUrl: item.imageUrl,
        price: item.pricePerNight,
        availableRooms: item.availableRooms,
        category: item.category,
        averageRating: parseFloat(item.averageRating || "0"),
        totalReviews: item.totalReviews || 0,
        priceLabel: "per night",
        additionalInfo: `Available rooms: ${item.availableRooms}`,
        amenities: item.amenities || [],
      };
    }
  };

  const itemData = formatItemData();

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left side - Item details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="mb-2">
                  {itemData.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {itemData.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({itemData.totalReviews} reviews)
                  </span>
                </div>
              </div>
              <CardTitle className="text-2xl">{itemData.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {itemData.location}, {itemData.country}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src={itemData.imageUrl}
                  alt={itemData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-600 mb-4">{itemData.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{itemData.additionalInfo}</span>
                  </div>
                  {itemType === "destination" && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Group Tours Available</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ${itemData.price}
                  </div>
                  <div className="text-sm text-gary-500">
                    {itemData.priceLabel}
                  </div>
                </div>
              </div>
              {itemType === "hotel" && itemData.amenities.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Amenities: </h4>
                  <div className="flex flex-wrap gap-2">
                    {itemData.amenities.map((amenity: any, index: number) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Right side - Booking form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                Book Your {itemType === "destination" ? "Trip" : "Stay"}
              </CardTitle>
              <CardDescription>
                Fill in the details below to complete your booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookingForm
                itemId={itemId}
                itemType={itemType}
                itemData={itemData}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingItems;
