import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/bookings(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // 1. PERFORMANCE FIX:
    // I added "|^/$" inside the negative lookahead.
    // This tells Next.js: "Do NOT match if it is a static file OR if it is exactly '/'"
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|^/$).*)",
    "/(api|trpc)(.*)",
  ],
};
