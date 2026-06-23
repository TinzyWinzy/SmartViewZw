import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-sm text-center space-y-4">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
              <ShieldAlert className="h-7 w-7 text-red-500" />
            </div>
            <h2 className="font-display text-xl font-bold text-slate-900">Something went wrong</h2>
            <p className="font-sans text-sm text-slate-500 font-light">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-xl bg-royal-blue hover:bg-royal-dark text-white px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
