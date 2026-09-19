import React from 'react';
import { Link } from 'react-router-dom';

const AuthorizedDistributor = () => {
  return (
    <section className="my-16 sm:my-20">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-indigo-500/20 overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-200 tracking-wide">
            <span>🏛️</span> BSEH & CBSE ACCREDITED DISTRIBUTOR
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Authorized Distributor of Official School Books
          </h2>

          <p className="text-indigo-200/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Proudly serving as the authorized educational distributor for schools affiliated with the{' '}
            <span className="text-amber-300 font-semibold">Haryana Board (BSEH)</span> and{' '}
            <span className="text-amber-300 font-semibold">CBSE</span>. Genuine textbooks and approved learning materials.
          </p>

          {/* 4 Trust Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm space-y-1">
              <span className="text-2xl">📚</span>
              <h4 className="font-bold text-sm text-white">100% Genuine</h4>
              <p className="text-[11px] text-gray-300">Direct from official government publishers.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm space-y-1">
              <span className="text-2xl">🏫</span>
              <h4 className="font-bold text-sm text-white">All Class Sets</h4>
              <p className="text-[11px] text-gray-300">Complete Nursery to 12th book bundles.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm space-y-1">
              <span className="text-2xl">🏷️</span>
              <h4 className="font-bold text-sm text-white">Best Pricing</h4>
              <p className="text-[11px] text-gray-300">Special discounts for students & schools.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm space-y-1">
              <span className="text-2xl">🚚</span>
              <h4 className="font-bold text-sm text-white">Fast Dispatch</h4>
              <p className="text-[11px] text-gray-300">Reliable delivery across Haryana & India.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <Link
              to="/collection"
              className="px-6 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs sm:text-sm shadow-lg transition-all"
            >
              Browse Syllabus Books ➔
            </Link>
            <a
              href="https://wa.me/919812064112"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2"
            >
              <span>💬</span> Bulk School Orders
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorizedDistributor;