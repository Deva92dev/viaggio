export default function MapViewSkeleton() {
  return (
    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden h-64">
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-20 -z-10"></div>
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-[hsl(var(--features-bg))] to-white">
        <div className="text-center">
          {/* Enhanced spinner with gradient background */}
          <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          {/* Loading text */}
          <p className="text-lg text-[hsl(var(--muted-foreground))] font-semibold mb-2">
            Loading Interactive Map
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]/80">
            Preparing location details...
          </p>
          {/* Animated dots */}
          <div className="flex justify-center space-x-1 mt-3">
            <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
