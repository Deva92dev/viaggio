import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "bxjlbovqqpknnamezbpx.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 425, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 450, 512, 640],
    qualities: [30, 40, 50, 60, 75, 80, 85, 90],
    minimumCacheTTL: 31536000,
  },

  // Only cache static assets, NEVER the HTML document.
  async headers() {
    return [
      {
        // Target specific image/font extensions in the public folder.
        // DO NOT use /(.*) or you will cache HTML/JSON data routes.
        source: "/:all*(svg|jpg|png|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
