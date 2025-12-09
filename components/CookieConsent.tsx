import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show after 3 seconds to not interrupt user experience
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('cookie-consent', 'dismissed');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
      <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-500/10 text-brand-400 rounded-lg flex-shrink-0">
            <Cookie size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-white font-semibold text-sm">Cookie Notice</h4>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-gray-400 text-xs mb-3">
              We use essential cookies for authentication and preferences. No tracking without consent.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Accept
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 text-gray-400 hover:text-white text-xs font-semibold transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
