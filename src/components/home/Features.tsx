import {
  Shield,
  Users,
  MapPin,
  Clock,
  Star,
  Globe,
  Heart,
  Award,
} from "lucide-react";
import MotionSection from "./MotionSection";
import SectionTitle from "../global/SectionTitle";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Curated Adventures",
      description:
        "Hand-picked destinations and experiences crafted by travel experts who know the hidden gems.",
      stat: "500+",
      statLabel: "Destinations",
      gradient: "from-blue-500 to-blue-600",
      mobileColor: "blue-500",
    },
    {
      icon: Users,
      title: "Local Experts",
      description:
        "Connect with passionate local guides who share authentic stories and insider knowledge.",
      stat: "200+",
      statLabel: "Expert Guides",
      gradient: "from-orange-500 to-red-500",
      mobileColor: "orange-500",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance ensuring your adventure goes smoothly from start to finish.",
      stat: "24/7",
      statLabel: "Support",
      gradient: "from-purple-500 to-pink-500",
      mobileColor: "purple-500",
    },
    {
      icon: Shield,
      title: "Premium Safety",
      description:
        "Comprehensive safety protocols and insurance coverage for worry-free exploration.",
      stat: "100%",
      statLabel: "Secure",
      gradient: "from-green-500 to-emerald-600",
      mobileColor: "green-500",
    },
  ];

  const achievements = [
    {
      number: "10,000+",
      label: "Happy Travelers",
      icon: Heart,
      color: "text-red-500",
    },
    {
      number: "500+",
      label: "Destinations",
      icon: Globe,
      color: "text-blue-500",
    },
    {
      number: "4.9",
      label: "Average Rating",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      number: "5",
      label: "Years Experience",
      icon: Award,
      color: "text-purple-500",
    },
  ];

  return (
    <MotionSection
      scrollSpeed={50}
      className="relative w-full py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Background decorative elements */}
      <figure className="features-mobile-bg-primary" />
      <figure className="features-mobile-bg-secondary" />
      <figure className="features-desktop-bg" aria-hidden="true">
        <div className="features-desktop-blob-1 motion-safe:animate-pulse" />
        <div className="features-desktop-blob-2 motion-safe:animate-pulse" />
        <div className="features-desktop-blob-3 motion-safe:animate-pulse" />
      </figure>
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Section Title */}
        <header className="mb-12 md:mb-16">
          <SectionTitle
            text="Why Choose Viaggio"
            description="Experience the difference with our premium travel services"
          />
        </header>
        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <article
                key={feature.title}
                className="group features-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Mobile gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${feature.mobileColor}/5 to-${feature.mobileColor}/10 md:from-transparent md:to-transparent`}
                />
                {/* Desktop gradient border effect */}
                <div
                  className={`hidden md:block absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10`}
                />
                <div className="features-card-content">
                  {/* Feature Icon */}
                  <figure
                    className={`features-icon-container bg-gradient-to-br ${feature.gradient} group-hover:scale-105 md:group-hover:scale-110`}
                  >
                    <IconComponent
                      size={24}
                      className="md:w-7 md:h-7 text-white"
                    />
                  </figure>
                  {/* Content */}
                  <section className="space-y-3">
                    <h3
                      className={`features-card-title group-hover:text-${feature.mobileColor} md:group-hover:bg-gradient-to-r md:group-hover:${feature.gradient} md:group-hover:bg-clip-text md:group-hover:text-transparent`}
                    >
                      {feature.title}
                    </h3>
                    <p className="features-card-description">
                      {feature.description}
                    </p>
                  </section>
                  {/* Stats */}
                  <aside className="features-stats-container">
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`features-stats-number text-${feature.mobileColor} md:bg-gradient-to-r md:${feature.gradient} md:bg-clip-text md:text-transparent`}
                        >
                          {feature.stat}
                        </div>
                        <div className="features-stats-label">
                          {feature.statLabel}
                        </div>
                      </div>
                      <div
                        className={`features-stats-icon bg-${feature.mobileColor}/10 md:group-hover:bg-${feature.mobileColor}/20`}
                      >
                        <IconComponent
                          size={18}
                          className={`md:w-5 md:h-5 text-${feature.mobileColor} transition-transform duration-300 group-hover:scale-110`}
                        />
                      </div>
                    </div>
                  </aside>
                </div>
                {/* Desktop floating accent */}
                <figure
                  className={`hidden md:block absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full blur-xl opacity-15 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </article>
            );
          })}
        </section>
        {/* Achievement Stats */}
        <section className="relative">
          <div className="features-achievement-container">
            {/* Desktop decorative gradient border */}
            <div className="hidden md:block absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 -z-10" />
            {/* Header */}
            <header className="text-center mb-8 md:mb-12">
              <h3 className="features-achievement-title">
                Trusted by Thousands
              </h3>
              <p className="features-achievement-description">
                Join our community of adventurous travelers who have discovered
                the world with Viaggio
              </p>
            </header>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <article
                    key={achievement.label}
                    className="group features-achievement-stat"
                    style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
                  >
                    <figure className="features-achievement-icon group-hover:scale-105 md:group-hover:scale-110">
                      <IconComponent
                        size={20}
                        className={`md:w-6 md:h-6 ${achievement.color} md:text-white`}
                      />
                    </figure>
                    <div className="features-achievement-number">
                      {achievement.number}
                    </div>
                    <div className="features-achievement-label">
                      {achievement.label}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Floating decorative elements */}
      <figure className="features-floating-mobile-1" />
      <figure className="features-floating-mobile-2" />
      <figure className="features-floating-desktop-1 motion-safe:animate-float" />
      <figure className="features-floating-desktop-2 motion-safe:animate-float-slow" />
    </MotionSection>
  );
};

export default Features;
