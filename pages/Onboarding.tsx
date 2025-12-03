import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import { Zap, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { mockDb } from '../services/mockDb';
import { generateOnboardingPlan } from '../services/geminiService';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    platforms: [] as string[],
    revenueRange: '',
    goal: ''
  });

  const handleSelect = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePlatform = (p: string) => {
    setFormData(prev => {
      const platforms = prev.platforms.includes(p)
        ? prev.platforms.filter(i => i !== p)
        : [...prev.platforms, p];
      return { ...prev, platforms };
    });
  };

  const handleFinish = async () => {
    setLoading(true);
    // Generate AI Plan
    const plan = await generateOnboardingPlan(formData);
    
    // Save to DB
    await mockDb.saveOnboarding({
      completed: true,
      ...formData,
      plan: plan || ''
    });
    
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap className="text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to KeySpark AI</h1>
          <p className="text-gray-400">Let's personalize your Creator OS.</p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-8 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-dark-border w-full">
            <div 
              className="h-full bg-gradient-to-r from-brand-500 to-orange-500 transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <FadeIn key={step}>
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">What describes you best?</h2>
                <div className="grid grid-cols-1 gap-3">
                  {['Content Creator', 'Coach / Consultant', 'Agency Owner', 'Freelancer', 'Founder'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelect('type', opt)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.type === opt 
                          ? 'border-brand-500 bg-brand-500/10 text-white' 
                          : 'border-dark-border hover:border-gray-500 text-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Where do you post?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['Instagram', 'LinkedIn', 'YouTube', 'Twitter/X', 'TikTok', 'Blog'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => togglePlatform(opt)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        formData.platforms.includes(opt)
                          ? 'border-brand-500 bg-brand-500/10 text-white' 
                          : 'border-dark-border hover:border-gray-500 text-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Current Monthly Revenue?</h2>
                <div className="grid grid-cols-1 gap-3">
                  {['$0 - Just Starting', '$1k - $5k', '$5k - $10k', '$10k - $50k', '$50k+'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelect('revenueRange', opt)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.revenueRange === opt 
                          ? 'border-brand-500 bg-brand-500/10 text-white' 
                          : 'border-dark-border hover:border-gray-500 text-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Main Goal?</h2>
                <div className="grid grid-cols-1 gap-3">
                  {['Grow Audience', 'Automate Workflow', 'Get More Leads', 'Sell Digital Products'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelect('goal', opt)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.goal === opt 
                          ? 'border-brand-500 bg-brand-500/10 text-white' 
                          : 'border-dark-border hover:border-gray-500 text-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </FadeIn>

          <div className="mt-8 flex justify-between items-center">
             {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="text-gray-400 hover:text-white text-sm font-medium"
                >
                  Back
                </button>
             ) : <div />}
             
             {step < 4 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !formData.type) || 
                    (step === 2 && formData.platforms.length === 0) ||
                    (step === 3 && !formData.revenueRange)
                  }
                  className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next <ArrowRight size={16} />
                </button>
             ) : (
                <button 
                  onClick={handleFinish}
                  disabled={!formData.goal || loading}
                  className="bg-gradient-to-r from-brand-500 to-orange-500 text-white px-8 py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <CheckCircle size={18} />} 
                  Complete Setup
                </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;