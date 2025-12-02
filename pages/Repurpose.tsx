
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Sparkles, Copy, Loader2, Linkedin, Instagram, Twitter, Youtube, RefreshCw, Wand2 } from 'lucide-react';
import { repurposeContent, refineContent } from '../services/geminiService';
import { useToast } from '../components/ToastContext';
import { mockDb } from '../services/mockDb';

const Repurpose: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('Professional & Engaging');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('linkedin');
  const { addToast } = useToast();
  
  // Magic Rewrite State
  const [isRefining, setIsRefining] = useState(false);

  const handleGenerate = async () => {
    if (!inputText) return;
    setIsGenerating(true);
    setOutput(null); // Clear previous
    const result = await repurposeContent(inputText, tone);
    if (result) {
        setOutput(result);
        mockDb.incrementUserStat('ideasGenerated');
    }
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    addToast('Content copied to clipboard!');
  };

  const handleMagicRewrite = async (instruction: string) => {
    if (!output) return;
    setIsRefining(true);
    
    let currentContent = '';
    // Determine content based on tab
    if (activeTab === 'linkedin') currentContent = output.linkedin;
    else if (activeTab === 'instagram') {
        // If object, refine just the caption for simplicity, or we could refine the whole object (complex)
        // For simplicity in this demo, we'll stringify or just refine the caption if it's an object
        currentContent = typeof output.instagram === 'string' ? output.instagram : output.instagram.caption;
    }
    else if (activeTab === 'twitter') currentContent = Array.isArray(output.twitter) ? output.twitter.join('\n\n') : output.twitter;
    else if (activeTab === 'youtube') currentContent = output.youtube.description;

    if (currentContent) {
        const refined = await refineContent(currentContent, activeTab, instruction);
        
        // Update local state based on active tab
        const newOutput = { ...output };
        if (activeTab === 'linkedin') newOutput.linkedin = refined;
        else if (activeTab === 'instagram') {
             if (typeof newOutput.instagram === 'string') {
                 newOutput.instagram = refined;
             } else {
                 newOutput.instagram = { ...newOutput.instagram, caption: refined };
             }
        }
        else if (activeTab === 'twitter') newOutput.twitter = refined.split('\n\n'); // Simple split for thread
        else if (activeTab === 'youtube') newOutput.youtube.description = refined;
        
        setOutput(newOutput);
        addToast('Content refined!');
    }
    setIsRefining(false);
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="Content Repurposer" />
      <FadeIn>
        <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider bg-brand-900/20 px-2 py-1 rounded border border-brand-500/20">Suite · Repurposer</span>
        </div>
        <SectionHeader 
            title="AI Content Engine" 
            subtitle="Turn one piece of content into a multi-platform campaign instantly." 
        />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Input Column */}
        <div className="flex flex-col gap-4 h-full">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 flex-grow flex flex-col">
                <label className="text-white font-bold mb-3 flex justify-between">
                    <span>Source Content</span>
                    <span className="text-xs font-normal text-gray-500">{inputText.length} chars</span>
                </label>
                <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your blog post, video transcript, or rough notes here..."
                    className="flex-grow w-full bg-dark-bg border border-dark-border rounded-lg p-4 text-white resize-none focus:outline-none focus:border-brand-500 min-h-[300px]"
                />
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs text-gray-400 mb-1">Tone of Voice</label>
                        <select 
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white text-sm"
                        >
                            <option>Professional & Engaging</option>
                            <option>Casual & Fun</option>
                            <option>Bold & Controversial</option>
                            <option>Storytelling</option>
                        </select>
                     </div>
                     <div className="flex items-end">
                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating || !inputText}
                            className="w-full py-2 bg-gradient-to-r from-brand-500 to-orange-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />} 
                            Repurpose All
                        </button>
                     </div>
                </div>
            </div>
        </div>

        {/* Output Column */}
        <div>
            {!output ? (
                <div className="h-full min-h-[400px] bg-dark-card/50 border border-dark-border border-dashed rounded-xl flex items-center justify-center text-gray-500 flex-col gap-4">
                    {isGenerating ? (
                        <>
                            <Loader2 size={48} className="animate-spin text-brand-500" />
                            <p className="animate-pulse">Analyzing content & generating drafts...</p>
                        </>
                    ) : (
                        <>
                            <RefreshCw size={48} className="opacity-20" />
                            <p>Paste content and click Generate to see magic.</p>
                        </>
                    )}
                </div>
            ) : (
                <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden flex flex-col h-full min-h-[500px]">
                    {/* Tabs */}
                    <div className="flex border-b border-dark-border overflow-x-auto">
                        <button onClick={() => setActiveTab('linkedin')} className={`px-4 py-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap ${activeTab === 'linkedin' ? 'bg-brand-900/20 text-brand-400 border-b-2 border-brand-500' : 'text-gray-400 hover:text-white'}`}>
                            <Linkedin size={16} /> LinkedIn
                        </button>
                        <button onClick={() => setActiveTab('instagram')} className={`px-4 py-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap ${activeTab === 'instagram' ? 'bg-brand-900/20 text-brand-400 border-b-2 border-brand-500' : 'text-gray-400 hover:text-white'}`}>
                            <Instagram size={16} /> Reels
                        </button>
                        <button onClick={() => setActiveTab('twitter')} className={`px-4 py-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap ${activeTab === 'twitter' ? 'bg-brand-900/20 text-brand-400 border-b-2 border-brand-500' : 'text-gray-400 hover:text-white'}`}>
                            <Twitter size={16} /> X Thread
                        </button>
                        <button onClick={() => setActiveTab('youtube')} className={`px-4 py-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap ${activeTab === 'youtube' ? 'bg-brand-900/20 text-brand-400 border-b-2 border-brand-500' : 'text-gray-400 hover:text-white'}`}>
                            <Youtube size={16} /> YouTube
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow bg-dark-bg/50 overflow-y-auto max-h-[600px] relative">
                         {isRefining && (
                             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
                                 <div className="bg-dark-card border border-dark-border p-4 rounded-lg flex items-center gap-3">
                                     <Wand2 className="animate-spin text-brand-400" size={20} />
                                     <span className="text-white font-medium">Refining magic...</span>
                                 </div>
                             </div>
                         )}

                        {activeTab === 'linkedin' && (
                            <div className="prose prose-invert prose-sm max-w-none">
                                <div className="whitespace-pre-line text-gray-200">{output.linkedin}</div>
                                <button onClick={() => copyToClipboard(output.linkedin)} className="mt-4 flex items-center gap-2 text-xs text-brand-400 font-bold uppercase hover:underline"><Copy size={12} /> Copy Post</button>
                            </div>
                        )}
                        {activeTab === 'instagram' && (
                            <div className="space-y-4">
                                {typeof output.instagram === 'object' && output.instagram !== null ? (
                                    <>
                                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                                            <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">Script</span>
                                            <div className="whitespace-pre-line text-gray-200 text-sm">{output.instagram.script}</div>
                                            <button onClick={() => copyToClipboard(output.instagram.script)} className="mt-2 text-brand-400 text-xs flex items-center gap-1 hover:underline"><Copy size={12}/> Copy Script</button>
                                        </div>
                                        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                                            <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">Caption</span>
                                            <div className="whitespace-pre-line text-gray-200 text-sm">{output.instagram.caption}</div>
                                            <button onClick={() => copyToClipboard(output.instagram.caption)} className="mt-2 text-brand-400 text-xs flex items-center gap-1 hover:underline"><Copy size={12}/> Copy Caption</button>
                                        </div>
                                         <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                                            <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">Hashtags</span>
                                            <div className="text-brand-300 text-sm">{output.instagram.hashtags}</div>
                                            <button onClick={() => copyToClipboard(output.instagram.hashtags)} className="mt-2 text-brand-400 text-xs flex items-center gap-1 hover:underline"><Copy size={12}/> Copy Tags</button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <div className="whitespace-pre-line text-gray-200">{output.instagram}</div>
                                        <button onClick={() => copyToClipboard(output.instagram)} className="mt-4 flex items-center gap-2 text-xs text-brand-400 font-bold uppercase hover:underline"><Copy size={12} /> Copy</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === 'twitter' && (
                            <div className="space-y-4">
                                {Array.isArray(output.twitter) ? output.twitter.map((tweet: string, i: number) => (
                                    <div key={i} className="p-3 bg-dark-card border border-dark-border rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs text-gray-500">{i + 1}/{output.twitter.length}</span>
                                            <button onClick={() => copyToClipboard(tweet)}><Copy size={12} className="text-gray-500 hover:text-white" /></button>
                                        </div>
                                        <p className="text-sm text-gray-200">{tweet}</p>
                                    </div>
                                )) : <p className="text-gray-200 whitespace-pre-line">{output.twitter}</p>}
                            </div>
                        )}
                        {activeTab === 'youtube' && output.youtube && (
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase">Title</span>
                                    <p className="font-bold text-white text-lg">{output.youtube.title}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase">Description</span>
                                    <div className="whitespace-pre-line text-sm text-gray-300 mt-1">{output.youtube.description}</div>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase">Tags</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {output.youtube.tags?.split(',').map((t: string, i: number) => (
                                            <span key={i} className="px-2 py-1 bg-brand-900/20 text-brand-300 rounded text-xs border border-brand-500/20">{t.trim()}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Magic Actions */}
                    <div className="p-4 bg-dark-card border-t border-dark-border flex gap-2 overflow-x-auto">
                        <button onClick={() => handleMagicRewrite("Make it shorter and punchier")} className="flex items-center gap-2 px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-brand-500 whitespace-nowrap">
                            <Wand2 size={12} /> Make Shorter
                        </button>
                         <button onClick={() => handleMagicRewrite("Make it more professional")} className="flex items-center gap-2 px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-brand-500 whitespace-nowrap">
                            <Wand2 size={12} /> More Professional
                        </button>
                         <button onClick={() => handleMagicRewrite("Add more emojis and excitement")} className="flex items-center gap-2 px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-brand-500 whitespace-nowrap">
                            <Wand2 size={12} /> Add Excitement
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Repurpose;
