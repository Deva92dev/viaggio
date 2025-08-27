import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  CheckCircle,
  CreditCard,
  Download,
  MapPin,
  Users,
} from "lucide-react";
import { getSingleBooking } from "@/utils/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

type SingleBookingDetailProps = {
  bookingId: string;
};

const SingleBookingDetail = async ({ bookingId }: SingleBookingDetailProps) => {
  const result = await getSingleBooking(bookingId);

  if (!result.success || !result.booking) {
    notFound();
  }
  const { booking } = result;
  const item =
    booking.itemType === "destination" ? booking.tourPlace : booking.hotel;
  if (!item) {
    notFound();
  }

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

  const calculateNights = () => {
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    return Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Booking Confirmed
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your booking. Here are your confirmation details.
          </p>
        </div>
        {/* Booking details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Booking Status</span>
              <div className="flex gap-2">
                <Badge className={getStatusColor(booking.bookingStatus)}>
                  {booking.bookingStatus.charAt(0).toUpperCase() +
                    booking.bookingStatus.slice(1)}
                </Badge>
                <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                  Payment
                  {booking.paymentStatus.charAt(0).toUpperCase() +
                    booking.paymentStatus.slice(1)}
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>Booking Id: {booking.id}</CardDescription>
          </CardHeader>
        </Card>
        {/* Booking Details */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Item Details */}
              <div className="space-y-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {item.location}, {item.country}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {booking.itemType === "destination"
                      ? "Destination"
                      : "Hotel"}
                  </Badge>
                </div>
              </div>
              {/* Booking Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check In
                    </Label>
                    <p className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check Out
                    </Label>
                    <p className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Guests
                    </Label>
                    <p className="flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4" />
                      {booking.numberOfGuests}
                    </p>
                  </div>
                  {booking.itemType === "hotel" && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Rooms
                      </Label>
                      <p className="mt-1">{booking.numberOfRooms}</p>
                    </div>
                  )}
                </div>
                {booking.itemType === "destination" && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Duration
                    </Label>
                    <p className="mt-1">{calculateNights()}</p>
                  </div>
                )}
                {booking.roomType && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Room Type
                    </Label>
                    <p className="mt-1 capitalize">{booking.roomType}</p>
                  </div>
                )}
                {booking.specialRequests && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Special Requests
                    </Label>
                    <p className="mt-1">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Payment information */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Book Date: </span>
                <span>
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </span>
              </div>
              {booking.paymentId && (
                <div className="flex justify-between items-center">
                  <span>Payment Id: </span>
                  <span>{booking.paymentId}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount</span>
                <span>{parseFloat(booking.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="flex justify-center gap-2 cursor-pointer hover:bg-blue-500"
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>
          <Button
            variant="outline"
            className="flex justify-center gap-2 cursor-pointer hover:bg-blue-500"
          >
            <Download className="w-4 h-4" />
            Share Booking
          </Button>
          <Link href="/bookings">
            <Button className="cursor-pointer hover:bg-blue-500">
              View All Bookings
            </Button>
          </Link>
        </div>
        {/* Important Information */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                • Please arrive at the check-in time specified in your booking
              </li>
              <li>• Bring a valid ID and this booking confirmation</li>
              <li>
                • Cancellation policy: Free cancellation up to 24 hours before
                check-in
              </li>
              <li>
                • For any changes or questions, please contact our support team
              </li>
              {booking.itemType === "hotel" && (
                <li>• Check-in time: 3:00 PM | Check-out time: 11:00 AM</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleBookingDetail;
