import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Users,
  Star,
  Award,
  Heart,
  Globe,
  Compass,
  Camera,
  Plane,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASE_URL, buildWebPage } from "@/utils/schema";

export const metadata: Metadata = {
  title: "About Viagio - Your Trusted Travel Experience Partner",
  description:
    "Learn about Viagio's mission to create unforgettable travel experiences. Meet our expert team and discover why thousands choose us for their adventures.",
  keywords: [
    "about Viagio",
    "travel company",
    "travel experts",
    "our story",
    "travel team",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Viagio - Your Trusted Travel Experience Partner",
    description:
      "Discover Viagio's story and our commitment to creating extraordinary travel experiences.",
    type: "website",
  },
};

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Travelers", value: "50,000+" },
    { icon: MapPin, label: "Destinations", value: "200+" },
    { icon: Star, label: "Average Rating", value: "4.9" },
    { icon: Award, label: "Years Experience", value: "8+" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description:
        "We believe travel transforms lives and creates unforgettable memories that last forever.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "From hidden gems to iconic landmarks, we connect you with destinations worldwide.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Your safety and satisfaction are our top priorities in every journey we curate.",
    },
    {
      icon: Compass,
      title: "Expert Guidance",
      description:
        "Our experienced travel experts provide personalized recommendations for your perfect trip.",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "/Testim1.webp",
      description: "Travel enthusiast with 15+ years in the industry",
    },
    {
      name: "Marcus Rivera",
      role: "Head of Operations",
      image: "/Testim2.webp",
      description: "Operations expert ensuring seamless travel experiences",
    },
    {
      name: "Elena Kowalski",
      role: "Travel Curator",
      image: "/Testim3.webp",
      description:
        "Destination specialist with expertise in unique experiences",
    },
  ];

  const aboutSchema = buildWebPage(
    "About Viagio – Who We Are",
    `${BASE_URL}/about`,
    "Learn about Viagio's mission, team and story."
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [aboutSchema],
  };

  return (
    <>
      <Script
        id="about-us-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="relative overflow-hidden bg-[hsl(var(--background))]">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] min-h-[600px] mb-16 overflow-hidden">
          <Image
            src="/Hero.webp"
            alt="Viagio Team"
            width={1920}
            height={1080}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
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
                  <span className="bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold shadow-lg">
                    Since 2016
                  </span>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/30">
                    <Star
                      size={12}
                      className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))] sm:w-3.5 sm:h-3.5"
                    />
                    <span>Trusted Travel Partner</span>
                  </div>
                </div>
                {/* Enhanced title */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 shadow-text leading-tight animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  About
                  <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Viagio
                  </span>
                </h1>
                <p
                  className="text-white/90 text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl leading-relaxed drop-shadow-md animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  Connecting travelers with extraordinary experiences since
                  2016. We are passionate about creating unforgettable journeys
                  that inspire, educate, and transform.
                </p>
                {/* Enhanced action button */}
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Button className="btn-accent px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="flex items-center gap-2 sm:gap-3 relative z-10 font-bold">
                      <Plane size={18} className="sm:w-5 sm:h-5" />
                      Start Your Journey
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <stat.icon className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    {stat.value}
                  </h2>
                  <p className="text-[hsl(var(--muted-foreground))] font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Our Story Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="animate-fade-in">
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <Heart size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                      Our Story
                    </h2>
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-[hsl(var(--foreground))] text-base sm:text-lg leading-relaxed">
                    Viagio was born from a simple belief: travel should be more
                    than just visiting places—it should be about creating
                    meaningful connections, discovering new perspectives, and
                    building memories that last a lifetime.
                  </p>
                  <p className="text-[hsl(var(--foreground))] text-base sm:text-lg leading-relaxed">
                    Founded in 2016 by a team of passionate travelers, we
                    started with a mission to make extraordinary travel
                    experiences accessible to everyone. Today, we have helped
                    over 50,000 travelers discover the world in ways they never
                    imagined.
                  </p>
                  <p className="text-[hsl(var(--foreground))] text-base sm:text-lg leading-relaxed">
                    From hidden local gems to iconic world destinations, we
                    curate each experience with care, ensuring every journey is
                    as unique as the traveler embarking on it.
                  </p>
                </div>
              </div>
              <div className="animate-fade-in">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Testim5.webp"
                    alt="Our Story"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Values Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <Compass size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Our Values
                </h2>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto">
                The principles that guide everything we do at Viagio
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                    <value.icon className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mb-3 sm:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Team Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <Users size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Meet Our Team
                </h2>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto">
                The passionate travel experts behind your extraordinary
                experiences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="object-cover rounded-full shadow-xl"
                      sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[hsl(var(--primary))/20] to-transparent" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
                    {member.name}
                  </h2>
                  <p className="text-[hsl(var(--accent-foreground))] font-semibold mb-2 sm:mb-3">
                    {member.role}
                  </p>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 text-center">
            <div className="max-w-3xl mx-auto">
              <Camera className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 text-[hsl(var(--accent))]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8">
                Ready to Create Your Story?
              </h2>
              <p className="text-xl sm:text-2xl mb-8 sm:mb-10 opacity-90">
                Join thousands of travelers who have discovered the world with
                Viagio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/destinations">
                  <Button className="btn-accent px-8 py-4 text-lg shadow-2xl hover:scale-105 transition-all duration-300">
                    Explore Destinations
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-[hsl(var(--primary))] transition-all duration-300"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
