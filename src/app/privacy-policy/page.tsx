import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Lock,
  Eye,
  Mail,
  Phone,
  Clock,
  AlertCircle,
  CheckCircle,
  Globe,
  Database,
  UserCheck,
} from "lucide-react";
import { BASE_URL, buildWebPage } from "@/utils/schema";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Privacy Policy - How We Protect Your Data | Viagio",
  description:
    "Learn how Viagio collects, uses, and protects your personal information. GDPR compliant privacy policy with transparent data practices.",
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR",
    "personal information",
    "Viagio privacy",
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 15, 2024";

  const keyPoints = [
    {
      icon: Lock,
      title: "Data Encryption",
      description:
        "All your personal data is encrypted using industry-standard SSL/TLS protocols.",
    },
    {
      icon: Eye,
      title: "Transparent Collection",
      description:
        "We clearly explain what data we collect and why we need it for your travel experience.",
    },
    {
      icon: UserCheck,
      title: "Your Control",
      description:
        "You have full control over your data with options to access, modify, or delete it anytime.",
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description:
        "Your information is stored on secure servers with regular security audits and monitoring.",
    },
  ];

  const dataTypes = [
    {
      category: "Account Information",
      items: [
        "Name, email address, phone number",
        "Profile photo and preferences",
        "Account credentials and settings",
      ],
    },
    {
      category: "Booking Details",
      items: [
        "Travel dates and destinations",
        "Hotel and activity preferences",
        "Payment information (encrypted)",
        "Booking history and reviews",
      ],
    },
    {
      category: "Technical Data",
      items: [
        "IP address and device information",
        "Browser type and version",
        "Usage analytics and cookies",
        "Location data (when permitted)",
      ],
    },
    {
      category: "Communication",
      items: [
        "Email correspondence",
        "Customer support interactions",
        "Marketing preferences",
        "Feedback and survey responses",
      ],
    },
  ];

  const privacyPolicySchema = buildWebPage(
    "About Viagio's privacy policy",
    `${BASE_URL}/about`,
    "How we collect information and use them"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [privacyPolicySchema],
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
            alt="Privacy and Security"
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
                    GDPR Compliant
                  </span>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/30">
                    <Shield
                      size={12}
                      className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] sm:w-3.5 sm:h-3.5"
                    />
                    <span>Your Privacy Matters</span>
                  </div>
                </div>
                {/* Enhanced title */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 shadow-text leading-tight animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  Privacy{" "}
                  <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Policy
                  </span>
                </h1>
                <p
                  className="text-white/90 text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl leading-relaxed drop-shadow-md animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  Your trust is the foundation of our relationship. Learn how we
                  protect, use, and respect your personal information.
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
        {/* Key Points Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-4">
                Privacy at a Glance
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                Key principles that guide how we handle your personal
                information
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <point.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* FIXED: Main Content - Properly centered */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            {/* FIXED: Centered content container with max-width */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {/* Information We Collect */}
                <section
                  id="information-we-collect"
                  className="animate-fade-in"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Database size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Information We Collect
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8 mb-6">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      We collect information to provide you with the best travel
                      experiences. Here is what we gather and why:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {dataTypes.map((type, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-[hsl(var(--accent))] pl-4"
                        >
                          <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                            {type.category}
                          </h3>
                          <ul className="space-y-2">
                            {type.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]"
                              >
                                <CheckCircle
                                  size={12}
                                  className="text-[hsl(var(--accent))] mt-1 flex-shrink-0"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                {/* How We Use Your Data */}
                <section id="how-we-use-your-data" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Globe size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      How We Use Your Data
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
                          Service Delivery
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed pl-6">
                          Process bookings, manage reservations, communicate
                          important travel information, and provide customer
                          support throughout your journey.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Personalization
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed pl-6">
                          Customize your experience with personalized
                          recommendations, targeted offers, and content relevant
                          to your travel preferences.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Service Improvement
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed pl-6">
                          Analyze usage patterns to improve our platform,
                          develop new features, and enhance overall user
                          experience.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                          <CheckCircle
                            size={16}
                            className="text-[hsl(var(--accent))]"
                          />
                          Legal Compliance
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed pl-6">
                          Meet legal obligations, prevent fraud, ensure
                          security, and protect the rights and safety of our
                          users and partners.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Data Sharing */}
                <section id="data-sharing" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Shield size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Data Sharing
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={16} className="text-amber-600" />
                        <span className="font-semibold text-amber-800">
                          Important
                        </span>
                      </div>
                      <p className="text-amber-700 text-sm">
                        We never sell your personal data to third parties.
                        Sharing only occurs in specific circumstances outlined
                        below.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                          Service Partners
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          Hotels, airlines, and activity providers to complete
                          your bookings and deliver services.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                          Payment Processors
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          Secure payment gateways to process transactions
                          (payment data is encrypted and tokenized).
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                          Legal Requirements
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                          When required by law, legal process, or to protect
                          rights, safety, and security.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Your Rights */}
                <section id="your-rights" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <UserCheck size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Your Rights
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      You have complete control over your personal data. Here
                      are your rights:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          right: "Access",
                          description:
                            "Request a copy of all personal data we hold about you",
                        },
                        {
                          right: "Rectification",
                          description:
                            "Correct or update inaccurate or incomplete information",
                        },
                        {
                          right: "Erasure",
                          description:
                            "Request deletion of your personal data (right to be forgotten)",
                        },
                        {
                          right: "Portability",
                          description:
                            "Receive your data in a structured, machine-readable format",
                        },
                        {
                          right: "Restriction",
                          description:
                            "Limit how we process your personal information",
                        },
                        {
                          right: "Objection",
                          description:
                            "Object to processing based on legitimate interests or direct marketing",
                        },
                      ].map((item, index) => (
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
                              {item.right}
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                {/* Contact Section */}
                <section id="contact-us" className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <Mail size={16} className="text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Contact Our Privacy Team
                    </h2>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                    <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                      Have questions about your privacy or want to exercise your
                      rights? Our dedicated privacy team is here to help.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <Mail
                          className="text-[hsl(var(--primary))] mt-1"
                          size={20}
                        />
                        <div>
                          <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">
                            Email
                          </h3>
                          <p className="text-[hsl(var(--muted-foreground))]">
                            privacy@viagio.com
                          </p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                            Response within 48 hours
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
                            Phone
                          </h3>
                          <p className="text-[hsl(var(--muted-foreground))]">
                            +1 (555) 123-PRIVACY
                          </p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                            Mon-Fri, 9AM-6PM EST
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
              <Shield className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 text-[hsl(var(--accent))]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8">
                Your Privacy, Our Commitment
              </h2>
              <p className="text-xl sm:text-2xl mb-8 sm:mb-10 opacity-90">
                Travel with confidence knowing your data is protected every step
                of the way
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/destinations"
                  className="inline-flex items-center justify-center
               btn-accent px-8 py-6 text-lg shadow-2xl hover:scale-105
               transition-all duration-300 bg-[hsl(var(--accent))]
               text-[hsl(var(--accent-foreground))]
               hover:bg-[hsl(var(--accent))/0.9]
               rounded-[var(--radius)] font-semibold min-w-[110px]"
                >
                  Start Booking Securely
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center
               px-8 py-4 text-lg border-white border-2 text-white
               hover:bg-white hover:text-[hsl(var(--primary))]
               transition-all duration-300 rounded-[var(--radius)]
               font-semibold min-w-[110px]"
                >
                  Contact Privacy Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
