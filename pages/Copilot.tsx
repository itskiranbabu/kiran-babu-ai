import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Play, Loader2, ArrowRight, MessageSquare, Clock, Plus, Volume2, Trash2, Copy } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { generateWorkflowPlan } from '../services/geminiService';
import { mockDb } from '../services/mockDb';
import { CopilotPlan } from '../types';
import { useGenerations } from '../hooks/useRealTimeData';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastContext';

const Copilot: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [plan, setPlan] = useState<CopilotPlan | null>(null);
  
  // Real-time generations hook
  const { generations, addGeneration, deleteGeneration } = useGenerations(20);

  const handlePlan = async () => {
    if (!input) return;
    setIsProcessing(true);
    
    try {
      const result = await generateWorkflowPlan(input);
      setPlan(result);
      
      // Save generation to database
      if (user) {
        await addGeneration({
          type: 'workflow',
          input: input,
          output: JSON.stringify(result),
          tokens: JSON.stringify(result).length,
          model: 'gemini-pro'
        });
      }
      
      addToast('Workflow plan generated successfully!', 'success');
    } catch (error: any) {
      addToast(error.message || 'Failed to generate plan', 'error');
    } finally {
      setIsProcessing(false);
    }
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

  const handleLoadHistory = (gen: any) => {
    try {
      const parsedPlan = JSON.parse(gen.output);
      setPlan(parsedPlan);
      setInput(gen.input);
      addToast('Loaded from history', 'success');
    } catch (error) {
      addToast('Failed to load history', 'error');
    }
  };

  const handleDeleteHistory = async (id: string) => {
    if (!confirm('Delete this generation?')) return;
    
    try {
      await deleteGeneration(id);
      addToast('Generation deleted', 'success');
    } catch (error: any) {
      addToast(error.message || 'Failed to delete', 'error');
    }
  };

  const handleCopyPlan = () => {
    if (!plan) return;
    const text = `${plan.summary}\n\nSteps:\n${plan.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.description}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    addToast('Plan copied to clipboard!', 'success');
  };

  const handleNewChat = () => {
    setInput('');
    setPlan(null);
  };

  // Filter workflow generations
  const workflowGenerations = generations.filter(g => g.type === 'workflow');

  return (
    <div className="flex h-full">
        {/* Chat History Sidebar (Desktop) */}
        <div className="hidden lg:flex w-64 bg-dark-bg border-r border-dark-border flex-col p-4">
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg mb-6 transition-colors text-sm"
            >
                <Plus size={16} /> New Chat
            </button>
            
            <div className="space-y-1 flex-1 overflow-y-auto">
                <p className="px-2 text-xs font-bold text-gray-500 uppercase mb-2">
                  Recent Plans ({workflowGenerations.length})
                </p>
                {workflowGenerations.map((gen) => (
                    <div key={gen.id} className="group relative">
                      <button 
                        onClick={() => handleLoadHistory(gen)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg truncate flex items-center gap-2"
                      >
                          <MessageSquare size={14} /> 
                          <span className="flex-1 truncate">{gen.input.substring(0, 30)}...</span>
                      </button>
                      <button
                        onClick={() => handleDeleteHistory(gen.id)}
                        className="absolute right-2 top-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded transition-opacity"
                      >
                        <Trash2 size={12} className="text-red-400" />
                      </button>
                    </div>
                ))}
                {workflowGenerations.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-4">
                    No workflow plans yet
                  </p>
                )}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-dark-border">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Total Plans</span>
                <span className="font-bold text-brand-400">{workflowGenerations.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>This Month</span>
                <span className="font-bold text-brand-400">
                  {workflowGenerations.filter(g => {
                    const date = new Date(g.created_at);
                    const now = new Date();
                    return date.getMonth() === now.getMonth();
                  }).length}
                </span>
              </div>
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
                    {user && (
                      <p className="text-xs text-gray-500 mt-2">
                        All generations are automatically saved to your history
                      </p>
                    )}
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
                <div className="mt-4 flex gap-2 justify-center flex-wrap">
                    <span 
                      className="px-3 py-1 bg-dark-card border border-dark-border rounded-full text-xs text-gray-500 cursor-pointer hover:text-brand-400 transition-colors" 
                      onClick={() => setInput("Create a lead nurture sequence for LinkedIn leads")}
                    >
                      🚀 Nurture Leads
                    </span>
                    <span 
                      className="px-3 py-1 bg-dark-card border border-dark-border rounded-full text-xs text-gray-500 cursor-pointer hover:text-brand-400 transition-colors" 
                      onClick={() => setInput("Launch a webinar promotion campaign")}
                    >
                      📅 Webinar Promo
                    </span>
                    <span 
                      className="px-3 py-1 bg-dark-card border border-dark-border rounded-full text-xs text-gray-500 cursor-pointer hover:text-brand-400 transition-colors" 
                      onClick={() => setInput("Automate customer onboarding process")}
                    >
                      👋 Onboarding
                    </span>
                </div>
            </div>

            {plan && (
                <FadeIn>
                    <div className="max-w-4xl mx-auto bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl">
                        <div className="bg-brand-900/20 border-b border-brand-500/20 p-6 flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">Proposed Strategy</h3>
                                <p className="text-gray-300">{plan.summary}</p>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={handleCopyPlan} 
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-brand-400 transition-colors" 
                                title="Copy Plan"
                              >
                                  <Copy size={20} />
                              </button>
                              <button 
                                onClick={handleSpeak} 
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-brand-400 transition-colors" 
                                title="Read Aloud"
                              >
                                  <Volume2 size={20} />
                              </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Workflow Steps</h4>
                            {plan.steps.map((step, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-dark-bg rounded-xl border border-dark-border hover:border-brand-500/30 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold text-xs shrink-0 border border-brand-500/30">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-white">{step.title}</h5>
                                        <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                                        <span className="inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 bg-gray-800 rounded text-gray-400 border border-white/5">
                                            Agent: {step.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-dark-bg/50 border-t border-dark-border flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                              <Clock size={14} className="inline mr-1" />
                              Generated just now
                            </div>
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
