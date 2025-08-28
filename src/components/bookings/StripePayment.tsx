"use client";

import { useEffect, memo, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { CreateBookingData } from "@/utils/types";

const StripeCheckout = dynamic(() => import("./StripeCheckout"), {
  loading: () => (
    <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="ml-3 text-gray-600">Loading payment form...</span>
    </div>
  ),
});

type StripePaymentProps = {
  amount: number;
  bookingData: Omit<CreateBookingData, "paymentId">;
  onPaymentSuccess: (
    paymentId: string,
    bookingData: Omit<CreateBookingData, "paymentId">
  ) => void;
  onPaymentError: (error: string) => void;
};

let stripePromise: ReturnType<typeof loadStripe> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

const StripePayment = memo(
  ({
    amount,
    bookingData,
    onPaymentError,
    onPaymentSuccess,
  }: StripePaymentProps) => {
    // Memoize Elements options to prevent unnecessary re-renders
    const elementsOptions = useMemo(
      () => ({
        appearance: {
          theme: "stripe" as const,
          variables: {
            colorPrimary: "#0066cc",
            fontFamily: "system-ui, -apple-system, sans-serif",
          },
        },
        loader: "auto" as const,
      }),
      []
    );

    const { data, isError, isLoading, error } = useQuery({
      queryKey: ["stripe-payment-intent", amount],
      queryFn: async () => {
        const controller = new AbortController();

        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
          const res = await fetch(`/api/create-payment-intent`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(
              errorText || `HTTP ${res.status}: ${res.statusText}`
            );
          }

          const json = await res.json();
          if (!json.clientSecret) {
            throw new Error("Invalid response: missing client secret");
          }

          return json.clientSecret as string;
        } catch (error) {
          clearTimeout(timeoutId);
          throw error;
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes("HTTP 4")) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000), // Exponential backoff
    });

    useEffect(() => {
      if (isError && error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to initialize payment. Please try again.";
        onPaymentError(errorMessage);
      }
    }, [isError, error, onPaymentError]);

    if (isLoading) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">
              Initializing secure payment...
            </span>
          </div>
          <div className="text-xs text-gray-500 text-center">
            🔒 Your payment information is encrypted and secure
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Payment initialization failed
              </h3>
              <div className="mt-1 text-sm text-red-700">
                {error instanceof Error
                  ? error.message
                  : "Unknown error occurred"}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!data) return null;

    return (
      <div className="space-y-4">
        <Elements
          stripe={getStripe()}
          options={{
            clientSecret: data,
            ...elementsOptions,
          }}
        >
          <StripeCheckout
            amount={amount}
            bookingData={bookingData}
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
          />
        </Elements>
        <div className="text-xs text-gray-500 text-center">
          <div className="flex items-center justify-center space-x-4">
            <span>🔒 SSL Encrypted</span>
            <span>💳 PCI Compliant</span>
            <span>🛡️ Stripe Secured</span>
          </div>
        </div>
      </div>
    );
  }
);

StripePayment.displayName = "StripePayment";

export default StripePayment;
