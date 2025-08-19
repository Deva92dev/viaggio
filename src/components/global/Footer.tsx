/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { publicNavLinks } from "@/utils/links";
import SmartLink from "./SmartLink";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Send,
  Globe,
  Shield,
  Award,
  Users,
  FileText,
  Scale,
  RefreshCw,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/viaggiotravel",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/viaggiotravel",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/viaggiotravel",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/viaggiotravel",
      label: "LinkedIn",
    },
  ];

  // UPDATED: Added policy pages
  const policyLinks = [
    { href: "/about", label: "About Us", icon: Users },
    { href: "/privacy-policy", label: "Privacy Policy", icon: Shield },
    { href: "/booking-policy", label: "Booking Policy", icon: FileText },
    { href: "/terms-conditions", label: "Terms & Conditions", icon: Scale },
    { href: "/cancellation-refunds", label: "Refund Policy", icon: RefreshCw },
  ];

  const contactInfo = [
    { icon: Phone, text: "+91 123 456 7890", href: "tel:+911234567890" },
    { icon: Mail, text: "info@viaggio.com", href: "mailto:info@viaggio.com" },
    {
      icon: MapPin,
      text: "123 Travel Street, Mumbai, India",
      href: "https://maps.google.com",
    },
  ];

  const trustBadges = [
    { icon: Shield, text: "Secure Payments" },
    { icon: Award, text: "Award Winning" },
    { icon: Users, text: "10K+ Travelers" },
    { icon: Globe, text: "500+ Destinations" },
  ];

  // UPDATED: Moved popular destinations to inline format
  const popularDestinations = [
    "Santorini",
    "Kashmir",
    "Cappadocia",
    "London",
    "New York",
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--footer-bg))] to-[hsl(var(--footer-bg)/0.9)]">
      {/* Enhanced wave decoration */}
      <div className="w-full h-20 overflow-hidden absolute top-0 left-0 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full translate-y-[-60%]"
        >
          <path
            fill="hsl(var(--background))"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,144C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-20 right-16 w-80 h-80 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-15 animate-pulse" />
        <div
          className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-8 animate-pulse"
          style={{ animationDelay: "4s", transform: "translate(-50%, -50%)" }}
        />
      </div>
      <div className="relative z-20 container mx-auto px-6 md:px-12 pt-32 pb-8">
        {/* UPDATED: Main footer content with new grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Enhanced Logo and About Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center mr-4 shadow-lg">
                <Globe className="text-white" size={24} />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Viagio
              </p>
            </div>
            <p className="text-white/80 leading-relaxed text-base">
              Discover breathtaking destinations around the world with our
              expert-guided adventures and personalized travel experiences that
              create memories for a lifetime.
            </p>
            {/* Enhanced social media icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[hsl(var(--accent))] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[hsl(var(--accent))]/30"
                >
                  <social.icon
                    size={20}
                    className="text-white group-hover:text-white transition-colors"
                  />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-white/70 text-sm animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <badge.icon size={14} className="text-[hsl(var(--accent))]" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
            {/* UPDATED: Inline popular destinations */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-white/90 mb-3">
                Popular Destinations:
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularDestinations.map((destination, index) => (
                  <Link
                    key={destination}
                    href={`/destinations?search=${encodeURIComponent(
                      destination
                    )}`}
                    className="text-xs px-3 py-1 bg-white/10 hover:bg-[hsl(var(--accent))]/20 text-white/70 hover:text-[hsl(var(--accent))] rounded-full border border-white/20 hover:border-[hsl(var(--accent))]/30 transition-all duration-300"
                  >
                    {destination}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Enhanced Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {publicNavLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <SmartLink
                    href={link.href}
                    className="group text-white/80 hover:text-[hsl(var(--accent))] transition-all duration-300 flex items-center gap-2 hover:translate-x-1"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
          {/* NEW: Legal & Policies Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Legal & Policies
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {policyLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    href={link.href}
                    className="group text-white/80 hover:text-[hsl(var(--accent))] transition-all duration-300 flex items-center gap-3 hover:translate-x-1"
                    aria-label="various policy links"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(var(--accent))]/20 group-hover:border-[hsl(var(--accent))]/30 transition-all duration-300">
                      <link.icon
                        size={14}
                        className="text-[hsl(var(--accent))]"
                      />
                    </div>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Enhanced Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li
                  key={item.text}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-start gap-4 text-white/80 hover:text-[hsl(var(--accent))] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-[hsl(var(--accent))]/20 group-hover:border-[hsl(var(--accent))]/30 transition-all duration-300">
                      <item.icon
                        size={16}
                        className="text-[hsl(var(--accent))]"
                      />
                    </div>
                    <span className="leading-relaxed">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Enhanced Newsletter Section */}
        <div className="relative mb-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
            {/* Decorative gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-30 -z-10" />
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center shadow-lg">
                    <Send size={20} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    Subscribe to Our Newsletter
                  </h4>
                </div>
                <p className="text-white/80 text-lg max-w-md">
                  Get exclusive travel deals, destination guides, and insider
                  tips delivered to your inbox
                </p>
              </div>
              <div className="w-full lg:w-auto">
                <form className="flex flex-col sm:flex-row gap-3 max-w-md lg:max-w-none">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-xl px-6 py-4 focus:outline-none focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent))]/20 placeholder:text-white/60 transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[hsl(var(--accent))]/30 hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    {/* Button shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">Subscribe</span>
                    <ArrowRight
                      size={16}
                      className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </form>
                <p className="text-white/60 text-sm mt-3 text-center lg:text-left">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* UPDATED: Enhanced Copyright Section with cleaner policy links */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-white/70">
              <p className="text-center sm:text-left">
                © {currentYear} Viagio. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy-policy"
                  className="hover:text-[hsl(var(--accent))] transition-colors duration-300"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms-conditions"
                  className="hover:text-[hsl(var(--accent))] transition-colors duration-300"
                >
                  Terms
                </Link>
                <Link
                  href="/refund-policy"
                  className="hover:text-[hsl(var(--accent))] transition-colors duration-300"
                >
                  Refunds
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/70 text-sm">Made with</span>
              <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs" aria-label="heart button">
                  ♥
                </span>
              </div>
              <span className="text-white/70 text-sm">in India</span>
            </div>
          </div>
        </div>
      </div>
      {/* Additional floating decorative elements */}
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-10 animate-float" />
      <div className="absolute top-1/3 left-8 w-16 h-16 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-15 animate-float-slow" />
    </footer>
  );
};

export default Footer;
