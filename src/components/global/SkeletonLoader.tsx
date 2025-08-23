const SkeletonLoader = ({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "card" | "text" | "image";
}) => {
  const baseClasses =
    "animate-pulse bg-gradient-to-r from-[hsl(var(--muted))] via-[hsl(var(--muted))/0.8] to-[hsl(var(--muted))]";

  const variants = {
    default: "h-4 rounded-lg",
    card: "h-80 rounded-3xl",
    text: "h-3 rounded-md",
    image: "aspect-square rounded-2xl",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </div>
  );
};

export default SkeletonLoader;
