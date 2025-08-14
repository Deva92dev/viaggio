import { getUserBookings } from "@/utils/actions";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Card, CardContent } from "../ui/card";
import { Calendar, CreditCard, Eye, MapPin, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";

const CancelBookingButton = ({ bookingId }: { bookingId: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        const { cancelBooking } = await import("@/utils/actions");
        await cancelBooking(bookingId);
      }}
    >
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        className="w-full sm:w-auto lg:w-full cursor-pointer bg-red-500"
      >
        Cancel Booking
      </Button>
    </form>
  );
};

const BookingList = async () => {
  const result = await getUserBookings();
  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{result.error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const bookings = result.bookings || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and Manage all your bookings</p>
        </div>
        {/* booking list */}
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Noo Bookings Yet
                  </h3>
                  <p className="text-gray-600">
                    Start Planning your Next Adventure !
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link href="/destinations">
                    <Button>Browse Destinations</Button>
                  </Link>
                  <Link href="/hotels">
                    <Button variant="outline">Find Hotels</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => {
              const item =
                booking.itemType === "destination"
                  ? booking.tourPlace
                  : booking.hotel;
              if (!item) return null;
              return (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-4 gap-0">
                      <div className="relative h-48 md:h-auto">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="md:col-span-3 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline">
                                {booking.itemType === "destination"
                                  ? "Destination"
                                  : "Hotel"}
                              </Badge>
                              <Badge
                                className={getStatusColor(
                                  booking.bookingStatus
                                )}
                              >
                                {booking.bookingStatus.charAt(0).toUpperCase() +
                                  booking.bookingStatus.slice(1)}
                              </Badge>
                              <Badge
                                className={getPaymentStatusColor(
                                  booking.paymentStatus
                                )}
                              >
                                {booking.paymentStatus.charAt(0).toUpperCase() +
                                  booking.paymentStatus.slice(1)}
                              </Badge>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {item.name}
                              </h3>
                              <p className="flex items-center gap-1 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                {item.location}, {item.country}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Check-In</p>
                                <p className="font-medium flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(
                                    booking.checkInDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Check-Out</p>
                                <p className="font-medium flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(
                                    booking.checkOutDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Guests</p>
                                <p className="font-medium flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {booking.numberOfGuests}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Total</p>
                                <p className="font-medium flex items-center gap-1">
                                  <CreditCard className="w-4 h-4" />$
                                  {parseFloat(booking.totalAmount).toFixed(2)}
                                </p>
                              </div>
                            </div>
                            {booking.specialRequests && (
                              <div>
                                <p className="text-gray-500 text-sm">
                                  Special Requests:
                                </p>
                                <p className="text-sm">
                                  {booking.specialRequests}
                                </p>
                              </div>
                            )}
                          </div>
                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:ml-4">
                            <Link href={`/bookings/${booking.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-auto lg:w-full cursor-pointer hover:bg-blue-500"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </Link>
                            {booking.bookingStatus === "confirmed" && (
                              <CancelBookingButton bookingId={booking.id} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;
