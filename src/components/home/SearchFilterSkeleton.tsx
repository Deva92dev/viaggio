import { SearchIcon, DollarSignIcon } from "lucide-react";

const SearchFilterSkeleton = () => {
  return (
    <section
      className="relative p-6 sm:p-8 w-full rounded-2xl bg-white/95 border border-white/20 shadow-2xl overflow-hidden"
      aria-label="Search filter loading"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gray-100 animate-pulse">
          <SearchIcon className="h-5 w-5 text-gray-300" />
        </div>
        <div className="h-7 w-64 bg-gray-100 rounded-md animate-pulse" />
      </div>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end">
        {/* Destination Input */}
        <div className="flex-grow w-full space-y-2">
          <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mb-2" />
          <div className="w-full h-12 bg-gray-50 rounded-xl border-2 border-gray-100 animate-pulse" />
        </div>
        {/* Check-in Date */}
        <div className="w-full lg:w-auto space-y-2">
          <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mb-2" />
          <div className="w-full lg:w-[180px] h-12 bg-gray-50 rounded-xl border-2 border-gray-100 animate-pulse" />
        </div>
        {/* Check-out Date */}
        <div className="w-full lg:w-auto space-y-2">
          <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mb-2" />
          <div className="w-full lg:w-[180px] h-12 bg-gray-50 rounded-xl border-2 border-gray-100 animate-pulse" />
        </div>
        {/* Search Button */}
        <div className="w-full lg:w-auto">
          {/* Matches h-12 of the real button */}
          <div className="w-full lg:w-[140px] h-12 rounded-xl bg-gray-200 animate-pulse" />
        </div>
      </div>
      <div className="space-y-4 pt-6 mt-6 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <DollarSignIcon className="h-4 w-4 text-gray-300" />
          <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          {/* Slider Bar */}
          <div className="h-5 w-full bg-gray-100 rounded-full animate-pulse" />
          {/* Price Labels */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="h-9 w-24 bg-gray-50 rounded-lg animate-pulse" />
              <div className="h-9 w-24 bg-gray-50 rounded-lg animate-pulse" />
            </div>
            <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilterSkeleton;
