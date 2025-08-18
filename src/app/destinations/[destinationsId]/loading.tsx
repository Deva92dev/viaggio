export default function DestinationDetailsLoading() {
  return (
    <main className="relative overflow-hidden bg-[hsl(var(--background))] animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-[70vh] min-h-[600px] mb-16 overflow-hidden bg-gray-200">
        {/* Hero content overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
        <div className="absolute inset-0 flex items-center z-20 pt-16 sm:pt-20 md:pt-24 lg:pt-16">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl w-full">
              {/* Badges skeleton */}
              <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 w-full relative z-30 mt-4 sm:mt-6 md:mt-8">
                <div className="h-8 w-20 bg-white/30 rounded-full" />
                <div className="h-8 w-16 bg-white/30 rounded-full" />
                <div className="h-8 w-32 bg-white/30 rounded-full" />
              </div>
              {/* Title skeleton */}
              <div className="space-y-4 mb-6">
                <div className="h-16 w-96 bg-white/30 rounded-lg" />
                <div className="h-8 w-full max-w-3xl bg-white/20 rounded" />
                <div className="h-8 w-5/6 bg-white/20 rounded" />
              </div>
              {/* Location info skeleton */}
              <div className="flex items-center flex-wrap gap-6 mb-8">
                <div className="h-10 w-48 bg-white/20 rounded-full" />
                <div className="h-10 w-40 bg-white/20 rounded-full" />
              </div>
              {/* Action buttons skeleton */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-14 w-48 bg-white/30 rounded-lg" />
                <div className="flex gap-3">
                  <div className="h-14 w-14 bg-white/20 rounded-full" />
                  <div className="h-14 w-14 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience Section Skeleton */}
            <section>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gray-200 rounded-2xl mr-4" />
                <div className="h-8 w-72 bg-gray-200 rounded" />
              </div>
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                <div className="p-8 md:p-10 space-y-8">
                  {/* Description skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  </div>
                  {/* Info cards skeleton */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <InfoCardSkeleton />
                    <InfoCardSkeleton />
                  </div>
                  <InfoCardSkeleton />
                </div>
              </div>
            </section>
            {/* Photo Gallery Skeleton */}
            <section>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gray-200 rounded-2xl mr-4" />
                <div className="h-8 w-60 bg-gray-200 rounded" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-200 rounded-3xl" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-gray-200 rounded-2xl" />
                  <div className="h-32 bg-gray-200 rounded-2xl" />
                </div>
              </div>
            </section>
          </div>
          {/* Right Column Skeleton */}
          <div className="lg:col-span-1 space-y-8">
            {/* Booking Card Skeleton */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden sticky top-8">
              <div className="bg-gray-300 p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-6 w-32 bg-white/30 rounded" />
                    <div className="h-4 w-40 bg-white/20 rounded" />
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl" />
                </div>
              </div>
              {/* Booking form skeleton */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="h-14 bg-gray-200 rounded-xl" />
                  <div className="h-14 bg-gray-200 rounded-xl" />
                </div>
                <div className="h-14 bg-gray-200 rounded-xl" />
                <div className="h-24 bg-gray-200 rounded-xl" />
                <div className="h-60 bg-gray-200 rounded-2xl" />
                <div className="h-14 bg-gray-200 rounded-xl" />
              </div>
              {/* Price section skeleton */}
              <div className="p-6 bg-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-8 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="h-8 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <div className="h-12 bg-white rounded-xl" />
                  <div className="h-12 bg-white rounded-xl" />
                </div>
                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
            {/* Location 3D Card Skeleton */}
            <div className="h-48 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl" />
            {/* Best Time Card Skeleton */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gray-200 rounded-xl mr-3" />
                <div className="h-6 w-40 bg-gray-200 rounded" />
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="h-8 w-16 bg-gray-200 rounded-full" />
                <div className="h-8 w-20 bg-gray-200 rounded-full" />
                <div className="h-8 w-18 bg-gray-200 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        {/* Review Section Skeleton */}
        <div className="mt-20">
          <div className="flex items-center mb-10">
            <div className="w-12 h-12 bg-gray-200 rounded-2xl mr-4" />
            <div className="h-8 w-48 bg-gray-200 rounded" />
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-10">
              <ReviewsSkeleton />
            </div>
          </div>
        </div>
        {/* Similar Destinations Skeleton */}
        <section className="mt-16">
          <div className="flex items-center mb-10">
            <div className="w-12 h-12 bg-gray-200 rounded-2xl mr-4" />
            <div className="h-8 w-80 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCardSkeleton() {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-xl mr-3" />
        <div className="h-5 w-32 bg-gray-200 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Reviews header */}
      <div className="text-center space-y-3">
        <div className="h-6 w-40 bg-gray-200 rounded mx-auto" />
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto" />
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
