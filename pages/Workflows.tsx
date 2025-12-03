
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MoreVertical, FileText, ArrowRight, Loader2, Activity, CheckCircle, Clock } from 'lucide-react';
import { mockDb } from '../services/mockDb';
import { Workflow } from '../types';
import FadeIn from '../components/FadeIn';

const Workflows: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const data = await mockDb.getWorkflows();
        setWorkflows(data);
        setLoading(false);
    };
    fetchData();
  }, []);

  const activeWorkflows = workflows.filter(w => w.status === 'active').length;
  // Mock data for success rate as we don't fetch all runs here to save bandwidth
  const successRate = workflows.length > 0 ? 94 : 0; 

  return (
    <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-white">Your Workflows</h1>
                <p className="text-gray-400 text-sm">Manage and monitor your automation agents.</p>
            </div>
            <Link to="/copilot" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg flex items-center gap-2 shadow-lg shadow-brand-600/20">
                <Plus size={18} /> New Workflow
            </Link>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-dark-card border border-dark-border rounded-xl p-5 flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                    <Activity size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-xs uppercase font-bold">Active Workflows</p>
                    <h3 className="text-2xl font-bold text-white">{activeWorkflows}</h3>
                </div>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl p-5 flex items-center gap-4">
                <div className="p-3 bg-green-500/10 text-green-400 rounded-lg">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-xs uppercase font-bold">Success Rate</p>
                    <h3 className="text-2xl font-bold text-white">{successRate}%</h3>
                </div>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl p-5 flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-xs uppercase font-bold">Total Runs</p>
                    <h3 className="text-2xl font-bold text-white">1,248</h3>
                </div>
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-brand-500" size={32} />
            </div>
        ) : workflows.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-dark-border rounded-xl bg-dark-card/30">
                <p className="text-gray-500 mb-4">No active workflows found.</p>
                <Link to="/copilot" className="text-brand-400 hover:text-white font-bold">Create one with Copilot &rarr;</Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workflows.map((wf) => (
                    <FadeIn key={wf.id}>
                        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-brand-500/50 transition-colors group h-full flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${wf.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                                    {wf.status}
                                </div>
                                <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{wf.name}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-grow">{wf.description}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-dark-border mt-auto">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <FileText size={12} /> {wf.steps.length} Steps
                                </span>
                                <Link 
                                    to={`/copilot/workflows/${wf.id}`} 
                                    className="px-3 py-1.5 bg-dark-bg border border-dark-border hover:border-brand-500 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    Open Builder <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        )}
    </div>
  );
};

export default Workflows;
