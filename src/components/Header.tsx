import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, PhoneCall, GraduationCap, Users } from 'lucide-react';

interface HeaderProps {
  activeTab: 'landing' | 'academy' | 'admin';
  setActiveTab: (tab: 'landing' | 'academy' | 'admin') => void;
  onBookClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onBookClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (tab: 'landing' | 'academy' | 'admin') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          <div
            onClick={() => handleNav('landing')}
            className="flex cursor-pointer items-center space-x-3 transition duration-200 hover:opacity-80"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-royal-blue shadow-sm flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95">
              <span className="text-white font-display-modern font-black text-lg">S</span>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-display-modern text-lg font-extrabold tracking-tighter text-slate-900 uppercase">
                  SMART MAIDS <span className="text-royal-blue">ZW</span>
                </span>
              </div>
              <p className={`font-sans text-[9px] font-extrabold tracking-widest uppercase transition-colors duration-300 ${
                scrolled ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Vetted • Trained • Matched
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <button
              id="nav-home"
              onClick={() => handleNav('landing')}
              className={`rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'landing'
                  ? 'bg-royal-blue text-white shadow-md shadow-royal-blue/20'
                  : 'text-slate-500 hover:text-royal-blue hover:bg-royal-light'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                Find a Helper
              </span>
            </button>

            <button
              id="nav-academy"
              onClick={() => handleNav('academy')}
              className={`rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'academy'
                  ? 'bg-royal-blue text-white shadow-md shadow-royal-blue/20'
                  : 'text-slate-500 hover:text-royal-blue hover:bg-royal-light'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" />
                Academy
              </span>
            </button>

            <button
              id="nav-admin"
              onClick={() => handleNav('admin')}
              className={`rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200 shadow-sm'
                  : 'text-slate-500 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Admin Panel
              </span>
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/263774449860"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              id="wa-header-link"
            >
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="group-hover:underline decoration-emerald-400/30 underline-offset-4">WhatsApp</span>
            </a>

            <button
              id="header-book-cta"
              onClick={() => {
                setActiveTab('landing');
                setTimeout(() => onBookClick(), 100);
              }}
              className="group relative flex items-center space-x-2 rounded-full bg-royal-blue hover:bg-royal-dark px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-royal-blue/20 transition-all duration-200 hover:shadow-xl hover:shadow-royal-blue/30 active:scale-[0.97]"
            >
              <PhoneCall className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-12" />
              <span>Book a Maid</span>
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-1.5 animate-fade-in-up">
          <button
            id="mobile-nav-home"
            onClick={() => handleNav('landing')}
            className={`w-full text-left rounded-xl px-4 py-3 font-sans text-sm font-semibold transition-all duration-200 ${
              activeTab === 'landing' ? 'bg-royal-blue text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              Find a Helper
            </span>
          </button>
          <button
            id="mobile-nav-academy"
            onClick={() => handleNav('academy')}
            className={`w-full text-left rounded-xl px-4 py-3 font-sans text-sm font-semibold transition-all duration-200 ${
              activeTab === 'academy' ? 'bg-royal-blue text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5" />
              Training Academy Program
            </span>
          </button>
          <button
            id="mobile-nav-admin"
            onClick={() => handleNav('admin')}
            className={`w-full text-left rounded-xl px-4 py-3 font-sans text-sm font-semibold transition-all duration-200 ${
              activeTab === 'admin' ? 'bg-amber-100 text-amber-800' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3">
              <LayoutDashboard className="h-5 w-5" />
              Admin Leads Panel
            </span>
          </button>

          <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col space-y-3">
            <a
              href="https://wa.me/263774449860"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-emerald-700 bg-emerald-50 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors duration-200"
              id="mobile-wa-link"
            >
              <span>Chat via WhatsApp (+263 77 444 9860)</span>
            </a>
            <button
              id="mobile-header-book-cta"
              onClick={() => {
                setActiveTab('landing');
                setMobileMenuOpen(false);
                setTimeout(() => onBookClick(), 100);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-royal-blue hover:bg-royal-dark px-4 py-3.5 font-sans font-bold text-white shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Book Placement Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
