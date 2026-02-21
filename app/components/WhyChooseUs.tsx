"use client";

import { useEffect, useRef, useState } from "react";

const benefits = [
  {
    title: "Fast Delivery",
    description: "We deliver within 24 hours. Your items arrive fresh and on time.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Best Prices",
    description: "We know the markets well. We get you the best prices every time.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Trusted Service",
    description: "Thousands of happy customers. Your satisfaction is our priority.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
  },
];

export default function WhyChooseUs() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          benefits.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 100);
          });
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
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Why Choose Valock?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            We make shopping easy, affordable, and reliable for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group relative bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className={`relative inline-flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-br ${benefit.color} text-white shadow-lg mb-4 sm:mb-5 transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}>
                {benefit.icon}
              </div>

              <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {benefit.description}
              </p>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex items-center gap-2 text-primary text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
