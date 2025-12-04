import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Update the matcher to match the config below
const isProtectedRoute = createRouteMatcher([
  "/bookings(.*)",
  "/favorites(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Use :path* for sub-paths (Standard Next.js syntax)
    "/bookings/:path*",
    "/api/:path*",
    "/hotels/:path*",
    "/destinations/:path*",
    "/trpc/:path*",
    "/favorites/:path*",
    // Note: "/" is NOT here.
  ],
};
