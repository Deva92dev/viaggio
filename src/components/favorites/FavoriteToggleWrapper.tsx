"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { IsFavorited } from "@/utils/actions";
import { cn } from "@/lib/utils";
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
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setIsFavorited(false);
      return;
    }

    let mounted = true;

    const checkStatus = async () => {
      setIsFetching(true);
      try {
        const status = await IsFavorited(itemId, itemType);
        if (mounted) setIsFavorited(status);
      } catch (error) {
        console.error("Failed to sync favorite status", error);
      } finally {
        if (mounted) setIsFetching(false);
      }
    };

    checkStatus();

    return () => {
      mounted = false;
    };
  }, [isLoaded, isSignedIn, itemId, itemType]);

  return (
    <div className="relative group/favWrapper">
      {/* hover selector to match scoped group */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full blur opacity-0 group-hover/favWrapper:opacity-30 transition-opacity duration-300" />

      <FavoriteButton
        initialFavorited={isFavorited}
        itemId={itemId}
        itemType={itemType}
        isSignedIn={!!isSignedIn}
        isLoading={isSignedIn && isFetching}
        className={cn(
          "relative z-10 transition-all duration-300 hover:scale-110 hover:shadow-lg",
          className
        )}
      />
    </div>
  );
};

export default FavoriteToggleWrapper;
