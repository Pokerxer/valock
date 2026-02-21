"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const faqCategories = [
  {
    category: "Ordering",
    faqs: [
      {
        question: "How do I place an order?",
        answer: "Simply visit our Order page, fill in your details, list the items you need, and confirm. Our shopper will handle the rest!",
      },
      {
        question: "Can I add more items after placing an order?",
        answer: "Yes! You can contact us via WhatsApp or call us before your order is being shopped, and we'll add the extra items to your list.",
      },
      {
        question: "What information do I need to provide?",
        answer: "You'll need your name, phone number, delivery address, a list of items you want, and your preferred market. That's it!",
      },
      {
        question: "Can I upload an image of my shopping list?",
        answer: "Absolutely! Instead of typing each item, you can snap a photo of your list or the products you want and upload it.",
      },
    ],
  },
  {
    category: "Delivery",
    faqs: [
      {
        question: "How long does delivery take?",
        answer: "We deliver within 24 hours. Most orders are delivered within 2-6 hours depending on your location and market availability.",
      },
      {
        question: "What areas do you deliver to?",
        answer: "We currently deliver within Abuja and its surroundings. This includes Gwarinpa, Maitama, Wuse, Asokoro, Jabi, Utako, and more.",
      },
      {
        question: "How much is delivery fee?",
        answer: "Delivery fees range from ₦500 to ₦1,500 depending on your location. You can check our Pricing page for details.",
      },
      {
        question: "Do you deliver outside Abuja?",
        answer: "Currently we only deliver within Abuja. Contact us if you are outside Abuja and we will see what we can do.",
      },
    ],
  },
  {
    category: "Payment",
    faqs: [
      {
        question: "How do I pay?",
        answer: "You can pay online via card, bank transfer, or USSD through our secure payment partners. You can also pay on delivery for orders under ₦10,000.",
      },
      {
        question: "Is online payment safe?",
        answer: "Yes! We use Paystack and Flutterwave - Nigeria's most trusted payment gateways. Your card details are never stored on our servers.",
      },
      {
        question: "Can I pay on delivery?",
        answer: "Yes! Cash on Delivery is available for orders under ₦10,000. A small booking fee may be required to confirm your order.",
      },
      {
        question: "What if payment fails?",
        answer: "Don't worry - you'll see a can try again. Your order details won't clear error message and be lost. Contact us if the issue persists.",
      },
    ],
  },
  {
    category: "Orders & Refunds",
    faqs: [
      {
        question: "What if items are not available?",
        answer: "If any item is not available, our shopper will contact you immediately to suggest alternatives or remove the item from your order.",
      },
      {
        question: "Can I cancel my order?",
        answer: "Yes, you can cancel before shopping starts. Contact us via WhatsApp or call us to request cancellation.",
      },
      {
        question: "How do I track my order?",
        answer: "Use the Order ID sent to your phone or enter your phone number on our Track Order page to see real-time status updates.",
      },
      {
        question: "What is your refund policy?",
        answer: "We offer refunds for orders that cannot be fulfilled or if you're unsatisfied. Contact us within 24 hours of delivery to discuss.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<{ category: number; index: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredFaqs = searchQuery
    ? faqCategories.map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          (f) =>
            f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.faqs.length > 0)
    : faqCategories;

  return (
    <main className="min-h-screen bg-gray-50">
      <section ref={sectionRef} className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Frequently Asked Questions
          </h1>
          <p
            className={`text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Got questions? We have answers. Find everything you need to know about Valock below.
          </p>

          <div
            className={`mt-8 max-w-xl mx-auto transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border-0 shadow-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-500">Try a different search term or contact us directly.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-4 text-primary font-medium hover:underline"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {filteredFaqs.map((category, catIndex) => (
                <div
                  key={catIndex}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenCategory(openCategory === catIndex ? null : catIndex)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                  >
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {category.category}
                    </h2>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openCategory === catIndex ? "rotate-180" : ""
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
                      openCategory === catIndex ? "max-h-[1000px]" : "max-h-0"
                    }`}
                  >
                    <div className="p-4 sm:p-5 pt-0 space-y-2 sm:space-y-3">
                      {category.faqs.map((faq, faqIndex) => (
                        <div
                          key={faqIndex}
                          className="border border-gray-100 rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() =>
                              setOpenFaq(
                                openFaq?.category === catIndex && openFaq?.index === faqIndex
                                  ? null
                                  : { category: catIndex, index: faqIndex }
                              )
                            }
                            className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-sm sm:text-base pr-2 text-gray-700">
                              {faq.question}
                            </span>
                            <svg
                              className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                                openFaq?.category === catIndex && openFaq?.index === faqIndex
                                  ? "rotate-180"
                                  : ""
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
                              openFaq?.category === catIndex && openFaq?.index === faqIndex
                                ? "max-h-40"
                                : "max-h-0"
                            }`}
                          >
                            <p className="p-3 sm:p-4 pt-0 text-gray-500 text-xs sm:text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 sm:mt-16 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Can't find the answer you're looking for? Reach out to our team and we'll be happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </Link>
              <a
                href="https://wa.me/2347000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-100 text-primary font-medium rounded-xl hover:bg-emerald-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
