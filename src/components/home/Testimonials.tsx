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
      image: "/Testim1.webp",
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
      image: "/Testim2.webp",
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
      image: "/Testim3.webp",
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
      image: "/Testim4.webp",
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
      image: "/Testim5.webp",
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
    <MotionSection scrollSpeed={50} className="testimonials-bg">
      {/* Decorative background elements */}
      <figure className="testimonials-decorative-bg" aria-hidden="true">
        <div className="testimonials-blob-1 animate-pulse" />
        <div className="testimonials-blob-2 animate-pulse" />
        <div className="testimonials-blob-3 animate-pulse" />
      </figure>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <header className="mb-16">
          <SectionTitle
            text="Traveler Stories"
            description="Real adventures from our amazing community of explorers"
          />
        </header>

        {/* Main Featured Testimonial */}
        <section className="relative mb-16">
          <article className="testimonials-main-card">
            <div className="testimonials-gradient-border" />

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <figure className="testimonials-image-container">
                <Image
                  src={currentData.image}
                  alt={`${currentData.destination} adventure with Viaggio`}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="testimonials-image-overlay" />

                {/* Destination badge */}
                <address className="testimonials-destination-badge not-italic">
                  <MapPin size={14} className="text-white" />
                  <span className="text-white text-sm font-semibold">
                    {currentData.destination}
                  </span>
                </address>

                {/* Experience type */}
                <aside className="testimonials-experience-badge">
                  <span className="text-white text-sm font-bold">
                    {currentData.experience}
                  </span>
                </aside>

                {/* Navigation buttons */}
                <nav className="absolute bottom-16 right-4 flex gap-2">
                  <Button
                    onClick={prevTestimonial}
                    className="testimonials-nav-button"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </Button>
                  <Button
                    onClick={nextTestimonial}
                    className="testimonials-nav-button"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </Button>
                </nav>
              </figure>

              {/* Content Side */}
              <section className="testimonials-content-section">
                {/* Quote icon */}
                <figure className="testimonials-quote-icon">
                  <Quote size={28} className="text-white" />
                </figure>

                {/* Rating */}
                <div className="testimonials-rating-container">
                  <div className="testimonials-rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className="testimonials-star"
                      />
                    ))}
                  </div>
                  <span className="testimonials-verified-text">
                    5.0 • Verified Review
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="testimonials-quote-text">
                  {currentData.quote}
                </blockquote>

                {/* Traveler info */}
                <div className="testimonials-avatar-container">
                  <div className="testimonials-avatar-wrapper">
                    <figure className="testimonials-avatar-image">
                      <Image
                        src={currentData.avatar}
                        alt={currentData.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </figure>
                    <div className="testimonials-verified-badge">
                      <Star size={12} className="text-white fill-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="testimonials-traveler-name">
                      {currentData.name}
                    </h3>
                    <p className="testimonials-traveler-location">
                      {currentData.location}
                    </p>
                  </div>
                </div>

                {/* Trip details */}
                <aside className="testimonials-trip-details">
                  <div className="testimonials-detail-badge-primary">
                    <Calendar
                      size={14}
                      className="text-[hsl(var(--primary))]"
                    />
                    <span className="text-[hsl(var(--primary))] font-medium">
                      {currentData.date}
                    </span>
                  </div>
                  <div className="testimonials-detail-badge-accent">
                    <Users size={14} className="text-[hsl(var(--accent))]" />
                    <span className="text-[hsl(var(--accent))] font-medium">
                      {currentData.groupSize}
                    </span>
                  </div>
                </aside>
              </section>
            </div>
          </article>
        </section>

        {/* Testimonial Grid - FIXED: Use actual testimonial indices */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial, gridIndex) => {
            // Find the actual index in the full testimonials array
            const actualIndex = testimonials.findIndex(
              (t) => t.id === testimonial.id
            );
            return (
              <article
                key={testimonial.id}
                className={`testimonials-grid-card group ${
                  currentTestimonial === actualIndex
                    ? "ring-2 ring-[hsl(var(--primary))] bg-white/95"
                    : ""
                }`}
                style={{ animationDelay: `${gridIndex * 0.2}s` }}
                onClick={() => setCurrentTestimonial(actualIndex)}
              >
                {/* Rating */}
                <div className="testimonials-rating-stars mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="testimonials-star" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-[hsl(var(--foreground))] mb-4 line-clamp-3 leading-relaxed">
                  {testimonial.quote}
                </blockquote>

                {/* Traveler */}
                <div className="flex items-center gap-3">
                  <figure className="testimonials-grid-avatar">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </figure>
                  <div>
                    <h4 className="testimonials-grid-name">
                      {testimonial.name}
                    </h4>
                    <p className="testimonials-grid-destination">
                      {testimonial.destination}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Trust indicators */}
        <section className="testimonials-trust-container">
          <header className="text-center mb-8">
            <h3 className="testimonials-trust-title">
              Trusted by Adventurers Worldwide
            </h3>
            <p className="testimonials-trust-description">
              Join thousands of travelers who chose Viaggio for their dream
              adventures
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <article>
              <div className="testimonials-stats-number">4.9</div>
              <div className="testimonials-stats-label">Average Rating</div>
            </article>
            <article>
              <div className="testimonials-stats-number">2,847</div>
              <div className="testimonials-stats-label">Reviews</div>
            </article>
            <article>
              <div className="testimonials-stats-number">98%</div>
              <div className="testimonials-stats-label">Recommend Us</div>
            </article>
            <article>
              <div className="testimonials-stats-number">100%</div>
              <div className="testimonials-stats-label">Verified</div>
            </article>
          </div>
        </section>
      </main>

      {/* Additional floating decorative elements */}
      <figure className="testimonials-floating-1" />
      <figure className="testimonials-floating-2" />
    </MotionSection>
  );
};

export default Testimonials;
