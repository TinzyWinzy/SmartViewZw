/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Send, Sparkles, MessageSquare, Check, Home, Utensils, Baby, Sparkle, Milestone } from 'lucide-react';
import { SERVICE_AREAS } from '../data';
import { ServiceType, BookingInquiry } from '../types';

interface InteractiveBookingProps {
  onBookingSubmit: (booking: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => void;
  selectedServiceId: ServiceType | null;
}

export default function InteractiveBooking({ onBookingSubmit, selectedServiceId }: InteractiveBookingProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    location: SERVICE_AREAS[0],
    serviceNeeded: 'housekeeping' as ServiceType,
    frequency: 'full_time' as 'full_time' | 'part_time' | 'live_in' | 'live_out',
    shona: true,
    ndebele: false,
    english: true,
    additionalNotes: ''
  });

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [generatedMessagePreview, setGeneratedMessagePreview] = useState('');

  // Auto-sync selected service if clicked from the Pillars section
  useEffect(() => {
    if (selectedServiceId) {
      setFormData(prev => ({ ...prev, serviceNeeded: selectedServiceId }));
      const container = document.getElementById('booking-portal-card');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedServiceId]);

  // Dynamically compile WhatsApp text message as they complete fields
  useEffect(() => {
    const serviceLabels = {
      housekeeping: '🧺 Certified Housekeeper',
      cooking: '🍳 Trained Chef / Culinary Helper',
      childcare: '👶 Pediatric Safety Childminder (Nanny)',
      comprehensive: '👑 Comprehensive Executive Multi-Role'
    };

    const freqLabels = {
      full_time: 'Full-Time (Daily Shift)',
      part_time: 'Part-Time (Weekly Visits)',
      live_in: 'Premium Live-In Assistant',
      live_out: 'Live-Out Routine Placement'
    };

    const languages = [];
    if (formData.english) languages.push('English');
    if (formData.shona) languages.push('Shona');
    if (formData.ndebele) languages.push('Ndebele');

    const msg = `Hello *Smart Maids ZW*! I am interested in placing professional domestic helper in my home.\n\n` +
                `*Placement Details:*\n` +
                `• *Employer:* ${formData.clientName || '[Your Name]'}\n` +
                `• *Phone:* ${formData.phone || '[Your Phone]'}\n` +
                `• *Service:* ${serviceLabels[formData.serviceNeeded]}\n` +
                `• *Schedule:* ${freqLabels[formData.frequency]}\n` +
                `• *Location:* ${formData.location}\n` +
                `• *Preferred Languages:* ${languages.join(', ')}\n` +
                `• *Additional Notes:* ${formData.additionalNotes || 'None'}\n\n` +
                `Please match me with your next vetted graduate helper!`;

    setGeneratedMessagePreview(msg);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.phone || !formData.email) {
      alert('Please fill out Name, Phone, and Email to file booking.');
      return;
    }

    const languages = [];
    if (formData.english) languages.push('English');
    if (formData.shona) languages.push('Shona');
    if (formData.ndebele) languages.push('Ndebele');

    onBookingSubmit({
      clientName: formData.clientName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      serviceNeeded: formData.serviceNeeded,
      frequency: formData.frequency,
      preferredLanguages: languages,
      additionalNotes: formData.additionalNotes
    });

    setIsSubmitSuccess(true);
    // Reset core fields but keep success toast visible
    setFormData(prev => ({
      ...prev,
      clientName: '',
      email: '',
      phone: '',
      additionalNotes: ''
    }));
  };

  const handleWhatsAppTrigger = () => {
    if (!formData.clientName || !formData.phone) {
      alert('Please fill out at least your Name and Phone before launching WhatsApp Chat.');
      return;
    }
    const encodedText = encodeURIComponent(generatedMessagePreview);
    const waUrl = `https://wa.me/263774449860?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div id="booking-section" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left instructions list & values info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-light text-royal-blue rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-royal-blue/10">
                placement matching
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-slate-900 uppercase tracking-tight leading-tight">
                Match With the <br/>
                <span className="font-display italic font-semibold text-royal-blue">Perfect</span> <br/>
                Household <br/>
                Professional
              </h2>
              <p className="font-sans text-xs text-slate-500 font-light leading-relaxed">
                Finding domestic help shouldn’t be a gamble. Tell us your custom schedule, location, and tasks. Our matching algorithm connects you with 3 fully vetted graduates matching your lifestyle.
              </p>
            </div>

            {/* Vetted guarantee board */}
            <div className="space-y-4 bg-slate-50 border border-slate-200/60 p-6 rounded-2xl">
              <h4 className="font-display font-bold text-gray-900 text-sm flex items-center space-x-2">
                <ShieldAlert className="h-4.5 w-4.5 text-royal-blue" />
                <span>Our 3-Fold Guard Security Guarantee</span>
              </h4>
              <ul className="space-y-3 font-sans text-xs text-gray-600 leading-relaxed font-light">
                <li className="flex items-start">
                  <span className="text-royal-blue font-bold mr-2">1.</span>
                  <span><strong>Biometric &amp; ID Verification:</strong> Fingerprints cross-referenced and copies securely archived on our servers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-royal-blue font-bold mr-2">2.</span>
                  <span><strong>Police Clearance &amp; Vetting:</strong> Real-feel reference screening from past validated Harare/Bulawayo employers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-royal-blue font-bold mr-2">3.</span>
                  <span><strong>Free Placement Replacements:</strong> Match replacement eligibility at no extra fee if expectations diverge within the first 30 days.</span>
                </li>
              </ul>
            </div>

            {/* Quick action info */}
            <div className="text-center p-6 border border-emerald-200 bg-emerald-50/40 rounded-2xl">
              <p className="font-display text-xs font-semibold text-emerald-800">Prefer Immediate Human Interaction?</p>
              <button
                id="direct-wa-button-left"
                onClick={handleWhatsAppTrigger}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-xs font-bold transition shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Immediate WhatsApp Inquiry</span>
              </button>
            </div>
          </div>

          {/* Right form wizard container card */}
          <div id="booking-portal-card" className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
            
            <div className="mb-8 border-b border-gray-200/70 pb-6 flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                  Instant Household Placement Request
                </h3>
                <p className="font-sans text-xs text-gray-500 mt-1">
                  Submit details below to let our team match, draft, and message files directly.
                </p>
              </div>
              <Sparkles className="h-6 w-6 text-gold-accent shrink-0" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form success message */}
              <AnimatePresence>
                {isSubmitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    id="booking-success-toast"
                    className="flex items-start space-x-3 bg-emerald-50 border border-emerald-300 text-emerald-800 p-5 rounded-2xl text-xs font-sans"
                  >
                    <Check className="h-5 w-5 bg-emerald-500 text-white rounded-full p-0.5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">Your Matching Inquiry has been Saved!</p>
                      <p className="text-emerald-700 font-light leading-relaxed">
                        We have logged your request securely. Click the WhatsApp button below to instantly transmit this booking format to our dispatch officers on <strong>+263 77 444 9860</strong> for immediate matched graduates profile sharing!
                      </p>
                      
                      <button
                        type="button"
                        id="success-whatsapp-trigger"
                        onClick={handleWhatsAppTrigger}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 font-bold font-sans transition"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Send Booking to WhatsApp</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Grid fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Client Name */}
                <div className="space-y-2">
                  <label id="lbl-employerName" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="booking-employerName"
                    type="text"
                    required
                    placeholder="e.g. Dr. Brandon Tino"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="premium-input bg-white"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label id="lbl-employerEmail" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="booking-employerEmail"
                    type="email"
                    required
                    placeholder="e.g. name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="premium-input bg-white"
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-2">
                  <label id="lbl-employerPhone" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone Number (WhatsApp Preferred) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="booking-employerPhone"
                    type="tel"
                    required
                    placeholder="e.g. +263 77 444 9860"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="premium-input bg-white"
                  />
                </div>

                {/* Location Selection */}
                <div className="space-y-2">
                  <label id="lbl-employerLocation" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Your Location/Neighborhood
                  </label>
                  <select
                    id="booking-employerLocation"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="premium-input bg-white"
                  >
                    {SERVICE_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Type */}
                <div className="space-y-2">
                  <label id="lbl-bookingService" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Speciality Role Needed
                  </label>
                  <select
                    id="booking-serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value as ServiceType })}
                    className="premium-input bg-white"
                  >
                    <option value="housekeeping">🧺 Housekeeping Specialist</option>
                    <option value="cooking">🍳 Culinary &amp; Kitchen Chef</option>
                    <option value="childcare">👶 Pediatric Child Minding / Nanny</option>
                    <option value="comprehensive">👑 Comprehensive Executive Multi-Role</option>
                  </select>
                </div>

                {/* Frequency Preferences */}
                <div className="space-y-2">
                  <label id="lbl-bookingFrequency" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Placement Scheduling type
                  </label>
                  <select
                    id="booking-frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                    className="premium-input bg-white"
                  >
                    <option value="full_time">Full-Time (Daily Commute Shift)</option>
                    <option value="part_time">Part-Time (Scheduled Days)</option>
                    <option value="live_in">Live-In (Private Room Provided)</option>
                    <option value="live_out">Live-Out Routine Placement</option>
                  </select>
                </div>

                {/* Preferred Languages Checkboxes */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Language Spoken Preferences (Tick all applicable)
                  </label>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <label className="flex items-center space-x-2 rounded-xl border border-gray-300 bg-white px-4 py-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.english}
                        onChange={() => setFormData({ ...formData, english: !formData.english })}
                        className="h-4 w-4 rounded text-royal-blue"
                      />
                      <span className="font-sans text-xs font-semibold text-gray-800">English</span>
                    </label>

                    <label className="flex items-center space-x-2 rounded-xl border border-gray-300 bg-white px-4 py-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.shona}
                        onChange={() => setFormData({ ...formData, shona: !formData.shona })}
                        className="h-4 w-4 rounded text-royal-blue"
                      />
                      <span className="font-sans text-xs font-semibold text-gray-800">Shona</span>
                    </label>

                    <label className="flex items-center space-x-2 rounded-xl border border-gray-300 bg-white px-4 py-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.ndebele}
                        onChange={() => setFormData({ ...formData, ndebele: !formData.ndebele })}
                        className="h-4 w-4 rounded text-royal-blue"
                      />
                      <span className="font-sans text-xs font-semibold text-gray-800">Ndebele</span>
                    </label>
                  </div>
                </div>

                {/* Additional notes expectation */}
                <div className="sm:col-span-2 space-y-2">
                  <label id="lbl-bookingNotes" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Describe any specific child ages, laundry sizes, dietary rules <span className="text-gray-400 font-light">(Optional)</span>
                  </label>
                  <textarea
                    id="booking-additionalNotes"
                    rows={3}
                    placeholder="e.g. Caring for an 18-month-old infant, must know how to prepare low-carb meals, Borrowdale road proximity, is live-out."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="premium-input bg-white resize-none"
                  />
                </div>

              </div>

              {/* WhatsApp Live Preview Box */}
              <div className="bg-emerald-50 rounded-2xl border border-emerald-200/50 p-5 mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 tracking-wider">WhatsApp Dispatch draft preview</span>
                  <span className="rounded-full bg-emerald-600 px-1.5 py-0.5 text-[8px] font-mono font-bold text-white uppercase animate-pulse-subtle">
                    Live Compile
                  </span>
                </div>
                
                <div className="rounded-xl bg-white border border-emerald-100 p-4 font-mono text-xs text-gray-600 space-y-1 block max-h-[140px] overflow-y-auto leading-normal whitespace-pre-wrap">
                  {generatedMessagePreview}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-xs pt-1.5">
                  <p className="font-sans text-emerald-800 font-light text-[11px] leading-snug">
                    Sending details directly speeds up our matching turnaround from 48 hours to <strong>less than 4 hours!</strong>
                  </p>
                  
                  {/* Fire WhatsApp Button */}
                  <button
                    type="button"
                    id="wa-matching-trigger-btn"
                    onClick={handleWhatsAppTrigger}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 font-sans font-bold transition shadow-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Alternative Submit Button */}
              <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <p className="font-sans text-xs text-slate-500 font-light max-w-sm text-center sm:text-left">
                  Also logs matching in our secure internal database so our HR counselor can review files offline.
                </p>

                <button
                  id="booking-submit-btn"
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest shadow-xl transition active:scale-98"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Placement Booking</span>
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>

    </div>
  );
}
