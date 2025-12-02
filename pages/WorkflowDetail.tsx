import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Save, ArrowLeft, Settings, Zap } from 'lucide-react';
import { mockDb } from '../services/mockDb';
import { Workflow } from '../types';

const WorkflowDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);

  useEffect(() => {
    if (id) {
        const wf = mockDb.getWorkflowById(id);
        if (wf) setWorkflow(wf);
    }
  }, [id]);

  const handleRun = () => {
    if (!workflow) return;
    const run = mockDb.createRun(workflow.id);
    navigate(`/copilot/runs/${run.id}`);
  };

  if (!workflow) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="flex h-full">
        {/* Editor Area */}
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/copilot/workflows')} className="text-gray-500 hover:text-white"><ArrowLeft size={20} /></button>
                <h1 className="text-2xl font-bold text-white">{workflow.name}</h1>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded uppercase">Active</span>
                <div className="ml-auto flex gap-2">
                    <button className="px-4 py-2 bg-dark-card border border-dark-border hover:text-white text-gray-400 font-medium rounded-lg flex items-center gap-2">
                        <Save size={16} /> Save
                    </button>
                    <button onClick={handleRun} className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-brand-600/20">
                        <Play size={16} /> Run Workflow
                    </button>
                </div>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                    <div className="px-4 py-2 bg-dark-card border border-dark-border rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                        <Zap size={12} className="text-yellow-400" /> Trigger: Manual Start
                    </div>
                </div>

                {workflow.steps.map((step, index) => (
                    <div key={step.id} className="relative">
                        {index > 0 && <div className="w-0.5 h-6 bg-dark-border mx-auto mb-2"></div>}
                        <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-brand-500/50 transition-colors relative group">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-gray-500 hover:text-white"><Settings size={16} /></button>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-brand-900/20 text-brand-400 flex items-center justify-center font-bold border border-brand-500/20">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{step.title}</h4>
                                    <p className="text-sm text-gray-400">{step.description}</p>
                                </div>
                            </div>
                            {step.config.promptTemplate && (
                                <div className="mt-4 p-3 bg-dark-bg rounded border border-dark-border text-xs text-gray-300 font-mono">
                                    Prompt: {step.config.promptTemplate.substring(0, 60)}...
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default WorkflowDetail;