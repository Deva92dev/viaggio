/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { deleteReview, makeReviewHelpful, updateReview } from "@/utils/actions";

export async function updateReviewBridge(id: string, data: any) {
  return updateReview(id, data);
}

export async function deleteReviewBridge(id: string) {
  return deleteReview(id);
}

export async function markHelpfulBridge(reviewId: string) {
  return makeReviewHelpful(reviewId);
}
