
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Video, Play, Loader2, Sparkles } from 'lucide-react';

const AIAvatar: React.FC = () => {
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = () => {
    if (!script) return;
    setIsGenerating(true);
    // Simulate Video Generation
    setTimeout(() => {
        setIsGenerating(false);
        setVideoUrl('https://example.com/mock-video.mp4'); // In real app, this would be a real URL
    }, 4000);
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <SEO title="AI Avatar Video Generator" />
      <FadeIn>
        <SectionHeader title="AI Avatar Video Generator" subtitle="Turn text into professional spokesperson videos instantly." />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-dark-card border border-dark-border rounded-xl p-8">
            <h3 className="font-bold text-white mb-4">Script</h3>
            <textarea 
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Hi, welcome to Kiran Babu AI. Today I want to show you how..."
                className="w-full h-48 bg-dark-bg border border-dark-border rounded-lg p-4 text-white resize-none focus:outline-none focus:border-brand-500"
            />
            <div className="mt-4 flex gap-4">
                 <select className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white">
                     <option>Avatar: Professional Male</option>
                     <option>Avatar: Professional Female</option>
                     <option>Avatar: Casual Creator</option>
                 </select>
                 <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !script}
                    className="flex-grow py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                    {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />} Generate Video
                 </button>
            </div>
        </div>

        <div className="flex items-center justify-center bg-black/50 border border-dark-border rounded-xl aspect-video relative overflow-hidden">
            {isGenerating ? (
                <div className="text-center">
                    <Loader2 className="animate-spin text-brand-500 w-12 h-12 mx-auto mb-4" />
                    <p className="text-gray-400 animate-pulse">Rendering Avatar...</p>
                </div>
            ) : videoUrl ? (
                <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                        <Play fill="currentColor" />
                    </div>
                    <p className="text-white font-bold">Video Ready!</p>
                    <p className="text-gray-500 text-sm">(Mock generation complete)</p>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <Video size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Preview will appear here</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AIAvatar;
