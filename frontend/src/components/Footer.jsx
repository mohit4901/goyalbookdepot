import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 pt-12 border-t border-gray-200 text-sm">
      <div className="flex flex-col sm:grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1.5fr] gap-10 mb-12">
        {/* Brand & Mission */}
        <div className="space-y-4">
          <Link to="/" onClick={scrollToTop} className="inline-block">
            <img src={assets.logo} className="w-36 hover:opacity-90 transition-opacity" alt="Goyal Book Depot" />
          </Link>
          <p className="w-full md:w-4/5 text-gray-600 leading-relaxed text-xs sm:text-sm">
            Goyal Book Depot — Your trusted destination for NCERT textbooks, reference books, premium school stationery, notebooks, and student essentials since 1965.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/919812064112"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors font-semibold"
            >
              <span>💬</span> WhatsApp Order
            </a>
            <Link
              to="/collection"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors font-medium"
            >
              Browse Books ➔
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
            Quick Links
          </p>
          <ul className="flex flex-col gap-2.5 text-gray-600 text-xs sm:text-sm">
            <li>
              <Link to="/" onClick={scrollToTop} className="hover:text-black transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/collection" onClick={scrollToTop} className="hover:text-black transition-colors">
                All Collections & Books
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToTop} className="hover:text-black transition-colors">
                About Our Store
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop} className="hover:text-black transition-colors">
                Store Location & Contact
              </Link>
            </li>
            <li>
              <Link to="/orders" onClick={scrollToTop} className="hover:text-black transition-colors">
                Track My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <p className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">
            Get in Touch
          </p>
          <ul className="flex flex-col gap-3 text-gray-600 text-xs sm:text-sm">
            <li className="flex items-center gap-2">
              <span className="text-base">📞</span>
              <a href="tel:+919812064112" className="hover:text-black font-semibold text-gray-900 transition-colors">
                +91 98120 64112
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">✉️</span>
              <a
                href="mailto:contact@goyalbookstore.com"
                className="hover:text-black transition-colors underline-offset-2 hover:underline"
              >
                contact@goyalbookstore.com
              </a>
            </li>
            <li className="flex items-start gap-2 pt-1 text-xs text-gray-500">
              <span className="text-base">📍</span>
              <span>Goyal Book Depot & Stationers, Main Market. Serving generations of students.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-200 py-6 text-center text-xs text-gray-500 space-y-1">
        <p>© {new Date().getFullYear()} Goyal Book Depot (goyalbookstore.com) — All Rights Reserved.</p>
        <p className="text-gray-400">
          Crafted with <span className="text-red-500">❤️</span> by Mohit Mudgil
        </p>
      </div>
    </footer>
  );
};

export default Footer;
