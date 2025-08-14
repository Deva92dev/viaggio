import { Skeleton } from "../ui/skeleton";

// Loading component for the search page
export const SearchPageSkeleton = () => (
  <section className="max-w-7xl mx-auto p-6">
    <div className="mb-8">
      <Skeleton className="h-8 w-64 mb-4" />
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
        <Skeleton className="h-5 w-32 mb-3" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-white rounded-xl shadow-sm border overflow-hidden"
        >
          <Skeleton className="h-56 w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-5 w-16 ml-auto" />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 flex justify-center">
      <Skeleton className="h-10 w-32" />
    </div>
  </section>
);
