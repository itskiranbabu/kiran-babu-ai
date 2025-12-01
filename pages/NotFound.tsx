
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <SEO title="Page Not Found" />
      
      {/* Abstract Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 blur-[100px] rounded-full pointer-events-none" />

      <FadeIn className="text-center relative z-10 max-w-lg mx-auto">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none">
          404
        </h1>
        
        <div className="relative -mt-12 mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">System Error: Page Missing</h2>
            <p className="text-gray-400">
                The content you are looking for has been moved, deleted, or never existed in this timeline.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} /> Return Home
          </Link>
          <Link 
            to="/services"
            className="w-full sm:w-auto px-6 py-3 bg-dark-card border border-dark-border hover:bg-white/5 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Search size={18} /> View Services
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border/50">
           <Link to="/" className="text-sm text-gray-500 hover:text-brand-400 flex items-center justify-center gap-1 transition-colors">
             <ArrowLeft size={14} /> Back to previous signal
           </Link>
        </div>
      </FadeIn>
    </div>
  );
};

export default NotFound;
