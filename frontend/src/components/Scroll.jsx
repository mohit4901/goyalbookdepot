

export default function InfiniteHorizontalScroll() {
  const messages = [
    "After adding your items, please review your cart to confirm your selections — happy reading and shopping!”",
    "We’re here to assist you 24/7 — your trusted partner for books and stationery.",
    "Enjoy a flat 30% discount on all Arihant books — only at Goyal Book Store!",
    "Explore our wide collection of gift items and all types of premium stationery — everything you need under one roof."
  ];

  const repeated = Array(10).fill(messages.join(' \u00A0 • \u00A0 ')).join(' \u00A0 • \u00A0 ');

  return (
    <div className="w-full overflow-hidden bg-[#F5F5DC] py-2 mt-6 sm:mt-10 md:mt-12 lg:mt-16">
      <div className="relative flex whitespace-nowrap animate-marquee text-black font-medium text-sm sm:text-base">
        <span className="pr-12">{repeated}</span>
        <span className="pr-12">{repeated}</span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
          /* Set margin-top to 300px for small screens */
          .mt-6 {
            margin-top: 320px !important;
          }
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
