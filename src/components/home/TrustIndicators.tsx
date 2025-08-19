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
    <MotionSection scrollSpeed={25} className="trust-indicators-bg">
      {/* Background decorative elements */}
      <aside className="trust-indicators-bg-decor" aria-hidden="true">
        <div className="trust-indicators-blob-1 animate-pulse" />
        <div className="trust-indicators-blob-2 animate-pulse" />
      </aside>

      <main className="trust-indicators-content">
        {/* Certifications Section */}
        <section
          aria-labelledby="certifications-heading"
          className="trust-certifications"
        >
          <header id="certifications-heading" className="trust-section-header">
            <h2>Certified & Trusted</h2>
            <p>
              Our certifications and partnerships ensure you receive the highest
              quality travel experiences
            </p>
          </header>

          <div className="trust-certifications-grid">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <article
                  key={cert.title}
                  className="trust-certification-card group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <figure className="trust-certification-icon">
                    <IconComponent size={24} />
                  </figure>

                  <div className="space-y-1">
                    <span className="trust-certification-badge">
                      {cert.badge}
                    </span>
                    <h3>{cert.title}</h3>
                    <p>{cert.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Guarantees Section */}
        <section
          aria-labelledby="guarantees-heading"
          className="trust-guarantees"
        >
          <header
            id="guarantees-heading"
            className="trust-section-header mb-10"
          >
            <h2>Our Promise to You</h2>
            <p>
              We stand behind every booking with comprehensive guarantees that
              protect your investment and ensure satisfaction
            </p>
          </header>

          <div className="trust-guarantees-grid">
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon;
              return (
                <article
                  key={guarantee.title}
                  className="trust-guarantee-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <figure className="trust-guarantee-icon">
                    <IconComponent size={28} />
                  </figure>

                  <div className="space-y-2">
                    <h3>{guarantee.title}</h3>
                    <p>{guarantee.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Trust Statement Footer */}
        <footer
          className="trust-indicators-footer"
          aria-label="Trust statement"
        >
          <div>
            <Shield size={20} />
            <p>Trusted by 10,000+ travelers worldwide since 2019</p>
            <Star size={20} />
          </div>
        </footer>
      </main>
    </MotionSection>
  );
};

export default TrustIndicators;
