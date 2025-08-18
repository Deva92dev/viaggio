export default function DestinationsLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton (DestinationImage) */}
      <section className="relative h-64 md:h-80 lg:h-96 bg-gray-200 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-8 w-64 bg-gray-300 rounded mx-auto" />
            <div className="h-4 w-80 bg-gray-300 rounded mx-auto" />
          </div>
        </div>
      </section>
      {/* Destination Card Section Skeleton */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8">
          <div className="text-center space-y-4 mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto" />
          </div>
          {/* Featured destination cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
      {/* Main Places Grid Skeleton (PlacesCard) */}
      <section className="container mx-auto px-4 mb-12">
        <div className="space-y-6">
          {/* Section header */}
          <div className="text-center space-y-3">
            <div className="h-8 w-56 bg-gray-200 rounded mx-auto" />
            <div className="h-4 w-80 bg-gray-200 rounded mx-auto" />
          </div>
          {/* Destination cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <DestinationCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
      {/* Pagination Skeleton */}
      <section className="container mx-auto px-4 mb-8">
        <div className="flex justify-center items-center space-x-2">
          <div className="h-10 w-10 bg-gray-200 rounded" />
          <div className="h-10 w-8 bg-gray-200 rounded" />
          <div className="h-10 w-8 bg-gray-200 rounded" />
          <div className="h-10 w-8 bg-gray-200 rounded" />
          <div className="h-10 w-10 bg-gray-200 rounded" />
        </div>
      </section>
    </div>
  );
}

function DestinationCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200" />
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        {/* Location */}
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>
        {/* Price and button */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-9 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
