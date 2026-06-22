/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TESTIMONIALS } from '../data';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  return (
    <div id="testimonials-section" className="bg-slate-50 py-20 lg:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-light text-royal-blue rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-royal-blue/10">
            Validated Reviews
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-slate-900 uppercase tracking-tight">
            Success &amp; Placement <span className="font-display italic font-semibold text-royal-blue">Stories</span>
          </h2>
          <p className="font-sans text-xs text-slate-500 font-light leading-relaxed max-w-lg mx-auto">
            Read from both the families we serve and the graduates who transformed their careers. Our verified feedback is backed by true, face-to-face community audits.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <div
              key={review.id}
              className={`flex flex-col justify-between rounded-3xl border border-slate-200/50 p-6 shadow-sm relative transition-all duration-300 hover:shadow-xl hover:border-royal-blue/20 ${
                review.role === 'Graduate Helper' ? 'bg-[#FCF9F2]' : 'bg-white'
              }`}
            >
              <div className="absolute top-6 right-6 text-slate-100/80">
                <Quote className="h-8 w-8" />
              </div>

              <div className="space-y-4">
                {/* Micro role badge */}
                <div className="inline-flex items-center space-x-1">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    review.role === 'Graduate Helper'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-royal-light text-royal-blue'
                  }`}>
                    {review.role}
                  </span>
                  
                  {review.role === 'Graduate Helper' && (
                    <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                      Certified Graduate 🎓
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center space-x-0.5 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current shrink-0" />
                  ))}
                </div>

                <p className="font-sans text-xs text-gray-700 leading-relaxed font-light italic">
                  "{review.message}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 border-t border-slate-100 pt-4 mt-6">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                  {review.avatarUrl ? (
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-full w-full bg-royal-blue text-white flex items-center justify-center font-display text-xs font-bold uppercase">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-gray-900 leading-tight">
                    {review.name}
                  </h4>
                  <p className="font-sans text-[10px] text-gray-500 font-medium">
                    {review.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Facebook link badge */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs text-slate-500 font-light">
            Want to see live reviews, vacancy boards, and training updates? Follow us on{' '}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal-blue font-bold px-1.5 py-0.5 bg-royal-light hover:bg-royal-blue hover:text-white rounded transition"
            >
              Facebook: Smart Maids ZW
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
