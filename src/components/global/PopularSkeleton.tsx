import SkeletonLoader from "../global/SkeletonLoader";

export const PopularSkeleton = () => (
  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 md:px-12 max-w-7xl mx-auto">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white/90 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-6 space-y-4"
      >
        <SkeletonLoader variant="image" className="w-full" />
        <SkeletonLoader variant="text" className="w-3/4" />
        <SkeletonLoader variant="text" className="w-1/2" />
        <div className="flex justify-between">
          <SkeletonLoader variant="text" className="w-1/4" />
          <SkeletonLoader variant="text" className="w-1/4" />
        </div>
        <SkeletonLoader variant="default" className="w-full h-12 rounded-xl" />
      </div>
    ))}
  </div>
);
