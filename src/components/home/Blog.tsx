/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import SectionTitle from "../global/SectionTitle";
import MotionSection from "./MotionSection";

const Blog = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionSection
      scrollSpeed={80}
      className="pt-12 bg-gradient-to-b from-[#eef4ff] to-[#e0ebff]  relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 rounded-full bg-[#4682b430] blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#87ceeb30] blur-3xl"></div>

      {/* Floating decorative circles */}
      <div className="absolute top-20 left-10 w-6 h-6 rounded-full bg-[#4682b4] opacity-20"></div>
      <div className="absolute top-40 right-20 w-4 h-4 rounded-full bg-[#87ceeb] opacity-30"></div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 rounded-full bg-[#4682b4] opacity-25"></div>

      {/* Section divider with enhanced gradient */}
      <div className="relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[6px] after:bg-gradient-to-r after:from-[#4682b4] after:via-[#87ceeb] after:to-[#4682b4] after:animate-pulse"></div>

      <SectionTitle
        text="Our Blogs"
        description="Inside view of the beautiful places you will travel."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto px-4 py-8">
        {/* Image side with enhanced styling */}
        <div className="relative flex justify-center md:justify-end group">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-[#4682b440] to-[#87ceeb40] blur-lg group-hover:scale-110 transition-all duration-500"></div>
          <img
            src="/Girl.webp"
            alt="Travel Girl"
            className="h-80 sm:h-96 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl object-cover [mask-image:url('/Brush.webp')] [mask-size:contain] [mask-repeat:no-repeat] transition-transform duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          {/* Decoration dots */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#4682b440] rounded-full hidden md:block"></div>
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#87ceeb40] rounded-full hidden md:block"></div>
        </div>

        {/* Content side with enhanced styling */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm md:max-w-md lg:max-w-lg mx-auto relative">
          {/* Blue accent line */}
          <div className="w-16 h-1 bg-gradient-to-r from-[#4682b4] to-[#87ceeb] mb-4 rounded-full"></div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#2c5282] relative">
            Beautiful Kerala
            <span className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-1 bg-[#4682b4] transition-all duration-500"></span>
          </h2>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We are ready to help you build and also realize the room design that
            you dream of with our experts and also the best category
            recommendations from us.
          </p>

          {/* Read more button with hover effect */}
          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-[#4682b4] to-[#87ceeb] text-white rounded-full hover:shadow-lg hover:shadow-[#4682b440] transition-all duration-300 flex items-center group">
            <a href="/blogs">Read More</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Blog stats with blue theme */}
          <div className="flex gap-4 mt-8">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#4682b420] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#4682b4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span className="ml-2 text-sm text-gray-600">5 min read</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#87ceeb20] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#87ceeb]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="ml-2 text-sm text-gray-600">Jun 12, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="w-full h-16 bg-[#e0ebff] relative overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,181.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </MotionSection>
  );
};

export default Blog;
