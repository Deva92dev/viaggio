import Link from "next/link";
import { ArrowRight, Compass, Star, Shield, Clock, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import dynamic from "next/dynamic";

const MotionSection = dynamic(() => import("./MotionSection"), {
  loading: () => <div className="opacity-0" />,
});

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
    <MotionSection className="relative w-full py-20 overflow-hidden bg-gradient-to-br from-[hsl(var(--cta-bg))] via-[hsl(var(--accent))] to-[hsl(var(--cta-bg))]">
      {/* Background decorative elements */}
      <figure className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70 z-10" />
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl opacity-30 animate-pulse-custom" />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl opacity-40 animate-pulse-custom"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-white/10 to-transparent blur-3xl  opacity-20 animate-pulse-custom"
          style={{ animationDelay: "4s", transform: "translate(-50%, -50%)" }}
        />
      </figure>
      <main className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Content Section */}
          <section className="space-y-8 text-white">
            {/* Hero Badge */}
            <header className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 animate-fade-in">
              <Compass size={20} className="text-white animate-spin-slow" />
              <span className="text-white font-semibold">
                Start Your Adventure Today
              </span>
            </header>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white">
                Ready for Your
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Dream Adventure?
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                Join thousands of travelers who have discovered the world with
                Viaggio. Your extraordinary journey starts with a single step.
              </p>
            </div>
            <section className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.text}
                    className="flex items-center gap-3 animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <figure className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <IconComponent size={16} className="text-white" />
                    </figure>
                    <span className="text-white/90 font-medium text-sm">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </section>
            <nav className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/destinations">
                <Button className="px-12 py-4 text-lg shadow-2xl shadow-black/30 hover:shadow-black/50 hover:scale-105 transition-all duration-300 relative overflow-hidden btn-accent group">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-12 py-4 text-lg transition-all duration-300 hover:scale-105"
                >
                  Find Us
                </Button>
              </Link>
            </nav>
            <aside className="pt-8 border-t border-white/20">
              <div className="flex flex-wrap items-center gap-6">
                {trustStats.map((stat) => (
                  <article key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-white/70 text-xs">{stat.label}</div>
                  </article>
                ))}
              </div>
            </aside>
          </section>
          <section className="lg:pl-8">
            <article className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-white to-[hsl(var(--primary))] rounded-3xl blur opacity-30 -z-10 pointer-events-none" />
              <div className="space-y-6">
                <header className="text-center space-y-3">
                  <figure className="h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Star size={28} className="text-white" />
                  </figure>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Get 20% Off First Adventure
                  </h2>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                    Subscribe to our newsletter and receive exclusive travel
                    deals, insider tips, and early access to new destinations.
                  </p>
                </header>
                <form
                  className="space-y-4"
                  role="form"
                  aria-label="Newsletter subscription"
                >
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-12 px-4 bg-white border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 rounded-xl"
                      aria-label="Email address"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      className="h-12 px-4 bg-white border-2 border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 rounded-xl"
                      aria-label="Your name"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full  h-12 text-lg font-semibold shadow-lg shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 transition-all duration-300 relative overflow-hidden btn-accent group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">Claim 20% Discount</span>
                  </Button>
                </form>
                <aside className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-black"
                    >
                      <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </aside>
                <footer className="text-xs text-black text-center">
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
