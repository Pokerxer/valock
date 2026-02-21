"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-600"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 sm:-24 -right-16 sm:-24 w-40 sm:w-64 h-40 sm:h-64 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute -bottom-16 sm:-24 -left-16 sm:-24 w-40 sm:w-64 h-40 sm:h-64 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
            Ready to Place Your Order?
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            It only takes 2 minutes to place an order. Tell us what you need and we&apos;ll get it for you!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <Link
              href="/order"
              className="group bg-white text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-2xl hover:shadow-black/10 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Your Order
            </Link>
            <Link
              href="/contact"
              className="group border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-primary transition-all duration-200 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat on WhatsApp
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 px-4">
            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No commitment</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free delivery</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Pay on delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
