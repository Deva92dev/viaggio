/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { memo, useState, useCallback } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { CreateBookingData } from "@/utils/types";
import { Button } from "../ui/button";

type StripeCheckoutProps = {
  amount: number;
  bookingData: Omit<CreateBookingData, "paymentId">;
  onPaymentSuccess: (
    paymentId: string,
    bookingData: Omit<CreateBookingData, "paymentId">
  ) => void;
  onPaymentError: (error: string) => void;
};

const StripeCheckout = memo(
  ({
    amount,
    bookingData,
    onPaymentError,
    onPaymentSuccess,
  }: StripeCheckoutProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!stripe || !elements) {
          setError("Stripe has not loaded yet. Please try again later.");
          return;
        }

        setIsProcessing(true);

        try {
          const { error: stripeError, paymentIntent } =
            await stripe.confirmPayment({
              elements,
              confirmParams: {
                return_url: `${window.location.origin}/bookings`,
              },
              redirect: "if_required",
            });

          if (stripeError) {
            const errorMessage =
              stripeError.message ?? "Payment failed. Please try again.";
            setError(errorMessage);
            onPaymentError(errorMessage);
          } else if (paymentIntent?.status === "succeeded") {
            onPaymentSuccess(paymentIntent.id, bookingData);
          } else {
            const errorMessage =
              "Payment was not successful. Please try again.";
            setError(errorMessage);
            onPaymentError(errorMessage);
          }
        } catch (err) {
          const errorMessage =
            "An unexpected error occurred. Please try again.";
          setError(errorMessage);
          onPaymentError(errorMessage);
        } finally {
          setIsProcessing(false);
        }
      },
      [stripe, elements, bookingData, onPaymentError, onPaymentSuccess]
    );

    return (
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <PaymentElement
              options={{
                layout: "tabs",
                fields: {
                  billingDetails: "auto",
                },
              }}
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isProcessing || !stripe || !elements}
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing Payment...
              </div>
            ) : (
              `Pay $${(amount / 100).toFixed(2)}`
            )}
          </Button>
        </form>
      </div>
    );
  }
);

StripeCheckout.displayName = "StripeCheckout";

export default StripeCheckout;
