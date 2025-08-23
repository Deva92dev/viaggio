const PaginationSkeleton = () => {
  return (
    <section className="relative w-screen py-8 sm:py-12 md:py-16 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--features-bg))]">
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-5 animate-pulse" />
        <div
          className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-8 animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>
      <div className="relative z-10 w-full px-3 sm:px-6 md:px-12">
        <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Results Info Skeleton */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 sm:h-5 lg:h-6 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 sm:h-5 lg:h-6 w-6 bg-[hsl(var(--primary))]/20 rounded animate-pulse" />
              <div className="h-4 sm:h-5 lg:h-6 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 sm:h-5 lg:h-6 w-6 bg-[hsl(var(--primary))]/20 rounded animate-pulse" />
              <div className="h-4 sm:h-5 lg:h-6 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 sm:h-5 lg:h-6 w-8 bg-[hsl(var(--primary))]/20 rounded animate-pulse" />
              <div className="h-4 sm:h-5 lg:h-6 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          {/* Main Pagination Container Skeleton */}
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-20" />
            {/* Pagination Content Skeleton */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-2 sm:p-4">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {/* Previous Button Skeleton */}
                <div className="px-2 sm:px-3 py-2 rounded-xl bg-gray-200 animate-pulse">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded animate-pulse" />
                    <div className="hidden sm:block w-8 h-3 bg-gray-300 rounded animate-pulse" />
                  </div>
                </div>
                {/* Page Numbers Skeleton */}
                <div className="flex items-center gap-1">
                  {/* First page */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))]/30 to-[hsl(var(--primary))]/20 animate-pulse" />
                  {/* Dots */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    <div className="w-3 h-1 sm:w-4 sm:h-1 bg-gray-300 rounded animate-pulse" />
                  </div>
                  {/* Current page */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))]/40 to-[hsl(var(--primary))]/30 animate-pulse scale-110" />
                  {/* Dots */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    <div className="w-3 h-1 sm:w-4 sm:h-1 bg-gray-300 rounded animate-pulse" />
                  </div>
                  {/* Last page */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gray-200 animate-pulse" />
                </div>
                {/* Next Button Skeleton */}
                <div className="px-2 sm:px-3 py-2 rounded-xl bg-gray-200 animate-pulse">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="hidden sm:block w-8 h-3 bg-gray-300 rounded animate-pulse" />
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Progress Bar Skeleton */}
          <div className="w-32 sm:w-48 md:w-64 h-1 sm:h-2 bg-[hsl(var(--border))] rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-[hsl(var(--primary))]/30 to-[hsl(var(--accent))]/30 rounded-full w-1/3 animate-pulse" />
          </div>
          {/* Page Jump Info Skeleton */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 sm:h-4 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 sm:h-4 w-4 bg-[hsl(var(--accent))]/30 rounded animate-pulse" />
              <div className="h-3 sm:h-4 w-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 sm:h-4 w-4 bg-[hsl(var(--accent))]/30 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaginationSkeleton;
