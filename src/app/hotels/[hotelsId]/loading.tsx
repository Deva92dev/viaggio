export default function HotelDetailsLoading() {
  return (
    <main className="relative overflow-hidden bg-[hsl(var(--background))] animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-[70vh] min-h-[600px] mb-16 overflow-hidden bg-gray-200">
        {/* Hero content overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
        <div className="absolute inset-0 flex items-end z-20">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-12 w-full">
            <div className="flex justify-between items-end flex-wrap gap-4 sm:gap-6 w-full">
              <div className="flex-1 min-w-0">
                {/* Badges skeleton */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="h-8 w-20 bg-white/30 rounded-full" />
                  <div className="h-8 w-32 bg-white/30 rounded-full" />
                  <div className="h-8 w-28 bg-white/30 rounded-full" />
                </div>
                {/* Hotel name skeleton */}
                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="h-12 sm:h-16 md:h-20 w-96 bg-white/30 rounded-lg" />
                </div>
                {/* Location skeleton */}
                <div className="h-10 w-64 bg-white/20 rounded-full" />
              </div>
              {/* Action buttons skeleton */}
              <div className="flex gap-2 sm:gap-3">
                <div className="h-12 w-12 bg-white/20 rounded-full" />
                <div className="h-12 w-12 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-12 w-full">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10 md:space-y-12 w-full">
            {/* Trust Elements Section Skeleton */}
            <section className="w-full">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between flex-wrap gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
                      <TrustElementSkeleton />
                      <TrustElementSkeleton />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Description Section Skeleton */}
            <section className="w-full">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl sm:rounded-2xl mr-3 sm:mr-4" />
                <div className="h-8 w-48 bg-gray-200 rounded" />
              </div>
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
                <div className="p-4 sm:p-6 md:p-8 space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            </section>
            {/* Amenities Section Skeleton */}
            <section className="w-full">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl sm:rounded-2xl mr-3 sm:mr-4" />
                <div className="h-8 w-32 bg-gray-200 rounded" />
              </div>
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <AmenitySkeleton key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {/* Location/Map Section Skeleton */}
            <section className="w-full mb-8 lg:mb-0">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl sm:rounded-2xl mr-3 sm:mr-4" />
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-48 sm:h-56 md:h-64 w-full bg-gray-200 rounded-2xl" />
            </section>
          </div>
          {/* Right Column Skeleton */}
          <div className="lg:col-span-1 w-full">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden sticky top-8 w-full mt-8 lg:mt-0">
              {/* Header skeleton */}
              <div className="bg-gray-300 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-6 w-32 bg-white/30 rounded" />
                    <div className="h-4 w-40 bg-white/20 rounded" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl" />
                </div>
              </div>
              {/* Price section skeleton */}
              <div className="p-4 sm:p-6 bg-gray-100">
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 bg-gray-200 rounded" />
                    <div className="h-5 w-24 bg-gray-200 rounded" />
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white rounded-xl">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-8 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
                {/* Availability section skeleton */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 bg-gray-200 rounded" />
                    <div className="h-5 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white rounded-xl">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-200 rounded-full mr-3" />
                      <div className="h-4 w-6 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
                {/* Trust elements skeleton */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pt-4 sm:pt-6 border-t border-gray-200">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-lg" />
                      <div className="h-3 w-32 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
                {/* Booking form skeleton */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="h-14 bg-gray-200 rounded-xl" />
                    <div className="h-14 bg-gray-200 rounded-xl" />
                  </div>
                  <div className="h-14 bg-gray-200 rounded-xl" />
                  <div className="h-14 bg-gray-200 rounded-xl" />
                  <div className="h-14 bg-gray-200 rounded-xl" />
                  <div className="h-24 bg-gray-200 rounded-xl" />
                  <div className="h-60 bg-gray-200 rounded-2xl" />
                  <div className="h-14 bg-gray-200 rounded-xl" />
                </div>
                {/* Trust indicators skeleton */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="h-4 w-12 bg-gray-200 rounded" />
                  <div className="h-4 w-14 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews Section Skeleton */}
        <div className="mt-16 sm:mt-18 md:mt-20 w-full">
          <div className="flex items-center mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl sm:rounded-2xl mr-3 sm:mr-4" />
            <div className="h-8 w-36 bg-gray-200 rounded" />
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <ReviewsSkeleton />
            </div>
          </div>
        </div>
        {/* Similar Hotels Section Skeleton */}
        <section className="mt-12 sm:mt-14 md:mt-16 w-full overflow-hidden">
          <div className="flex items-center mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl sm:rounded-2xl mr-3 sm:mr-4" />
            <div className="space-y-2">
              <div className="h-8 w-72 bg-gray-200 rounded" />
              <div className="w-16 h-1 bg-gray-200 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function TrustElementSkeleton() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl" />
      <div className="space-y-1">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-6 w-12 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function AmenitySkeleton() {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 border border-gray-200">
      <div className="w-5 h-5 bg-gray-200 rounded" />
      <div className="h-3 w-16 bg-gray-200 rounded" />
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Reviews header */}
      <div className="text-center space-y-3">
        <div className="h-6 w-32 bg-gray-200 rounded mx-auto" />
        <div className="h-4 w-56 bg-gray-200 rounded mx-auto" />
      </div>
      {/* Review cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
