"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Small Orders",
    price: "₦1,000",
    description: "service fee",
    features: [
      "Up to 5 items",
      "Delivery within 24 hours",
      "Free delivery in Abuja",
    ],
    popular: false,
  },
  {
    name: "Large Orders",
    price: "₦2,500",
    description: "service fee",
    features: [
      "6 to 20 items",
      "Delivery within 24 hours",
      "Free delivery in Abuja",
    ],
    popular: true,
  },
];

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
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
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Simple Pricing
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            No hidden fees. What you see is what you pay.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div
                className={`relative h-full p-4 sm:p-6 md:p-8 rounded-2xl transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl shadow-primary/25 transform hover:scale-[1.02]"
                    : "bg-white border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl"
                }`}
              >
                <h3 className={`font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 ${plan.popular ? "text-white/90" : ""}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl sm:text-4xl font-bold ${plan.popular ? "text-white" : "text-primary"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xs sm:text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </span>
                </div>

                <ul className={`mt-4 sm:mt-6 space-y-2 sm:space-y-3 ${plan.popular ? "text-white/90" : ""}`}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular ? "bg-white/20" : "bg-primary/10"
                      }`}>
                        <svg className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${plan.popular ? "text-white" : "text-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/order"
                  className={`mt-4 sm:mt-6 block w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium text-center transition-all duration-200 text-sm sm:text-base ${
                    plan.popular
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-xs sm:text-sm mt-6 sm:mt-8 ${visible ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          Need more than 20 items?{" "}
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact us
          </Link>{" "}
          for special rates.
        </p>
      </div>
    </section>
  );
}
