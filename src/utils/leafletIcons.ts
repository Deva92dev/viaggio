/* eslint-disable @typescript-eslint/no-explicit-any */

let iconsInitialized = false;

export const initializeLeafletIcons = async () => {
  // Only run on client side and only once
  if (typeof window === "undefined" || iconsInitialized) {
    return;
  }

  try {
    // Dynamic import of Leaflet
    const L = await import("leaflet");

    // Fix default icon issue
    delete (L.Icon.Default as any).prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    iconsInitialized = true;
  } catch (error) {
    console.error("Failed to initialize Leaflet icons:", error);
  }
};

// For backward compatibility, auto-initialize if window exists
if (typeof window !== "undefined") {
  initializeLeafletIcons();
}

export default initializeLeafletIcons;
