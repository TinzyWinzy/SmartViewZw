import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, ThumbsUp, MoveRight, Users, Clock, Sparkles } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onAcademyClick: () => void;
}

const trustItems = [
  { icon: ShieldCheck, stat: "247", label: "Background Checks This Quarter", sub: "Rigorous vetting", color: "text-royal-blue" },
  { icon: Award, stat: "80+", label: "Graduates Placed in 2024", sub: "Certified domestics", color: "text-gold-accent" },
  { icon: ThumbsUp, stat: "98%", label: "Retention at 12 Months", sub: "Long-term matches", color: "text-emerald-600" },
];

export default function Hero({ onBookClick, onAcademyClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-slate-50 overflow-hidden pt-16">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(41,183,190,0.06),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(197,160,89,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">

          {/* ===== Left Column: Copy ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-7 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-pale text-royal-deeper rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-royal-blue/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
              Excellence in Harare &amp; Bulawayo
            </motion.div>

            {/* Headline — Option A + B combined */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-4"
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-slate-900 uppercase text-balance">
                Harare&apos;s Most Trusted
                <span className="block italic font-light text-royal-blue">Domestic Placement</span>
                Agency
              </h1>
              <p className="font-display-modern text-lg sm:text-xl font-bold tracking-tight text-slate-700">
                Professional Domestic Staff. <span className="text-royal-blue">Vetted.</span> <span className="text-gold-accent">Trained.</span> <span className="text-emerald-600">Guaranteed.</span>
              </p>
              <p className="font-sans text-base sm:text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light text-pretty">
                Expert vetting, certified training, and seamless placement for housekeeping, culinary, and childcare across Zimbabwe.
              </p>
            </motion.div>

            {/* Social Proof Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2"
            >
              <div className="flex items-center gap-2 text-xs font-sans">
                <Users className="h-4 w-4 text-royal-blue shrink-0" />
                <span className="text-slate-700"><strong className="text-slate-900">200+</strong> Harare households served</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans">
                <Award className="h-4 w-4 text-gold-accent shrink-0" />
                <span className="text-slate-700"><strong className="text-slate-900">98%</strong> retention at 12 months</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans">
                <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700"><strong className="text-slate-900">30-day</strong> replacement guarantee</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
            >
              <button
                id="hero-book-cta"
                onClick={onBookClick}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-royal-blue hover:bg-royal-dark px-8 py-4 font-sans text-sm font-bold text-white shadow-xl transition-all duration-200 hover:shadow-2xl hover:shadow-royal-blue/30 active:scale-[0.98] overflow-hidden"
              >
                <span className="relative z-10">Find Your Helper</span>
                <MoveRight className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button
                id="hero-enroll-cta"
                onClick={onAcademyClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 px-8 py-4 font-sans text-sm font-bold text-slate-900 border-2 border-slate-200 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md active:scale-[0.98]"
              >
                <span>View Academy Programs</span>
              </button>
            </motion.div>

            {/* Trust line under CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center lg:text-left"
            >
              <p className="font-sans text-[11px] text-slate-400 font-light">
                Free replacement within 30 days &middot; No upfront fees &middot; WhatsApp: +263 77 444 9860
              </p>
            </motion.div>
          </motion.div>

          {/* ===== Right Column: Visual ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Glow behind the image */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-royal-blue/8 to-gold-accent/8 blur-3xl" />

            {/* Image with overlapping campaign card */}
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl border border-slate-200/60 bg-white p-2 shadow-2xl shadow-slate-900/5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                    alt="Professional cleaner providing thorough home cleaning service"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                  {/* Bottom badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-royal-deeper font-bold uppercase bg-royal-pale px-2.5 py-0.5 rounded">
                        Zimbabwe Standard
                      </span>
                      <p className="font-display font-bold text-slate-900 text-sm mt-0.5">Certified Clean &amp; Safe</p>
                    </div>
                    <div className="flex -space-x-2 shrink-0">
                      <span className="inline-flex h-8 w-8 rounded-full bg-royal-blue text-white items-center justify-center font-display text-[10px] font-black border-2 border-white shadow-sm">S</span>
                      <span className="inline-flex h-8 w-8 rounded-full bg-gold-accent text-white items-center justify-center font-display text-[10px] font-black border-2 border-white shadow-sm">Z</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign card — overlapping top-right */}
              <div className="absolute -top-3 -right-3 rounded-xl bg-white border border-royal-blue/10 px-4 py-3 shadow-lg hidden sm:block max-w-[180px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold-accent animate-pulse shrink-0" />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gold-accent">Holiday Campaign</span>
                </div>
                <p className="font-sans text-[11px] text-slate-700 mt-1 font-medium leading-tight">
                  Secure your helper by Dec 15
                </p>
                <p className="font-sans text-[10px] text-slate-400 mt-0.5">
                  Holiday placements booking fast
                </p>
              </div>
            </div>

            {/* Trust metrics row below the image */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 grid grid-cols-3 gap-3"
            >
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white rounded-xl border border-slate-200/50 p-3.5 text-center shadow-xs hover:shadow-sm transition-shadow">
                    <Icon className={`h-5 w-5 ${item.color} mx-auto mb-1`} />
                    <p className="font-display-modern font-black text-lg text-slate-900 leading-none">{item.stat}</p>
                    <p className="font-sans text-[10px] text-slate-500 leading-tight mt-0.5">{item.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
