import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setMessage('Check your email for the login link!');
    } catch (error: any) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-brand-muted">Sign in with a magic link.</p>
          
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-md text-white placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 text-lg font-semibold text-white bg-brand-primary rounded-md shadow-lg hover:bg-blue-500 disabled:bg-brand-muted disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-300"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-brand-secondary">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;