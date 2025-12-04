"use client";

import {
  Star,
  Quote,
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import MotionSection from "./MotionSection";
import SectionTitle from "../global/SectionTitle";
import { Button } from "../ui/button";
import Testim1 from "@/assets/Testim1.webp";
import Testim2 from "@/assets/Testim2.webp";
import Testim3 from "@/assets/Testim3.webp";
import Testim4 from "@/assets/Testim4.webp";
import Testim5 from "@/assets/Testim5.webp";
import Avatar1 from "@/assets/Avatar1.jpg";

interface TestimonialData {
  id: number;
  name: string;
  location: string;
  destination: string;
  rating: number;
  date: string;
  groupSize: string;
  avatar: StaticImageData;
  image: StaticImageData;
  quote: string;
  experience: string;
  verified: boolean;
}

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: TestimonialData[] = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "San Francisco, USA",
      destination: "Bali, Indonesia",
      rating: 5,
      date: "March 2024",
      groupSize: "2 travelers",
      avatar: Avatar1,
      image: Testim1,
      quote:
        "Viaggio transformed our honeymoon into an unforgettable adventure. The local guides showed us hidden temples and secret beaches we never would have found ourselves.",
      experience: "Romantic Getaway",
      verified: true,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      location: "London, UK",
      destination: "Patagonia, Chile",
      rating: 5,
      date: "January 2024",
      groupSize: "4 travelers",
      avatar: Avatar1,
      image: Testim2,
      quote:
        "The hiking expedition was expertly organized. Every detail was perfect, from the mountain guides to the eco-lodges. Truly a once-in-a-lifetime experience.",
      experience: "Adventure Trek",
      verified: true,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      location: "Madrid, Spain",
      destination: "Kyoto, Japan",
      rating: 5,
      date: "November 2023",
      groupSize: "3 travelers",
      avatar: Avatar1,
      image: Testim3,
      quote:
        "The cultural immersion was incredible. From private tea ceremonies to exclusive temple visits, Viaggio gave us authentic Japan beyond any guidebook.",
      experience: "Cultural Journey",
      verified: true,
    },
    {
      id: 4,
      name: "David Park",
      location: "Toronto, Canada",
      destination: "Iceland",
      rating: 5,
      date: "September 2023",
      groupSize: "2 travelers",
      avatar: Avatar1,
      image: Testim4,
      quote:
        "Aurora hunting with Viaggio was magical. The photography guide helped us capture stunning shots while the thermal spring tours were perfectly timed.",
      experience: "Photography Tour",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Anderson",
      location: "Sydney, Australia",
      destination: "Maldives",
      rating: 5,
      date: "August 2023",
      groupSize: "6 travelers",
      avatar: Avatar1,
      image: Testim5,
      quote:
        "Our family reunion became extraordinary with Viaggio's planning. The overwater villas and snorkeling adventures created memories that will last forever.",
      experience: "Family Vacation",
      verified: true,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <MotionSection
      parallax={{
        speed: 40,
        direction: "down",
        range: [0, 1],
        offset: ["start end", "end start"],
      }}
      animation={{
        type: "scale",
        duration: 1.0,
        delay: 0.2,
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
      threshold={0.2}
      overflow={true}
      className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[hsl(var(--features-bg))] to-[hsl(var(--testimonials-bg))]"
    >
      {/* Decorative background elements*/}
      <MotionSection
        animation={{
          type: "scale",
          duration: 2.0,
          delay: 0.2,
          ease: "easeOut",
        }}
        mobile={{
          simpleAnimation: "none",
        }}
        triggerOnce={true}
        threshold={0.05}
        className="absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute top-4 left-4 sm:top-16 sm:left-16 w-24 h-24 sm:w-80 sm:h-80 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-15 animate-pulse-custom" />
        <div
          className="absolute bottom-4 right-4 sm:bottom-16 sm:right-16 w-32 h-32 sm:w-96 sm:h-96 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-10 animate-pulse-custom"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-20 h-20 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-12 animate-pulse-custom"
          style={{ animationDelay: "4s" }}
        />
      </MotionSection>
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 container">
        <header className="mb-8 sm:mb-12 md:mb-16">
          <SectionTitle
            text="Traveler Stories"
            description="Real adventures from our amazing community of explorers"
          />
        </header>
        <section className="relative mb-8 sm:mb-12 md:mb-16 w-full">
          <article className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-xl sm:rounded-2xl md:rounded-3xl blur opacity-20 -z-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
              <figure className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                <Image
                  src={currentData.image}
                  alt={`${currentData.destination} adventure with Viaggio`}
                  width={800}
                  height={600}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <address className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-white/20 backdrop-blur-xl rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 flex items-center gap-1 sm:gap-2 border border-white/30 not-italic">
                  <MapPin size={10} className="text-white flex-shrink-0" />
                  <span className="text-white text-xs sm:text-sm font-semibold truncate max-w-[100px] sm:max-w-[120px] md:max-w-none">
                    {currentData.destination}
                  </span>
                </address>
                <aside className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
                  <span className="text-white text-xs sm:text-sm font-bold">
                    {currentData.experience}
                  </span>
                </aside>
                <nav className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-1 sm:gap-2">
                  <Button
                    onClick={prevTestimonial}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 p-0 cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={14} className="text-white" />
                  </Button>
                  <Button
                    onClick={nextTestimonial}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 p-0 cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={14} className="text-white" />
                  </Button>
                </nav>
              </figure>
              <section className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
                <figure className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg">
                  <Quote size={16} className="text-white" />
                </figure>
                <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
                      />
                    ))}
                  </div>
                  <span className="text-black text-xs sm:text-sm font-medium ml-1 sm:ml-2">
                    5.0 • Verified Review
                  </span>
                </div>
                <blockquote className="text-black text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-8 font-medium italic">
                  {currentData.quote}
                </blockquote>
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                  <div className="relative flex-shrink-0">
                    <figure className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[hsl(var(--primary))]">
                      <Image
                        src={currentData.avatar}
                        alt={currentData.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </figure>
                    <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center border-2 border-white">
                      <Star size={8} className="text-white fill-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-black text-sm sm:text-base md:text-lg truncate">
                      {currentData.name}
                    </h3>
                    <p className="text-black text-xs sm:text-sm truncate">
                      {currentData.location}
                    </p>
                  </div>
                </div>
                <aside className="flex flex-wrap gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2 bg-[hsl(var(--primary))]/10 px-2 sm:px-3 py-1 rounded-full">
                    <Calendar
                      size={10}
                      className="text-[hsl(var(--primary))] flex-shrink-0"
                    />
                    <span className="text-[hsl(var(--primary))] font-medium text-xs sm:text-sm">
                      {currentData.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 bg-[hsl(var(--accent))]/10 px-2 sm:px-3 py-1 rounded-full">
                    <Users
                      size={10}
                      className="text-[hsl(var(--accent))] flex-shrink-0"
                    />
                    <span className="text-[hsl(var(--accent))] font-medium text-xs sm:text-sm">
                      {currentData.groupSize}
                    </span>
                  </div>
                </aside>
              </section>
            </div>
          </article>
        </section>
        <section className="mb-8 sm:mb-12 md:mb-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
            {testimonials.slice(0, 3).map((testimonial, index) => {
              const actualIndex = testimonials.findIndex(
                (t) => t.id === testimonial.id
              );
              return (
                <MotionSection
                  animation={{
                    type: "fade",
                    direction: "up",
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut",
                  }}
                  mobile={{
                    simpleAnimation: "fade",
                    disableAnimations: false,
                    disableParallax: true,
                    breakPoint: 768,
                    reducedMotion: true,
                  }}
                  triggerOnce={true}
                  threshold={0.3}
                  overflow={true}
                  key={testimonial.id}
                  className={`w-full bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 p-3 sm:p-4 md:p-6 cursor-pointer group animate-fade-in ${
                    currentTestimonial === actualIndex
                      ? "ring-2 ring-[hsl(var(--primary))] bg-white/95"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3 md:mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={10}
                        className="text-black fill-[hsl(var(--accent))]"
                      />
                    ))}
                  </div>
                  <blockquote className="text-black mb-2 sm:mb-3 md:mb-4 line-clamp-3 leading-relaxed text-xs sm:text-sm md:text-base">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <figure className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[hsl(var(--primary))] flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </figure>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-black text-xs sm:text-sm truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-black text-xs truncate">
                        {testimonial.destination}
                      </p>
                    </div>
                  </div>
                </MotionSection>
              );
            })}
          </div>
        </section>
        <MotionSection
          animation={{
            type: "fade",
            direction: "up",
            duration: 0.8,
            delay: 0.4,
            ease: "easeOut",
          }}
          mobile={{
            simpleAnimation: "fade",
            disableAnimations: false,
            disableParallax: true,
            breakPoint: 768,
            reducedMotion: true,
          }}
          triggerOnce={true}
          threshold={0.3}
          overflow={true}
          className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 shadow-xl p-3 sm:p-4 md:p-6 lg:p-8 w-full"
        >
          <header className="text-center mb-4 sm:mb-6 md:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-1 sm:mb-2">
              Trusted by Adventurers Worldwide
            </h3>
            <p className="text-black text-xs sm:text-sm md:text-base px-2">
              Join thousands of travelers who chose Viaggio for their dream
              adventures
            </p>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-center w-full">
            <article className="w-full">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-0.5 sm:mb-1">
                4.9
              </div>
              <div className="text-black text-xs sm:text-sm">
                Average Rating
              </div>
            </article>
            <article className="w-full">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-0.5 sm:mb-1">
                2,847
              </div>
              <div className="text-black text-xs sm:text-sm">Reviews</div>
            </article>
            <article className="w-full">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-0.5 sm:mb-1">
                98%
              </div>
              <div className="text-black text-xs sm:text-sm">Recommend Us</div>
            </article>
            <article className="w-full">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-0.5 sm:mb-1">
                100%
              </div>
              <div className="text-black text-xs sm:text-sm">Verified</div>
            </article>
          </div>
        </MotionSection>
      </main>
      {/* floating decorative elements*/}
      <figure className="animate-float absolute top-1/4 right-2 sm:right-12 w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-15" />
      <figure className="animate-floatSlowCustom absolute bottom-1/4 left-2 sm:left-12 w-10 h-10 sm:w-16 sm:h-16 md:w-28 md:h-28 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-20" />
    </MotionSection>
  );
};

export default Testimonials;
