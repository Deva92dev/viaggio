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
import Image from "next/image";
import MotionSection from "./MotionSection";
import SectionTitle from "../global/SectionTitle";
import { Button } from "../ui/button";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "San Francisco, USA",
      destination: "Bali, Indonesia",
      rating: 5,
      date: "March 2024",
      groupSize: "2 travelers",
      avatar: "/Avatar1.jpg",
      image: "/Testi1.jpg",
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
      avatar: "/Avatar1.jpg",
      image: "/Testi2.jpg",
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
      avatar: "/Avatar1.jpg",
      image: "/Testi3.jpg",
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
      avatar: "/Avatar1.jpg",
      image: "/Testi4.jpg",
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
      avatar: "/Avatar1.jpg",
      image: "/Testi5.jpg",
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
      scrollSpeed={50}
      className="relative w-full py-20 bg-gradient-to-b from-[hsl(var(--features-bg))] to-[hsl(var(--testimonials-bg))]"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-16 left-16 w-80 h-80 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-15 animate-pulse" />
        <div
          className="absolute bottom-16 right-16 w-96 h-96 rounded-full bg-[hsl(var(--accent))] blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] blur-3xl opacity-12 animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Enhanced Section Title */}
        <div className="mb-16">
          <SectionTitle
            text="Traveler Stories"
            description="Real adventures from our amazing community of explorers"
          />
        </div>

        {/* Main Featured Testimonial */}
        <div className="relative mb-16">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <Image
                  src={currentData.image}
                  alt={`${currentData.destination} adventure with Viaggio`}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Destination badge */}
                <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-2 border border-white/30">
                  <MapPin size={14} className="text-white" />
                  <span className="text-white text-sm font-semibold">
                    {currentData.destination}
                  </span>
                </div>

                {/* Experience type */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 rounded-full px-4 py-2">
                  <span className="text-white text-sm font-bold">
                    {currentData.experience}
                  </span>
                </div>

                {/* Navigation buttons */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                  <Button
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 p-0 cursor-pointer"
                    aria-label="left navigation"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </Button>
                  <Button
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 p-0 cursor-pointer"
                    aria-label="right navigation"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </Button>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Quote icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Quote size={28} className="text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
                      />
                    ))}
                  </div>
                  <span className="text-[hsl(var(--muted-foreground))] text-sm font-medium ml-2">
                    5.0 • Verified Review
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-[hsl(var(--foreground))] text-lg lg:text-xl leading-relaxed mb-8 font-medium italic">
                  {currentData.quote}
                </blockquote>
                {/* Traveler info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[hsl(var(--primary))]">
                      <Image
                        src={currentData.avatar}
                        alt={currentData.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Verified badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center border-2 border-white">
                      <Star size={12} className="text-white fill-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-[hsl(var(--foreground))] text-lg">
                      {currentData.name}
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] text-sm">
                      {currentData.location}
                    </p>
                  </div>
                </div>

                {/* Trip details */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-[hsl(var(--primary))]/10 px-3 py-1 rounded-full">
                    <Calendar
                      size={14}
                      className="text-[hsl(var(--primary))]"
                    />
                    <span className="text-[hsl(var(--primary))] font-medium">
                      {currentData.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[hsl(var(--accent))]/10 px-3 py-1 rounded-full">
                    <Users size={14} className="text-[hsl(var(--accent))]" />
                    <span className="text-[hsl(var(--accent))] font-medium">
                      {currentData.groupSize}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 p-6 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setCurrentTestimonial(index)}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[hsl(var(--foreground))] mb-4 line-clamp-3 leading-relaxed">
                {testimonial.quote}
              </p>

              {/* Traveler */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[hsl(var(--primary))]">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs">
                    {testimonial.destination}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-2">
              Trusted by Adventurers Worldwide
            </h3>
            <p className="text-[hsl(var(--muted-foreground))]">
              Join thousands of travelers who chose Viaggio for their dream
              adventures
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-1">
                4.9
              </div>
              <div className="text-[hsl(var(--muted-foreground))] text-sm">
                Average Rating
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-1">
                2,847
              </div>
              <div className="text-[hsl(var(--muted-foreground))] text-sm">
                Reviews
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-1">
                98%
              </div>
              <div className="text-[hsl(var(--muted-foreground))] text-sm">
                Recommend Us
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent mb-1">
                100%
              </div>
              <div className="text-[hsl(var(--muted-foreground))] text-sm">
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating decorative elements */}
      <div className="absolute top-1/4 right-12 w-20 h-20 bg-[hsl(var(--accent))] rounded-full blur-2xl opacity-15 animate-float" />
      <div className="absolute bottom-1/4 left-12 w-28 h-28 bg-[hsl(var(--primary))] rounded-full blur-2xl opacity-20 animate-float-slow" />
    </MotionSection>
  );
};

export default Testimonials;
