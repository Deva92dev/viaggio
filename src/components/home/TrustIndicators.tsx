import {
  Shield,
  Award,
  Users,
  Clock,
  Star,
  CheckCircle,
  Globe,
  Heart,
} from "lucide-react";
import MotionSection from "./MotionSection";

const TrustIndicators = () => {
  const certifications = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "256-bit SSL encryption",
      badge: "PCI Compliant",
    },
    {
      icon: Award,
      title: "Travel Excellence",
      description: "Top 1% travel company",
      badge: "2024 Winner",
    },
    {
      icon: Users,
      title: "IATA Certified",
      description: "International travel standards",
      badge: "Licensed",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance",
      badge: "Always On",
    },
  ];

  const guarantees = [
    {
      icon: CheckCircle,
      title: "Best Price Guarantee",
      description: "Find it cheaper? We'll match it + 10% off",
    },
    {
      icon: Shield,
      title: "100% Secure Booking",
      description: "Your payment and data are completely protected",
    },
    {
      icon: Heart,
      title: "Satisfaction Promise",
      description: "Not happy? Full refund within 24 hours",
    },
    {
      icon: Globe,
      title: "Worldwide Coverage",
      description: "Travel insurance included with every booking",
    },
  ];

  return (
    <MotionSection
      scrollSpeed={25}
      className="relative w-full py-16 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--features-bg))]"
    >
      {/* Subtle decorative background */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-5 animate-pulse" />
        <div
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-8 animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Certifications Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-3">
              Certified & Trusted
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto">
              Our certifications and partnerships ensure you receive the highest
              quality travel experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className="group text-center p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <cert.icon size={24} className="text-white" />
                </div>

                <div className="space-y-1">
                  <div className="bg-[hsl(var(--accent))] text-white text-xs px-2 py-1 rounded-full inline-block mb-2 font-semibold">
                    {cert.badge}
                  </div>
                  <h4 className="font-bold text-[hsl(var(--foreground))] text-sm">
                    {cert.title}
                  </h4>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
          {/* Decorative gradient border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />

          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-3">
              Our Promise to You
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-3xl mx-auto">
              We stand behind every booking with comprehensive guarantees that
              protect your investment and ensure satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                className="text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <guarantee.icon size={28} className="text-white" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[hsl(var(--foreground))] text-lg">
                    {guarantee.title}
                  </h4>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed px-2">
                    {guarantee.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Trust Statement */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3 bg-[hsl(var(--primary))]/10 backdrop-blur-md rounded-full px-8 py-4 border border-[hsl(var(--primary))]/20">
            <Shield size={20} className="text-[hsl(var(--primary))]" />
            <span className="text-[hsl(var(--primary))] font-semibold">
              Trusted by 10,000+ travelers worldwide since 2019
            </span>
            <Star
              size={20}
              className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default TrustIndicators;
