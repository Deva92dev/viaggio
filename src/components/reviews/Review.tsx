/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  checkUserReviewEligibility,
  getReviews,
  getUserReviews,
} from "@/utils/actions";
import ReviewList from "./ReviewList";
import ReviewFormCreate from "./ReviewFormCreate";
import {
  deleteReviewBridge,
  markHelpfulBridge,
  updateReviewBridge,
} from "./ReviewServerAction";

type Props = {
  itemId: string;
  itemType: "hotel" | "destination";
};

export default async function ReviewSection({ itemId, itemType }: Props) {
  const [eligibility, reviewsData, userReviewsData] = await Promise.all([
    checkUserReviewEligibility(itemId, itemType),
    getReviews(itemId, itemType),
    getUserReviews(),
  ]);

  const myReview = userReviewsData?.reviews?.find(
    (r: any) => r.itemId === itemId && r.itemType === itemType
  );

  const hasAnyReviews = (reviewsData?.reviews?.length ?? 0) > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Left side - Create form / Eligibility message */}
      <div className="flex-1 space-y-6">
        {eligibility.eligible && !myReview && (
          <ReviewFormCreate eligibility={eligibility} />
        )}

        {!eligibility.eligible && !myReview && !hasAnyReviews && (
          <p className="text-gray-500 text-sm w-1/3"></p>
        )}
      </div>

      <ReviewList
        reviews={reviewsData?.reviews || []}
        myReviewId={myReview?.id}
        itemId={itemId}
        itemType={itemType}
        updateReviewAction={updateReviewBridge}
        deleteReviewAction={deleteReviewBridge}
        markHelpfulAction={markHelpfulBridge}
      />
    </div>
  );
}
