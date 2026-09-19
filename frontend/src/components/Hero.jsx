import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="my-14 sm:my-18">
      <div className="rounded-3xl bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-white border border-amber-200/70 p-6 sm:p-10 md:p-14 shadow-md flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden relative">
        {/* Left Side: Offer & Headline */}
        <div className="flex-1 space-y-4 text-left">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full">
            <span>⭐</span> CURATED FOR STUDENTS & TEACHERS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Latest Arrivals & <br className="hidden sm:inline" />
            <span className="text-indigo-600">Exam Essentials</span>
          </h2>

          <p className="text-base sm:text-lg font-semibold text-gray-700">
            Get up to <span className="text-red-600 font-extrabold">30% Off</span> on NCERT & Guidebook Bundles
          </p>

          <p className="text-xs sm:text-sm text-gray-600 max-w-lg leading-relaxed">
            From Class 1 to 12th textbooks, CBSE sample papers, and competitive exam books to premium Classmate notebooks and stationery sets — everything under one roof.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to="/collection"
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center gap-2"
            >
              Explore All Books ➔
            </Link>
            <Link
              to="/about"
              className="px-5 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold text-xs sm:text-sm rounded-xl transition-all"
            >
              About Goyal Depot
            </Link>
          </div>
        </div>

        {/* Right Side: Image Showcase */}
        <div className="flex-1 w-full max-w-md relative flex items-center justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200/80 bg-white">
            <img
              className="w-full h-auto object-cover max-h-[360px] hover:scale-105 transition-transform duration-500"
              src={assets.hero11}
              alt="School Stationery and Books"
            />
            {/* Floating Badges */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2 text-xs font-bold text-gray-800">
              <span className="text-emerald-500">✓</span> 100% Genuine Editions
            </div>
            <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow">
              New Syllabus
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
