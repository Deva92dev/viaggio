import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  CreditCard,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Phone,
  Mail,
  FileText,
  Users,
  MapPin,
  Plane,
} from "lucide-react";
import { BASE_URL, buildWebPage } from "@/utils/schema";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Booking Policy - Terms & Conditions | Viagio",
  description:
    "Read Viagio's comprehensive booking policy covering reservations, payments, modifications, and cancellations for all travel services.",
  keywords: [
    "booking policy",
    "reservation terms",
    "payment policy",
    "booking conditions",
    "Viagio policy",
  ],
  alternates: {
    canonical: "/booking-policy",
  },
};

export default function BookingPolicyPage() {
  const lastUpdated = "December 15, 2024";

  const policyHighlights = [
    {
      icon: Calendar,
      title: "Flexible Booking",
      description:
        "Book now, modify later with our flexible booking options and easy date changes.",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description:
        "Your payment information is protected with bank-level encryption and security.",
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      description:
        "Receive immediate booking confirmation via email with all your travel details.",
    },
    {
      icon: RefreshCw,
      title: "Easy Modifications",
      description:
        "Change dates, upgrade rooms, or modify your itinerary with just a few clicks.",
    },
  ];

  const bookingSteps = [
    {
      step: "1",
      title: "Select Your Experience",
      description:
        "Browse destinations, choose dates, and customize your perfect travel package.",
    },
    {
      step: "2",
      title: "Review & Customize",
      description:
        "Review your selection, add extras, and personalize your travel preferences.",
    },
    {
      step: "3",
      title: "Secure Payment",
      description:
        "Complete your booking with secure payment processing and instant confirmation.",
    },
    {
      step: "4",
      title: "Travel Preparation",
      description:
        "Receive travel documents, itineraries, and pre-departure information.",
    },
  ];

  const paymentMethods = [
    { name: "Credit Cards", details: "Visa, Mastercard, American Express" },
    { name: "Debit Cards", details: "Major debit cards accepted worldwide" },
    { name: "Stripe", details: "Secure PayPal transactions" },
    {
      name: "Bank Transfer",
      details: "Direct bank transfers for large bookings",
    },
  ];

  const cancellationTiers = [
    {
      period: "48+ Hours Before",
      fee: "No Charge",
      icon: CheckCircle,
      color: "text-green-700",
    },
    {
      period: "24-48 Hours Before",
      fee: "25% Fee",
      icon: AlertTriangle,
      color: "text-yellow-800",
    },
    {
      period: "Less than 24 Hours",
      fee: "50% Fee",
      icon: XCircle,
      color: "text-red-700",
    },
  ];

  const bookingPolicySchema = buildWebPage(
    "About Viagio's booking policy",
    `${BASE_URL}/about`,
    "Learn about Viagio's booking policy"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [bookingPolicySchema],
  };

  return (
    <>
      <Script
        id="booking-policy-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="relative overflow-hidden bg-[hsl(var(--background))]">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] min-h-[400px] mb-16 overflow-hidden">
          <Image
            src="/Main.jpg"
            alt="Booking and Reservations"
            width={1920}
            height={800}
            priority
            sizes="100vw"
            className="object-cover absolute inset-0 w-full h-full"
          />
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.4] via-transparent to-[hsl(var(--accent))/0.2] z-10" />
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center z-20 pt-16 sm:pt-20 md:pt-24 lg:pt-16">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="max-w-4xl w-full">
                {/* Enhanced badges */}
                <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 w-full relative z-30 mt-4 sm:mt-6 md:mt-8 animate-fade-in">
                  <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold shadow-lg">
                    Secure Booking
                  </span>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/30">
                    <Calendar
                      size={12}
                      className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] sm:w-3.5 sm:h-3.5"
                    />
                    <span>Flexible Reservations</span>
                  </div>
                </div>
                {/* Enhanced title */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 shadow-text leading-tight animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  Booking &
                  <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Reservation Policy
                  </span>
                </h1>
                <p
                  className="text-white/90 text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl leading-relaxed drop-shadow-md animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  Everything you need to know about booking, modifying, and
                  managing your travel reservations with Viagio.
                </p>
                {/* Last updated info */}
                <div
                  className="flex items-center gap-2 text-white/80 animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Clock size={16} />
                  <span className="text-sm">Last updated: {lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Policy Highlights Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-4">
                Booking Made Simple
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                Our commitment to hassle-free booking and flexible travel
                planning
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {policyHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <highlight.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Main Content */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {/* Booking Process */}
                <section id="booking-process" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <FileText size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      How to Book
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8 mb-6">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      Booking your dream vacation with Viagio is simple and
                      secure. Follow these easy steps:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {bookingSteps.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {step.step}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                              {step.title}
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                {/* Payment Methods */}
                <section id="payment-methods" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <CreditCard size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Payment Methods
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      We accept multiple secure payment methods for your
                      convenience:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-[hsl(var(--features-bg))] rounded-xl"
                        >
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))] mt-1 flex-shrink-0"
                          />
                          <div>
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">
                              {method.name}
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                              {method.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 border-l-4 border-[hsl(var(--primary))] p-4 mt-6 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield
                          size={16}
                          className="text-[hsl(var(--primary))]"
                        />
                        <span className="font-semibold text-[hsl(var(--primary))]">
                          Security Guarantee
                        </span>
                      </div>
                      <p className="text-[hsl(var(--primary))] text-sm">
                        All payments are processed through secure, encrypted
                        channels. We never store your complete payment
                        information.
                      </p>
                    </div>
                  </div>
                </section>
                {/* Booking Confirmation */}
                <section id="booking-confirmation" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Mail size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Booking Confirmation
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Instant Confirmation
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed pl-6">
                          Receive immediate email confirmation with your booking
                          reference, itinerary details, and payment receipt.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <FileText
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Travel Documents
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed pl-6">
                          Digital travel documents, vouchers, and detailed
                          itineraries sent to your email within 24 hours.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <Phone
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Pre-Departure Contact
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed pl-6">
                          Our travel team will contact you 72 hours before
                          departure with final details and any important
                          updates.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Modification & Cancellation Policy */}
                <section
                  id="modification-cancellation"
                  className="animate-fade-in"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <RefreshCw size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Modification & Cancellation
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <div className="mb-6">
                      <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4">
                        Modification Options
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))] mt-1 flex-shrink-0"
                          />
                          <div>
                            <span className="font-medium text-[hsl(var(--foreground))]">
                              Date Changes:
                            </span>
                            <span className="text-[hsl(var(--muted-foreground))] ml-2">
                              Free modifications up to 7 days before travel
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))] mt-1 flex-shrink-0"
                          />
                          <div>
                            <span className="font-medium text-[hsl(var(--foreground))]">
                              Room Upgrades:
                            </span>
                            <span className="text-[hsl(var(--muted-foreground))] ml-2">
                              Subject to availability, price difference applies
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))] mt-1 flex-shrink-0"
                          />
                          <div>
                            <span className="font-medium text-[hsl(var(--foreground))]">
                              Additional Services:
                            </span>
                            <span className="text-[hsl(var(--muted-foreground))] ml-2">
                              Add activities, transfers, or meals anytime
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="font-semibold text-[hsl(var(--foreground))] mb-4">
                        Cancellation Fees
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {cancellationTiers.map((tier, index) => (
                          <div
                            key={index}
                            className="text-center p-4 bg-[hsl(var(--features-bg))] rounded-xl"
                          >
                            <tier.icon
                              size={24}
                              className={`${tier.color} mx-auto mb-2`}
                            />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">
                              {tier.period}
                            </h3>
                            <p className={`text-sm font-medium ${tier.color}`}>
                              {tier.fee}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                {/* Special Circumstances */}
                <section id="special-circumstances" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <AlertTriangle size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Special Circumstances
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Force Majeure Events
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          In case of natural disasters, political unrest,
                          pandemics, or other force majeure events, we offer
                          full refunds or free rebooking for affected travelers.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Medical Emergencies
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          Cancellations due to serious illness or medical
                          emergencies (with medical certificate) are eligible
                          for full refund or credit for future travel.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Travel Insurance
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          We strongly recommend purchasing travel insurance for
                          additional protection against unforeseen circumstances
                          and trip interruptions.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Contact Information */}
                <section
                  id="contact-booking-support"
                  className="animate-fade-in"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Users size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Booking Support
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      Need help with your booking or have questions? Our
                      dedicated booking team is here to assist you.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <Phone
                          className="text-[hsl(var(--primary))] mx-auto mb-3"
                          size={24}
                        />
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                          Phone Support
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">
                          +1 (555) 123-BOOK
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                          24/7 Emergency Line
                        </p>
                      </div>
                      <div className="text-center">
                        <Mail
                          className="text-[hsl(var(--accent))] mx-auto mb-3"
                          size={24}
                        />
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                          Email Support
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">
                          bookings@viagio.com
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                          Response within 2 hours
                        </p>
                      </div>
                      <div className="text-center">
                        <MapPin
                          className="text-[hsl(var(--primary))] mx-auto mb-3"
                          size={24}
                        />
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                          Live Chat
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">
                          Available on website
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                          Mon-Sun, 6AM-11PM EST
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 text-center">
            <div className="max-w-3xl mx-auto">
              <Plane className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 text-[hsl(var(--accent))]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8">
                Ready to Book Your Adventure?
              </h2>
              <p className="text-xl sm:text-2xl mb-8 sm:mb-10 opacity-90">
                Start planning your perfect getaway with our secure and flexible
                booking system
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/destinations">
                  <button className="btn-accent px-8 py-4 text-lg shadow-2xl hover:scale-105 transition-all duration-300 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))/0.9] hover:text-[hsl(var(--accent-foreground))] rounded-[var(--radius)] font-semibold min-w-[110px]">
                    Browse Destinations
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 text-lg border-white border-2 text-white hover:bg-white hover:text-[hsl(var(--primary))] transition-all duration-300 rounded-[var(--radius)] font-semibold min-w-[110px]">
                    Contact Booking Team
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
