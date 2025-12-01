import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Settings, 
  LogOut, 
  User, 
  Bell,
  ChevronRight
} from 'lucide-react';
import SEO from '../components/SEO';
import ContentGenerator from '../components/ContentGenerator';
import FadeIn from '../components/FadeIn';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-studio' | 'settings'>('ai-studio');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'ai-studio', label: 'AI Studio', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="pt-16 min-h-screen bg-dark-bg">
      <SEO title="Dashboard" description="Manage your AI tools and content generation." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeIn direction="none">
              <div className="bg-dark-card border border-dark-border rounded-xl p-4 sticky top-24">
                <div className="flex items-center gap-3 p-4 mb-6 border-b border-dark-border/50">
                  <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">
                    KB
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">Kiran Babu</h3>
                    <p className="text-xs text-gray-500">Pro Plan</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-brand-600/10 text-brand-400 border border-brand-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                      {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-dark-border/50">
                   <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                     <LogOut size={18} />
                     Sign Out
                   </button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
             <FadeIn delay={100}>
                {/* Header for Mobile/Tablet context mostly, or just general page title */}
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold text-white">
                    {menuItems.find(i => i.id === activeTab)?.label}
                  </h1>
                  <div className="flex gap-4">
                    <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 relative">
                      <Bell size={20} />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5">
                      <User size={20} />
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-1">Ideas Generated</p>
                        <p className="text-3xl font-bold text-white">124</p>
                     </div>
                     <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-1">Saved Prompts</p>
                        <p className="text-3xl font-bold text-white">12</p>
                     </div>
                     <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-1">Plan Usage</p>
                        <p className="text-3xl font-bold text-white">45%</p>
                     </div>
                     <div className="col-span-full bg-brand-900/10 border border-brand-500/20 rounded-xl p-8 text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Welcome to your Dashboard</h3>
                        <p className="text-gray-400 mb-6">Start creating viral content with our AI tools.</p>
                        <button 
                          onClick={() => setActiveTab('ai-studio')}
                          className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Go to AI Studio
                        </button>
                     </div>
                  </div>
                )}

                {activeTab === 'ai-studio' && (
                  <div className="space-y-6">
                     <div className="bg-gradient-to-r from-brand-900/40 to-dark-card border border-brand-500/20 rounded-xl p-6 mb-6">
                        <h2 className="text-lg font-bold text-white mb-2">Social Media Hook Generator</h2>
                        <p className="text-sm text-gray-300">
                          Use our advanced Gemini-powered model to generate high-converting hooks for your content.
                        </p>
                     </div>
                     <ContentGenerator />
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="bg-dark-card border border-dark-border rounded-xl p-8 text-center">
                    <Settings size={48} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Account Settings</h3>
                    <p className="text-gray-400">Manage your subscription and profile preferences.</p>
                    <p className="text-sm text-gray-500 mt-4">(Coming soon in full version)</p>
                  </div>
                )}
             </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;