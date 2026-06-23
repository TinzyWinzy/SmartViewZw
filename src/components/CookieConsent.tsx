import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('smartmaids_cookie_consent');
    if (consent !== 'accepted') {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('smartmaids_cookie_consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 p-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-slate-400 font-light leading-relaxed max-w-2xl">
          This site uses essential cookies and Vercel Analytics to understand how visitors interact with the platform. No personal data is sold or shared.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={accept}
            className="rounded-lg bg-royal-blue hover:bg-royal-dark text-white px-6 py-2 font-sans text-xs font-bold uppercase tracking-wider transition"
          >
            Accept
          </button>
          <button
            onClick={accept}
            className="text-slate-500 hover:text-white transition-colors p-1"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
