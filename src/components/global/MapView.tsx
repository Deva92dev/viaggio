/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState, useTransition } from "react";
import { GeoLocation } from "@/utils/actions";
import { MapPin } from "lucide-react";

type MapViewProps = {
  location: string;
};

const MapView = ({ location }: MapViewProps) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [iconsReady, setIconsReady] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const [_, coordsResult] = await Promise.all([
          import("@/utils/leafletIcons"),
          GeoLocation(location),
        ]);

        setIconsReady(true);
        setCoords(coordsResult);
      } catch (error) {
        console.error("Failed to load map resources:", error);
      }
    });
  }, [location]);

  const isLoading = !coords || !iconsReady || isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
              {!iconsReady
                ? "Loading map icons..."
                : !coords
                ? "Loading location..."
                : "Setting up map..."}
            </p>
            <div className="flex items-center justify-center gap-2 text-[hsl(var(--muted-foreground))]">
              <MapPin size={14} className="text-[hsl(var(--accent))]" />
              <span className="text-xs">{location}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
};

export default MapView;
