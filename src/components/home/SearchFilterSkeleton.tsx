import {
  SearchIcon,
  MapPinIcon,
  DollarSignIcon,
  CalendarIcon,
} from "lucide-react";

const SearchFilterSkeleton = () => {
  return (
    <section
      className="section-base rounded-[var(--radius)] glass shadow-2 elev-rest p-6 sm:p-8 border border-[color:color-mix(in_oklab,white_15%,transparent)] relative"
      aria-label="Search filter loading"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-9 w-9 inline-flex items-center justify-center rounded-[var(--radius-sm)] animate-pulse"
          style={{ backgroundColor: "hsl(var(--primary) / 0.12)" }}
        >
          <SearchIcon
            className="h-5 w-5"
            style={{ color: "hsl(var(--primary))" }}
          />
        </div>
        <div className="h-6 w-48 rounded-md bg-[hsl(var(--muted))] animate-pulse" />
      </div>

      {/* Inputs row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Destination */}
        <div className="flex-grow w-full space-y-2">
          <div className="text-sm font-medium flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <div className="h-4 w-20 bg-[hsl(var(--muted))] rounded animate-pulse" />
          </div>
          <div className="h-12 w-full bg-[hsl(var(--muted))] rounded-[var(--radius)] animate-pulse" />
        </div>

        {/* Check-in */}
        <div className="w-full lg:w-auto space-y-2">
          <div className="h-4 w-16 bg-[hsl(var(--muted))] rounded animate-pulse" />
          <div className="w-full lg:w-[180px] h-12 bg-[hsl(var(--muted))] rounded-[var(--radius)] flex items-center px-3 animate-pulse">
            <CalendarIcon className="mr-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <div className="h-4 w-20 bg-[hsl(var(--muted))] rounded animate-pulse" />
          </div>
        </div>

        {/* Check-out */}
        <div className="w-full lg:w-auto space-y-2">
          <div className="h-4 w-16 bg-[hsl(var(--muted))] rounded animate-pulse" />
          <div className="w-full lg:w-[180px] h-12 bg-[hsl(var(--muted))] rounded-[var(--radius)] flex items-center px-3 animate-pulse">
            <CalendarIcon className="mr-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <div className="h-4 w-20 bg-[hsl(var(--muted))] rounded animate-pulse" />
          </div>
        </div>

        {/* Search Button */}
        <div
          className="w-full lg:w-[140px] h-12 rounded-[var(--radius)] animate-pulse"
          style={{ backgroundColor: "hsl(var(--accent) / 0.6)" }}
        />
      </div>

      {/* Price Range */}
      <div className="space-y-4 pt-6 mt-4 border-t border-[hsl(var(--border))]">
        <div className="text-sm font-medium flex items-center gap-2">
          <DollarSignIcon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <div className="h-4 w-24 bg-[hsl(var(--muted))] rounded animate-pulse" />
        </div>

        <div className="space-y-4">
          <div className="h-6 w-full bg-[hsl(var(--muted))] rounded-full animate-pulse relative">
            <div
              className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: "hsl(var(--primary) / 0.6)" }}
            />
            <div
              className="absolute right-1/3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: "hsl(var(--primary) / 0.6)" }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-3">
              <div
                className="px-3 py-2 rounded-[var(--radius-sm)] animate-pulse"
                style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}
              >
                <div className="h-4 w-16 bg-[hsl(var(--muted))] rounded animate-pulse" />
              </div>
              <div
                className="px-3 py-2 rounded-[var(--radius-sm)] animate-pulse"
                style={{ backgroundColor: "hsl(var(--accent) / 0.1)" }}
              >
                <div className="h-4 w-16 bg-[hsl(var(--muted))] rounded animate-pulse" />
              </div>
            </div>
            <div className="h-3 w-24 bg-[hsl(var(--muted))] rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading veil */}
      <div className="absolute inset-0 rounded-[var(--radius)] bg-white/40 dark:bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-10">
        <div className="flex items-center gap-3">
          <div
            className="h-5 w-5 rounded-full border-2 border-[hsl(var(--primary))] border-t-transparent animate-spin"
            aria-hidden="true"
          />
          <span
            className="font-medium"
            style={{ color: "hsl(var(--primary))" }}
          >
            Loading search...
          </span>
        </div>
      </div>
    </section>
  );
};

export default SearchFilterSkeleton;
