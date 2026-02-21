"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "We deliver within 24 hours. Most orders are delivered within 2-6 hours depending on your location and market availability.",
  },
  {
    question: "How do I pay?",
    answer: "You can pay online via card, bank transfer, or USSD. You can also pay on delivery for orders under ₦10,000.",
  },
  {
    question: "What if items are not available?",
    answer: "If any item is not available, our shopper will contact you immediately to suggest alternatives or remove the item from your order.",
  },
  {
    question: "Do you deliver outside Abuja?",
    answer: "Currently we only deliver within Abuja. Contact us if you are outside Abuja and we will see what we can do.",
  },
];

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Got questions? We have answers.
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-sm sm:text-base pr-2 sm:pr-4">{faq.question}</span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="p-3 sm:p-4 pt-0 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm sm:text-base"
          >
            View all FAQs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
