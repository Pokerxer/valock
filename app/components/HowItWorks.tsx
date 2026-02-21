"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Tell Us What You Want",
    description: "Fill the order form with the items you need, your preferred market, and your delivery address.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "We Shop for You",
    description: "Our shoppers go to the market, buy your items at the best prices, and send you proof.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "We Deliver to You",
    description: "Get your items delivered to your door. Pay online or on delivery - your choice.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Getting what you need has never been easier. Here is how our service works.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center p-4 sm:p-6 lg:p-8 rounded-2xl transition-all duration-500 ${
                visibleSteps.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl transform scale-150"></div>
                <div className="relative w-12 sm:w-14 h-12 sm:h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 transform transition-transform duration-300 hover:scale-110">
                  {step.icon}
                </div>
              </div>
              
              <div className="mt-4 sm:mt-5 lg:mt-6">
                <span className="inline-block w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm flex items-center justify-center mb-2 sm:mb-3">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-1/3 -right-2 sm:-right-3 lg:-right-4 transform -translate-y-1/2">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
