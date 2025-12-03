import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Mail, Loader2, Lock, ArrowRight, Sparkles, Key } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { useToast } from '../components/ToastContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { login, signup, isLoading, demoLogin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email', 'error');
      return;
    }

    if (!password && isLogin) {
      addToast('Please enter your password', 'error');
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
        addToast('Welcome back!', 'success');
      } else {
        if (!password) {
          addToast('Please enter a password', 'error');
          return;
        }
        await signup(email, password, name);
        addToast('Account created! Please check your email.', 'success');
      }
      navigate(from, { replace: true });
    } catch (error: any) {
      addToast(error.message || 'Authentication failed', 'error');
    }
  };

  const handleDemoLogin = async () => {
    try {
      // Use dedicated demo login that bypasses Supabase
      await demoLogin();
      addToast('Welcome to the demo!', 'success');
      navigate(from, { replace: true });
    } catch (e: any) {
      addToast('Demo login failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 relative overflow-hidden bg-dark-bg">
      <SEO title={isLogin ? "Login" : "Sign Up"} />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse duration-[5000ms]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF9D0A]/5 blur-[100px] rounded-full pointer-events-none" />

      <FadeIn>
        <div className="bg-dark-card/80 backdrop-blur-xl border border-dark-border rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl relative z-10 overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B2FF7] to-[#FF9D0A]" />

          <div className="text-center mb-8">
            <div className="relative inline-block">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7B2FF7] to-[#FF9D0A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-500/20">
                  <Zap size={32} className="text-white fill-white" />
                </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-400">
              {isLogin ? 'Sign in to access your Creator OS' : 'Join the KeySpark ecosystem'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-[#18181b] border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#18181b] border border-dark-border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-all relative z-0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative group/input">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#18181b] border border-dark-border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-all relative z-0"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#7B2FF7] to-[#FF9D0A] hover:opacity-90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 transform active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-brand-400 hover:text-white font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>

          <div className="relative z-10 my-6 flex items-center gap-4">
            <div className="h-px bg-dark-border flex-1" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or Demo Access</span>
            <div className="h-px bg-dark-border flex-1" />
          </div>

          <button 
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-brand-300 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 group/demo disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={16} className="text-yellow-400 group-hover/demo:animate-spin" /> 
            Instant Admin Demo
          </button>
          
          <div className="mt-6 text-center text-xs text-gray-600 flex items-center justify-center gap-1.5">
             <Lock size={12} /> Encrypted & Secure
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Login;
