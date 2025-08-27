import dynamic from "next/dynamic";
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
import SectionTitle from "../global/SectionTitle";

const MotionSection = dynamic(() => import("./MotionSection"), {
  loading: () => <div className="opacity-0" />,
});

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
      parallax={{
        speed: 50,
        direction: "up",
        range: [0, 1],
        offset: ["start end", "end start"],
      }}
      animation={{
        type: "slide",
        direction: "up",
        duration: 0.9,
        delay: 0.3,
        ease: "easeOut",
      }}
      mobile={{
        disableParallax: true,
        simpleAnimation: "fade",
        disableAnimations: false,
      }}
      triggerOnce={true}
      threshold={0.15}
      overflow={false}
      className="relative w-full py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Background decorative elements */}
      <figure className="absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full opacity-40 md:hidden" />
      <figure className="absolute bottom-20 left-10 w-80 h-80 bg-purple-100 rounded-full opacity-30 md:hidden" />
      <MotionSection
        animation={{
          type: "scale",
          duration: 2.0,
          delay: 0,
        }}
        mobile={{
          disableParallax: true,
          simpleAnimation: "none",
        }}
        triggerOnce={true}
        threshold={0.05}
        className="hidden md:block absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-blue-500 blur-3xl opacity-10 animate-pulse-custom" />
        <div
          className="absolute bottom-10 left-20 w-96 h-96 rounded-full bg-purple-500 blur-3xl opacity-15 animate-pulse-custom"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-10 animate-pulse-custom"
          style={{ animationDelay: "6s" }}
        />
      </MotionSection>
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
              <MotionSection
                key={feature.title}
                animation={{
                  type: "slide",
                  direction: "up",
                  duration: 0.6,
                  delay: 0.4 + index * 0.15, // Staggered: 0.4s, 0.55s, 0.7s, 0.85s
                  ease: "easeOut",
                }}
                mobile={{
                  simpleAnimation: "fade",
                  disableAnimations: false,
                }}
                triggerOnce={true}
                threshold={0.3}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 md:bg-white/95 md:backdrop-blur-sm md:shadow-xl md:border-white/20 md:rounded-3xl md:hover:shadow-2xl md:hover:-translate-y-2 transition-all duration-300 md:duration-500 group-hover:scale-105 md:group-hover:scale-110"
              >
                {/* Mobile gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${feature.mobileColor}/5 to-${feature.mobileColor}/10 md:from-transparent md:to-transparent`}
                />
                {/* Desktop gradient border effect */}
                <div
                  className={`hidden md:block absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10`}
                />
                <div className="relative p-6 md:p-8 space-y-4 md:space-y-6">
                  {/* Feature Icon */}
                  <figure
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md md:w-16 md:h-16 md:rounded-2xl md:shadow-lg transition-transform duration-300 bg-gradient-to-br ${feature.gradient} group-hover:scale-105 md:group-hover:scale-110`}
                  >
                    <IconComponent
                      size={24}
                      className="md:w-7 md:h-7 text-white"
                    />
                  </figure>
                  {/* Content */}
                  <section className="space-y-3">
                    <h3
                      className={`text-xl md:text-xl font-bold text-slate-900 transition-all duration-300 group-hover:text-${feature.mobileColor} md:group-hover:bg-gradient-to-r md:group-hover:${feature.gradient} md:group-hover:bg-clip-text md:group-hover:text-transparent`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-sm">
                      {feature.description}
                    </p>
                  </section>
                  {/* Stats */}
                  <aside className="pt-4 border-t border-slate-100 md:border-slate-100/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`text-2xl md:text-2xl font-bold text-${feature.mobileColor} md:bg-gradient-to-r md:${feature.gradient} md:bg-clip-text md:text-transparent`}
                        >
                          {feature.stat}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {feature.statLabel}
                        </div>
                      </div>
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300 bg-${feature.mobileColor}/10 md:group-hover:bg-${feature.mobileColor}/20`}
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
              </MotionSection>
            );
          })}
        </section>
        {/* Achievement Stats */}
        <MotionSection
          animation={{
            type: "scale",
            duration: 0.8,
            delay: 1.2, // After all feature cards
            ease: "easeOut",
          }}
          mobile={{
            simpleAnimation: "fade",
          }}
          triggerOnce={true}
          threshold={0.2}
          className="relative"
        >
          <div className="bg-white shadow-lg rounded-2xl border border-slate-100 p-6 md:bg-white/90 md:backdrop-blur-xl md:shadow-2xl md:border-white/20 md:rounded-3xl md:p-8 lg:p-12">
            {/* Desktop decorative gradient border */}
            <div className="hidden md:block absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 -z-10" />
            {/* Header */}
            <header className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent md:from-blue-500 md:via-purple-500 md:to-pink-500">
                Trusted by Thousands
              </h3>
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Join our community of adventurous travelers who have discovered
                the world with Viaggio
              </p>
            </header>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <MotionSection
                    key={achievement.label}
                    animation={{
                      type: "slide",
                      direction: "left",
                      duration: 0.6,
                      delay: 0.4 + index * 0.1, // Staggered: 0.4s, 0.5s, 0.6s, 0.7s
                      ease: "easeOut",
                    }}
                    mobile={{
                      simpleAnimation: "fade",
                    }}
                    triggerOnce={true}
                    threshold={0.5}
                    className="group text-center animate-fade-in"
                  >
                    <figure className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-slate-100 to-slate-200 md:bg-gradient-to-br md:from-blue-500 md:to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md md:shadow-lg transition-transform duration-300 group-hover:scale-105 md:group-hover:scale-110">
                      <IconComponent
                        size={20}
                        className={`md:w-6 md:h-6 ${achievement.color} md:text-white`}
                      />
                    </figure>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 bg-gradient-to-r from-slate-700 to-slate-900 md:from-blue-600 md:to-purple-600 bg-clip-text text-transparent">
                      {achievement.number}
                    </div>
                    <div className="text-slate-500 font-medium text-xs md:text-sm">
                      {achievement.label}
                    </div>
                  </MotionSection>
                );
              })}
            </div>
          </div>
        </MotionSection>
      </main>

      {/* Floating decorative elements */}
      <MotionSection
        parallax={{
          speed: 20,
          direction: "down",
        }}
        animation={{
          type: "scale",
          duration: 1.0,
          delay: 0,
        }}
        mobile={{
          disableParallax: true,
          simpleAnimation: "none",
        }}
        triggerOnce={true}
        threshold={0.05}
      >
        <figure className="absolute top-1/3 left-8 w-16 h-16 bg-blue-200 rounded-full opacity-20 md:hidden" />
        <figure className="absolute bottom-1/3 right-8 w-20 h-20 bg-purple-200 rounded-full opacity-15 md:hidden" />
        <figure className="hidden md:block absolute top-1/3 left-8 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-15 animate-float" />
        <figure className="hidden md:block absolute bottom-1/3 right-8 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-20 animate-float-slow" />
      </MotionSection>
    </MotionSection>
  );
};

export default Features;
