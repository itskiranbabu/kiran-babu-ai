import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Plus, Mail, DollarSign, Trash2, ArrowRight, ArrowLeft, Sparkles, X } from 'lucide-react';
import { mockDb } from '../services/mockDb';
import { Lead } from '../types';
import Modal from '../components/Modal';
import { analyzeLead } from '../services/geminiService';

const COLUMNS = ['New Lead', 'Qualified', 'Proposal Sent', 'Closed Won'];

const CRM: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', value: '', source: 'Manual' });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [aiInsight, setAiInsight] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    setLeads(mockDb.getLeads());
  }, []);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const lead = mockDb.addLead({ ...newLead, status: 'New Lead' });
    setLeads([...leads, lead]);
    setIsModalOpen(false);
    setNewLead({ name: '', email: '', value: '', source: 'Manual' });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure?')) {
        mockDb.deleteLead(id);
        setLeads(leads.filter(l => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const moveLead = (id: string, currentStatus: string, direction: 'next' | 'prev', e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = COLUMNS.indexOf(currentStatus);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= 0 && newIndex < COLUMNS.length) {
        const newStatus = COLUMNS[newIndex] as any;
        mockDb.updateLead(id, { status: newStatus });
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
  };

  const handleSelectLead = async (lead: Lead) => {
    setSelectedLead(lead);
    setAiInsight('');
    setAnalyzing(true);
    const insight = await analyzeLead(lead);
    setAiInsight(insight || '');
    setAnalyzing(false);
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="CRM Dashboard" />
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
             <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider bg-brand-900/20 px-2 py-1 rounded border border-brand-500/20 mb-2 inline-block">Suite · Sales</span>
                <SectionHeader title="CRM & Pipeline" subtitle="Manage leads with AI-powered insights." />
            </div>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors mb-12 shadow-lg shadow-brand-600/20">
                <Plus size={18} /> Add Lead
            </button>
        </div>
      </FadeIn>

      <div className="flex gap-6 h-[600px]">
          {/* Pipeline */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto h-full">
            {COLUMNS.map((column, colIndex) => (
                <div key={column} className="bg-dark-card/50 border border-dark-border rounded-xl flex flex-col h-full min-w-[250px]">
                    <div className="p-3 border-b border-dark-border bg-dark-bg/50 rounded-t-xl flex justify-between items-center">
                        <span className="font-bold text-sm text-white">{column}</span>
                        <span className="text-xs text-dark-muted bg-dark-border/50 px-2 rounded">{leads.filter(l => l.status === column).length}</span>
                    </div>
                    <div className="p-2 space-y-2 overflow-y-auto flex-grow">
                        {leads.filter(l => l.status === column).map(lead => (
                            <div 
                                key={lead.id} 
                                onClick={() => handleSelectLead(lead)}
                                className={`bg-dark-bg border p-3 rounded-lg shadow-sm cursor-pointer transition-colors group ${selectedLead?.id === lead.id ? 'border-brand-500 ring-1 ring-brand-500' : 'border-dark-border hover:border-brand-500/30'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-white text-sm">{lead.name}</h4>
                                    <button onClick={(e) => handleDelete(lead.id, e)} className="text-gray-600 hover:text-red-400"><Trash2 size={12} /></button>
                                </div>
                                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1"><DollarSign size={10} /> {lead.value}</div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-dark-border/50">
                                    <span className="text-[10px] uppercase text-brand-400 font-bold">{lead.source}</span>
                                    <div className="flex gap-1">
                                        {colIndex > 0 && <button onClick={(e) => moveLead(lead.id, column, 'prev', e)} className="p-1 hover:bg-white/10 rounded"><ArrowLeft size={10} className="text-gray-400" /></button>}
                                        {colIndex < COLUMNS.length - 1 && <button onClick={(e) => moveLead(lead.id, column, 'next', e)} className="p-1 hover:bg-white/10 rounded"><ArrowRight size={10} className="text-gray-400" /></button>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
          </div>

          {/* AI Side Panel */}
          {selectedLead && (
              <div className="w-80 bg-dark-card border border-dark-border rounded-xl p-6 shadow-2xl animate-in slide-in-from-right-10 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-white flex items-center gap-2"><Sparkles size={16} className="text-brand-400" /> AI Insights</h3>
                      <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-white"><X size={18} /></button>
                  </div>
                  
                  <div className="mb-6">
                      <div className="text-2xl font-bold text-white mb-1">{selectedLead.name}</div>
                      <div className="text-sm text-gray-400 flex items-center gap-2"><Mail size={12} /> {selectedLead.email}</div>
                  </div>

                  <div className="flex-grow">
                      {analyzing ? (
                          <div className="flex items-center gap-2 text-brand-400 text-sm"><Sparkles className="animate-spin" size={14} /> Analyzing Deal...</div>
                      ) : (
                          <div className="bg-brand-900/10 border border-brand-500/20 rounded-lg p-4 text-sm text-gray-300 leading-relaxed">
                              {aiInsight}
                          </div>
                      )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-dark-border">
                      <button className="w-full py-2 bg-white text-black font-bold rounded hover:bg-gray-200">Email Client</button>
                  </div>
              </div>
          )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lead">
        <form onSubmit={handleAddLead} className="space-y-4">
            <input required value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white" placeholder="Client Name" />
            <input required type="email" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white" placeholder="Email" />
            <input required value={newLead.value} onChange={e => setNewLead({...newLead, value: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white" placeholder="Value (e.g. $1000)" />
            <select value={newLead.source} onChange={e => setNewLead({...newLead, source: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white">
                <option>Manual</option><option>Website</option><option>LinkedIn</option>
            </select>
            <button type="submit" className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded">Add Lead</button>
        </form>
      </Modal>
    </div>
  );
};

export default CRM;