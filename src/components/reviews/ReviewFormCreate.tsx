/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Star } from "lucide-react";
import { createReview } from "@/utils/actions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type Props = {
  eligibility: any;
  itemId: string;
  itemType: "hotel" | "destination";
};

export default function ReviewFormCreate({ eligibility, itemId }: Props) {
  const { user, isLoaded } = useUser();
  const authorName = user?.firstName || user?.username || "Anonymous";
  const authorImage = user?.imageUrl || "/default-avatar.png";

  async function handleCreate(formData: FormData) {
    const rating = Number(formData.get("rating"));
    const comment = String(formData.get("comment") || "");
    const bookingId = eligibility?.bookingId || eligibility?.booking?.id;

    if (!bookingId) {
      console.error("Eligibility object:", eligibility);
      throw new Error("No bookingId available");
    }

    if (!itemId) throw new Error("No itemId provided");
    if (!comment.trim()) throw new Error("Comment is required");
    if (!rating || rating < 1 || rating > 5)
      throw new Error("Valid rating is required");

    await createReview({
      rating,
      author: authorName,
      authorImageUrl: authorImage,
      comment: comment.trim(),
      bookingId,
    });
  }

  if (!isLoaded) {
    return (
      <Card className="p-4 w-1/3">
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="p-4 w-1/3">
        <CardContent>
          <p className="text-center text-gray-500">
            Please sign in to leave a review
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4 w-1/3">
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        {/* User Display Section */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-600 mb-2">Reviewing as:</p>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={authorImage}
                alt={`${authorName}'s profile`}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <p className="font-semibold text-gray-900">{authorName}</p>
          </div>
        </div>

        <form action={handleCreate} className="space-y-4">
          {/* Rating Selection with Star Display */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rating *
            </label>
            <Select name="rating" defaultValue="5" required>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[5, 4, 3, 2, 1].map((r) => (
                  <SelectItem key={r} value={r.toString()}>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={`${
                              star <= r
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span>
                        ({r} star{r > 1 ? "s" : ""})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Comment Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Review *
            </label>
            <Textarea
              name="comment"
              placeholder="Share your experience... What did you like? What could be improved?"
              minLength={10}
              maxLength={1500}
              rows={4}
              className="bg-white border-gray-300 focus:border-blue-500 resize-none"
              required
            />
            <p className="text-xs text-gray-500">
              Minimum 10 characters, maximum 1500 characters
            </p>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer hover:bg-blue-500"
          >
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
