"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactMethods = [
    {
      title: "WhatsApp",
      description: "Chat with us instantly",
      value: "+234 123 456 7890",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: "bg-green-500",
      href: "https://wa.me/2341234567890",
    },
    {
      title: "Email",
      description: "Send us an email",
      value: "hello@valock.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-blue-500",
      href: "mailto:hello@valock.com",
    },
    {
      title: "Phone",
      description: "Call us during business hours",
      value: "+234 123 456 7890",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.28 3 18.5V5a2 2 0 012-2z" />
        </svg>
      ),
      color: "bg-primary",
      href: "tel:+2341234567890",
    },
  ];

  const subjects = [
    "General Inquiry",
    "Order Support",
    "Bulk/ Corporate Orders",
    "Partnership",
    "Feedback",
    "Other",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 via-emerald-50 to-secondary/5 py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Get in <span className="text-primary">Touch</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <p className="text-muted-foreground text-lg">
              Have a question? We are here to help!
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8 md:-mt-8 px-4 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={method.title} delay={index * 100}>
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`${method.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>
                  <h3 className="font-bold mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <p className="text-sm font-medium text-primary">{method.value}</p>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <AnimatedSection>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
                
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Thank you for reaching out. We will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-primary font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5 ml-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Your name"
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 transition-all ${
                            focusedField === "name" 
                              ? "border-primary bg-white shadow-lg shadow-primary/10" 
                              : "border-transparent hover:border-gray-200 focus:border-primary"
                          } focus:outline-none focus:shadow-lg focus:shadow-primary/10`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5 ml-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="+234 xxx xxx xxxx"
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 transition-all ${
                            focusedField === "phone" 
                              ? "border-primary bg-white shadow-lg shadow-primary/10" 
                              : "border-transparent hover:border-gray-200 focus:border-primary"
                          } focus:outline-none focus:shadow-lg focus:shadow-primary/10`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5 ml-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        required
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 transition-all ${
                          focusedField === "email" 
                            ? "border-primary bg-white shadow-lg shadow-primary/10" 
                            : "border-transparent hover:border-gray-200 focus:border-primary"
                        } focus:outline-none focus:shadow-lg focus:shadow-primary/10`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5 ml-1">
                        Subject *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-gray-50/50 hover:border-gray-200 focus:border-primary focus:outline-none focus:bg-white focus:shadow-lg focus:shadow-primary/10 transition-all appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "20px" }}
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5 ml-1">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 transition-all resize-none ${
                          focusedField === "message" 
                            ? "border-primary bg-white shadow-lg shadow-primary/10" 
                            : "border-transparent hover:border-gray-200 focus:border-primary"
                        } focus:outline-none focus:shadow-lg focus:shadow-primary/10`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-semibold py-4 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9zm0 0v-8" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={200}>
              <div className="space-y-6">
                {/* Business Hours */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                  <h3 className="font-bold text-lg mb-4">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      We are also available on WhatsApp outside business hours for urgent inquiries.
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                  <h3 className="font-bold text-lg mb-4">Our Location</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Abuja, Nigeria</p>
                      <p className="text-sm text-muted-foreground">
                        We serve all areas within Abuja. Our headquarters is centrally located for easy access to all markets.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-gradient-to-br from-primary/10 to-emerald-50 rounded-3xl p-6 md:p-8">
                  <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/order" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Place an Order
                    </Link>
                    <Link href="/track" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Track Order
                    </Link>
                    <Link href="/pricing" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Our Pricing
                    </Link>
                    <Link href="/faq" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      FAQs
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-4">Have a Quick Question?</h2>
            <p className="text-muted-foreground mb-6">
              Check our frequently asked questions for instant answers.
            </p>
            <Link href="/faq" className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors">
              View FAQs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
