import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, MessageSquare } from 'lucide-react';
import logoSrc from '../assets/images/smart_maids_logo_1782161550138.jpg';

interface HeaderProps {
  activeTab: 'landing' | 'academy' | 'admin';
  setActiveTab: (tab: 'landing' | 'academy' | 'admin') => void;
  onBookClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onBookClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(y / docHeight, 1) : 0);
    };
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
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-100/50">
        <div
          className="h-full bg-royal-blue transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <div
            onClick={() => handleNav('landing')}
            className="flex cursor-pointer items-center gap-3 transition-opacity duration-200 hover:opacity-80 shrink-0"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-sm">
              <img
                src={logoSrc}
                alt="Smart Maids ZW"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-100'}`}>
              <span className="font-display-modern text-sm font-extrabold tracking-tighter text-slate-900 uppercase leading-tight block">
                SMART MAIDS <span className="text-royal-blue">ZW</span>
              </span>
              <span className={`font-sans text-[8px] font-extrabold tracking-[0.2em] uppercase block transition-colors duration-300 ${
                scrolled ? 'text-slate-400' : 'text-slate-400'
              }`}>
                Vetted • Trained • Matched
              </span>
            </div>
          </div>

          {/* Desktop Nav — text links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-home"
              onClick={() => handleNav('landing')}
              className={`px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-lg ${
                activeTab === 'landing'
                  ? 'text-royal-blue bg-royal-pale'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              Find Helper
            </button>
            <button
              id="nav-academy"
              onClick={() => handleNav('academy')}
              className={`px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-lg ${
                activeTab === 'academy'
                  ? 'text-royal-blue bg-royal-pale'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              Academy
            </button>
          </nav>

          {/* Right side — WhatsApp icon + Book CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/263774449860"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center h-9 w-9 rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
              title="Chat on WhatsApp — +263 77 444 9860"
              id="wa-header-link"
            >
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <MessageSquare className="h-5 w-5" />
            </a>

            <button
              id="header-book-cta"
              onClick={() => {
                setActiveTab('landing');
                setTimeout(() => onBookClick(), 100);
              }}
              className="relative flex items-center gap-2 rounded-lg bg-royal-blue hover:bg-royal-dark px-5 py-2 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-royal-blue/20 transition-all duration-200 hover:shadow-xl hover:shadow-royal-blue/30 active:scale-[0.97] overflow-hidden"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Book Placement</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/263774449860"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"
              title="WhatsApp"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
            <button
              id="mobile-menu-toggle"
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white/98 backdrop-blur-xl flex flex-col md:hidden animate-fade-in">
          <div className="flex-1 flex flex-col justify-center px-6 py-8 space-y-4">
            <button
              id="mobile-nav-home"
              onClick={() => handleNav('landing')}
              className={`w-full text-left rounded-xl px-6 py-5 font-sans text-lg font-bold transition-all ${
                activeTab === 'landing' ? 'bg-royal-blue text-white shadow-lg' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                Find a Helper
              </span>
            </button>
            <button
              id="mobile-nav-academy"
              onClick={() => handleNav('academy')}
              className={`w-full text-left rounded-xl px-6 py-5 font-sans text-lg font-bold transition-all ${
                activeTab === 'academy' ? 'bg-royal-blue text-white shadow-lg' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                Training Academy
              </span>
            </button>

            <div className="border-t border-slate-100 pt-6 mt-4 space-y-4">
              <a
                href="https://wa.me/263774449860"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 text-emerald-700 bg-emerald-50 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span>WhatsApp: +263 77 444 9860</span>
              </a>
              <button
                id="mobile-header-book-cta"
                onClick={() => {
                  setActiveTab('landing');
                  setMobileMenuOpen(false);
                  setTimeout(() => onBookClick(), 100);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-royal-blue hover:bg-royal-dark px-6 py-4 font-sans font-bold text-white shadow-lg transition-all active:scale-[0.98]"
              >
                <PhoneCall className="h-5 w-5" />
                <span>Book Placement Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
