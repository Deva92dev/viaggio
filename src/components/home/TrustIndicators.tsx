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
import dynamic from "next/dynamic";

const MotionSection = dynamic(() => import("./MotionSection"), {
  loading: () => <div className="opacity-0" />,
});

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
      parallax={{
        speed: 20,
        direction: "up",
        range: [0, 0.5],
      }}
      animation={{
        type: "slide",
        direction: "up",
        duration: 0.7,
        delay: 0.1,
        ease: "easeOut",
      }}
      mobile={{
        disableParallax: true,
        disableAnimations: false,
        simpleAnimation: "fade",
        breakPoint: 768,
        reducedMotion: true,
      }}
      triggerOnce={true}
      threshold={0.3}
      overflow={false}
      className="relative w-full py-6 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-100/50 to-slate-50 overflow-hidden"
    >
      {/* Background decorative elements  */}
      <aside
        className="absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute top-2 right-2 sm:top-10 sm:right-10 w-20 h-20 sm:w-64 sm:h-64 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-5 animate-pulse-custom" />
        <div className="absolute bottom-2 left-2 sm:bottom-10 sm:left-10 w-24 h-24 sm:w-80 sm:h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-8 delay-300 animate-pulse-custom" />
      </aside>

      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12 space-y-8 sm:space-y-12 md:space-y-16 overflow-hidden">
        <section
          aria-labelledby="certifications-heading"
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          <header
            id="certifications-heading"
            className="text-center space-y-1 sm:space-y-2 md:space-y-3 px-2"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Certified & Trusted
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Our certifications and partnerships ensure you receive the highest
              quality travel experiences
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 overflow-hidden pt-16 md:pt-2">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <MotionSection
                  key={cert.title}
                  animation={{
                    type: "slide",
                    direction: "down",
                    duration: 1.0,
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut",
                  }}
                  mobile={{
                    simpleAnimation: "fade",
                    disableAnimations: false,
                  }}
                  triggerOnce={true}
                  threshold={0.3}
                  className="text-center p-2 sm:p-3 md:p-4 lg:p-6 bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <figure className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="text-white" size={14} />
                  </figure>
                  <div className="space-y-1">
                    <span className="bg-[hsl(var(--accent))] text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full inline-block mb-1 sm:mb-2 font-semibold">
                      {cert.badge}
                    </span>
                    <h3 className="font-bold text-[hsl(var(--foreground))] text-xs sm:text-sm md:text-base mb-1 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] text-xs leading-snug px-1">
                      {cert.description}
                    </p>
                  </div>
                </MotionSection>
              );
            })}
          </div>
        </section>
        <MotionSection
          animation={{
            type: "slide",
            direction: "up",
            duration: 1.0,
            delay: 0.5,
            ease: "easeOut",
          }}
          mobile={{
            simpleAnimation: "fade",
            disableAnimations: false,
          }}
          triggerOnce={true}
          threshold={0.3}
          aria-labelledby="guarantees-heading"
          className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 relative"
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-0.125rem",
              right: "-0.125rem",
              bottom: "-0.125rem",
              left: "-0.125rem",
              backgroundImage:
                "linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
              borderRadius: "1rem",
              filter: "blur(8px)",
              opacity: 0.2,
              zIndex: -10,
              pointerEvents: "none",
            }}
          />
          <header className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-1 sm:mb-2 md:mb-3">
              Our Promise to You
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto px-2">
              We stand behind every booking with comprehensive guarantees that
              protect your investment and ensure satisfaction
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon;
              return (
                <article
                  key={guarantee.title}
                  className="text-center space-y-2 sm:space-y-3 md:space-y-4 animate-fade-in p-1 sm:p-2"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <figure className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <IconComponent className="text-white" size={16} />
                  </figure>

                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="font-bold text-[hsl(var(--foreground))] text-xs sm:text-sm md:text-base lg:text-lg px-1 leading-tight">
                      {guarantee.title}
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] text-xs sm:text-sm leading-snug px-1 sm:px-2">
                      {guarantee.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </MotionSection>
        <footer
          className="text-center py-3 sm:py-4 md:py-6 lg:py-8 px-2"
          aria-label="Trust statement"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-[hsl(var(--primary))]/10 backdrop-blur-md rounded-full px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 border border-[hsl(var(--primary))]/20 max-w-full">
            <Shield
              className="text-[hsl(var(--primary))] flex-shrink-0"
              size={14}
            />
            <p className="text-[hsl(var(--primary))] font-semibold text-xs sm:text-sm md:text-base text-center leading-tight">
              Trusted by 10,000+ travelers worldwide since 2019
            </p>
            <Star
              className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] flex-shrink-0"
              size={14}
            />
          </div>
        </footer>
      </main>
    </MotionSection>
  );
};

export default TrustIndicators;
