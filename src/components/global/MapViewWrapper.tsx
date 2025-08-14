"use client";

import dynamic from "next/dynamic";
import { FC } from "react";

const DynamicMapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white rounded-2xl border border-[hsl(var(--border))]">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center mx-auto mb-3">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
          Loading map...
        </p>
      </div>
    </div>
  ),
});

type Props = {
  location: string;
};

const MapViewWrapper: FC<Props> = ({ location }) => {
  return (
    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-2xl blur opacity-20 -z-10"></div>
      <DynamicMapView location={location} />
    </div>
  );
};

export default MapViewWrapper;
