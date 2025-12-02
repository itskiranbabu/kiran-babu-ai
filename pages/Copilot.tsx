
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Bot, Play, CheckSquare, Layers, AlertCircle } from 'lucide-react';
import { generateCampaign } from '../services/geminiService';
import { mockDb } from '../services/mockDb';
import Skeleton from '../components/Skeleton';

const Copilot: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [campaign, setCampaign] = useState<any>(null);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (!goal) return;
    setIsProcessing(true);
    setError('');
    setCampaign(null);

    const result = await generateCampaign(goal);
    
    if (result) {
        setCampaign(result);
        mockDb.addCampaign({ name: goal.substring(0, 30), summary: result.summary, plan: result });
    } else {
        setError('Failed to generate campaign. Please try again with a clearer goal.');
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="Campaign Copilot" />
      <FadeIn>
        <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider bg-brand-900/20 px-2 py-1 rounded border border-brand-500/20">Suite · Copilot</span>
        </div>
        <SectionHeader title="Agentic Campaign Copilot" subtitle="Describe your goal. AI agents will build a full execution plan." />
      </FadeIn>

      {/* Input Area */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="relative">
            <div className="absolute top-0 left-0 -ml-12 mt-4 hidden md:block">
                <Bot size={32} className="text-brand-500" />
            </div>
            <textarea 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="E.g., Launch a 7-day Black Friday promo for my Notion templates with a goal of ₹50k revenue..."
                className="w-full bg-dark-card border border-dark-border rounded-2xl p-6 text-lg text-white shadow-xl focus:border-brand-500 focus:outline-none min-h-[150px] resize-none"
            />
            <div className="absolute bottom-4 right-4">
                <button 
                    onClick={handleRun}
                    disabled={isProcessing || !goal}
                    className="px-6 py-2 bg-gradient-to-r from-brand-500 to-orange-500 text-white font-bold rounded-lg flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                >
                   {isProcessing ? 'Agents Thinking...' : <>Run Copilot <Play size={16} fill="currentColor" /></>} 
                </button>
            </div>
        </div>
        {error && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200">
                <AlertCircle size={20} /> {error}
            </div>
        )}
      </div>

      {/* Loading State */}
      {isProcessing && (
          <div className="max-w-4xl mx-auto space-y-8">
               <Skeleton height="150px" className="rounded-xl" />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <Skeleton height="300px" className="rounded-xl" />
                   <Skeleton height="300px" className="rounded-xl" />
                   <Skeleton height="300px" className="rounded-xl" />
               </div>
          </div>
      )}

      {/* Output Area */}
      {campaign && !isProcessing && (
        <FadeIn>
            <div className="space-y-8">
                {/* Summary Card */}
                <div className="bg-brand-900/10 border border-brand-500/30 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Campaign Strategy</h3>
                    <p className="text-gray-300 leading-relaxed">{campaign.campaign_summary || "Summary unavailable."}</p>
                    {campaign.target_audience && (
                         <div className="mt-4 flex items-center gap-2 text-sm text-brand-300 bg-brand-500/10 w-fit px-3 py-1 rounded-full">
                            <Layers size={14} /> Target: {campaign.target_audience}
                         </div>
                    )}
                </div>

                {/* Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaign.daily_plan?.map((day: any, i: number) => (
                        <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-brand-500/30 transition-colors">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-8 h-8 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center font-bold text-white text-sm">
                                    {day.day || i+1}
                                </span>
                                <span className="font-bold text-gray-200">Day {day.day || i+1}</span>
                            </div>
                            <h4 className="text-lg font-bold text-brand-400 mb-3">{day.theme || "Action Items"}</h4>
                            
                            <ul className="space-y-2 mb-4">
                                {day.action_items?.map((item: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                                        <CheckSquare size={14} className="mt-1 text-gray-600 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {day.platforms?.map((p: string, idx: number) => (
                                    <span key={idx} className="text-xs font-medium text-gray-500 bg-dark-bg px-2 py-1 rounded border border-dark-border">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeIn>
      )}
    </div>
  );
};

export default Copilot;
