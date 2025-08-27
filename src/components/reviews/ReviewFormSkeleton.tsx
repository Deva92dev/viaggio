const ReviewFormCreateSkeleton = () => {
  return (
    <div className="p-4 w-1/3 border rounded-lg bg-white shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* User Display Section Skeleton */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full border-2 border-gray-200"></div>
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Rating Section Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded border border-gray-300"></div>
        </div>

        {/* Comment Section Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-24 bg-gray-200 animate-pulse rounded border border-gray-300"></div>
          <div className="h-3 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>

        {/* Submit Button Skeleton */}
        <div className="h-10 bg-gray-200 animate-pulse rounded w-full"></div>
      </div>
    </div>
  );
};

export default ReviewFormCreateSkeleton;
