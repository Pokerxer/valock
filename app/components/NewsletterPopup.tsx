"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("valock-newsletter-seen");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    localStorage.setItem("valock-newsletter-seen", "true");
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      localStorage.setItem("valock-newsletter-seen", "true");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-400 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
      />
      
      <div 
        className={`relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all duration-500 ${
          isClosing 
            ? "opacity-0 scale-90 translate-y-8" 
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-emerald-400 to-secondary"></div>
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100/80 backdrop-blur flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:scale-110 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
          
          {!isSubmitted ? (
            <div className="relative p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-emerald-500 rounded-2xl shadow-lg shadow-primary/30 mb-6 transform hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                
                <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4">
                  Limited Time Offer
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Get <span className="text-primary">₦500 Off</span> Your First Order!
                </h3>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter and get an exclusive discount code delivered to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`relative transition-all duration-300 ${focused ? "transform -translate-y-1" : ""}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Enter your email address"
                    required
                    className={`w-full px-5 py-4 rounded-xl border-2 bg-gray-50/50 outline-none transition-all duration-200 ${
                      focused 
                        ? "border-primary bg-white shadow-lg shadow-primary/10 scale-[1.02]" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className={`w-5 h-5 transition-colors duration-200 ${focused ? "text-primary" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold py-4 rounded-xl hover:from-primary-dark hover:to-emerald-600 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Claim My ₦500 Discount</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>

              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No spam</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative p-8 md:p-10 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green/30 mb-6 animate-bounce">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  You&apos;re In! 🎉
                </h3>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Check your email for your exclusive ₦500 discount code. Use it on your first order!
                </p>
                
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:from-primary-dark hover:to-emerald-600 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                >
                  <span>Use My Discount Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <button
                  onClick={handleClose}
                  className="block w-full mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
