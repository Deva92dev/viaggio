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
      gradient: "from-[hsl(var(--primary))] to-blue-600",
    },
    {
      icon: Users,
      title: "Local Experts",
      description:
        "Connect with passionate local guides who share authentic stories and insider knowledge.",
      stat: "200+",
      statLabel: "Expert Guides",
      gradient: "from-[hsl(var(--accent))] to-orange-600",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance ensuring your adventure goes smoothly from start to finish.",
      stat: "24/7",
      statLabel: "Support",
      gradient: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]",
    },
    {
      icon: Shield,
      title: "Premium Safety",
      description:
        "Comprehensive safety protocols and insurance coverage for worry-free exploration.",
      stat: "100%",
      statLabel: "Secure",
      gradient: "from-green-500 to-[hsl(var(--primary))]",
    },
  ];

  const achievements = [
    { number: "10,000+", label: "Happy Travelers", icon: Heart },
    { number: "500+", label: "Destinations", icon: Globe },
    { number: "4.9", label: "Average Rating", icon: Star },
    { number: "5", label: "Years Experience", icon: Award },
  ];

  return (
    <MotionSection
      scrollSpeed={50}
      className="relative w-full py-20 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--features-bg))]"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-10 animate-pulse" />
        <div
          className="absolute bottom-10 left-20 w-96 h-96 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Enhanced Section Title */}
        <div className="mb-16">
          <SectionTitle
            text="Why Choose Viaggio"
            description="Experience the difference with our premium travel services"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Gradient border effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}
                />

                <div className="p-8 space-y-6">
                  {/* Icon with gradient background */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))] group-hover:bg-gradient-to-r group-hover:from-[hsl(var(--primary))] group-hover:to-[hsl(var(--accent))] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Stat highlight */}
                  <div className="pt-4 border-t border-[hsl(var(--border))]/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                        >
                          {feature.stat}
                        </div>
                        <div className="text-xs text-[hsl(var(--muted-foreground))] font-medium">
                          {feature.statLabel}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-[hsl(var(--primary))]/10 rounded-full flex items-center justify-center group-hover:bg-[hsl(var(--accent))]/10 transition-colors duration-300">
                        <IconComponent
                          size={20}
                          className="text-[hsl(var(--primary))] group-hover:text-[hsl(var(--accent))] transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating corner accent */}
                <div
                  className={`absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                />
              </div>
            );
          })}
        </div>

        {/* Enhanced Achievement Stats */}
        <div className="relative">
          {/* Glass morphism container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
            {/* Decorative gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />

            {/* Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-4">
                Trusted by Thousands
              </h3>
              <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto">
                Join our community of adventurous travelers who have discovered
                the world with Viaggio
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={achievement.label}
                    className="text-center group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent size={24} className="text-white" />
                    </div>

                    {/* Number */}
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-2">
                      {achievement.number}
                    </div>

                    {/* Label */}
                    <div className="text-[hsl(var(--muted-foreground))] font-medium text-sm">
                      {achievement.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating decorative elements */}
      <div className="absolute top-1/3 left-8 w-24 h-24 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-15 animate-float" />
      <div className="absolute bottom-1/3 right-8 w-32 h-32 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-20 animate-float-slow" />
    </MotionSection>
  );
};

export default Features;
