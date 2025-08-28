"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { IsFavorited } from "@/utils/actions";
import FavoriteButton from "./FavoriteButton";

type FavoriteToggleServerWrapperProps = {
  itemId: string;
  itemType: "hotel" | "destination";
  className?: string;
};

const FavoriteToggleWrapper = ({
  itemId,
  itemType,
  className,
}: FavoriteToggleServerWrapperProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [initialFavorited, setInitialFavorited] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        startTransition(async () => {
          try {
            const favoriteStatus = await IsFavorited(itemId, itemType);
            setInitialFavorited(favoriteStatus);
          } catch (error) {
            console.error("Error checking favorite status:", error);
            setInitialFavorited(false);
          }
        });
      } else {
        // User not signed in, set to false immediately
        setInitialFavorited(false);
      }
    }
  }, [isLoaded, isSignedIn, itemId, itemType]);

  if (!isLoaded || isPending) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
          <Heart size={20} className="text-white/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* backdrop effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

      <FavoriteButton
        initialFavorited={initialFavorited}
        itemId={itemId}
        itemType={itemType}
        isLoading={isPending}
        className={`${className} relative z-10 transition-all duration-300 hover:scale-110 hover:shadow-lg`}
      />
    </div>
  );
};

export default FavoriteToggleWrapper;
