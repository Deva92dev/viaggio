/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { toggleFavorite } from "@/utils/actions";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";

type FavoriteButtonProps = {
  itemId: string;
  itemType: "hotel" | "destination";
  initialFavorited: boolean;
  isSignedIn: boolean;
  isLoading?: boolean;
  className?: string;
};

const FavoriteButton = ({
  itemId,
  itemType,
  initialFavorited,
  isSignedIn,
  isLoading = false,
  className = "",
}: FavoriteButtonProps) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsFavorited(initialFavorited);
  }, [initialFavorited]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    //  Redirect to Sign In Page
    if (!isSignedIn) {
      const returnUrl = encodeURIComponent(pathname || "/");
      router.push(`/sign-in?redirect_url=${returnUrl}`);
      return;
    }

    //  Toggle Favorite
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    const previousState = isFavorited;
    setIsFavorited(!isFavorited);

    startTransition(async () => {
      try {
        const result = await toggleFavorite(itemId, itemType);
        if (!result.success) {
          setIsFavorited(previousState);
          toast.error("Failed to update favorites");
        } else {
          if (!previousState) {
            toast.success("Added to favorites!");
          } else {
            toast.success("Removed from favorites");
          }
        }
      } catch (error) {
        setIsFavorited(previousState);
        toast.error("Something went wrong");
      }
    });
  };

  const isDisabled = isPending || isLoading;

  const tooltipText = !isSignedIn
    ? "Sign in to save favorites"
    : isFavorited
    ? "Remove from Favorites"
    : "Add to Favorites";

  return (
    // Name the group "favorite" to isolate hover events
    <div className="relative group/favorite">
      <div
        className={`absolute -inset-1 rounded-full blur transition-all duration-500 ${
          isFavorited
            ? "bg-gradient-to-r from-[hsl(var(--accent))] to-red-500 opacity-30 group-hover/favorite:opacity-50"
            : "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] opacity-0 group-hover/favorite:opacity-20"
        }`}
      />

      <Button
        onClick={handleToggleFavorite}
        disabled={isDisabled}
        aria-label={tooltipText}
        // Update all group-hover classes to group-hover/favorite
        className={`
          relative z-10 w-12 h-12 rounded-full p-0 
          bg-white/20 backdrop-blur-xl border border-white/30 
          hover:bg-white/30 hover:scale-110 
          active:scale-95
          transition-all duration-300 ease-out
          group-hover/favorite:shadow-xl group-hover/favorite:shadow-white/25
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isAnimating ? "animate-pulse" : ""}
          ${className}
        `}
      >
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
            <Loader2 size={16} className="animate-spin text-white" />
          </div>
        )}

        <Heart
          fill={isFavorited ? "currentColor" : "none"}
          className={`
            w-6 h-6 transition-all duration-500 ease-out relative z-10
            ${
              isFavorited
                ? "text-[hsl(var(--accent))] drop-shadow-glow scale-110"
                : "text-white group-hover/favorite:text-[hsl(var(--accent))] group-hover/favorite:scale-105"
            }
            ${isAnimating ? "animate-bounce" : ""}
            ${isPending ? "opacity-30" : "opacity-100"}
          `}
        />

        {isFavorited && !isPending && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                size={12}
                fill="currentColor"
                className={`
                  absolute text-[hsl(var(--accent))] opacity-0 animate-float-heart
                  ${i === 0 ? "top-0 left-1/2 -translate-x-1/2" : ""}
                  ${i === 1 ? "top-1/2 left-0 -translate-y-1/2" : ""}
                  ${i === 2 ? "top-1/2 right-0 -translate-y-1/2" : ""}
                `}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/favorite:translate-x-full transition-transform duration-1000 opacity-0 group-hover/favorite:opacity-100" />
      </Button>

      {/* Tooltip Only show when hovering this specific group */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover/favorite:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
        {tooltipText}
      </div>
    </div>
  );
};

export default FavoriteButton;
