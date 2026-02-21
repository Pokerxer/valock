"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const values = [
  {
    title: "Trust",
    description: "We build lasting relationships with our customers through honest service and reliable delivery.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Reliability",
    description: "We deliver on our promises. Every order, every time - you can count on us.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Speed",
    description: "We value your time. Fast delivery is not a luxury - it is our standard.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Quality",
    description: "Only the freshest items, carefully selected from the best markets in Abuja.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "CEO & Founder",
    bio: "Passionate about making shopping easier for busy Abuja residents",
    emoji: "👨‍💼",
  },
  {
    name: "Operations Manager",
    bio: "Ensures every delivery runs smoothly and on time",
    emoji: "👩‍💼",
  },
  {
    name: "Head of Shoppers",
    bio: "Leads our team of dedicated shoppers across all markets",
    emoji: "🛒",
  },
];

const stats = [
  { value: "2,000+", label: "Happy Customers" },
  { value: "15,000+", label: "Orders Delivered" },
  { value: "6", label: "Markets Covered" },
  { value: "4.8/5", label: "Average Rating" },
];

const milestones = [
  { year: "2024", title: "Started in Abuja", description: "Valock was born from a simple idea: make market shopping effortless" },
  { year: "2025", title: "Expanded to 6 Markets", description: "Now serving customers across all major markets in Abuja" },
  { year: "2026", title: "2,000+ Customers", description: "Thousands of happy customers trust us for their daily shopping" },
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 via-emerald-50 to-secondary/5 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-primary">Valock</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are your personal shoppers in Abuja, bringing the markets to your doorstep so you can focus on what matters most.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-4">
                Valock started in 2024 with a simple problem: busy Abuja residents spending hours at the market when they could be working, spending time with family, or just relaxing.
              </p>
              <p className="mb-4">
                We believed there had to be a better way. So we built Valock - your personal shopping service that brings the market experience to you.
              </p>
              <p>
                Today, we serve thousands of customers across Abuja, partnering with local markets to deliver fresh groceries directly to doors across the city. And we are just getting started.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 100}>
                <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-primary/10 to-emerald-50 rounded-3xl p-8 h-full">
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To make market shopping effortless for every Abuja resident by delivering fresh groceries directly to their doorstep, saving them time and stress.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="bg-gradient-to-br from-secondary/10 to-orange-50 rounded-3xl p-8 h-full">
                <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the most trusted personal shopping service in Nigeria, making quality groceries accessible to everyone, one delivery at a time.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg">The principles that guide everything we do</p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <div className="group p-6 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground text-lg">Key milestones in our story</p>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 150}>
                  <div className={`relative flex items-start gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 ring-4 ring-white"></div>
                    
                    <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <span className="inline-block text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Valock?</h2>
            <p className="text-muted-foreground text-lg mb-12">More than just a delivery service</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { emoji: "⏱️", title: "Save Time", desc: "Skip the market queues" },
              { emoji: "💰", title: "Best Prices", desc: "We haggle so you don't have to" },
              { emoji: "🚚", title: "Fast Delivery", desc: "Within 24 hours" },
              { emoji: "📱", title: "Easy Tracking", desc: "Know where your order is" },
              { emoji: "💳", title: "Flexible Payment", desc: "Pay online or on delivery" },
              { emoji: "📞", title: "24/7 Support", desc: "We are always available" },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 50}>
                <div className="p-6 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-primary to-emerald-600">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Try Valock?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of happy customers in Abuja who have transformed their shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="bg-white text-primary font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Place an Order
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
