"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const markets = [
  { name: "Wuse Market", icon: "🛒" },
  { name: "Gwagwalada Market", icon: "🐟" },
  { name: "Karu Market", icon: "🥬" },
  { name: "Maitama Market", icon: "🍎" },
  { name: "Gwarinpa Market", icon: "🥩" },
  { name: "Utako Market", icon: "🌶️" },
];

export default function Markets() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Markets We Serve in Abuja
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Our shoppers buy from the best markets across Abuja to get you the freshest items at the best prices.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {markets.map((market, index) => (
            <div
              key={market.name}
              className={`group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="text-xl sm:text-2xl md:text-3xl">{market.icon}</span>
              <span className="font-medium text-xs sm:text-sm md:text-base">{market.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-5 sm:mt-6">
          Can&apos;t see your market?{" "}
          <a href="/contact" className="text-primary font-medium hover:underline">
            Let us know
          </a>
        </p>
      </div>
    </section>
  );
}
