/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, PhoneCall, GraduationCap, Users } from 'lucide-react';

interface HeaderProps {
  activeTab: 'landing' | 'academy' | 'admin';
  setActiveTab: (tab: 'landing' | 'academy' | 'admin') => void;
  onBookClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onBookClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'landing' | 'academy' | 'admin') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleNav('landing')} 
            className="flex cursor-pointer items-center space-x-3 transition hover:opacity-90"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-slate-100 bg-white p-0.5 shadow-sm">
              <img 
                src="/src/assets/images/smart_maids_logo_1782161550138.jpg" 
                alt="Smart Maids ZW Logo" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-display-modern text-lg font-extrabold tracking-tighter text-slate-900 uppercase">
                  SMART MAIDS <span className="text-royal-blue">ZW</span>
                </span>
              </div>
              <p className="font-sans text-[9px] font-extrabold tracking-widest text-slate-400 uppercase">
                Vetted • Trained • Matched
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <button
              id="nav-home"
              onClick={() => handleNav('landing')}
              className={`rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'landing'
                  ? 'bg-royal-blue text-white shadow-sm'
                  : 'text-slate-500 hover:text-royal-blue'
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
              className={`rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'academy'
                  ? 'bg-royal-blue text-white shadow-sm'
                  : 'text-slate-500 hover:text-royal-blue'
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
              className={`rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'admin'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'text-slate-500 hover:text-amber-800'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Admin Panel
              </span>
            </button>
          </nav>

          {/* Call To Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://wa.me/263774449860" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition"
              id="wa-header-link"
            >
              <span className="relative flex h-2 w-2 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>WhatsApp Dispatch</span>
            </a>
            
            <button
              id="header-book-cta"
              onClick={() => {
                setActiveTab('landing');
                setTimeout(() => {
                  onBookClick();
                }, 100);
              }}
              className="flex items-center space-x-2 rounded-full bg-royal-blue hover:bg-royal-dark px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-white tracking-[0.05em] shadow-lg shadow-slate-200 transition duration-200 active:scale-98"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Book a Maid</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden glass-panel border-b border-gray-100 px-4 pt-2 pb-4 space-y-2">
          <button
            id="mobile-nav-home"
            onClick={() => handleNav('landing')}
            className={`w-full text-left rounded-lg px-4 py-3 font-sans text-base font-semibold transition ${
              activeTab === 'landing' ? 'bg-royal-blue text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Find a Helper
            </span>
          </button>
          <button
            id="mobile-nav-academy"
            onClick={() => handleNav('academy')}
            className={`w-full text-left rounded-lg px-4 py-3 font-sans text-base font-semibold transition ${
              activeTab === 'academy' ? 'bg-royal-blue text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Training Academy Program
            </span>
          </button>
          <button
            id="mobile-nav-admin"
            onClick={() => handleNav('admin')}
            className={`w-full text-left rounded-lg px-4 py-3 font-sans text-base font-semibold transition ${
              activeTab === 'admin' ? 'bg-amber-100 text-amber-800' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              Admin Leads Panel
            </span>
          </button>

          <div className="border-t border-gray-100 pt-3 flex flex-col space-y-3">
            <a 
              href="https://wa.me/263774449860" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center space-x-2 py-2 text-emerald-600 bg-emerald-50 rounded-lg text-sm font-semibold"
              id="mobile-wa-link"
            >
              <span>Chat via WhatsApp (+263 77 444 9860)</span>
            </a>
            <button
              id="mobile-header-book-cta"
              onClick={() => {
                setActiveTab('landing');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  onBookClick();
                }, 100);
              }}
              className="w-full flex items-center justify-center space-x-2 rounded-lg bg-royal-blue px-4 py-3 font-sans font-bold text-white shadow-md"
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
