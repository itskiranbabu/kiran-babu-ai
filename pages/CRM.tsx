
import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Plus, MoreHorizontal, Mail, DollarSign, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { mockDb, Lead } from '../services/mockDb';
import Modal from '../components/Modal';

const COLUMNS = ['New Lead', 'Qualified', 'Proposal Sent', 'Closed Won'];

const CRM: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Lead Form State
  const [newLead, setNewLead] = useState({ name: '', email: '', value: '', source: 'Manual' });

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

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
        mockDb.deleteLead(id);
        setLeads(leads.filter(l => l.id !== id));
    }
  };

  const moveLead = (id: string, currentStatus: string, direction: 'next' | 'prev') => {
    const currentIndex = COLUMNS.indexOf(currentStatus);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= 0 && newIndex < COLUMNS.length) {
        const newStatus = COLUMNS[newIndex] as any;
        mockDb.updateLead(id, { status: newStatus });
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="CRM Dashboard" description="Manage your leads and sales pipeline." />
      
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <SectionHeader 
                title="CRM & Pipeline" 
                subtitle="Track your leads, manage client relationships, and close more deals."
            />
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors mb-12 shadow-lg shadow-brand-600/20"
            >
                <Plus size={18} /> Add Lead
            </button>
        </div>
      </FadeIn>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((column, colIndex) => (
          <FadeIn key={column} delay={colIndex * 100} direction="up" className="h-full">
            <div className="bg-dark-card/50 border border-dark-border rounded-xl flex flex-col h-full min-h-[500px]">
              {/* Column Header */}
              <div className="p-4 border-b border-dark-border flex justify-between items-center bg-dark-bg/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${
                        column === 'New Lead' ? 'bg-blue-400' :
                        column === 'Qualified' ? 'bg-yellow-400' :
                        column === 'Proposal Sent' ? 'bg-purple-400' : 'bg-green-400'
                    }`} />
                    <h3 className="font-bold text-dark-text text-sm">{column}</h3>
                </div>
                <span className="text-xs text-dark-muted font-medium bg-dark-border/50 px-2 py-0.5 rounded">
                    {leads.filter(l => l.status === column).length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="p-3 space-y-3 flex-grow">
                {leads.filter(l => l.status === column).map(lead => (
                    <div key={lead.id} className="bg-dark-bg border border-dark-border p-4 rounded-lg shadow-sm hover:border-brand-500/30 transition-colors group relative">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-dark-text text-sm">{lead.name}</h4>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleDelete(lead.id)} className="text-red-400 hover:text-red-300 p-1">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-1.5 mb-3">
                             <div className="flex items-center gap-2 text-xs text-dark-muted">
                                <Mail size={12} /> {lead.email}
                             </div>
                             <div className="flex items-center gap-2 text-xs text-dark-muted">
                                <DollarSign size={12} /> {lead.value}
                             </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-dark-border/50">
                             <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                                {lead.source}
                             </span>
                             <div className="flex gap-1">
                                {colIndex > 0 && (
                                    <button onClick={() => moveLead(lead.id, column, 'prev')} className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-white" title="Move Back">
                                        <ArrowLeft size={12} />
                                    </button>
                                )}
                                {colIndex < COLUMNS.length - 1 && (
                                    <button onClick={() => moveLead(lead.id, column, 'next')} className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-white" title="Move Forward">
                                        <ArrowRight size={12} />
                                    </button>
                                )}
                             </div>
                        </div>
                    </div>
                ))}
                
                {leads.filter(l => l.status === column).length === 0 && (
                    <div className="text-center py-8 text-xs text-dark-muted border border-dashed border-dark-border rounded-lg">
                        No leads
                    </div>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lead">
        <form onSubmit={handleAddLead} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
                <input 
                    required 
                    value={newLead.name}
                    onChange={e => setNewLead({...newLead, name: e.target.value})}
                    className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white focus:border-brand-500 focus:outline-none"
                    placeholder="Client Name"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                <input 
                    required 
                    type="email"
                    value={newLead.email}
                    onChange={e => setNewLead({...newLead, email: e.target.value})}
                    className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white focus:border-brand-500 focus:outline-none"
                    placeholder="client@example.com"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Estimated Value</label>
                <input 
                    required 
                    value={newLead.value}
                    onChange={e => setNewLead({...newLead, value: e.target.value})}
                    className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white focus:border-brand-500 focus:outline-none"
                    placeholder="$1,000"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Source</label>
                <select 
                    value={newLead.source}
                    onChange={e => setNewLead({...newLead, source: e.target.value})}
                    className="w-full bg-dark-bg border border-dark-border rounded px-3 py-2 text-white focus:border-brand-500 focus:outline-none"
                >
                    <option value="Manual">Manual Entry</option>
                    <option value="Website">Website</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                </select>
            </div>
            <button type="submit" className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded mt-4">
                Create Lead
            </button>
        </form>
      </Modal>
    </div>
  );
};

export default CRM;
