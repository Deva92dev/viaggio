/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FaEdit, FaRegThumbsUp, FaStar, FaThumbsUp } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Delete, DeleteIcon, CircleUser } from "lucide-react";
import Image from "next/image";

type Props = {
  reviews: any[];
  myReviewId?: string;
  itemId: string;
  itemType: "hotel" | "destination";
  updateReviewAction: (
    id: string,
    data: { rating: number; comment: string }
  ) => Promise<any>;
  deleteReviewAction: (id: string) => Promise<any>;
  markHelpfulAction: (reviewId: string) => Promise<any>;
};

export default function ReviewList({
  reviews,
  myReviewId,
  itemId,
  itemType,
  updateReviewAction,
  deleteReviewAction,
  markHelpfulAction,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    rating: 5,
    comment: "",
  });

  const queryClient = useQueryClient();

  // Helper function for consistent date formatting
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (err) {
      return "Invalid date";
    }
  };

  const updateMutation = useMutation({
    mutationFn: (payload: { id: string; rating: number; comment: string }) =>
      updateReviewAction(payload.id, {
        rating: payload.rating,
        comment: payload.comment,
      }),
    onSuccess: () => {
      toast.success("Review updated!");
      queryClient.invalidateQueries({
        queryKey: ["reviews", itemId, itemType],
      });
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
      setEditingId(null);
    },
    onError: () => toast.error("Failed to update review"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteReviewAction(id),
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries({
        queryKey: ["reviews", itemId, itemType],
      });
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
    },
    onError: () => toast.error("Failed to delete review"),
  });

  const toggleHelpfulMutation = useMutation({
    mutationFn: (reviewId: string) => markHelpfulAction(reviewId),
    onSuccess: (res) => {
      if (res?.action === "added") toast.success("Marked as helpful");
      if (res?.action === "removed") toast.success("Unmarked helpful");
      queryClient.invalidateQueries({
        queryKey: ["reviews", itemId, itemType],
      });
    },
    onError: () => toast.error("Failed to toggle helpful"),
  });

  return (
    <div className="w-full">
      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No reviews yet.</p>
          <p className="text-gray-400 text-sm">
            Be the first to share your experience!
          </p>
        </div>
      )}

      {/* UPDATED: Responsive Grid Layout */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6 w-full">
          {reviews.map((r) => {
            const isMyReview = r.id === myReviewId;
            const isEditing = editingId === r.id;

            return (
              <div
                key={r.id}
                className={`p-4 bg-white rounded-lg shadow-sm border transition duration-200 ease-in-out transform h-fit ${
                  isMyReview
                    ? "border-blue-500 hover:border-blue-600 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {/* Rest of your review card content stays exactly the same */}
                {!isEditing ? (
                  <div className="space-y-3">
                    {/* First Row: Author Image, Name, Rating, and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Author Profile Image with CircleUser fallback */}
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                          {r.authorImageUrl ? (
                            <Image
                              src={r.authorImageUrl}
                              alt={`${r.author}'s profile`}
                              fill
                              className="object-cover"
                              sizes="40px"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-400">
                              <CircleUser size={24} />
                            </div>
                          )}
                        </div>
                        {/* Author Name and Rating */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg truncate">
                            {r.author || "Anonymous"}
                          </h4>
                          <div className="flex items-center gap-2">
                            {/* Star Rating */}
                            <div className="flex items-center space-x-1 text-yellow-500">
                              {Array.from({ length: r.rating || 0 }).map(
                                (_, i) => (
                                  <FaStar key={i} size={14} />
                                )
                              )}
                              {Array.from({ length: 5 - (r.rating || 0) }).map(
                                (_, i) => (
                                  <FaStar
                                    key={`empty-${i}`}
                                    size={14}
                                    className="text-gray-300"
                                  />
                                )
                              )}
                            </div>
                            {/* Date */}
                            <span className="text-sm text-gray-500 truncate">
                              {formatDate(r.visitDate || r.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Action Buttons for My Review */}
                      {isMyReview && (
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            className="cursor-pointer hover:bg-blue-500"
                            variant="outline"
                            onClick={() => {
                              setEditingId(r.id);
                              setFormState({
                                rating: r.rating,
                                comment: r.comment,
                              });
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            className="border border-red-100 cursor-pointer hover:bg-red-500"
                            onClick={() => deleteMutation.mutate(r.id)}
                            disabled={deleteMutation.isPending}
                          >
                            {deleteMutation.isPending ? (
                              <Delete />
                            ) : (
                              <DeleteIcon />
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                    {/* Second Row: Comment */}
                    <div className="pl-13">
                      <p className="text-gray-700 leading-relaxed break-words">
                        {r.comment || "No comment provided."}
                      </p>
                    </div>
                    {/* Third Row: Helpful Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        variant={r.helpfulByMe ? "default" : "outline"}
                        onClick={() => toggleHelpfulMutation.mutate(r.id)}
                        disabled={toggleHelpfulMutation.isPending}
                      >
                        {r.helpfulByMe ? (
                          <FaThumbsUp className="mr-2" />
                        ) : (
                          <FaRegThumbsUp className="mr-2" />
                        )}
                        Helpful ({r.helpfulCount || 0})
                      </Button>
                      {/* Verified Badge */}
                      {r.isVerified && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="hidden sm:inline">
                            Verified Stay
                          </span>
                          <span className="sm:hidden">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Edit Review</h3>
                    {/* Rating Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <select
                        className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formState.rating}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            rating: Number(e.target.value),
                          }))
                        }
                      >
                        {[5, 4, 3, 2, 1].map((val) => (
                          <option key={val} value={val}>
                            {val} star{val > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Comment Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <Textarea
                        className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formState.comment}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                        placeholder="Share your experience..."
                        required
                        minLength={10}
                        maxLength={1500}
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formState.comment.length}/1500 characters
                      </p>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="cursor-pointer hover:bg-blue-500"
                        onClick={() =>
                          updateMutation.mutate({
                            id: r.id,
                            rating: formState.rating,
                            comment: formState.comment,
                          })
                        }
                        disabled={
                          updateMutation.isPending ||
                          formState.comment.length < 10
                        }
                      >
                        {updateMutation.isPending
                          ? "Saving..."
                          : "Save Changes"}
                      </Button>
                      <Button
                        size="sm"
                        className="cursor-pointer hover:bg-gray-500"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
