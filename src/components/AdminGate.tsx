import React, { useState, useEffect } from 'react';
import { ShieldAlert, Mail, Lock, Eye, EyeOff, LogIn, LogOut, AlertTriangle } from 'lucide-react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const tokenResult = await u.getIdTokenResult();
          const hasAdminClaim = tokenResult.claims.admin === true || tokenResult.claims.role === 'admin';
          const isAdminEmail = ADMIN_EMAIL && u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
          setIsAdmin(hasAdminClaim || !!isAdminEmail);
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSigningIn(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const tokenResult = await cred.user.getIdTokenResult();
      const hasAdminClaim = tokenResult.claims.admin === true || tokenResult.claims.role === 'admin';
      const isAdminEmail = ADMIN_EMAIL && cred.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      if (!hasAdminClaim && !isAdminEmail) {
        await signOut(auth);
        setError(
          'Your account does not have admin privileges. '
          + 'Ask your Firebase admin to set the custom claim `{ "admin": true }` '
          + 'via the Firebase Console (Authentication > Users > UID > Claims).'
        );
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Try again later.');
      } else {
        setError(err?.message || 'Sign-in failed. Please try again.');
      }
    } finally {
      setSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-royal-blue border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-5">
            <div className="text-center space-y-2">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-royal-blue/20 border border-royal-blue/10 flex items-center justify-center">
                <ShieldAlert className="h-7 w-7 text-royal-blue" />
              </div>
              <h2 className="font-display text-xl font-bold text-white">Agency HQ</h2>
              <p className="font-sans text-xs text-slate-400 font-light">
                Sign in with your authorized admin account.
              </p>
            </div>

            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Admin email"
                autoFocus
                required
                className="premium-input bg-white/5 border-white/10 text-white placeholder:text-slate-500 pl-10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Password"
                required
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
              <div className="flex items-start gap-2 font-sans text-[11px] text-red-400 text-left bg-red-500/10 rounded-lg py-2 px-3 border border-red-500/20">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={signingIn}
              className="w-full flex items-center justify-center gap-2 bg-royal-blue hover:bg-royal-deeper disabled:opacity-50 text-white rounded-xl py-3 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98]"
            >
              {signingIn ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              <span>{signingIn ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          <p className="font-sans text-[10px] text-slate-600 text-center mt-6">
            Authorized agency personnel only.
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center space-y-4">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-red-500/20 border border-red-500/10 flex items-center justify-center">
            <ShieldAlert className="h-7 w-7 text-red-400" />
          </div>
          <h2 className="font-display text-xl font-bold text-white">Access Denied</h2>
          <p className="font-sans text-xs text-slate-400 font-light">
            Signed in as <strong className="text-white">{user.email}</strong>.
            This account does not have admin privileges.
          </p>
          {ADMIN_EMAIL && (
            <p className="font-sans text-[10px] text-slate-500">
              Expected admin email: <span className="text-royal-blue">{ADMIN_EMAIL}</span>
            </p>
          )}
          <p className="font-sans text-[10px] text-slate-500 leading-relaxed">
            An admin must set the <code className="text-amber-400 bg-white/5 px-1 rounded">{"admin: true"}</code> custom claim
              via Firebase Console (Authentication &gt; Users &gt; your UID &gt; Claims).
          </p>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-sans transition"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out</span>
          </button>
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
        title="Sign out of admin panel"
      >
        Sign Out
      </button>
    </>
  );
}
