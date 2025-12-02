import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MessageSquare, Workflow, Zap } from 'lucide-react';

const CopilotLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-dark-card border-r border-dark-border p-4 flex flex-col gap-2">
        <div className="mb-6 px-4 pt-4">
             <div className="flex items-center gap-2 text-white font-bold mb-1">
                 <Zap size={20} className="text-brand-500 fill-current" /> Suite · Copilot
             </div>
             <p className="text-xs text-gray-500">Agentic Workflow Engine</p>
        </div>

        <NavLink 
            to="/copilot" 
            end
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-600/10 text-brand-400 border border-brand-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
            <MessageSquare size={18} /> Chat & Plan
        </NavLink>
        
        <NavLink 
            to="/copilot/workflows" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-600/10 text-brand-400 border border-brand-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
            <Workflow size={18} /> Workflows
        </NavLink>

         <div className="mt-auto border-t border-dark-border pt-4">
             <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Recent Runs</div>
             <div className="px-4 py-2 text-xs text-gray-600 italic">No recent activity</div>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-dark-bg relative overflow-y-auto max-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default CopilotLayout;