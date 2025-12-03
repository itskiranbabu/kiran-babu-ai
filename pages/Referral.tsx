import React from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Share2, DollarSign, Users, Copy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastContext';

const Referral: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const referralLink = `https://kiranbabu.ai?ref=${user?.id || 'guest'}`;

  return (
    <div className="pt-16 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <SEO title="Referral Program" />
      <FadeIn>
        <SectionHeader title="Affiliate Dashboard" subtitle="Earn 30% commission on every sale you refer." />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
            <h3 className="text-3xl font-bold text-white flex items-center gap-1"><DollarSign size={24} className="text-green-400" /> 1,250</h3>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Referrals</p>
            <h3 className="text-3xl font-bold text-white flex items-center gap-1"><Users size={24} className="text-blue-400" /> 45</h3>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Next Payout</p>
            <h3 className="text-3xl font-bold text-white flex items-center gap-1">$340</h3>
            <span className="text-xs text-gray-500">Processing on Oct 1st</span>
        </div>
      </div>

      <div className="bg-brand-900/10 border border-brand-500/20 rounded-xl p-8 mb-12">
        <h3 className="text-xl font-bold text-white mb-4">Your Referral Link</h3>
        <div className="flex gap-2">
            <input 
                readOnly 
                value={referralLink}
                className="flex-grow bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white"
            />
            <button 
                onClick={() => {
                    navigator.clipboard.writeText(referralLink);
                    addToast('Link copied!');
                }}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg flex items-center gap-2"
            >
                <Copy size={18} /> Copy
            </button>
        </div>
      </div>
    </div>
  );
};

export default Referral;