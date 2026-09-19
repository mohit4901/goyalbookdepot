import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <section className="my-14 sm:my-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {/* Policy 1 */}
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-xs border border-gray-200 flex items-center justify-center mx-auto">
            <img src={assets.exchange_icon} className="w-6 h-6 object-contain" alt="Exchange" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-gray-900">Easy Exchange Policy</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
            Received the wrong class or syllabus set? We provide a smooth, hassle-free 7-day exchange.
          </p>
        </div>

        {/* Policy 2 */}
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-xs border border-gray-200 flex items-center justify-center mx-auto">
            <img src={assets.quality_icon} className="w-6 h-6 object-contain" alt="Quality" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-gray-900">100% Genuine Books</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
            Original, authentic NCERT and Haryana Board textbooks directly from accredited publishers.
          </p>
        </div>

        {/* Policy 3 */}
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-xs border border-gray-200 flex items-center justify-center mx-auto">
            <img src={assets.support_img} className="w-6 h-6 object-contain" alt="Support" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-gray-900">Dedicated Support</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
            Instant help via WhatsApp and phone (+91 98120 64112) for syllabus, school sets, and order tracking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
