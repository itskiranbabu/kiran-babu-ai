
import React, { useState } from 'react';
import { generateContentIdeas } from '../services/geminiService';
import { Sparkles, Loader2, Copy } from 'lucide-react';
import Skeleton from './Skeleton';
import { useToast } from './ToastContext';

interface Props {
  className?: string;
  limit?: number;
}

const ContentGenerator: React.FC<Props> = ({ className = '', limit = 3 }) => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('Instagram Reels');
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { addToast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche || !topic) return;

    setLoading(true);
    setIdeas([]);
    // In a real app, we might pass the limit to the service
    const results = await generateContentIdeas(niche, platform, topic);
    setIdeas(results);
    setLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Idea copied to clipboard!', 'success');
  };

  return (
    <div className={`bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8 shadow-2xl ${className}`}>
      <form onSubmit={handleGenerate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Your Niche</label>
            <input 
              type="text" 
              placeholder="e.g. Fitness Coach for Dads"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Platform</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500"
            >
              <option>Instagram Reels</option>
              <option>LinkedIn Text</option>
              <option>YouTube Shorts</option>
              <option>Twitter/X Thread</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Content Topic</label>
          <input 
            type="text" 
            placeholder="e.g. Time management tips"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          {loading ? 'Generating Ideas...' : 'Generate Magic Hooks'}
        </button>
      </form>

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-10 space-y-4">
          <Skeleton height="24px" width="150px" className="mb-4" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
        </div>
      )}

      {/* Results Area */}
      {!loading && ideas.length > 0 && (
        <div className="mt-10 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-400" /> Generated Ideas:
          </h3>
          {ideas.map((idea, index) => (
            <div key={index} className="bg-dark-bg border border-dark-border p-4 rounded-lg flex items-start justify-between gap-4 group hover:border-brand-500/50 transition-colors">
              <p className="text-gray-200">{idea}</p>
              <button 
                onClick={() => handleCopy(idea)}
                className="text-gray-500 hover:text-white transition-colors p-1"
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
