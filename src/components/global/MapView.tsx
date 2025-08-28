/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GeoLocation } from "@/utils/actions";
import { MapPin } from "lucide-react";

type MapViewProps = {
  location: string;
};

type MapComponents = {
  MapContainer: any;
  TileLayer: any;
  Marker: any;
  Popup: any;
};

const MapLoadingFallback = ({
  location,
  status,
}: {
  location: string;
  status: string;
}) => (
  <div className="flex items-center justify-center h-64 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white rounded-2xl">
    <div className="text-center">
      <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
          {status}
        </p>
        <div className="flex items-center justify-center gap-2 text-[hsl(var(--muted-foreground))]">
          <MapPin size={14} className="text-[hsl(var(--accent))]" />
          <span className="text-xs">{location}</span>
        </div>
      </div>
    </div>
  </div>
);

const useGeoLocation = (location: string) => {
  return useQuery({
    queryKey: ["geo-location", location],
    queryFn: () => GeoLocation(location),
    // Longer cache since coordinates rarely change
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    placeholderData: keepPreviousData, // Keep previous data while loading
    enabled: !!location?.trim(),
  });
};

// Cache map components globally - only load once per session
const useMapComponents = () => {
  return useQuery<MapComponents>({
    queryKey: ["map-components"],
    queryFn: async () => {
      const [leafletComponents] = await Promise.all([
        import("react-leaflet"),
        Promise.all([
          import("@/utils/leafletIcons").then((mod) =>
            mod.initializeLeafletIcons()
          ),
          new Promise<void>((resolve) => {
            if (document.querySelector('link[href*="leaflet"]')) {
              resolve();
              return;
            }
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            link.onload = () => resolve();
            link.onerror = () => resolve(); // Continue even if CSS fails
            document.head.appendChild(link);
          }),
        ]),
      ]);

      return {
        MapContainer: leafletComponents.MapContainer,
        TileLayer: leafletComponents.TileLayer,
        Marker: leafletComponents.Marker,
        Popup: leafletComponents.Popup,
      };
    },
    // Map components never become stale
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

const useMapTilePreload = (coords: { lat: number; lon: number } | null) => {
  return useQuery({
    queryKey: ["map-tiles-preload", coords?.lat, coords?.lon],
    queryFn: async () => {
      if (!coords) return null;

      // Pre-cache center and surrounding tiles
      const tilePromises = [];
      const zoom = 13;

      const tileX = Math.floor(((coords.lon + 180) / 360) * Math.pow(2, zoom));
      const tileY = Math.floor(
        ((1 -
          Math.log(
            Math.tan((coords.lat * Math.PI) / 180) +
              1 / Math.cos((coords.lat * Math.PI) / 180)
          ) /
            Math.PI) /
          2) *
          Math.pow(2, zoom)
      );

      // Pre-load 3x3 grid of tiles
      for (let x = tileX - 1; x <= tileX + 1; x++) {
        for (let y = tileY - 1; y <= tileY + 1; y++) {
          const tileUrl = `https://a.tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
          tilePromises.push(
            fetch(tileUrl, {
              cache: "force-cache", // Use browser cache
            }).catch(() => null) // Ignore failed requests
          );
        }
      }

      await Promise.allSettled(tilePromises);
      return true;
    },
    enabled: !!coords,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};

const MapView = memo(({ location }: MapViewProps) => {
  const {
    data: coords,
    isLoading: coordsLoading,
    error: coordsError,
    isPlaceholderData: isUsingPreviousCoords,
  } = useGeoLocation(location);

  const {
    data: mapComponents,
    isLoading: componentsLoading,
    error: componentsError,
  } = useMapComponents();

  useMapTilePreload(coords ?? null);

  const isLoading = coordsLoading || componentsLoading;
  const hasError = coordsError || componentsError;

  let status = "Initializing...";
  if (coordsLoading && !isUsingPreviousCoords)
    status = "Loading location data...";
  if (componentsLoading) status = "Loading map components...";
  if (coords && mapComponents) status = "Map ready!";
  if (hasError) status = "Failed to load map";

  if (isLoading || !coords || !mapComponents) {
    return <MapLoadingFallback location={location} status={status} />;
  }

  const { MapContainer, TileLayer, Marker, Popup } = mapComponents;

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden">
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="rounded-2xl z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lon]}>
          <Popup>
            <div className="text-center p-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin size={16} className="text-white" />
              </div>
              <p className="font-semibold text-[hsl(var(--foreground))]">
                {location}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
});

MapView.displayName = "MapView";

export default MapView;
