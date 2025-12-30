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
      animation={{
        type: "slide",
        direction: "up",
        duration: 0.4,
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
      className="relative w-full py-12 md:py-20 lg:py-24 bg-gradient-to-b from-slate-100/50 to-slate-50 overflow-hidden"
    >
      <aside
        className="absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute top-2 right-2 sm:top-10 sm:right-10 w-20 h-20 sm:w-64 sm:h-64 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-5 animate-pulse-custom" />
        <div className="absolute bottom-2 left-2 sm:bottom-10 sm:left-10 w-24 h-24 sm:w-80 sm:h-80 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-8 delay-300 animate-pulse-custom" />
      </aside>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-16 md:space-y-24 overflow-hidden">
        <section
          aria-labelledby="certifications-heading"
          className="space-y-8 md:space-y-12"
        >
          <header
            id="certifications-heading"
            className="text-center space-y-3 md:space-y-4 px-2 py-2"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Certified & Trusted
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Our certifications and partnerships ensure you receive the highest
              quality travel experiences
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-8 pt-4">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <MotionSection
                  key={cert.title}
                  animation={{
                    type: "slide",
                    direction: "down",
                    duration: 1.0,
                    delay: 0.2 + index * 0.1,
                    ease: "easeOut",
                  }}
                  mobile={{
                    simpleAnimation: "fade",
                    disableAnimations: false,
                  }}
                  triggerOnce={true}
                  threshold={0.3}
                  className="text-center p-6 md:p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <figure className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="text-white" size={20} />
                  </figure>
                  <div className="space-y-2">
                    <span className="bg-[hsl(var(--accent))] text-white text-xs px-2.5 py-1 rounded-full inline-block font-semibold tracking-wide">
                      {cert.badge}
                    </span>
                    <h3 className="font-bold text-foreground text-base md:text-lg leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
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
            delay: 0.3,
            ease: "easeOut",
          }}
          mobile={{
            simpleAnimation: "fade",
            disableAnimations: false,
          }}
          triggerOnce={true}
          threshold={0.3}
          aria-labelledby="guarantees-heading"
          className="bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl p-6 md:p-10 lg:p-12 relative"
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
              borderRadius: "inherit",
              filter: "blur(8px)",
              opacity: 0.2,
              zIndex: -10,
              pointerEvents: "none",
            }}
          />

          <header className="text-center mb-8 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-3">
              Our Promise to You
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2 leading-relaxed">
              We stand behind every booking with comprehensive guarantees that
              protect your investment and ensure satisfaction
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon;
              return (
                <article
                  key={guarantee.title}
                  className="text-center space-y-3 md:space-y-4 animate-fade-in px-2"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <figure className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
                    <IconComponent className="text-white" size={20} />
                  </figure>

                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground text-base md:text-lg px-1 leading-tight">
                      {guarantee.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {guarantee.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </MotionSection>

        <footer
          className="text-center py-4 md:py-8"
          aria-label="Trust statement"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-[hsl(var(--primary))]/5 backdrop-blur-md rounded-full px-6 py-4 border border-[hsl(var(--primary))]/10">
            <div className="flex items-center gap-2">
              <Shield className="text-[hsl(var(--primary))]" size={16} />
              <p className="text-foreground font-semibold text-sm md:text-base text-center">
                Trusted by 10,000+ travelers worldwide since 2019
              </p>
            </div>
            <Star
              className="hidden sm:block text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
              size={14}
            />
          </div>
        </footer>
      </main>
    </MotionSection>
  );
};

export default TrustIndicators;
