import React, { useRef, useEffect, useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const next = () => setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="testimonials-section" className="bg-slate-50 py-24 lg:py-32 border-b border-slate-100" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-16 space-y-5 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-pale text-royal-deeper rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-royal-blue/10">
            Validated Reviews
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-slate-900 uppercase tracking-tight">
            Success & Placement <span className="italic font-semibold text-royal-blue">Stories</span>
          </h2>
          <p className="font-sans text-xs text-slate-500 font-light leading-relaxed max-w-lg mx-auto">
            Read from both the families we serve and the graduates who transformed their careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <div
              key={review.id}
              className={`group flex flex-col justify-between rounded-2xl border border-slate-200/60 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 ${
                idx === activeIndex ? 'ring-2 ring-royal-blue/20 border-royal-blue/30' : ''
              } ${
                review.role === 'Graduate Helper' ? 'bg-[#FCF9F2]' : 'bg-white'
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
                    review.role === 'Graduate Helper'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-royal-pale text-royal-deeper'
                  }`}>
                    {review.role}
                  </span>
                  <Quote className="h-5 w-5 text-slate-200" />
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="font-sans text-xs text-slate-700 leading-relaxed font-light italic">
                  &ldquo;{review.message}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-6">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100">
                  {review.avatarUrl ? (
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-royal-blue text-white flex items-center justify-center font-display text-xs font-bold uppercase">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-slate-900 leading-tight">{review.name}</p>
                  <p className="font-sans text-[10px] text-slate-500">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-sans text-xs text-slate-500 font-light">
            Want to see live reviews and training updates? Follow us on{' '}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal-blue font-bold px-2 py-0.5 bg-royal-pale hover:bg-royal-blue hover:text-white rounded-lg transition-colors duration-200"
            >
              Facebook: Smart Maids ZW
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
