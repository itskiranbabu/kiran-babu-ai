
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Fix: Added Plus to imports
import { Play, Save, ArrowLeft, Settings, Zap, Loader2, Calendar, Clock, CheckCircle, Plus } from 'lucide-react';
import { mockDb } from '../services/mockDb';
import { Workflow } from '../types';

const WorkflowDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        const fetchWf = async () => {
            const wf = await mockDb.getWorkflowById(id);
            if (wf) setWorkflow(wf);
            setLoading(false);
        };
        fetchWf();
    }
  }, [id]);

  const handleRun = async () => {
    if (!workflow) return;
    const run = await mockDb.createRun(workflow.id);
    navigate(`/copilot/runs/${run.id}`);
  };

  if (loading) return <div className="p-8 text-white flex justify-center"><Loader2 className="animate-spin text-brand-500" /></div>;
  if (!workflow) return <div className="p-8 text-white">Workflow not found.</div>;

  return (
    <div className="flex h-full">
        {/* Editor Area */}
        <div className="flex-1 p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-dark-border pb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/copilot/workflows')} className="p-2 rounded-lg bg-dark-card border border-dark-border text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white">{workflow.name}</h1>
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-bold rounded uppercase border border-green-500/20">Active</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Calendar size={12} /> Created {new Date(workflow.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Last Run: Success</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-dark-card border border-dark-border hover:text-white text-gray-400 font-medium rounded-lg flex items-center gap-2 transition-colors">
                        <Save size={16} /> Save
                    </button>
                    <button onClick={handleRun} className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all hover:scale-105">
                        <Play size={16} /> Run Workflow
                    </button>
                </div>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                    <div className="px-4 py-2 bg-dark-card border border-dark-border rounded-full text-xs font-bold text-gray-400 flex items-center gap-2 shadow-sm">
                        <Zap size={12} className="text-yellow-400" /> Trigger: Manual Start
                    </div>
                </div>

                {workflow.steps.map((step, index) => (
                    <div key={step.id} className="relative">
                        {index > 0 && <div className="w-0.5 h-8 bg-dark-border mx-auto mb-2"></div>}
                        <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-brand-500/50 transition-colors relative group shadow-sm">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded"><Settings size={16} /></button>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-brand-900/20 text-brand-400 flex items-center justify-center font-bold border border-brand-500/20 shadow-[0_0_10px_rgba(123,47,247,0.1)]">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{step.title}</h4>
                                    <p className="text-sm text-gray-400">{step.description}</p>
                                </div>
                            </div>
                            {step.config.promptTemplate && (
                                <div className="mt-4 p-3 bg-dark-bg/50 rounded border border-dark-border text-xs text-gray-300 font-mono">
                                    <span className="text-brand-400 font-bold uppercase text-[10px] block mb-1">Prompt Template</span>
                                    {step.config.promptTemplate.substring(0, 100)}...
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
                <div className="flex justify-center mt-4">
                    <button className="w-8 h-8 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-500 hover:text-white hover:border-brand-500 transition-colors">
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WorkflowDetail;
