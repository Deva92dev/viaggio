/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation"; // Added usePathname
import { useUser } from "@clerk/nextjs"; // Added Clerk hooks
import { toast } from "sonner";
import {
  Calendar,
  Users,
  DollarSign,
  CreditCard,
  Shield,
  ArrowLeft,
  Bed,
  MessageSquare,
} from "lucide-react";
import { createBooking } from "@/utils/actions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { CreateBookingData } from "@/utils/types";

const StripePayment = dynamic(() => import("./StripePayment"), {
  loading: () => (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
      <div className="flex items-center justify-center h-32">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading payment...</span>
      </div>
    </div>
  ),
});

type BookingFormProps = {
  itemId: string;
  itemType: "destination" | "hotel";
  itemData: {
    name: string;
    price: number;
    priceLabel: string;
    location: string;
    country: string;
    availableRooms?: number;
  };
};

const initialFormData: Omit<
  CreateBookingData,
  "itemId" | "itemType" | "totalAmount" | "paymentId"
> = {
  checkInDate: "",
  checkOutDate: "",
  numberOfGuests: 1,
  specialRequests: "",
  roomType: "standard",
  numberOfRooms: 1,
};

const BookingForm = ({ itemId, itemType, itemData }: BookingFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { isSignedIn, isLoaded } = useUser();

  const [formData, setFormData] =
    useState<typeof initialFormData>(initialFormData);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  // Restore form data after login redirect
  useEffect(() => {
    const savedData = sessionStorage.getItem(`booking_form_${itemId}`);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
        // Clear it so it doesn't persist forever
        sessionStorage.removeItem(`booking_form_${itemId}`);
      } catch (e: any) {
        console.error("Failed to parse saved booking data");
      }
    }
  }, [itemId]);

  const countTotal = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.max(
      1,
      Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    if (itemType === "destination") {
      return itemData.price * (formData.numberOfGuests || 1);
    } else {
      return itemData.price * nights * (formData.numberOfRooms || 1);
    }
  };

  const totalAmount = countTotal();

  // Validate required fields when showing payment
  useEffect(() => {
    if (
      showPayment &&
      (!formData.checkInDate ||
        !formData.checkOutDate ||
        !formData.numberOfGuests)
    ) {
      setError("Missing required data for booking.");
      setShowPayment(false);
    }
  }, [showPayment, formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLoaded && !isSignedIn) {
      // Save current form state so user doesn't lose it
      sessionStorage.setItem(
        `booking_form_${itemId}`,
        JSON.stringify(formData)
      );

      toast("Please sign in to proceed", {
        description: "Redirecting to login page...",
      });

      const returnUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?redirect_url=${returnUrl}`);
      return;
    }

    startTransition(() => {
      try {
        // Validate date inputs
        if (!formData.checkInDate || !formData.checkOutDate) {
          setError("Please select both check-in and check-out dates.");
          return;
        }
        const checkIn = new Date(formData.checkInDate);
        const checkOut = new Date(formData.checkOutDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
          setError("Please select valid check-in and check-out dates.");
          return;
        }
        if (checkIn < today) {
          setError("Check-in date cannot be in the past.");
          return;
        }
        if (checkOut <= checkIn) {
          setError("Check-out date must be after check-in date.");
          return;
        }
        if (
          typeof formData.numberOfGuests !== "number" ||
          formData.numberOfGuests < 1 ||
          formData.numberOfGuests > 5
        ) {
          setError("Number of guests must be between 1 and 5.");
          return;
        }
        // Validate rooms if hotel
        if (
          itemType === "hotel" &&
          (typeof formData.numberOfRooms !== "number" ||
            formData.numberOfRooms < 1 ||
            (itemData.availableRooms !== undefined &&
              formData.numberOfRooms > Math.min(5, itemData.availableRooms)))
        ) {
          setError("Please select a valid number of rooms.");
          return;
        }
        setShowPayment(true);
      } catch (error) {
        setError("An error occurred. Please try again.");
        console.error("Form submission error:", error);
      }
    });
  };

  const handlePaymentSuccess = async (
    paymentId: string,
    bookingData: Omit<CreateBookingData, "paymentId">
  ) => {
    startTransition(async () => {
      try {
        const result = await createBooking({
          ...bookingData,
          totalAmount,
          paymentId,
        });

        if (result.success) {
          toast("Your booking has been successfully created");
          router.push(`/bookings/${result.booking.id}`);
        } else {
          setError(result.error || "Failed to create booking.");
        }
      } catch (error) {
        setError("An error occurred while processing your booking.");
        console.error("Booking creation error:", error);
      }
    });
  };

  const handleError = () => {
    setError(error);
  };

  const handlePaymentError = () => {
    handleError();
    setShowPayment(false);
  };

  // get minimum date(tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (
    showPayment &&
    (!formData.checkInDate ||
      !formData.checkOutDate ||
      !formData.numberOfGuests)
  ) {
    return null;
  }

  if (showPayment) {
    const bookingData: Omit<CreateBookingData, "paymentId"> = {
      itemId,
      itemType,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      numberOfGuests: formData.numberOfGuests,
      totalAmount, // dollars—not cents!
      specialRequests: formData.specialRequests,
      roomType: formData.roomType,
      numberOfRooms: formData.numberOfRooms,
    };

    return (
      <div className="space-y-8">
        {/* Payment Summary Card */}
        <Card className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-20 -z-10"></div>
          <CardHeader className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                  <CreditCard size={24} />
                  Payment Summary
                </CardTitle>
                <p className="text-white/95 tracking-tight text-sm sm:text-base mt-1">
                  Review your booking details
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 bg-[hsl(var(--features-bg))] rounded-xl border border-[hsl(var(--border))]">
                <span className="text-[hsl(var(--muted-foreground))] font-medium">
                  Item:
                </span>
                <span className="font-bold text-[hsl(var(--foreground))]">
                  {itemData.name}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[hsl(var(--features-bg))] rounded-xl border border-[hsl(var(--border))]">
                <span className="text-black font-medium">Check-In:</span>
                <span className="font-bold text-[hsl(var(--foreground))]">
                  {formData.checkInDate
                    ? new Date(formData.checkInDate).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[hsl(var(--features-bg))] rounded-xl border border-[hsl(var(--border))]">
                <span className="text-black font-medium">Check-Out:</span>
                <span className="font-bold text-[hsl(var(--foreground))]">
                  {formData.checkOutDate
                    ? new Date(formData.checkOutDate).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[hsl(var(--features-bg))] rounded-xl border border-[hsl(var(--border))]">
                <span className="text-black font-medium">Guests:</span>
                <span className="font-bold text-[hsl(var(--foreground))]">
                  {formData.numberOfGuests}
                </span>
              </div>
              {itemType === "hotel" && (
                <div className="flex justify-between items-center p-3 bg-[hsl(var(--features-bg))] rounded-xl border border-[hsl(var(--border))]">
                  <span className="text-black font-medium">Rooms:</span>
                  <span className="font-bold text-black">
                    {formData.numberOfRooms}
                  </span>
                </div>
              )}
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))]/10 rounded-xl border-2 border-[hsl(var(--primary))]/20">
              <span className="text-xl font-bold text-black">Total:</span>
              <span className="text-2xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                ${totalAmount}
              </span>
            </div>
          </CardContent>
        </Card>
        {/* Stripe Payment */}
        {showPayment && (
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
            <StripePayment
              amount={totalAmount * 100} // Stripe expects cents
              bookingData={bookingData}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </div>
        )}
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => setShowPayment(false)}
          className="w-full py-3 bg-white/90 backdrop-blur-xl border border-white/20 hover:bg-white text-black hover:text-[hsl(var(--primary))] transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl rounded-xl"
          aria-label="Button for going back to booking details"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Booking Details
        </Button>
      </div>
    );
  }

  return (
    <div className={isPending ? "opacity-70 pointer-events-none" : ""}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert
            variant="destructive"
            className="bg-red-50 border-red-200 rounded-xl"
          >
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}
        {/* Date Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label
              htmlFor="checkInDate"
              className="text-black font-semibold flex items-center gap-2"
            >
              <Calendar size={16} className="text-[hsl(var(--primary))]" />
              Check-in Date
            </Label>
            <Input
              id="checkInDate"
              type="date"
              min={getMinDate()}
              value={formData.checkInDate}
              required
              className="bg-white text-black backdrop-blur-md border border-[hsl(var(--border))] rounded-xl py-3 px-4 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all duration-300"
              onChange={(e) =>
                setFormData({ ...formData, checkInDate: e.target.value })
              }
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="checkOutDate"
              className="text-black font-semibold flex items-center gap-2"
            >
              <Calendar size={16} className="text-[hsl(var(--accent))]" />
              Check-out Date
            </Label>
            <Input
              id="checkOutDate"
              type="date"
              min={formData.checkInDate || getMinDate()}
              value={formData.checkOutDate}
              required
              className="bg-white text-black backdrop-blur-md border border-[hsl(var(--border))] rounded-xl py-3 px-4 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all duration-300"
              onChange={(e) =>
                setFormData({ ...formData, checkOutDate: e.target.value })
              }
            />
          </div>
        </div>
        {/* Guest Selection */}
        <div className="space-y-3">
          <Label
            htmlFor="numberOfGuests"
            className="text-black font-semibold flex items-center gap-2"
          >
            <Users size={16} className="text-black" />
            Number of Guests
          </Label>
          <Select
            value={formData.numberOfGuests.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, numberOfGuests: parseInt(value) })
            }
          >
            <SelectTrigger
              className="bg-white/90 text-black backdrop-blur-md border border-[hsl(var(--border))] rounded-xl py-3 px-4 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all duration-300"
              aria-label="Choose number of guests"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 text-black backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl">
              {[...Array(10)].map((_, i) => (
                <SelectItem
                  key={i + 1}
                  value={(i + 1).toString()}
                  className="hover:bg-[hsl(var(--primary))]/10 rounded-lg"
                >
                  {i + 1} Guest{i + 1 > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Hotel-specific fields */}
        {itemType === "hotel" && (
          <>
            <div className="space-y-3">
              <Label
                htmlFor="numberOfRooms"
                className="text-black font-semibold flex items-center gap-2"
              >
                <Bed size={16} className="text-[hsl(var(--accent))]" />
                Number Of Rooms
              </Label>
              <Select
                value={formData.numberOfRooms?.toString() || "1"}
                onValueChange={(value) =>
                  setFormData({ ...formData, numberOfRooms: parseInt(value) })
                }
              >
                <SelectTrigger
                  className="bg-white/90 text-black backdrop-blur-md border border-[hsl(var(--border))] rounded-xl py-3 px-4 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all duration-300"
                  aria-label="Select number of rooms"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 text-black backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl">
                  {[...Array(Math.min(5, itemData.availableRooms || 1))].map(
                    (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString()}
                        className="hover:bg-[hsl(var(--primary))]/10 rounded-lg"
                      >
                        {i + 1} Room{i + 1 > 1 ? "s" : ""}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="roomType" className="text-black font-semibold">
                Room Type
              </Label>
              <Select
                value={formData.roomType || "standard"}
                onValueChange={(value) =>
                  setFormData({ ...formData, roomType: value })
                }
              >
                <SelectTrigger
                  className="bg-white/90 text-black backdrop-blur-md border border-[hsl(var(--border))] rounded-xl py-3 px-4 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all duration-300"
                  aria-label="Select room type"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 text-black backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl">
                  <SelectItem
                    value="standard"
                    className="hover:bg-[hsl(var(--primary))]/10 rounded-lg"
                  >
                    Standard Room
                  </SelectItem>
                  <SelectItem
                    value="deluxe"
                    className="hover:bg-[hsl(var(--primary))]/10 rounded-lg"
                  >
                    Deluxe Room
                  </SelectItem>
                  <SelectItem
                    value="suite"
                    className="hover:bg-[hsl(var(--primary))]/10 rounded-lg"
                  >
                    Suite Room
                  </SelectItem>
                  <SelectItem
                    value="family"
                    className="hover:bg-[hsl(var(--primary))]/10 rounded-lg"
                  >
                    Family Room
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        {/* Special Requests */}
        <div className="space-y-3">
          <Label
            htmlFor="specialRequests"
            className="text-black font-semibold flex items-center gap-2"
          >
            <MessageSquare size={16} className="text-[hsl(var(--primary))]" />
            Special Requests (Optional)
          </Label>
          <Textarea
            id="specialRequests"
            placeholder="Any special requests or notes..."
            value={formData.specialRequests}
            className="bg-white/90 text-black backdrop-blur-md border border-[hsl(var(--border))] rounded-xl p-4 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all duration-300 resize-none"
            rows={4}
            onChange={(e) =>
              setFormData({ ...formData, specialRequests: e.target.value })
            }
          />
        </div>
        {/* Price Breakdown */}
        {totalAmount > 0 && (
          <Card className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-15 -z-10"></div>
            <CardHeader className="bg-gradient-to-r from-[hsl(var(--features-bg))] to-white p-6">
              <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent flex items-center justify-center gap-2">
                <DollarSign size={24} />
                Price Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {itemType === "destination" ? (
                  <div className="flex justify-between items-center p-3 bg-[hsl(var(--features-bg))] rounded-xl">
                    <span className="text-black">
                      ${itemData.price} × {formData.numberOfGuests} guests
                    </span>
                    <span className="font-bold text-[hsl(var(--foreground))]">
                      ${itemData.price * formData.numberOfGuests}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center p-3 bg-[hsl(var(--features-bg))] rounded-xl">
                    <span className="text-black">
                      ${itemData.price} ×{" "}
                      {Math.ceil(
                        (new Date(formData.checkOutDate).getTime() -
                          new Date(formData.checkInDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      nights × {formData.numberOfRooms || 1} rooms
                    </span>
                    <span className="font-bold text-[hsl(var(--foreground))]">
                      ${totalAmount}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))]/10 rounded-xl border-2 border-[hsl(var(--primary))]/20">
                  <span className="text-xl font-bold text-black">Total</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    ${totalAmount}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full btn-accent py-4 text-lg font-bold shadow-xl shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
          disabled={
            isPending ||
            !formData.checkInDate ||
            !formData.checkOutDate ||
            totalAmount <= 0
          }
          aria-label="submit button"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="flex items-center justify-center gap-3 relative z-10">
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Proceed to Payment
              </>
            )}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
