import Link from "next/link";
import Image from "next/image";
import {
  RefreshCw,
  Clock,
  DollarSign,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plane,
  Hotel,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Users,
  MapPin,
  Zap,
  Heart,
} from "lucide-react";

export default function RefundCancellationPage() {
  const lastUpdated = "December 15, 2024";

  const policyHighlights = [
    {
      icon: Clock,
      title: "Flexible Timing",
      description:
        "Cancel up to 48 hours before travel for full refunds on most bookings.",
    },
    {
      icon: DollarSign,
      title: "Fair Refunds",
      description:
        "Transparent refund structure with no hidden fees or surprise charges.",
    },
    {
      icon: Shield,
      title: "Protected Bookings",
      description:
        "Travel insurance options and protection against unforeseen circumstances.",
    },
    {
      icon: RefreshCw,
      title: "Easy Process",
      description:
        "Simple online cancellation process with instant confirmation and updates.",
    },
  ];

  const refundTiers = [
    {
      timeframe: "48+ Hours Before Travel",
      refundAmount: "100% Refund",
      processingTime: "3-5 Business Days",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
    },
    {
      timeframe: "24-48 Hours Before",
      refundAmount: "75% Refund",
      processingTime: "3-7 Business Days",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-500",
    },
    {
      timeframe: "Less than 24 Hours",
      refundAmount: "50% Refund",
      processingTime: "5-10 Business Days",
      icon: XCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
    },
    {
      timeframe: "No-Show",
      refundAmount: "No Refund",
      processingTime: "N/A",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
    },
  ];

  const serviceTypes = [
    {
      service: "Hotel Bookings",
      cancellationRules: [
        "Free cancellation up to 48 hours before check-in",
        "24-hour cancellation fee: 1 night charge",
        "Same-day cancellation: Full booking amount",
      ],
      icon: Hotel,
      refundTime: "3-5 business days",
    },
    {
      service: "Flight Bookings",
      cancellationRules: [
        "Airline-specific cancellation policies apply",
        "Refundable tickets: Full refund minus processing fee",
        "Non-refundable tickets: Credit for future travel",
      ],
      icon: Plane,
      refundTime: "7-14 business days",
    },
    {
      service: "Activity Packages",
      cancellationRules: [
        "48-hour free cancellation policy",
        "Weather-related cancellations: Full refund",
        "Last-minute cancellation: 50% refund",
      ],
      icon: MapPin,
      refundTime: "3-7 business days",
    },
  ];

  const specialCircumstances = [
    {
      title: "Medical Emergencies",
      description: "Full refund with medical documentation",
      requirements: "Medical certificate from licensed physician",
      processing: "5-7 business days",
      icon: Heart,
    },
    {
      title: "Force Majeure",
      description: "100% refund or travel credit",
      requirements: "Official government travel advisory",
      processing: "3-5 business days",
      icon: Shield,
    },
    {
      title: "Travel Restrictions",
      description: "Full refund or rebooking options",
      requirements: "Valid visa denial or restriction notice",
      processing: "7-10 business days",
      icon: FileText,
    },
  ];

  return (
    <main className="relative overflow-hidden bg-[hsl(var(--background))]">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] mb-16 overflow-hidden">
        <Image
          src="/Main.jpg"
          alt="Refund and Cancellation Policy"
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
                  Flexible Policy
                </span>

                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/30">
                  <RefreshCw
                    size={12}
                    className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] sm:w-3.5 sm:h-3.5"
                  />
                  <span>Fair Refunds</span>
                </div>
              </div>

              {/* Enhanced title */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 shadow-text leading-tight animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Refund &{" "}
                <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Cancellation Policy
                </span>
              </h1>

              <p
                className="text-white/90 text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl leading-relaxed drop-shadow-md animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                Transparent, fair, and flexible refund policies designed to
                protect your travel investment with peace of mind.
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
              Refund Policy Highlights
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              Our commitment to fair and transparent refund processes for all
              travelers
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
              {/* General Refund Policy */}
              <section id="general-policy" className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                    <FileText size={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    General Refund Policy
                  </h2>
                </div>

                <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8 mb-6">
                  <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                    Our refund policy is designed to be fair and flexible while
                    protecting both travelers and service providers. Refund
                    amounts and processing times depend on when you cancel
                    relative to your travel date.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {refundTiers.map((tier, index) => (
                      <div
                        key={index}
                        className={`${tier.bgColor} border-l-4 ${tier.borderColor} rounded-r-xl p-4 transition-all duration-300 hover:shadow-lg`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <tier.icon size={20} className={tier.color} />
                          <h4 className={`font-bold ${tier.color}`}>
                            {tier.timeframe}
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                              Refund Amount:
                            </span>
                            <span className={`text-sm font-bold ${tier.color}`}>
                              {tier.refundAmount}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                              Processing Time:
                            </span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                              {tier.processingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Service-Specific Policies */}
              <section id="service-policies" className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                    <Users size={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Service-Specific Policies
                  </h2>
                </div>

                <div className="space-y-6">
                  {serviceTypes.map((service, index) => (
                    <div
                      key={index}
                      className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl flex items-center justify-center shadow-lg">
                          <service.icon size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">
                            {service.service}
                          </h3>
                          <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            Refund processing: {service.refundTime}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {service.cancellationRules.map((rule, ruleIndex) => (
                          <div
                            key={ruleIndex}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle
                              size={16}
                              className="text-[hsl(var(--accent))] mt-1 flex-shrink-0"
                            />
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                              {rule}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Cancellation Process */}
              <section id="cancellation-process" className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                    <Zap size={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    How to Cancel
                  </h2>
                </div>

                <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                  <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                    Cancelling your booking is simple and can be done through
                    multiple channels:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                        Online Cancellation
                      </h4>
                      <div className="space-y-3">
                        {[
                          "Log in to your Viagio account",
                          "Navigate to 'My Bookings' section",
                          "Select the booking to cancel",
                          "Click 'Cancel Booking' and confirm",
                          "Receive instant cancellation confirmation",
                        ].map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[hsl(var(--primary))] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                        Contact Methods
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-[hsl(var(--features-bg))] rounded-lg">
                          <Phone
                            size={16}
                            className="text-[hsl(var(--primary))] mt-1"
                          />
                          <div>
                            <span className="font-medium text-[hsl(var(--foreground))]">
                              Phone:
                            </span>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                              +1 (555) 123-CANCEL
                            </p>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                              24/7 Cancellation Hotline
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-[hsl(var(--features-bg))] rounded-lg">
                          <Mail
                            size={16}
                            className="text-[hsl(var(--accent))] mt-1"
                          />
                          <div>
                            <span className="font-medium text-[hsl(var(--foreground))]">
                              Email:
                            </span>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                              cancel@viagio.com
                            </p>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                              Response within 2 hours
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Special Circumstances */}
              <section id="special-circumstances" className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                    <Shield size={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Special Circumstances
                  </h2>
                </div>

                <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                  <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                    We understand that unforeseen circumstances can affect
                    travel plans. Special refund conditions apply in the
                    following situations:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {specialCircumstances.map((circumstance, index) => (
                      <div
                        key={index}
                        className="border border-[hsl(var(--border))] rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-center mb-4">
                          <circumstance.icon
                            size={32}
                            className="text-[hsl(var(--primary))] mx-auto mb-2"
                          />
                          <h4 className="font-bold text-[hsl(var(--foreground))] mb-1">
                            {circumstance.title}
                          </h4>
                          <p className="text-sm font-medium text-[hsl(var(--accent))]">
                            {circumstance.description}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-[hsl(var(--foreground))]">
                              Requirements:
                            </span>
                            <p className="text-[hsl(var(--muted-foreground))]">
                              {circumstance.requirements}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-[hsl(var(--foreground))]">
                              Processing:
                            </span>
                            <p className="text-[hsl(var(--muted-foreground))]">
                              {circumstance.processing}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Refund Processing */}
              <section id="refund-processing" className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                    <CreditCard size={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Refund Processing
                  </h2>
                </div>

                <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                        <CheckCircle
                          size={16}
                          className="text-[hsl(var(--accent))]"
                        />
                        Refund Method
                      </h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pl-6">
                        Refunds are processed back to your original payment
                        method. Credit card refunds appear as credits on your
                        statement within the specified timeframe.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                        <CheckCircle
                          size={16}
                          className="text-[hsl(var(--accent))]"
                        />
                        Processing Timeline
                      </h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pl-6">
                        Processing times vary by payment method and financial
                        institution. Bank transfers may take longer than credit
                        card refunds during peak periods.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                        <CheckCircle
                          size={16}
                          className="text-[hsl(var(--accent))]"
                        />
                        Refund Confirmation
                      </h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pl-6">
                        You will receive email confirmation when your refund is
                        processed, including transaction details and expected
                        arrival timeframes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                        <CheckCircle
                          size={16}
                          className="text-[hsl(var(--accent))]"
                        />
                        Travel Credits
                      </h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pl-6">
                        In some cases, we may offer travel credits as an
                        alternative to cash refunds. Credits never expire and
                        can be used for any future booking.
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="font-semibold text-green-800">
                        Guaranteed Processing
                      </span>
                    </div>
                    <p className="text-green-700 text-sm">
                      We guarantee all approved refunds will be processed within
                      the stated timeframe. If you don not receive your refund
                      on time, contact us for immediate assistance.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Support */}
              <section id="refund-support" className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                    <Users size={16} className="text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Refund Support Team
                  </h2>
                </div>

                <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8">
                  <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                    Our dedicated refund support team is here to help with
                    cancellations, refund status, and any questions about our
                    policies.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Phone
                        className="text-[hsl(var(--primary))] mx-auto mb-3"
                        size={24}
                      />
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                        Refund Hotline
                      </h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        +1 (555) 123-REFUND
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        24/7 Priority Support
                      </p>
                    </div>

                    <div className="text-center">
                      <Mail
                        className="text-[hsl(var(--accent))] mx-auto mb-3"
                        size={24}
                      />
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                        Refund Email
                      </h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        refunds@viagio.com
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        Response within 1 hour
                      </p>
                    </div>

                    <div className="text-center">
                      <RefreshCw
                        className="text-[hsl(var(--primary))] mx-auto mb-3"
                        size={24}
                      />
                      <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                        Status Tracker
                      </h4>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        Online portal available
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        Real-time refund updates
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
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 text-[hsl(var(--accent))]" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8">
              Book with Confidence
            </h2>
            <p className="text-xl sm:text-2xl mb-8 sm:mb-10 opacity-90">
              Our flexible refund policy ensures your peace of mind when
              planning your next adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/destinations">
                <button className="btn-accent px-8 py-4 text-lg shadow-2xl hover:scale-105 transition-all duration-300 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))/0.9] hover:text-[hsl(var(--accent-foreground))] rounded-[var(--radius)] font-semibold min-w-[110px]">
                  Book Your Trip
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 text-lg border-white border-2 text-white hover:bg-white hover:text-[hsl(var(--primary))] transition-all duration-300 rounded-[var(--radius)] font-semibold min-w-[110px]">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
