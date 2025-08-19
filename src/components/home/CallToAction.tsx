import Link from "next/link";
import { ArrowRight, Compass, Star, Shield, Clock, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MotionSection from "./MotionSection";

const CallToAction = () => {
  const features = [
    { icon: Shield, text: "100% Secure Booking" },
    { icon: Clock, text: "24/7 Support" },
    { icon: Users, text: "Expert Local Guides" },
    { icon: Star, text: "5-Star Experiences" },
  ];

  const trustStats = [
    { number: "10K+", label: "Happy Travelers" },
    { number: "500+", label: "Destinations" },
    { number: "4.9", label: "Average Rating" },
    { number: "24/7", label: "Support" },
  ];

  const benefits = [
    "Exclusive travel deals and discounts",
    "Weekly destination inspiration",
    "Travel tips from local experts",
  ];

  return (
    <MotionSection scrollSpeed={75} className="cta-bg">
      {/* Background decorative elements */}
      <figure className="absolute inset-0 z-0" aria-hidden="true">
        <div className="cta-background-overlay" />
        <div className="cta-floating-element-1 animate-pulse " />
        <div className="cta-floating-element-2 animate-pulse" />
        <div className="cta-floating-element-3 animate-pulse" />
      </figure>

      <main className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Content Section */}
          <section className="space-y-8 text-white">
            {/* Hero Badge */}
            <header className="cta-badge">
              <Compass size={20} className="text-white animate-spin-slow" />
              <span className="text-white font-semibold">
                Start Your Adventure Today
              </span>
            </header>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="cta-main-heading">
                Ready for Your
                <span className="cta-gradient-text">Dream Adventure?</span>
              </h1>
              <p className="cta-description">
                Join thousands of travelers who have discovered the world with
                Viaggio. Your extraordinary journey starts with a single step.
              </p>
            </div>

            {/* Features List */}
            <section className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.text}
                    className="cta-feature-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <figure className="cta-feature-icon">
                      <IconComponent size={16} className="text-white" />
                    </figure>
                    <span className="cta-feature-text">{feature.text}</span>
                  </div>
                );
              })}
            </section>

            {/* Action Buttons */}
            <nav className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/destinations">
                <Button className="cta-primary-button btn-accent group">
                  <span className="cta-button-shine" />
                  <span className="flex items-center gap-3 relative z-10 font-bold">
                    Explore Destinations
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="cta-secondary-button">
                  Find Us
                </Button>
              </Link>
            </nav>

            {/* Trust Indicators */}
            <aside className="pt-8 border-t border-white/20">
              <div className="flex flex-wrap items-center gap-6">
                {trustStats.map((stat) => (
                  <article key={stat.label} className="cta-trust-indicator">
                    <div className="cta-trust-number">{stat.number}</div>
                    <div className="cta-trust-label">{stat.label}</div>
                  </article>
                ))}
              </div>
            </aside>
          </section>

          {/* Newsletter Signup Section */}
          <section className="lg:pl-8">
            <article className="cta-newsletter-card">
              <div className="space-y-6">
                {/* Newsletter Header */}
                <header className="text-center space-y-3">
                  <figure className="cta-newsletter-icon">
                    <Star size={28} className="text-white" />
                  </figure>
                  <h2 className="cta-newsletter-title">
                    Get 20% Off First Adventure
                  </h2>
                  <p className="cta-newsletter-description">
                    Subscribe to our newsletter and receive exclusive travel
                    deals, insider tips, and early access to new destinations.
                  </p>
                </header>

                {/* Newsletter Form */}
                <form
                  className="space-y-4"
                  role="form"
                  aria-label="Newsletter subscription"
                >
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="cta-form-input"
                      aria-label="Email address"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      className="cta-form-input"
                      aria-label="Your name"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="cta-form-button btn-accent group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">Claim 20% Discount</span>
                  </Button>
                </form>

                {/* Benefits List */}
                <aside className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="cta-benefit-item">
                      <div className="cta-benefit-dot" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </aside>

                {/* Privacy Note */}
                <footer className="cta-privacy-note">
                  We respect your privacy. Unsubscribe anytime.
                </footer>
              </div>
            </article>
          </section>
        </div>
      </main>
    </MotionSection>
  );
};

export default CallToAction;
