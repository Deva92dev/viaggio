"use client";

import { CreateBookingData } from "@/utils/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import StripeCheckout from "./StripeCheckout";
import { useEffect } from "react";

type StripePaymentProps = {
  amount: number; // in cents
  bookingData: Omit<CreateBookingData, "paymentId">;
  onPaymentSuccess: (
    paymentId: string,
    bookingData: Omit<CreateBookingData, "paymentId">
  ) => void;
  onPaymentError: (error: string) => void;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const StripePayment = ({
  amount,
  bookingData,
  onPaymentError,
  onPaymentSuccess,
}: StripePaymentProps) => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["stripe-payment-intent", amount],
    queryFn: async () => {
      const res = await fetch(`/api/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      if (!json.clientSecret) throw new Error("Failed to initialize payment.");
      return json.clientSecret as string;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError) {
      onPaymentError(
        error instanceof Error
          ? error.message
          : "Failed to load Stripe payment."
      );
    }
  }, [isError, error, onPaymentError]);

  if (isLoading) return <p>Loading payment details...</p>;
  if (!data) return null;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: data }}>
      <StripeCheckout
        amount={amount}
        bookingData={bookingData}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
};

export default StripePayment;
