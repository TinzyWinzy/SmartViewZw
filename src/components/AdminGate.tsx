import React, { useState } from 'react';
import { ShieldAlert, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'smadmin2024';

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('smartmaids_admin_auth') === 'true'
  );
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('smartmaids_admin_auth', 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('smartmaids_admin_auth');
    setAuthenticated(false);
    setPassword('');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-royal-blue/20 border border-royal-blue/10 flex items-center justify-center">
                <ShieldAlert className="h-7 w-7 text-royal-blue" />
              </div>
              <h2 className="font-display text-xl font-bold text-white">Agency HQ</h2>
              <p className="font-sans text-xs text-slate-400 font-light">
                Enter your admin password to access the leads management panel.
              </p>
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Admin password"
                autoFocus
                className="premium-input bg-white/5 border-white/10 text-white placeholder:text-slate-500 pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="font-sans text-[11px] text-red-400 text-center bg-red-500/10 rounded-lg py-2 px-3 border border-red-500/20">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-royal-blue hover:bg-royal-deeper text-white rounded-xl py-3 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98]"
            >
              <LogIn className="h-4 w-4" />
              <span>Unlock Panel</span>
            </button>
          </form>

          <p className="font-sans text-[10px] text-slate-600 text-center mt-6">
            Authorized agency personnel only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 left-4 z-50 text-[10px] font-mono text-slate-400 hover:text-red-400 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-1.5 transition-all duration-200 opacity-40 hover:opacity-100"
        title="Lock admin panel"
      >
        Lock Panel
      </button>
    </>
  );
}
