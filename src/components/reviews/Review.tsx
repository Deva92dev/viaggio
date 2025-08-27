/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import ReviewListSkeleton from "./ReviewListSkeleton";

import {
  checkUserReviewEligibility,
  getReviews,
  getUserReviews,
} from "@/utils/actions";
import {
  deleteReviewBridge,
  markHelpfulBridge,
  updateReviewBridge,
} from "./ReviewServerAction";
import ReviewFormCreateSkeleton from "./ReviewFormSkeleton";

const ReviewFormCreate = dynamic(() => import("./ReviewFormCreate"), {
  loading: () => <ReviewFormCreateSkeleton />,
});
const ReviewList = dynamic(() => import("./ReviewList"), {
  loading: () => <ReviewListSkeleton />,
});

type Props = {
  itemId: string;
  itemType: "hotel" | "destination";
};

export default async function Review({ itemId, itemType }: Props) {
  const { userId } = await auth();
  const isAuthenticated = !!userId;

  try {
    const reviewsData = await getReviews(itemId, itemType);
    let eligibility = {
      eligible: false,
      reason: "Please sign in to leave a review.",
      requiresAuth: true,
      bookingId: undefined as string | undefined,
    };
    let userReviewsData: any = {
      success: true,
      reviews: [] as any[],
      message: "Sign in to see your reviews",
    };

    if (isAuthenticated) {
      const [eligibilityResult, userReviewsResult] = await Promise.all([
        checkUserReviewEligibility(itemId, itemType),
        getUserReviews(),
      ]);

      eligibility = {
        eligible: eligibilityResult.eligible,
        reason: eligibilityResult.eligible
          ? eligibilityResult.reason ||
            "You can leave a review for this booking"
          : eligibilityResult.reason || "Unable to determine eligibility",
        requiresAuth: false,
        bookingId: eligibilityResult.bookingId,
      };

      userReviewsData = userReviewsResult;
    }
    const myReview = userReviewsData?.reviews?.find(
      (r: any) => r.itemId === itemId && r.itemType === itemType
    ) as any;

    const hasAnyReviews = (reviewsData?.reviews?.length ?? 0) > 0;

    return (
      <div className="flex flex-col gap-6">
        {/* Review Form Section - Only for authenticated users */}
        <div className="flex-1 space-y-6">
          {isAuthenticated && eligibility.eligible && !myReview && (
            <ReviewFormCreate
              eligibility={eligibility}
              itemId={itemId}
              itemType={itemType}
            />
          )}
          {/* Show message for non-eligible authenticated users */}
          {isAuthenticated && !eligibility.eligible && !myReview && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm">{eligibility.reason}</p>
            </div>
          )}
        </div>
        <Suspense fallback={<ReviewListSkeleton />}>
          <ReviewList
            reviews={reviewsData?.reviews || []}
            myReviewId={myReview?.id}
            itemId={itemId}
            itemType={itemType}
            updateReviewAction={updateReviewBridge}
            deleteReviewAction={deleteReviewBridge}
            markHelpfulAction={markHelpfulBridge}
            isAuthenticated={isAuthenticated}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error in ReviewSection:", error);

    // Fallback: Still try to show public reviews
    try {
      const reviewsData = await getReviews(itemId, itemType);
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              Some features may be unavailable. Please refresh the page or try
              again later.
            </p>
          </div>
          <Suspense fallback={<ReviewListSkeleton />}>
            <ReviewList
              reviews={reviewsData?.reviews || []}
              myReviewId={undefined}
              itemId={itemId}
              itemType={itemType}
              updateReviewAction={updateReviewBridge}
              deleteReviewAction={deleteReviewBridge}
              markHelpfulAction={markHelpfulBridge}
              isAuthenticated={isAuthenticated}
            />
          </Suspense>
        </div>
      );
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError);
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            Unable to load reviews at this time. Please try again later.
          </p>
        </div>
      );
    }
  }
}
