
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { UploadCloud, Video, Mic, FileText, Youtube, Linkedin, Instagram, Sparkles, Loader2 } from 'lucide-react';

const Repurpose: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
        setIsUploading(false);
        setActiveStep(2);
    }, 2000);
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
        setIsProcessing(false);
        setActiveStep(3);
    }, 3000);
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <SEO title="AI Content Repurposer" description="Turn one video into 10+ pieces of content." />
      
      <FadeIn>
        <SectionHeader 
            title="AI Content Repurposer" 
            subtitle="Upload a video or audio file. Get transcripts, blog posts, social hooks, and more."
            center
        />
      </FadeIn>

      <div className="mt-12">
        {/* Steps Indicator */}
        <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4 text-sm font-medium">
                <span className={`px-3 py-1 rounded-full ${activeStep >= 1 ? 'bg-brand-600 text-white' : 'bg-dark-card text-dark-muted'}`}>1. Upload</span>
                <div className="w-8 h-px bg-dark-border"></div>
                <span className={`px-3 py-1 rounded-full ${activeStep >= 2 ? 'bg-brand-600 text-white' : 'bg-dark-card text-dark-muted'}`}>2. Configure</span>
                <div className="w-8 h-px bg-dark-border"></div>
                <span className={`px-3 py-1 rounded-full ${activeStep >= 3 ? 'bg-brand-600 text-white' : 'bg-dark-card text-dark-muted'}`}>3. Results</span>
            </div>
        </div>

        {/* Step 1: Upload */}
        {activeStep === 1 && (
             <FadeIn>
                <div 
                    onClick={handleUpload}
                    className="border-2 border-dashed border-dark-border bg-dark-card/30 rounded-2xl p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-dark-card/50 transition-all group"
                >
                    <div className="w-16 h-16 bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        {isUploading ? <Loader2 className="animate-spin text-brand-500" /> : <UploadCloud size={32} className="text-brand-500" />}
                    </div>
                    <h3 className="text-xl font-bold text-dark-text mb-2">Click to upload media</h3>
                    <p className="text-dark-muted mb-6">Supports .mp4, .mov, .mp3 (Max 500MB)</p>
                    <div className="flex justify-center gap-4 text-xs text-dark-muted">
                        <span className="flex items-center gap-1"><Video size={14} /> Video</span>
                        <span className="flex items-center gap-1"><Mic size={14} /> Audio</span>
                    </div>
                </div>
            </FadeIn>
        )}

        {/* Step 2: Configuration */}
        {activeStep === 2 && (
            <FadeIn>
                <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-8 p-4 bg-dark-bg rounded-lg border border-dark-border">
                        <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded flex items-center justify-center">
                            <Video size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-dark-text">my_podcast_episode_1.mp4</h4>
                            <p className="text-xs text-dark-muted">Uploaded • 145 MB</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-dark-text mb-4">Select Outputs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {['YouTube Description', 'LinkedIn Post', 'Twitter Thread', 'Instagram Caption', 'Blog Post', 'Newsletter'].map((item) => (
                            <label key={item} className="flex items-center gap-3 p-4 border border-dark-border rounded-lg hover:bg-dark-bg cursor-pointer transition-colors">
                                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-600 text-brand-600 focus:ring-brand-500 bg-dark-bg" />
                                <span className="text-dark-text">{item}</span>
                            </label>
                        ))}
                    </div>

                    <button 
                        onClick={handleGenerate}
                        disabled={isProcessing}
                        className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <><Loader2 className="animate-spin" /> Analyzing Content...</>
                        ) : (
                            <><Sparkles /> Generate Assets</>
                        )}
                    </button>
                </div>
            </FadeIn>
        )}

        {/* Step 3: Results (Mock) */}
        {activeStep === 3 && (
            <div className="space-y-6">
                <FadeIn delay={0}>
                    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold">
                            <Linkedin size={20} /> LinkedIn Post
                        </div>
                        <div className="bg-dark-bg p-4 rounded-lg text-dark-text text-sm leading-relaxed whitespace-pre-line border border-dark-border">
                            🚀 Just recorded a new video on AI workflows.<br/><br/>
                            Here are the 3 key takeaways:<br/>
                            1. Automation isn't about replacing humans, it's about leverage.<br/>
                            2. The best prompts are iterative.<br/>
                            3. Start small, scale fast.<br/><br/>
                            Full video link in comments! 👇 #AI #Productivity #Creator
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="text-sm font-medium text-brand-500 hover:text-brand-400">Copy to Clipboard</button>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={100}>
                    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-red-500 font-bold">
                            <Youtube size={20} /> YouTube Description
                        </div>
                        <div className="bg-dark-bg p-4 rounded-lg text-dark-text text-sm leading-relaxed whitespace-pre-line border border-dark-border">
                            In this video, I break down exactly how I built my "Second Brain" in Notion.<br/><br/>
                            TIMESTAMPS:<br/>
                            0:00 - Intro<br/>
                            1:45 - The PARA Method<br/>
                            5:30 - Setting up the dashboard<br/><br/>
                            Get the template here: https://kiranbabu.ai/store
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="text-sm font-medium text-brand-500 hover:text-brand-400">Copy to Clipboard</button>
                        </div>
                    </div>
                </FadeIn>
                
                <div className="text-center pt-8">
                     <button 
                        onClick={() => setActiveStep(1)}
                        className="text-dark-muted hover:text-dark-text text-sm font-medium"
                     >
                        Start Over
                     </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Repurpose;
