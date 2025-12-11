import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Settings, 
  LogOut, 
  User, 
  Bell,
  ChevronRight,
  Save,
  TrendingUp,
  Zap,
  FolderOpen,
  Activity
} from 'lucide-react';
import SEO from '../components/SEO';
import ContentGenerator from '../components/ContentGenerator';
import FadeIn from '../components/FadeIn';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastContext';
import { useMetrics, useProjects, useGenerations } from '../hooks/useRealTimeData';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-studio' | 'settings'>('overview');
  const { user, updateProfile, logout } = useAuth();
  const { addToast } = useToast();
  
  // Real-time data hooks
  const { metrics, loading: metricsLoading } = useMetrics(30000); // Refresh every 30s
  const { projects } = useProjects();
  const { generations } = useGenerations(10);

  // Settings State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    notifications: true
  });

  // Update form when user loads
  useEffect(() => {
    if (user) {
        setFormData(prev => ({
            ...prev,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }));
    }
  }, [user]);

  const handleSaveSettings = (e: React.FormEvent) => {
      e.preventDefault();
      updateProfile({
          name: formData.name,
          email: formData.email,
          avatar: formData.avatar
      });
      addToast('Profile updated successfully!', 'success');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'ai-studio', label: 'AI Studio', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Calculate growth percentages (mock for now)
  const getGrowthPercentage = (current: number) => {
    const growth = Math.floor(Math.random() * 50) + 10;
    return `+${growth}%`;
  };

  return (
    <div className="pt-16 min-h-screen bg-dark-bg">
      <SEO title="Dashboard" description="Real-time dashboard with live metrics and AI tools." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeIn direction="none">
              <div className="bg-dark-card border border-dark-border rounded-xl p-4 sticky top-24">
                <div className="flex items-center gap-3 p-4 mb-6 border-b border-dark-border/50">
                  <div className="w-10 h-10 rounded-full bg-brand-600 border border-brand-400 overflow-hidden">
                    {user?.avatar && <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm truncate max-w-[120px]">{user?.name || 'Creator'}</h3>
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
                   <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                   >
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
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {menuItems.find(i => i.id === activeTab)?.label}
                    </h1>
                    {activeTab === 'overview' && (
                      <p className="text-sm text-gray-400 mt-1">
                        Real-time metrics updated every 30 seconds
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 relative">
                      <Bell size={20} />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                  </div>
                </div>

                {activeTab === 'overview' && (
                  <div className="space-y-8">
                     {/* Real-time Metrics Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-brand-500/30 transition-colors">
                           <div className="flex items-center justify-between mb-4">
                              <div className="p-2 bg-brand-900/20 rounded-lg">
                                <FolderOpen size={20} className="text-brand-400" />
                              </div>
                              <span className="text-xs font-bold text-green-400">
                                {getGrowthPercentage(metrics.totalProjects)}
                              </span>
                           </div>
                           <p className="text-gray-400 text-sm mb-1">Total Projects</p>
                           <p className="text-3xl font-bold text-white">
                             {metricsLoading ? '...' : metrics.totalProjects}
                           </p>
                        </div>

                        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-brand-500/30 transition-colors">
                           <div className="flex items-center justify-between mb-4">
                              <div className="p-2 bg-purple-900/20 rounded-lg">
                                <Sparkles size={20} className="text-purple-400" />
                              </div>
                              <span className="text-xs font-bold text-green-400">
                                {getGrowthPercentage(metrics.totalGenerations)}
                              </span>
                           </div>
                           <p className="text-gray-400 text-sm mb-1">AI Generations</p>
                           <p className="text-3xl font-bold text-white">
                             {metricsLoading ? '...' : metrics.totalGenerations}
                           </p>
                        </div>

                        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-brand-500/30 transition-colors">
                           <div className="flex items-center justify-between mb-4">
                              <div className="p-2 bg-orange-900/20 rounded-lg">
                                <Zap size={20} className="text-orange-400" />
                              </div>
                              <span className="text-xs font-bold text-green-400">
                                {getGrowthPercentage(metrics.tokensUsed)}
                              </span>
                           </div>
                           <p className="text-gray-400 text-sm mb-1">Tokens Used</p>
                           <p className="text-3xl font-bold text-white">
                             {metricsLoading ? '...' : metrics.tokensUsed.toLocaleString()}
                           </p>
                        </div>

                        <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-brand-500/30 transition-colors">
                           <div className="flex items-center justify-between mb-4">
                              <div className="p-2 bg-blue-900/20 rounded-lg">
                                <TrendingUp size={20} className="text-blue-400" />
                              </div>
                              <span className="text-xs font-bold text-green-400">
                                {getGrowthPercentage(metrics.activeWorkflows)}
                              </span>
                           </div>
                           <p className="text-gray-400 text-sm mb-1">Active Workflows</p>
                           <p className="text-3xl font-bold text-white">
                             {metricsLoading ? '...' : metrics.activeWorkflows}
                           </p>
                        </div>
                     </div>

                     {/* Quick Actions */}
                     <div className="bg-gradient-to-r from-brand-900/40 to-dark-card border border-brand-500/20 rounded-xl p-8">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">Welcome back, {user?.name}!</h3>
                            <p className="text-gray-300 mb-4">
                              You have {projects.length} active projects and {generations.length} recent AI generations.
                            </p>
                            <div className="flex gap-4">
                              <button 
                                onClick={() => setActiveTab('ai-studio')}
                                className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
                              >
                                Generate Content
                              </button>
                              <button 
                                onClick={() => window.location.href = '/#/portfolio'}
                                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors border border-white/10"
                              >
                                View Portfolio
                              </button>
                            </div>
                          </div>
                          <div className="hidden lg:block">
                            <div className="w-32 h-32 bg-gradient-to-br from-brand-500 to-orange-500 rounded-2xl flex items-center justify-center">
                              <Activity size={64} className="text-white opacity-20" />
                            </div>
                          </div>
                        </div>
                     </div>

                     {/* Recent Activity */}
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Projects */}
                        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <FolderOpen size={20} className="text-brand-400" />
                            Recent Projects
                          </h3>
                          <div className="space-y-3">
                            {projects.slice(0, 5).map((project) => (
                              <div key={project.id} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex-1">
                                  <p className="text-white font-medium text-sm">{project.title}</p>
                                  <p className="text-xs text-gray-500">{project.client}</p>
                                </div>
                                <span className="text-xs px-2 py-1 bg-brand-900/20 text-brand-400 rounded-full">
                                  {project.category}
                                </span>
                              </div>
                            ))}
                            {projects.length === 0 && (
                              <p className="text-gray-500 text-sm text-center py-4">
                                No projects yet. Create your first one!
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Recent Generations */}
                        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Sparkles size={20} className="text-purple-400" />
                            Recent AI Generations
                          </h3>
                          <div className="space-y-3">
                            {generations.slice(0, 5).map((gen) => (
                              <div key={gen.id} className="p-3 bg-dark-bg rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs px-2 py-1 bg-purple-900/20 text-purple-400 rounded-full">
                                    {gen.type}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {gen.tokens} tokens
                                  </span>
                                </div>
                                <p className="text-white text-sm line-clamp-2">{gen.output}</p>
                              </div>
                            ))}
                            {generations.length === 0 && (
                              <p className="text-gray-500 text-sm text-center py-4">
                                No generations yet. Try the AI Studio!
                              </p>
                            )}
                          </div>
                        </div>
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
                  <div className="bg-dark-card border border-dark-border rounded-xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <User size={20} className="text-brand-400" /> Profile Settings
                    </h3>
                    
                    <form onSubmit={handleSaveSettings} className="space-y-6 max-w-lg">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-dark-bg border border-dark-border overflow-hidden">
                                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Avatar URL</label>
                                <input 
                                    type="text"
                                    value={formData.avatar}
                                    onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input 
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-dark-border">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${formData.notifications ? 'bg-brand-600' : 'bg-dark-bg border border-dark-border'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formData.notifications ? 'translate-x-4' : ''}`} />
                                </div>
                                <span className="text-white text-sm">Enable Email Notifications</span>
                            </label>
                        </div>

                        <button 
                            type="submit"
                            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </form>
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
