import {
  SearchIcon,
  MapPinIcon,
  DollarSignIcon,
  CalendarIcon,
} from "lucide-react";

const SearchFilterSkeleton = () => {
  return (
    <div className="relative p-6 sm:p-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[hsl(var(--primary))/0.1] w-full space-y-6 border border-white/20">
      {/* Decorative gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-20 -z-10" />
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl animate-pulse">
          <SearchIcon className="h-5 w-5 text-white" />
        </div>
        <div className="h-6 w-56 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      {/* Main inputs row skeleton */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end">
        {/* Destination Input Skeleton */}
        <div className="flex-grow w-full space-y-2">
          <div className="text-sm font-semibold flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-gray-400" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-12 w-full bg-gray-100 border-2 border-gray-200 rounded-xl animate-pulse"></div>
        </div>
        {/* Check-in Date Skeleton */}
        <div className="w-full lg:w-auto space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-full lg:w-[180px] h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center px-3 animate-pulse">
            <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Check-out Date Skeleton */}
        <div className="w-full lg:w-auto space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-full lg:w-[180px] h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center px-3 animate-pulse">
            <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Search Button Skeleton */}
        <div className="w-full lg:w-auto h-12 px-8 bg-gradient-to-r from-[hsl(var(--primary))]/70 to-[hsl(var(--accent))]/70 rounded-xl flex items-center justify-center animate-pulse">
          <SearchIcon className="h-5 w-5 lg:mr-2 text-white/70" />
          <span className="hidden lg:inline text-white/70 font-semibold">
            Search
          </span>
        </div>
      </div>
      {/* Price Range Section Skeleton */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div className="text-sm font-semibold flex items-center gap-2">
          <DollarSignIcon className="h-4 w-4 text-gray-400" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {/* Slider skeleton */}
          <div className="relative h-6 w-full bg-gray-100 rounded-full animate-pulse">
            <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[hsl(var(--primary))]/70 rounded-full animate-pulse"></div>
            <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[hsl(var(--primary))]/70 rounded-full animate-pulse"></div>
          </div>
          {/* Price Display Skeleton */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="bg-[hsl(var(--primary))]/10 px-3 py-2 rounded-lg animate-pulse">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="bg-[hsl(var(--accent))]/10 px-3 py-2 rounded-lg animate-pulse">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Loading overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[hsl(var(--primary))] font-medium">
            Loading search...
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterSkeleton;
