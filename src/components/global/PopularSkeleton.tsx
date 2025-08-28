import SkeletonLoader from "../global/SkeletonLoader";

export const PopularSkeleton = () => (
  <section className="section-subtle w-full py-[var(--space-7)] md:py-[var(--space-8)]">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass elev-rest rounded-[var(--radius)] overflow-hidden border border-[color:color-mix(in_oklab,white_15%,transparent)] p-[var(--space-3)]"
          >
            <div className="relative w-full aspect-[4/3] rounded-[var(--radius-sm)] overflow-hidden">
              <SkeletonLoader variant="image" className="w-full h-full" />
              <div className="absolute top-3 left-3 h-7 w-7 rounded-[var(--radius-sm)] bg-[hsl(var(--muted))] opacity-70" />
              <div className="absolute top-3 right-3 h-6 w-20 rounded-[var(--radius-pill)] bg-[hsl(var(--muted))]" />
              <div className="absolute bottom-3 left-3 h-6 w-28 rounded-[var(--radius-pill)] bg-[hsl(var(--muted))]" />
            </div>

            <div className="mt-[var(--space-3)] space-y-3">
              <SkeletonLoader variant="text" className="w-3/4 h-5" />
              <SkeletonLoader
                variant="default"
                className="w-full h-10 rounded-[var(--radius)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
