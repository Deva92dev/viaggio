type NavLinks = {
  href: string;
  label: string;
  prefetch?: boolean;
  trackId?: string;
};

export const navLinks: NavLinks[] = [
  { href: "/", label: "Home", trackId: "nav-home" },
  { href: "/destinations", label: "Destinations", trackId: "nav-destinations" },
  { href: "/hotels", label: "Hotels", trackId: "nav-hotels" },
  {
    href: "/favorites",
    label: "Favorites",
    trackId: "nav-favorites",
    prefetch: false,
  },
];

export const publicNavLinks: NavLinks[] = [
  { href: "/", label: "Home", trackId: "nav-home" },
  { href: "/destinations", label: "Destinations", trackId: "nav-destinations" },
  { href: "/hotels", label: "Hotels", trackId: "nav-hotels" },
];
