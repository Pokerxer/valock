"use client";

import { useState } from "react";
import Link from "next/link";

interface OrderStatus {
  id: string;
  customerName: string;
  phone: string;
  items: string[];
  market: string;
  status: "received" | "assigned" | "shopping" | "delivery" | "delivered";
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  shopperName?: string;
}

const mockOrder: OrderStatus = {
  id: "VL-28475639",
  customerName: "John Doe",
  phone: "+234 123 456 7890",
  items: ["Fresh Tomatoes (2kg)", "Tilapia Fish (3 pieces)", "Palm Oil (2L)", "Onions (1kg)"],
  market: "Wuse Market",
  status: "shopping",
  total: 4500,
  createdAt: "2026-02-21T10:30:00",
  estimatedDelivery: "2-3 hours",
  shopperName: "Abubakar",
};

const statusSteps = [
  { key: "received", label: "Order Received", description: "Your order has been confirmed" },
  { key: "assigned", label: "Shopper Assigned", description: "A shopper is on the way to the market" },
  { key: "shopping", label: "Shopping in Progress", description: "Your items are being picked" },
  { key: "delivery", label: "On the Way", description: "Your order is being delivered" },
  { key: "delivered", label: "Delivered", description: "Order completed successfully" },
];

export default function TrackPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState<"orderId" | "phone">("orderId");
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setError("Please enter your order ID or phone number");
      return;
    }

    setIsSearching(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setOrder(mockOrder);
      setIsSearching(false);
    }, 1000);
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((s) => s.key === status);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 via-emerald-50 to-secondary/5 py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Track Your <span className="text-primary">Order</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Enter your order ID or phone number to see the status of your delivery
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-4 shadow-lg shadow-black/5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex rounded-xl overflow-hidden border-2 border-gray-200 focus-within:border-primary transition-colors">
                <div className="flex bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setSearchType("orderId")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      searchType === "orderId" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Order ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType("phone")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      searchType === "phone" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Phone
                  </button>
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={searchType === "orderId" ? "e.g., VL-28475639" : "e.g., +234 123 456 7890"}
                  className="flex-1 px-4 py-3 outline-none min-w-0"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSearching}
                className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Track
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mt-3 text-left">{error}</p>
            )}
          </form>
        </div>
      </section>

      {/* Order Status */}
      {order && (
        <section className="py-8 md:py-12 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Order Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="text-2xl font-bold text-primary">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-green-600">{order.estimatedDelivery}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Customer</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Market</p>
                    <p className="font-medium">{order.market}</p>
                  </div>
                </div>
                {order.shopperName && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Your Shopper</p>
                      <p className="font-medium text-green-700">{order.shopperName}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Total</p>
                    <p className="font-medium">₦{order.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5">
              <h2 className="text-lg font-bold mb-8">Order Status</h2>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-[20px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2">
                  <div 
                    className="absolute top-0 left-0 w-full bg-primary transition-all duration-500"
                    style={{ height: `${(getStatusIndex(order.status) / (statusSteps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Status Steps */}
                <div className="space-y-6">
                  {statusSteps.map((step, index) => {
                    const isCompleted = index <= getStatusIndex(order.status);
                    const isCurrent = index === getStatusIndex(order.status);
                    const isLast = index === statusSteps.length - 1;

                    return (
                      <div 
                        key={step.key} 
                        className={`relative flex items-start gap-4 ${isLast ? "mb-0" : "mb-6"}`}
                      >
                        {/* Icon */}
                        <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted 
                            ? "bg-primary text-white" 
                            : "bg-gray-200 text-gray-400"
                        }`}>
                          {isCompleted ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pt-2 transition-all duration-300 ${
                          isCurrent ? "opacity-100" : isCompleted ? "opacity-100" : "opacity-40"
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <h3 className={`font-semibold ${
                              isCurrent ? "text-primary" : ""
                            }`}>
                              {step.label}
                            </h3>
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full w-fit">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                                In Progress
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 mt-6">
              <h2 className="text-lg font-bold mb-4">Order Items</h2>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                      {index + 1}
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.167 2.142-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Need help?</h4>
                  <p className="text-sm text-amber-700 mb-3">
                    If you have any questions about your order, feel free to contact us.
                  </p>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Order Found State */}
      {!order && !isSearching && (
        <section className="py-12 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No order found</h3>
            <p className="text-muted-foreground text-sm">
              Please check your order ID or phone number and try again. You can also contact us for help.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
