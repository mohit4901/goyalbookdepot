import React from 'react';
import { assets } from '../assets/assets';

const Founders = () => {
  return (
    <section className="my-16 sm:my-20">
      <div className="bg-gradient-to-b from-stone-50 to-amber-50/40 border border-stone-200/70 rounded-3xl p-6 sm:p-12 shadow-sm max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-100/80 text-amber-900 border border-amber-300/60 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <span>🎖️</span> Estd. 1965 • 50+ Years Legacy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Our Founder & Guiding Vision
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
            The values and passion behind Goyal Book Depot & Stationers
          </p>
        </div>

        {/* Founder Content Container */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Founder Image Frame */}
          <div className="relative group max-w-sm w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-indigo-200 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img
              src={assets.founders}
              alt="Sh. Roshan Lal Goyal - Founder of Goyal Book Depot"
              className="relative w-full h-auto max-h-[380px] object-cover rounded-2xl border-4 border-white shadow-xl mx-auto"
            />
          </div>

          {/* Name & Title */}
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Sh. Roshan Lal Goyal
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider">
              Founder & Patriarch
            </p>
          </div>

          {/* Founder Message / Quote */}
          <div className="max-w-xl mx-auto relative bg-white/80 p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
              “Education is the greatest foundation we can offer our youth. For over five decades, our aim has been simple: ensuring every student, parent, and school in Haryana receives genuine textbooks, reliable stationery, and heartfelt service.”
            </p>
          </div>

          {/* Heritage Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-600 pt-2">
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
              ✓ Serving 3+ Generations
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
              ✓ 100% Authentic Learning Material
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
              ✓ Fair Pricing Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founders;
