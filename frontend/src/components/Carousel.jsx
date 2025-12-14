import { useState, useEffect } from "react";

// Import images directly
import m_11 from "../assets/m_11.jpg"; // adjust extension if needed (.png, .jpeg, etc.)
import m2 from "../assets/m2.jpg";
import m3 from "../assets/m3.jpg";
import m4 from "../assets/m4.jpg";
// Add more imports as needed

export default function SimpleCarousel() {
  const slides = [
    m_11,
    m2,
    m3,
    m4
    // Add more images here
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[240px] sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden rounded-lg mb-[-240px] sm:mb-6 md:mb-8 lg:mb-0">
    {/* Slides container */}
    <div className="relative w-full h-full mx-auto">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <img 
              src={slide} 
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Bottom dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === i ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}