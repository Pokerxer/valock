"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Small Orders",
    price: "₦1,500",
    description: "For up to 5 items",
    items: "Up to 5 items",
    delivery: "Within 24 hours",
    features: ["Fresh items from any market", "Delivery fee: ₦500-₦1,500", "Real-time updates"],
    popular: false,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Large Orders",
    price: "₦3,000",
    description: "For 6-20 items",
    items: "6 to 20 items",
    delivery: "Within 24 hours",
    features: ["Fresh items from any market", "Delivery fee: ₦500-₦1,500", "Real-time updates", "Priority handling"],
    popular: true,
    color: "from-primary to-emerald-500",
  },
  {
    name: "Bulk Orders",
    price: "Custom",
    description: "For 21+ items",
    items: "21+ items",
    delivery: "Same day available",
    features: ["Fresh items from any market", "Delivery fee varies", "Dedicated shopper", "Volume discounts"],
    popular: false,
    color: "from-purple-500 to-pink-500",
  },
];

const deliveryZones = [
  { zone: "Central Abuja", time: "2-4 hours", fee: "₦500", icon: "🏙️" },
  { zone: "Gwarinpa & suburbs", time: "4-6 hours", fee: "₦1,000", icon: "🏘️" },
  { zone: "Lugbe & Airport Road", time: "4-6 hours", fee: "₦1,000", icon: "✈️" },
  { zone: "Kubwa & Bwari", time: "6-8 hours", fee: "₦1,500", icon: "🌳" },
];

const examples = [
  {
    title: "Weekly Groceries",
    items: ["Tomatoes (2kg)", "Onions (1kg)", "Pepper (500g)", "Fish (2 pieces)", "Palm oil (2L)"],
    serviceFee: "₦1,500",
    delivery: "₦500",
    total: "₦2,000",
    emoji: "🛒",
  },
  {
    title: "Party Provisions",
    items: ["Chicken (5kg)", "Rice (10kg)", "Pepper (2kg)", "Oil (4L)", "Spices mix"],
    serviceFee: "₦3,000",
    delivery: "₦1,000",
    total: "₦4,000",
    emoji: "🎉",
  },
  {
    title: "Restaurant Stock",
    items: ["Vegetables (10kg)", "Fish (5kg)", "Meat (5kg)", "Spices (2kg)", "Oil (10L)"],
    serviceFee: "Custom",
    delivery: "₦1,500",
    total: "Custom",
    emoji: "🏪",
  },
];

const faqs = [
  {
    q: "Is there a minimum order?",
    a: "No minimum order! You can order just 1 item and we will deliver it. Our service fee starts at ₦1,500 plus delivery.",
  },
  {
    q: "What if an item is not available?",
    a: "If an item is not available at your preferred market, our shopper will contact you immediately to suggest alternatives.",
  },
  {
    q: "How much is delivery?",
    a: "Delivery fees range from ₦500-₦1,500 depending on your location in Abuja. Central areas are ₦500, suburbs are ₦1,000, and remote areas are ₦1,500.",
  },
  {
    q: "Can I tip my shopper?",
    a: "Tips are optional but appreciated! You can add a tip during checkout or in cash on delivery.",
  },
  {
    q: "How do bulk orders work?",
    a: "For orders of 21+ items, we offer custom pricing. Contact us for a quote with dedicated shopper and delivery.",
  },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-emerald-50 to-secondary/5 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-primary/20 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Reliable delivery across Abuja
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              No hidden fees. No surprises. What you see is what you pay.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 md:py-24 px-4 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {pricingPlans.map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 150}>
                <div
                  className={`relative h-full group cursor-pointer ${
                    plan.popular ? "md:-mt-4" : ""
                  }`}
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg`}></div>
                  
                  <div className={`relative h-full bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 ${
                    plan.popular 
                      ? "ring-2 ring-primary shadow-2xl shadow-primary/15 scale-100 md:scale-105" 
                      : "shadow-xl hover:shadow-2xl"
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-primary to-emerald-500 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>

                    <div className="text-center mb-6">
                      {plan.price === "Custom" ? (
                        <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                          Custom Pricing
                        </div>
                      ) : (
                        <>
                          <div className="text-5xl font-bold bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                            {plan.price}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">service fee</div>
                        </>
                      )}
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-sm">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white text-xs font-bold`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{plan.items}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-muted-foreground">{plan.delivery}</span>
                      </div>
                      {plan.features.slice(2).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/order"
                      className={`block w-full py-4 rounded-2xl font-semibold text-center transition-all duration-300 group-hover:scale-105 ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-emerald-500 text-white hover:shadow-lg hover:shadow-primary/25"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {plan.price === "Custom" ? "Contact Us" : "Get Started"}
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Delivery in Abuja</h2>
              <p className="text-muted-foreground text-lg">Delivery available to all areas in Abuja</p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliveryZones.map((zone, index) => (
              <AnimatedSection key={zone.zone} delay={index * 100}>
                <div className="group p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {zone.icon}
                  </div>
                  <h3 className="font-bold mb-2">{zone.zone}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{zone.time}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {zone.fee} delivery
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-10 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Delivery Times</h4>
                  <p className="text-sm text-amber-700">
                    Times are estimates. Actual delivery may vary based on market availability and traffic conditions.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Examples */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Price Examples</h2>
              <p className="text-muted-foreground text-lg">See how our pricing works for typical orders</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <AnimatedSection key={example.title} delay={index * 150}>
                <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{example.emoji}</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-emerald-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-4">{example.title}</h3>
                  
                  <ul className="space-y-2 mb-6">
                    {example.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium">{example.serviceFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium">{example.delivery}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                        {example.total}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.167 2.142-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing Questions</h2>
              <p className="text-muted-foreground text-lg">Common questions about our pricing</p>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaq === index 
                    ? "border-primary/30 bg-primary/5 shadow-lg" 
                    : "border-gray-100 hover:border-gray-200"
                }`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                        openFaq === index ? "rotate-180" : ""
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
                      openFaq === index ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-500 to-primary"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Place Your Order?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Try our service today and see how easy shopping can be!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="group bg-white text-primary font-semibold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Place an Order
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-white text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:text-primary transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat on WhatsApp
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
