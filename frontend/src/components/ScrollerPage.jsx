import React from 'react';
import { assets } from '../assets/assets';

export default function ScrollerPage() {
  const row1 = [
    assets.s1, assets.s2, assets.s3, assets.s4, assets.s5,
    assets.s6, assets.s7, assets.s8, assets.s9, assets.s10,
    assets.s11, assets.s12, assets.s13,
  ];

  const row2 = [
    assets.s16, assets.s17, assets.s18, assets.s19, assets.s20,
    assets.s21, assets.s22, assets.s23, assets.s24, assets.s25,
    assets.s14, assets.s15,
  ];

  return (
    <section className="my-16 sm:my-24">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <span>📸</span> Real Store Tour
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
          Glimpses of Goyal Book Depot ✨
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          A look inside our bookstore, wholesale inventory, and school supplies warehouse.
        </p>
      </div>

      {/* Full-bleed marquee container */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-10 flex flex-col gap-6 overflow-hidden border-y border-slate-800 shadow-xl">
        {/* ROW 1 */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-4 animate-[scrollLeft_50s_linear_infinite] hover:[animation-play-state:paused]">
            {[...row1, ...row1].map((img, i) => (
              <div
                key={i}
                className="h-36 sm:h-48 w-52 sm:w-72 rounded-2xl overflow-hidden border-2 border-slate-800/80 shadow-lg flex-shrink-0 bg-slate-800"
              >
                <img
                  src={img}
                  alt={`GBD Store ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-4 animate-[scrollRight_55s_linear_infinite] hover:[animation-play-state:paused]">
            {[...row2, ...row2].map((img, i) => (
              <div
                key={i}
                className="h-36 sm:h-48 w-52 sm:w-72 rounded-2xl overflow-hidden border-2 border-slate-800/80 shadow-lg flex-shrink-0 bg-slate-800"
              >
                <img
                  src={img}
                  alt={`GBD Warehouse ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CSS Keyframes */}
        <style>{`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
