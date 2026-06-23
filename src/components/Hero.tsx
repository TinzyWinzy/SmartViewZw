import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, ThumbsUp, Sparkles, MoveRight } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onAcademyClick: () => void;
}

const trustItems = [
  { icon: ShieldCheck, title: "100% Vetted", sub: "Security Cleared", color: "text-royal-blue" },
  { icon: Award, title: "Certified", sub: "Academy Graduates", color: "text-gold-accent" },
  { icon: ThumbsUp, title: "98% Match", sub: "Placement Rate", color: "text-emerald-600" },
];

export default function Hero({ onBookClick, onAcademyClick }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-slate-50 overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(41,183,190,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(197,160,89,0.04),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-pale text-royal-deeper rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-royal-blue/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
              Excellence in Harare & Bulawayo
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-5"
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] text-slate-900 uppercase tracking-tight text-balance">
                Trust Your
                <br />
                <span className="italic font-semibold text-royal-blue">Home</span> to the
                <br />
                <span className="font-display-modern font-black tracking-tighter text-slate-900">Professionals.</span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light text-pretty">
                Expert vetting, certified training, and seamless placement for housekeeping, culinary, and childcare across Zimbabwe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2"
            >
              <button
                id="hero-book-cta"
                onClick={onBookClick}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-slate-900 hover:bg-slate-800 px-8 py-4 font-sans text-sm font-bold text-white shadow-xl transition-all duration-200 hover:shadow-2xl hover:shadow-slate-900/20 active:scale-[0.98] overflow-hidden"
              >
                <span className="relative z-10">Start Placement</span>
                <MoveRight className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button
                id="hero-enroll-cta"
                onClick={onAcademyClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 px-8 py-4 font-sans text-sm font-bold text-slate-900 border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
              >
                <span>View Academy Rates</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="grid grid-cols-3 gap-6 border-t border-slate-200/60 pt-8 mt-8"
            >
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-3 justify-center lg:justify-start">
                    <Icon className={`h-5 w-5 ${item.color} shrink-0`} />
                    <div>
                      <p className="font-display-modern font-bold text-slate-900 text-sm leading-tight">{item.title}</p>
                      <p className="font-sans text-[11px] text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-royal-blue/10 to-gold-accent/10 blur-2xl" />

            <div className="relative rounded-2xl border border-slate-200/60 bg-white p-2.5 shadow-2xl shadow-slate-900/5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                  alt="Professional cleaner providing thorough home cleaning service"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-4 shadow-lg flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="inline-block text-[10px] font-mono tracking-widest text-royal-deeper font-bold uppercase bg-royal-pale px-2.5 py-0.5 rounded">
                      Zimbabwe Standard
                    </span>
                    <p className="font-display font-bold text-slate-900 text-sm mt-1">Certified Clean & Safe</p>
                  </div>
                  <div className="flex -space-x-2 shrink-0">
                    <span className="inline-flex h-8 w-8 rounded-full bg-royal-blue text-white items-center justify-center font-display text-[10px] font-black border-2 border-white shadow-sm">SM</span>
                    <span className="inline-flex h-8 w-8 rounded-full bg-gold-accent text-white items-center justify-center font-display text-[10px] font-black border-2 border-white shadow-sm">ZW</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-3 animate-float rounded-xl bg-gold-light border border-gold-accent/20 px-4 py-2.5 shadow-lg hidden sm:block">
              <div className="flex items-center gap-2.5">
                <div className="rounded-full bg-gold-accent p-1.5 text-white">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase font-semibold text-gold-dark leading-tight">Career Boost</p>
                  <p className="font-display text-xs font-bold text-slate-800">Guaranteed Placement</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
