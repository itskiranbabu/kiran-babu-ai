
import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Filter, Play, Save, Loader2 } from 'lucide-react';
import { mockDb, Funnel } from '../services/mockDb';

const Funnels: React.FC = () => {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('Webinar Signup');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setFunnels(mockDb.getFunnels());
  }, []);

  const handleGenerate = async () => {
    if (!niche) return;
    setIsGenerating(true);
    // Simulate AI Generation
    await new Promise(r => setTimeout(r, 2000));
    
    const steps = [
        "Ad Creative: Pain-point focused hook",
        "Landing Page: High-converting Headline + VSL",
        "Email Sequence: 3-day value nurture",
        "Sales Page: Urgency + Social Proof"
    ];
    
    const newFunnel = mockDb.addFunnel({ name: `${niche} Funnel`, niche, goal, steps });
    setFunnels([...funnels, newFunnel]);
    setIsGenerating(false);
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="AI Funnel Builder" />
      <FadeIn>
        <SectionHeader title="AI Funnel Builder" subtitle="Generate high-converting marketing funnels in seconds." />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">New Funnel</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Business Niche</label>
                        <input 
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g. Fitness for Dads"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Conversion Goal</label>
                        <select 
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white"
                        >
                            <option>Webinar Signup</option>
                            <option>Product Sale</option>
                            <option>Lead Magnet Download</option>
                            <option>Call Booking</option>
                        </select>
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !niche}
                        className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" /> : <Play size={18} />} Generate Funnel
                    </button>
                </div>
            </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-white">Your Funnels</h3>
            {funnels.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-dark-border rounded-xl text-gray-500">
                    No funnels created yet.
                </div>
            ) : (
                funnels.map(funnel => (
                    <FadeIn key={funnel.id} direction="up">
                        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-lg font-bold text-white">{funnel.name}</h4>
                                    <span className="text-xs text-brand-400 font-bold uppercase tracking-wider">{funnel.goal}</span>
                                </div>
                                <span className="text-xs text-gray-500">{new Date(funnel.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="space-y-2">
                                {funnel.steps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-dark-bg rounded-lg border border-dark-border">
                                        <span className="w-6 h-6 rounded-full bg-brand-900/50 text-brand-400 flex items-center justify-center text-xs font-bold border border-brand-500/30 shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm text-gray-300">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default Funnels;
