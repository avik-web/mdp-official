"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";

const partnersData = [
  {
    src: "/assets/partners/sbi.png",
    alt: "State Bank of India",
  },
  {
    src: "/assets/partners/pnb.png",
    alt: "Punjab National Bank",
  },
  {
    src: "/assets/partners/icici.png",
    alt: "ICICI Bank",
  },
  {
    src: "/assets/partners/indian.png",
    alt: "Indian Bank",
  },
  {
    src: "/assets/partners/lic.png",
    alt: "Life Insurance Corporation",
  },
  {
    src: "/assets/partners/aadhar-housing.png",
    alt: "Aadhar Housing Finance",
  },
  {
    src: "/assets/partners/hdfc.png",
    alt: "HDFC Bank",
  },
  {
    src: "/assets/partners/canara.jpeg",
    alt: "Canara Bank",
  },
];

const Partners = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const next = scrollLeft + 1;
      if (next >= scrollWidth - clientWidth) {
        el.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
      } else {
        el.scrollTo({ left: next, behavior: "instant" as ScrollBehavior });
      }
    }, 20);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleEnter = () => stopAutoScroll();
    const handleLeave = () => startAutoScroll();

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    startAutoScroll();

    return () => {
      stopAutoScroll();
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [startAutoScroll, stopAutoScroll]);

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      id="client"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Banking Partners
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are associated with leading financial institutions to provide our clients with seamless home loan solutions.
        </p>
      </div>
      
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 py-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {partnersData.map((item, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="w-40 h-24 relative flex items-center justify-center bg-white p-4">
                <Image
                  src={item.src}
                  fill
                  sizes="(max-width: 768px) 100px, 160px"
                  alt={item.alt || "Banking partner"}
                  className="object-contain transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
          
          {/* Duplicate for seamless looping */}
          {partnersData.map((item, index) => (
            <div key={`dup-${index}`} className="flex-shrink-0">
              <div className="w-40 h-24 relative flex items-center justify-center bg-white rounded-lg p-4">
                <Image
                  src={item.src}
                  fill
                  sizes="(max-width: 768px) 100px, 160px"
                  alt={item.alt || "Banking partner"}
                  className="object-contain transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient fade effects on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20"></div>
      </div>
    </section>
  );
};

export default Partners;