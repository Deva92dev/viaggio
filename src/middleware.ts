import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/bookings(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  // Middleware ONLY runs on these paths.
  // Static files (like /hero.webp or /_next/...) do NOT match these,
  // so they are automatically skipped.
  matcher: [
    "/bookings(.*)",
    "/api(.*)",
    "/hotels(.*)",
    "/destinations(.*)",
    "/trpc(.*)",
    "/favorites(.*)",
  ],
};
