type Props = {
  /** number of placeholder cards to render (defaults to 2) */
  count?: number;
};

export default function ReviewListSkeleton({ count = 2 }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ReviewCardSkeleton() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse h-80 flex flex-col">
      {/* Row 1 – avatar, author, stars, date, actions */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-3 flex-1">
          {/* avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="space-y-2 flex-1">
            {/* author */}
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
            {/* stars + date */}
            <div className="h-3 w-1/3 bg-gray-200 rounded" />
          </div>
        </div>
        {/* edit / delete buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gray-200 rounded" />
          <div className="w-8 h-8 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Row 2 – comment */}
      <div className="flex-1 overflow-hidden space-y-2 mb-3">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>

      {/* Row 3 – helpful + verified */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 flex-shrink-0">
        <div className="w-24 h-8 bg-gray-200 rounded" />
        <div className="w-16 h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
