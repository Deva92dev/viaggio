import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/bookings(.*)",
  "/favorites(.*)",
]);

// Pages logged-in users shouldn't see
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // User is trying to access a Protected Route but is NOT logged in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // Case B: User IS logged in but tries to visit Sign-In/Sign-Up
  // Redirect them to the main app area
  if (userId && isAuthRoute(req)) {
    const dashboardUrl = new URL("/", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow everything else
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
