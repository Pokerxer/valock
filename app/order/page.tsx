"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface OrderItem {
  id: number;
  name: string;
  quantity: string;
  notes: string;
}

const stepLabels = ["Your Details", "Your Items", "Review & Pay"];

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Abuja",
    market: "",
    deliveryTime: "",
    paymentMethod: "cod",
  });
  const [items, setItems] = useState<OrderItem[]>([
    { id: 1, name: "", quantity: "1", notes: "" },
  ]);
  const [listImage, setListImage] = useState<File | null>(null);
  const [listImagePreview, setListImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const markets = [
    "Wuse Market",
    "Gwagwalada Market",
    "Karu Market",
    "Maitama Market",
    "Gwarinpa Market",
    "Utako Market",
    "Other",
  ];

  const deliveryTimes = [
    "As soon as possible",
    "Morning (8am - 12pm)",
    "Afternoon (12pm - 4pm)",
    "Evening (4pm - 8pm)",
    "Specific time",
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\+\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }
    
    if (!formData.market) {
      newErrors.market = "Please select a market";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    const validItems = items.filter((item) => item.name.trim());
    if (validItems.length === 0 && !listImage) {
      newErrors.items = "Please add at least one item or upload an image of your list";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (newStep: number) => {
    if (isAnimating || newStep === step) return;
    
    setDirection(newStep > step ? "forward" : "backward");
    setIsAnimating(true);
    
    setTimeout(() => {
      setStep(newStep);
      setErrors({});
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      goToStep(2);
    } else if (step === 2 && validateStep2()) {
      goToStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      goToStep(step - 1);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "", quantity: "1", notes: "" },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof OrderItem, value: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
        return;
      }
      setListImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setListImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setListImage(null);
    setListImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const serviceFee = items.filter((i) => i.name.trim()).length > 5 ? 2500 : 1000;

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8 md:py-12 px-4">
        <div className="max-w-md mx-auto text-center pt-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Order Submitted!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We will contact you shortly to confirm your items and delivery time.
          </p>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <p className="text-sm text-muted-foreground mb-2">Order Reference</p>
            <p className="text-2xl font-bold text-primary">VL-{Date.now().toString().slice(-8)}</p>
          </div>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/track"
              className="block w-full border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors"
            >
              Track My Order
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 md:py-10 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Place Your Order</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Tell us what you need and we&apos;ll get it for you
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-2">
          {stepLabels.map((label, index) => {
            const stepNum = index + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            
            return (
              <div key={stepNum} className="flex items-center flex-1">
                <button
                  onClick={() => isCompleted && goToStep(stepNum)}
                  disabled={!isCompleted && !isActive}
                  className={`relative flex flex-col items-center focus:outline-none ${isCompleted ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                        : isCompleted
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span className={`absolute top-14 text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {label}
                  </span>
                </button>
                
                {index < stepLabels.length - 1 && (
                  <div className="flex-1 h-1 mx-2 md:mx-4 rounded-full transition-colors duration-300">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? "bg-primary w-full" : "bg-gray-200 w-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
          {/* Step Content with Animation */}
          <div className="p-4 sm:p-6 md:p-8">
            <div
              className={`transition-all duration-300 ${
                isAnimating
                  ? direction === "forward"
                    ? "opacity-0 translate-x-8"
                    : "opacity-0 -translate-x-8"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {/* Step 1: Contact & Delivery Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Your Details</h2>
                      <p className="text-xs text-muted-foreground">Step 1 of 3</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">
                        Full Name *
                      </label>
                      <div className={`relative transition-all duration-200 ${focusedField === "fullName" ? "transform -translate-y-1" : ""}`}>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          onFocus={() => setFocusedField("fullName")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="John Doe"
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 ${
                            errors.fullName ? "border-red-400 bg-red-50" : focusedField === "fullName" ? "border-primary bg-white shadow-lg shadow-primary/10" : "border-transparent hover:border-gray-200 focus:border-primary"
                          } focus:outline-none transition-all`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">
                        Phone Number *
                      </label>
                      <div className={`relative transition-all duration-200 ${focusedField === "phone" ? "transform -translate-y-1" : ""}`}>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="+234 123 456 7890"
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 ${
                            errors.phone ? "border-red-400 bg-red-50" : focusedField === "phone" ? "border-primary bg-white shadow-lg shadow-primary/10" : "border-transparent hover:border-gray-200 focus:border-primary"
                          } focus:outline-none transition-all`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">
                      Email Address <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-gray-50/50 hover:border-gray-200 focus:border-primary focus:bg-white focus:outline-none focus:shadow-lg focus:shadow-primary/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">
                      Delivery Address *
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      onFocus={() => setFocusedField("address")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your full delivery address"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 resize-none ${
                        errors.address ? "border-red-400 bg-red-50" : focusedField === "address" ? "border-primary bg-white shadow-lg shadow-primary/10" : "border-transparent hover:border-gray-200 focus:border-primary"
                      } focus:outline-none transition-all`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">
                        Preferred Market *
                      </label>
                      <select
                        value={formData.market}
                        onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 ${
                          errors.market ? "border-red-400 bg-red-50" : "border-transparent hover:border-gray-200 focus:border-primary"
                        } focus:outline-none focus:bg-white transition-all appearance-none`}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "20px" }}
                      >
                        <option value="">Select a market</option>
                        {markets.map((market) => (
                          <option key={market} value={market}>{market}</option>
                        ))}
                      </select>
                      {errors.market && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.market}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">
                        Delivery Time
                      </label>
                      <select
                        value={formData.deliveryTime}
                        onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-gray-50/50 hover:border-gray-200 focus:border-primary focus:bg-white focus:outline-none focus:shadow-lg focus:shadow-primary/10 transition-all appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "20px" }}
                      >
                        <option value="">Select time</option>
                        {deliveryTimes.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Items */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">What You Want</h2>
                      <p className="text-xs text-muted-foreground">Step 2 of 3</p>
                    </div>
                  </div>

                  {errors.items && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                      {errors.items}
                    </div>
                  )}

                  {/* Image Upload */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Upload a photo of your list (optional)</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    {listImagePreview ? (
                      <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30">
                          <img 
                            src={listImagePreview} 
                            alt="Shopping list" 
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium mx-2 transition-colors"
                            >
                              Change Image
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-6 border-2 border-dashed border-primary/30 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-700">Tap to upload a photo</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium">Or type your items below:</span>
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className="relative p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Item {index + 1}
                          </span>
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>

                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-3">
                          <div className="sm:col-span-7">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateItem(item.id, "name", e.target.value)}
                              placeholder="What do you want?"
                              className="w-full px-3 py-2.5 rounded-xl border-2 border-transparent bg-white hover:border-gray-200 focus:border-primary focus:outline-none focus:shadow-lg focus:shadow-primary/10 transition-all text-sm"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <input
                              type="text"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                              placeholder="Qty"
                              className="w-full px-3 py-2.5 rounded-xl border-2 border-transparent bg-white hover:border-gray-200 focus:border-primary focus:outline-none focus:shadow-lg focus:shadow-primary/10 transition-all text-sm"
                            />
                          </div>
                        </div>

                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                          placeholder="Any specific notes? (optional)"
                          className="w-full mt-2 px-3 py-2 rounded-xl border-2 border-transparent bg-white hover:border-gray-200 focus:border-primary focus:outline-none focus:shadow-lg focus:shadow-primary/10 transition-all text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addItem}
                    className="w-full py-4 border-2 border-dashed border-primary/30 rounded-2xl text-primary font-medium hover:bg-primary/5 hover:border-primary transition-all flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Another Item
                  </button>
                </div>
              )}

              {/* Step 3: Review & Payment */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Review & Pay</h2>
                      <p className="text-xs text-muted-foreground">Step 3 of 3</p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 space-y-4 border border-gray-100">
                    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold">{formData.fullName}</p>
                        <p className="text-muted-foreground">{formData.phone}</p>
                        <p className="text-muted-foreground text-xs mt-1">{formData.address}</p>
                        <p className="text-primary text-xs mt-1">{formData.market}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {items.filter((item) => item.name.trim()).map((item, index) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            <span className="text-gray-900 font-medium">{item.quantity}x</span> {item.name}
                            {item.notes && <span className="text-xs text-gray-400 ml-1">({item.notes})</span>}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service Fee</span>
                        <span>₦{serviceFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">₦{serviceFee.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Payment Method
                    </h3>
                    <div className="space-y-3">
                      <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === "cod" 
                          ? "border-primary bg-primary/5 shadow-md" 
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-4 h-4 text-primary"
                        />
                        <div className="ml-3 flex-1">
                          <span className="font-medium block">Pay on Delivery</span>
                          <span className="text-xs text-muted-foreground">Pay when you receive your items</span>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      </label>

                      <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === "online" 
                          ? "border-primary bg-primary/5 shadow-md" 
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="online"
                          checked={formData.paymentMethod === "online"}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-4 h-4 text-primary"
                        />
                        <div className="ml-3 flex-1">
                          <span className="font-medium block">Pay Online</span>
                          <span className="text-xs text-muted-foreground">Card, bank transfer, or USSD</span>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="p-4 sm:p-6 bg-gray-50/50 border-t border-gray-100">
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3.5 border-2 border-gray-200 rounded-xl font-medium hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2"
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-primary to-emerald-500 text-white rounded-xl font-medium hover:from-primary-dark hover:to-emerald-600 transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Place Order
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
          Need help?{" "}
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </main>
  );
}
