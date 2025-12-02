import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Play, Loader2, ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { generateWorkflowPlan } from '../services/geminiService';
import { mockDb } from '../services/mockDb';
import { CopilotPlan } from '../types';

const Copilot: React.FC = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [plan, setPlan] = useState<CopilotPlan | null>(null);
  const navigate = useNavigate();

  const handlePlan = async () => {
    if (!input) return;
    setIsProcessing(true);
    const result = await generateWorkflowPlan(input);
    setPlan(result);
    setIsProcessing(false);
  };

  const handleCreateWorkflow = () => {
    if (!plan) return;
    const workflow = mockDb.createWorkflowFromPlan(input.substring(0, 40) + '...', plan);
    navigate(`/copilot/workflows/${workflow.id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
        <FadeIn>
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">What do you want to automate?</h1>
                <p className="text-gray-400">Describe a goal. I'll design the workflow and agents for you.</p>
            </div>
        </FadeIn>

        <div className="relative mb-12">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. Launch a 5-day email sequence for my new ebook, followed by a CRM update for purchasers..."
                className="w-full bg-dark-card border border-dark-border rounded-xl p-6 text-lg text-white shadow-xl focus:border-brand-500 focus:outline-none min-h-[120px] resize-none"
            />
            <button 
                onClick={handlePlan}
                disabled={isProcessing || !input}
                className="absolute bottom-4 right-4 px-6 py-2 bg-gradient-to-r from-brand-500 to-orange-500 text-white font-bold rounded-lg flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
            >
                {isProcessing ? <Loader2 className="animate-spin" /> : <Bot size={18} />} 
                {isProcessing ? 'Agents Thinking...' : 'Design Workflow'}
            </button>
        </div>

        {plan && (
            <FadeIn>
                <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-brand-900/20 border-b border-brand-500/20 p-6">
                        <h3 className="text-xl font-bold text-white mb-2">Proposed Strategy</h3>
                        <p className="text-gray-300">{plan.summary}</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Workflow Steps</h4>
                        {plan.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-dark-bg rounded-lg border border-dark-border">
                                <div className="w-8 h-8 rounded-full bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold text-xs shrink-0 border border-brand-500/30">
                                    {i + 1}
                                </div>
                                <div>
                                    <h5 className="font-bold text-white">{step.title}</h5>
                                    <p className="text-sm text-gray-400">{step.description}</p>
                                    <span className="inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 bg-gray-800 rounded text-gray-400">
                                        Agent: {step.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 bg-dark-bg/50 border-t border-dark-border flex justify-end">
                        <button 
                            onClick={handleCreateWorkflow}
                            className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg flex items-center gap-2 transition-colors"
                        >
                            Build & Configure <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </FadeIn>
        )}
    </div>
  );
};

export default Copilot;