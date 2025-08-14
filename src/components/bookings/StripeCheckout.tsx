"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { CreateBookingData } from "@/utils/types";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";

type StripeCheckoutProps = {
  amount: number; // cents (for possible display/logging)
  bookingData: Omit<CreateBookingData, "paymentId">;
  onPaymentSuccess: (
    paymentId: string,
    bookingData: Omit<CreateBookingData, "paymentId">
  ) => void;
  onPaymentError: (error: string) => void;
};

const StripeCheckout = ({
  amount,
  bookingData,
  onPaymentError,
  onPaymentSuccess,
}: StripeCheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      if (!stripe || !elements) {
        setError("Stripe has not loaded yet. Please try again later.");
        return;
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          confirmParams: { return_url: window.location.href },
          redirect: "if_required",
        }
      );

      if (stripeError) {
        setError(stripeError.message ?? "Payment failed. Please try again.");
        onPaymentError(stripeError.message ?? "Payment failed.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent.id, bookingData);
      } else {
        onPaymentError("Payment was not successful.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button
        type="submit"
        disabled={isPending || !stripe || !elements}
        className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-60"
      >
        {isPending ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </Button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default StripeCheckout;
