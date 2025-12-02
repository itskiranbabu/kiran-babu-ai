
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Plus, MoreHorizontal, User, Phone, Mail, DollarSign } from 'lucide-react';

// Mock Data for CRM
const INITIAL_LEADS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New Lead', value: '$2,500', source: 'Website' },
  { id: 2, name: 'Alice Smith', email: 'alice@agency.com', status: 'Qualified', value: '$5,000', source: 'LinkedIn' },
  { id: 3, name: 'Bob Johnson', email: 'bob@startup.io', status: 'Proposal Sent', value: '$8,200', source: 'Referral' },
  { id: 4, name: 'Emma Wilson', email: 'emma@design.co', status: 'Closed Won', value: '$3,000', source: 'Instagram' },
];

const COLUMNS = ['New Lead', 'Qualified', 'Proposal Sent', 'Closed Won'];

const CRM: React.FC = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="CRM Dashboard" description="Manage your leads and sales pipeline." />
      
      <FadeIn>
        <div className="flex justify-between items-end mb-8">
            <SectionHeader 
                title="CRM & Pipeline" 
                subtitle="Track your leads, manage client relationships, and close more deals."
            />
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors mb-12">
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
                    <div key={lead.id} className="bg-dark-bg border border-dark-border p-4 rounded-lg shadow-sm hover:border-brand-500/30 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-dark-text text-sm">{lead.name}</h4>
                            <button className="text-dark-muted hover:text-dark-text opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={14} />
                            </button>
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
                             <div className="w-6 h-6 rounded-full bg-brand-900/20 text-brand-500 flex items-center justify-center text-xs font-bold">
                                {lead.name.charAt(0)}
                             </div>
                        </div>
                    </div>
                ))}
                
                <button className="w-full py-2 border border-dashed border-dark-border text-dark-muted text-sm rounded-lg hover:bg-dark-bg hover:text-dark-text transition-colors flex items-center justify-center gap-1">
                    <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default CRM;
