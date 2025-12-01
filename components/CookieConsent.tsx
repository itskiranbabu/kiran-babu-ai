
import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import FadeIn from './FadeIn';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay slightly so it doesn't pop up instantly
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-900/20 text-brand-400 rounded-lg hidden sm:block">
                <Cookie size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">We use cookies</h4>
                <p className="text-gray-400 text-sm max-w-xl">
                  This website uses cookies to ensure you get the best experience on our website. 
                  We don't track personal data without your permission.
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none whitespace-nowrap px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-lg transition-colors"
              >
                Accept All
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none whitespace-nowrap px-6 py-2 bg-dark-bg border border-dark-border hover:bg-white/5 text-gray-300 text-sm font-bold rounded-lg transition-colors"
              >
                Necessary Only
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default CookieConsent;
