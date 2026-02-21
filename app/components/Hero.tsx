"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "Available in Abuja",
    title: "We Buy and Deliver",
    subtitle: "Anything You Need",
    description: "Tell us what you want from any market in Abuja. We'll buy it and deliver it to your door.",
    cta: "Place an Order",
    ctaLink: "/order",
    secondaryCta: "Track Order",
    secondaryLink: "/track",
    stats: "2,000+ happy customers",
  },
  {
    id: 2,
    badge: "Fast Delivery",
    title: "Fresh groceries",
    subtitle: "Delivered Same Day",
    description: "Get fresh foodstuff from any market in Abuja delivered to your doorstep within hours.",
    cta: "Order Groceries",
    ctaLink: "/order",
    secondaryCta: "See Pricing",
    secondaryLink: "/pricing",
    stats: "24-hour delivery",
  },
  {
    id: 3,
    badge: "Save Time",
    title: "Skip the Market",
    subtitle: "Let Us Shop for You",
    description: "No more queuing or haggling. Our shoppers get you the best deals so you don't have to.",
    cta: "Start Shopping",
    ctaLink: "/order",
    secondaryCta: "How It Works",
    secondaryLink: "/#how-it-works",
    stats: "Save 3+ hours",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-40 -right-20 sm:-40 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-primary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-40 -left-20 sm:-40 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-secondary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center py-6 sm:py-8 lg:py-12">
                    <div className="text-center lg:text-left order-2 lg:order-1 px-2 sm:px-0">
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full mb-3 sm:mb-4">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        {slide.badge}
                      </div>

                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight">
                        {slide.title}
                        <br />
                        <span className="text-primary">{slide.subtitle}</span>
                      </h1>

                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-5 sm:mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center lg:justify-start">
                        <Link
                          href={slide.ctaLink}
                          className="bg-primary text-white font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 active:scale-95 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {slide.cta}
                        </Link>
                        <Link
                          href={slide.secondaryLink}
                          className="border-2 border-primary text-primary font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 active:scale-95 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          {slide.secondaryCta}
                        </Link>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center lg:justify-start">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600"
                            >
                              {String.fromCharCode(64 + i)}
                            </div>
                          ))}
                        </div>
                        <div className="text-xs sm:text-sm">
                          <span className="font-semibold text-primary">{slide.stats}</span>
                        </div>
                      </div>
                    </div>

                    <div className="order-1 lg:order-2 hidden lg:block">
                      <div className="relative w-full aspect-square max-w-sm lg:max-w-md mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl rotate-6 animate-spin-slow"></div>
                        <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-4 sm:p-6">
                          <div className="h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-sm sm:text-base">{slide.title}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">Latest Order</p>
                              </div>
                            </div>

                            <div className="flex-1 space-y-2 sm:space-y-3">
                              {[
                                { item: "Fresh Tomatoes", market: "Wuse Market", price: "₦2,500" },
                                { item: "Tilapia Fish", market: "Gwagwalada Market", price: "₦4,000" },
                                { item: "Palm Oil (5L)", market: "Karu Market", price: "₦3,500" },
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <p className="font-medium text-xs sm:text-sm">{item.item}</p>
                                    <p className="text-xs text-muted-foreground hidden sm:block">{item.market}</p>
                                  </div>
                                  <span className="font-semibold text-primary text-xs sm:text-sm">{item.price}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t flex justify-between items-center">
                              <span className="text-muted-foreground text-xs sm:text-sm">Total</span>
                              <span className="text-lg sm:text-xl font-bold text-primary">₦10,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hidden lg:flex"
            aria-label="Previous slide"
          >
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hidden lg:flex"
            aria-label="Next slide"
          >
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-6 sm:w-8 bg-primary"
                    : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
