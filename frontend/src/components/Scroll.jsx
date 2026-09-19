import React from 'react';

export default function InfiniteHorizontalScroll() {
  const announcements = [
    "⭐ 100% Genuine NCERT Textbooks (Classes 1 to 12)",
    "📚 Official Haryana Board (BSEH) Curriculum Books Available",
    "🚚 Fast Courier Delivery Across Haryana & India",
    "✏️ Complete School Stationery, Classmate Notebooks & Art Supplies",
    "💬 WhatsApp Direct Order: +91 98120 64112",
    "🏫 Special Bulk & School Order Pricing Available"
  ];

  const content = announcements.join(' \u00A0 • \u00A0 ');

  return (
    <div className="w-full overflow-hidden bg-amber-50/90 border-y border-amber-200/80 py-2.5 my-6 sm:my-8 shadow-xs">
      <div className="relative flex whitespace-nowrap animate-marquee text-amber-950 font-semibold text-xs sm:text-sm tracking-wide hover:[animation-play-state:paused]">
        <span className="pr-12">{content}</span>
        <span className="pr-12">{content}</span>
        <span className="pr-12">{content}</span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
