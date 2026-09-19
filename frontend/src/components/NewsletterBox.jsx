import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing! Discount coupon sent.');
      setEmail('');
    }
  };

  return (
    <section className="my-14 sm:my-20">
      <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50 border border-indigo-100 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs space-y-4">
        <div className="inline-block bg-white text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
          🎁 Student Special Offer
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Subscribe for Exam Alerts & Discounts
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Get notified when new syllabus sets, CBSE sample papers, and stationery discounts are released.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:max-w-md mx-auto flex items-center bg-white border border-gray-300 rounded-full p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-black"
        >
          <input
            className="w-full px-4 py-2 text-xs sm:text-sm outline-none rounded-l-full bg-transparent text-gray-800"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your student or school email..."
            required
          />
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-semibold text-xs px-6 py-2.5 rounded-full transition-colors flex-shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;
