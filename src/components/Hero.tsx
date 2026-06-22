/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, ThumbsUp, Sparkles, MoveRight } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onAcademyClick: () => void;
}

export default function Hero({ onBookClick, onAcademyClick }: HeroProps) {
  return (
    <div id="hero-section" className="relative overflow-hidden bg-slate-50 py-16 lg:py-24 border-b border-slate-100">
      
      {/* Absolute Decorative Background Components */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-royal-blue/3 opacity-[0.03] blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Vetted badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-light text-royal-blue rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-royal-blue/10"
            >
              <div className="w-2 h-2 bg-royal-blue rounded-full animate-pulse"></div>
              <span className="font-sans">Excellence Delivered in Harare &amp; Bulawayo</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.0] text-slate-900 mb-6 uppercase tracking-tight">
                TRUST YOUR <br/>
                <span className="font-display text-royal-blue italic font-semibold">HOME</span> TO THE <br/>
                <span className="font-display-modern font-black tracking-tighter text-slate-900 text-4xl sm:text-5xl lg:text-6xl">PROFESSIONALS.</span>
              </h1>
              
              <p className="font-sans text-base text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                Expert vetting, rigorous certified training, and seamless placement for state-of-the-art housekeeping, gourmet cooking, and childcare across Zimbabwe.
              </p>
            </motion.div>

            {/* Double CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2"
            >
              <button
                id="hero-book-cta"
                onClick={onBookClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl bg-slate-900 hover:bg-slate-800 px-8 py-4 font-sans text-sm font-bold text-white shadow-xl transition duration-200 active:scale-98"
              >
                <span>Start Placement</span>
                <MoveRight className="h-5 w-5" />
              </button>

              <button
                id="hero-enroll-cta"
                onClick={onAcademyClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 px-8 py-4 font-sans text-sm font-bold text-slate-900 border border-slate-200 transition duration-200 active:scale-98"
              >
                <span>View Academy Rates</span>
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-8 mt-8"
            >
              <div className="flex items-start space-x-2 justify-center lg:justify-start">
                <ShieldCheck className="h-5 w-5 text-royal-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display-modern font-bold text-slate-900 text-sm">100% Vetted</h4>
                  <p className="font-sans text-[11px] text-slate-500">Security Cleared</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 justify-center lg:justify-start">
                <Award className="h-5 w-5 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display-modern font-bold text-slate-900 text-sm">Certified</h4>
                  <p className="font-sans text-[11px] text-slate-500">Academy Courses</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 justify-center lg:justify-start">
                <ThumbsUp className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display-modern font-bold text-slate-900 text-sm">98% Match</h4>
                  <p className="font-sans text-[11px] text-slate-500">Placement Rate</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Media Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Back decorative glowing aura */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-royal-blue to-gold-accent opacity-10 blur-xl"></div>
            
            <div className="relative rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">
              <div className="relative h-[320px] sm:h-[400px] overflow-hidden rounded-xl">
                <img
                  src="/src/assets/images/hero_trust_maid_1782161534270.jpg"
                  alt="Professional friendly maid wearing royal blue uniform in a clean, sunny home"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded Floating Trust Element */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-4 shadow-lg border border-white/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-royal-blue font-extrabold uppercase bg-royal-light px-2 py-0.5 rounded">
                      Zimbabwe Standard
                    </span>
                    <h3 className="font-display font-bold text-gray-900 text-sm mt-1">Certified Clean &amp; Safe</h3>
                  </div>
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="inline-block h-7 w-7 rounded-full bg-royal-blue text-white flex items-center justify-center font-display text-[9px] font-black border-2 border-white shadow-sm">SM</div>
                    <div className="inline-block h-7 w-7 rounded-full bg-gold-accent text-white flex items-center justify-center font-display text-[9px] font-black border-2 border-white shadow-sm">ZW</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Playful absolute float tag */}
            <div className="absolute -top-3 -right-3 animate-float rounded-xl bg-gold-light border border-gold-accent/20 px-4 py-2 shadow-lg hidden sm:block">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-gold-accent p-1 text-white">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase font-semibold text-gold-dark">B2C Career Boost</p>
                  <p className="font-display text-xs font-bold text-gray-800">Guarantee Placement</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
