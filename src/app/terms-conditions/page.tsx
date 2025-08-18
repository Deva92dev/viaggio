import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Scale,
  Shield,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Phone,
  Mail,
  Gavel,
  BookOpen,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import Script from "next/script";
import { BASE_URL, buildWebPage } from "@/utils/schema";

export const metadata: Metadata = {
  title: "Terms & Conditions - Legal Agreement | Viagio",
  description:
    "Read Viagio's complete terms and conditions covering user rights, responsibilities, and legal agreements for using our travel services.",
  keywords: [
    "terms and conditions",
    "legal terms",
    "user agreement",
    "terms of service",
    "Viagio terms",
  ],
  alternates: {
    canonical: "/terms-conditions",
  },
};

export default function TermsConditionsPage() {
  const lastUpdated = "December 15, 2024";
  const effectiveDate = "January 1, 2024";

  const keyTerms = [
    {
      icon: FileText,
      title: "Binding Agreement",
      description:
        "These terms constitute a legally binding agreement between you and Viagio.",
    },
    {
      icon: Shield,
      title: "Service Protection",
      description:
        "Clear guidelines on service delivery, quality standards, and customer protection.",
    },
    {
      icon: Users,
      title: "User Responsibilities",
      description:
        "Your obligations and responsibilities when using our travel services.",
    },
    {
      icon: Globe,
      title: "International Travel",
      description:
        "Terms covering international bookings, visa requirements, and travel regulations.",
    },
  ];

  const prohibitedActivities = [
    "Using our services for illegal activities or fraudulent bookings",
    "Attempting to circumvent our security measures or payment systems",
    "Providing false information during booking process",
    "Reselling our services without written authorization",
    "Using automated systems to make bookings or access our platform",
    "Violating intellectual property rights or terms of use",
  ];

  const liabilityLimitations = [
    {
      category: "Service Interruptions",
      description:
        "We are not liable for temporary service interruptions due to maintenance or technical issues.",
      icon: AlertTriangle,
    },
    {
      category: "Third-Party Services",
      description:
        "Limited liability for services provided by hotels, airlines, or other travel partners.",
      icon: Users,
    },
    {
      category: "Force Majeure",
      description:
        "No liability for events beyond our control including natural disasters or political events.",
      icon: Globe,
    },
    {
      category: "Consequential Damages",
      description:
        "Liability limited to direct damages; excludes indirect or consequential losses.",
      icon: Scale,
    },
  ];

  const termsSchema = buildWebPage(
    "About Viagio's Terms and conditions policy",
    `${BASE_URL}/about`,
    "How are the terms and conditions at Viaggio"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [termsSchema],
  };

  return (
    <>
      <Script
        id="privacy-policy-site-schema"
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
            alt="Terms and Conditions"
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
                    Legal Agreement
                  </span>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/30">
                    <Scale
                      size={12}
                      className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] sm:w-3.5 sm:h-3.5"
                    />
                    <span>Fair & Transparent</span>
                  </div>
                </div>
                {/* Enhanced title */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 shadow-text leading-tight animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  Terms &{" "}
                  <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Conditions
                  </span>
                </h1>
                <p
                  className="text-white/90 text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl leading-relaxed drop-shadow-md animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  Clear, fair terms that govern your use of Viaggio travel
                  services and protect both travelers and our platform.
                </p>
                {/* Date information */}
                <div
                  className="flex flex-col sm:flex-row gap-4 text-white/80 animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span className="text-sm">Last updated: {lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} />
                    <span className="text-sm">Effective: {effectiveDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Key Terms Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-4">
                Key Terms Overview
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                Essential terms that define our relationship and service
                commitment
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {keyTerms.map((term, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <term.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">
                    {term.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {term.description}
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
                {/* Acceptance of Terms */}
                <section id="acceptance" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <UserCheck size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Acceptance of Terms
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-4 leading-relaxed">
                      By accessing or using Viaggio services, you agree to be
                      bound by these Terms and Conditions. If you do not agree
                      to these terms, please do not use our services.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-[hsl(var(--primary))] p-4 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Gavel
                          size={16}
                          className="text-[hsl(var(--primary))]"
                        />
                        <span className="font-semibold text-[hsl(var(--primary))]">
                          Legal Binding
                        </span>
                      </div>
                      <p className="text-[hsl(var(--primary))] text-sm">
                        These terms constitute a legally binding agreement. By
                        making a booking or using our services, you acknowledge
                        that you have read, understood, and agreed to these
                        terms.
                      </p>
                    </div>
                  </div>
                </section>
                {/* Service Description */}
                <section id="services" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Globe size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Our Services
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      Viagio provides comprehensive travel services including
                      but not limited to:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Destination booking and reservation services",
                        "Hotel and accommodation arrangements",
                        "Activity and experience bookings",
                        "Travel planning and itinerary creation",
                        "Customer support and travel assistance",
                        "Travel documentation and confirmation services",
                      ].map((service, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))] mt-1 flex-shrink-0"
                          />
                          <span className="text-sm text-[hsl(var(--muted-foreground))]">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                {/* User Obligations */}
                <section id="user-obligations" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Users size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      User Obligations
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Account Responsibility
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mb-3">
                          You are responsible for maintaining the
                          confidentiality of your account information and for
                          all activities that occur under your account.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Accurate Information
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mb-3">
                          You must provide accurate, complete, and current
                          information when making bookings or using our
                          services.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Travel Documents
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mb-3">
                          You are responsible for ensuring you have valid
                          passports, visas, and other required travel documents.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Payment Obligations
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          You agree to pay all charges associated with your
                          bookings and acknowledge that prices may change based
                          on availability.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Prohibited Activities */}
                <section id="prohibited-activities" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <XCircle size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Prohibited Activities
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      The following activities are strictly prohibited when
                      using our services:
                    </p>

                    <div className="space-y-3">
                      {prohibitedActivities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500"
                        >
                          <XCircle
                            size={16}
                            className="text-red-500 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-sm text-red-700">
                            {activity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-6 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-amber-600" />
                        <span className="font-semibold text-amber-800">
                          Violation Consequences
                        </span>
                      </div>
                      <p className="text-amber-700 text-sm">
                        Violations of these prohibitions may result in immediate
                        account suspension, booking cancellation, and legal
                        action where applicable.
                      </p>
                    </div>
                  </div>
                </section>
                {/* Payment Terms */}
                <section id="payment-terms" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <CreditCard size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Payment Terms
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
                          Payment Processing
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pl-6">
                          All payments are processed securely through encrypted
                          payment gateways. Payment confirmation is required to
                          complete bookings.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Pricing and Availability
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pl-6">
                          Prices are subject to change based on availability,
                          seasonality, and market conditions. Final prices are
                          confirmed at booking.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Currency and Taxes
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pl-6">
                          All prices are displayed in USD unless otherwise
                          specified. Applicable taxes and fees are included in
                          the final price.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Payment Disputes
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pl-6">
                          Payment disputes must be reported within 60 days of
                          the transaction. We work with customers to resolve
                          payment issues fairly.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Limitation of Liability */}
                <section id="liability" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Scale size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Limitation of Liability
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      Our liability is limited in the following circumstances:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {liabilityLimitations.map((limitation, index) => (
                        <div
                          key={index}
                          className="border border-[hsl(var(--border))] rounded-xl p-4"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <limitation.icon
                              size={20}
                              className="text-[hsl(var(--primary))]"
                            />
                            <h3 className="font-semibold text-[hsl(var(--foreground))]">
                              {limitation.category}
                            </h3>
                          </div>
                          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                            {limitation.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-6 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={16} className="text-orange-600" />
                        <span className="font-semibold text-orange-800">
                          Maximum Liability
                        </span>
                      </div>
                      <p className="text-orange-700 text-sm">
                        In no event shall our total liability exceed the amount
                        paid by you for the specific service in question.
                      </p>
                    </div>
                  </div>
                </section>
                {/* Governing Law */}
                <section id="governing-law" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Gavel size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Governing Law & Disputes
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Governing Law
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          These terms are governed by and construed in
                          accordance with the laws of [Jurisdiction], without
                          regard to conflict of law principles.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Dispute Resolution
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          We encourage resolving disputes through direct
                          communication. If resolution cannot be reached,
                          disputes will be resolved through binding arbitration.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                          Jurisdiction
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          Any legal proceedings shall be conducted in the
                          appropriate courts of [Jurisdiction], and you consent
                          to the jurisdiction of such courts.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Contact Information */}
                <section id="contact-legal" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <BookOpen size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Legal Contact
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      For legal inquiries, terms clarification, or compliance
                      matters, please contact our legal team.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <Mail
                          className="text-[hsl(var(--primary))] mt-1"
                          size={20}
                        />
                        <div>
                          <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">
                            Legal Email
                          </h3>
                          <p className="text-[hsl(var(--muted-foreground))]">
                            legal@viagio.com
                          </p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                            Response within 5 business days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone
                          className="text-[hsl(var(--accent))] mt-1"
                          size={20}
                        />
                        <div>
                          <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">
                            Legal Department
                          </h3>
                          <p className="text-[hsl(var(--muted-foreground))]">
                            +1 (555) 123-LEGAL
                          </p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                            Mon-Fri, 9AM-5PM EST
                          </p>
                        </div>
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
              <Scale className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 text-[hsl(var(--accent))]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8">
                Fair Terms, Great Travel
              </h2>
              <p className="text-xl sm:text-2xl mb-8 sm:mb-10 opacity-90">
                Our transparent terms ensure a secure and enjoyable travel
                experience for everyone
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/destinations"
                  className="inline-flex items-center justify-center
               btn-accent px-8 py-4 text-lg shadow-2xl
               transition-all duration-300 hover:scale-105
               bg-[hsl(var(--accent))]
               text-[hsl(var(--accent-foreground))]
               hover:bg-[hsl(var(--accent)/0.9)]
               rounded-[var(--radius)] font-semibold
               min-w-[110px]"
                >
                  Start Booking
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center
               px-8 py-4 text-lg border-2 border-white text-white
               transition-all duration-300
               hover:bg-white hover:text-[hsl(var(--primary))]
               rounded-[var(--radius)] font-semibold
               min-w-[110px]"
                >
                  Legal Questions
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
