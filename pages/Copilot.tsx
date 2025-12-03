import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Play, Loader2, ArrowRight, MessageSquare, Clock, Plus, Volume2 } from 'lucide-react';
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

  const handleCreateWorkflow = async () => {
    if (!plan) return;
    const workflow = await mockDb.createWorkflowFromPlan(input.substring(0, 40) + '...', plan);
    navigate(`/copilot/workflows/${workflow.id}`);
  };

  const handleSpeak = () => {
      if (!plan) return;
      const text = `Here is a plan for: ${input}. Summary: ${plan.summary}. Step 1 is ${plan.steps[0].title}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
  };

  const recentChats = [
      "Launch Sequence for E-Book",
      "Nurture Flow for Webinar",
      "Customer Support Auto-Reply"
  ];

  return (
    <div className="flex h-full">
        {/* Chat History Sidebar (Desktop) */}
        <div className="hidden lg:flex w-64 bg-dark-bg border-r border-dark-border flex-col p-4">
            <button className="w-full flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg mb-6 transition-colors text-sm">
                <Plus size={16} /> New Chat
            </button>
            <div className="space-y-1">
                <p className="px-2 text-xs font-bold text-gray-500 uppercase mb-2">Recent Plans</p>
                {recentChats.map((chat, i) => (
                    <button key={i} className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg truncate flex items-center gap-2">
                        <MessageSquare size={14} /> {chat}
                    </button>
                ))}
            </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto">
            <FadeIn>
                <div className="max-w-4xl mx-auto mb-10 text-center pt-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/20">
                        <Bot size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">What do you want to automate?</h1>
                    <p className="text-gray-400">Describe a goal. I'll design the workflow and agents for you.</p>
                </div>
            </FadeIn>

            <div className="max-w-4xl mx-auto relative mb-12">
                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. Launch a 5-day email sequence for my new ebook, followed by a CRM update for purchasers..."
                        className="w-full bg-dark-card border border-dark-border rounded-2xl p-6 text-lg text-white shadow-2xl focus:border-brand-500 focus:outline-none min-h-[140px] resize-none pr-32"
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <button 
                            onClick={handlePlan}
                            disabled={isProcessing || !input}
                            className="px-6 py-2 bg-gradient-to-r from-brand-500 to-orange-500 text-white font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 shadow-lg"
                        >
                            {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />} 
                            {isProcessing ? 'Thinking...' : 'Design'}
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex gap-2 justify-center">
                    <span className="px-3 py-1 bg-dark-card border border-dark-border rounded-full text-xs text-gray-500 cursor-pointer hover:text-brand-400 transition-colors" onClick={() => setInput("Create a lead nurture sequence for LinkedIn leads")}>🚀 Nurture Leads</span>
                    <span className="px-3 py-1 bg-dark-card border border-dark-border rounded-full text-xs text-gray-500 cursor-pointer hover:text-brand-400 transition-colors" onClick={() => setInput("Launch a webinar promotion campaign")}>📅 Webinar Promo</span>
                </div>
            </div>

            {plan && (
                <FadeIn>
                    <div className="max-w-4xl mx-auto bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl">
                        <div className="bg-brand-900/20 border-b border-brand-500/20 p-6 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Proposed Strategy</h3>
                                <p className="text-gray-300">{plan.summary}</p>
                            </div>
                            <button onClick={handleSpeak} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-brand-400 transition-colors" title="Read Aloud">
                                <Volume2 size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Workflow Steps</h4>
                            {plan.steps.map((step, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-dark-bg rounded-xl border border-dark-border">
                                    <div className="w-8 h-8 rounded-full bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold text-xs shrink-0 border border-brand-500/30">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-white">{step.title}</h5>
                                        <p className="text-sm text-gray-400">{step.description}</p>
                                        <span className="inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 bg-gray-800 rounded text-gray-400 border border-white/5">
                                            Agent: {step.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-dark-bg/50 border-t border-dark-border flex justify-end">
                            <button 
                                onClick={handleCreateWorkflow}
                                className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-brand-600/20"
                            >
                                Build & Configure <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </FadeIn>
            )}
        </div>
    </div>
  );
};

export default Copilot;