import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, ArrowRight, Download, Save } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { getEnv } from '../utils/env';
import LoadingSpinner from './LoadingSpinner';
import { useToast } from './ToastContext';

interface BlueprintQuestion {
  id: string;
  question: string;
  placeholder: string;
  type: 'text' | 'select' | 'multiselect' | 'number';
  options?: string[];
}

interface Blueprint {
  funnelStructure: string[];
  landingPageSections: Array<{ section: string; copy: string }>;
  emailFlow: Array<{ day: number; subject: string; purpose: string }>;
  automations: Array<{ trigger: string; action: string; tool: string }>;
  recommendedPlan: string;
  techStack: string[];
  timeline: string;
  estimatedCost: string;
}

interface ServiceBlueprintGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCategory?: string;
}

const ServiceBlueprintGenerator: React.FC<ServiceBlueprintGeneratorProps> = ({
  isOpen,
  onClose,
  serviceCategory = 'general'
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const apiKey = getEnv('API_KEY')?.replace(/[\"']/g, '').trim() || '';
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const questions: BlueprintQuestion[] = [
    {
      id: 'niche',
      question: 'What is your specific niche or industry?',
      placeholder: 'e.g., Fitness coaching for busy professionals',
      type: 'text'
    },
    {
      id: 'audience',
      question: 'Who is your target audience?',
      placeholder: 'e.g., 30-45 year old professionals earning $75k+',
      type: 'text'
    },
    {
      id: 'leads_per_month',
      question: 'How many leads do you get per month currently?',
      placeholder: 'e.g., 50',
      type: 'number'
    },
    {
      id: 'current_tools',
      question: 'What tools are you currently using?',
      placeholder: 'e.g., Calendly, Stripe, Instagram, Email',
      type: 'text'
    },
    {
      id: 'budget',
      question: 'What is your monthly budget for tools and automation?',
      placeholder: 'e.g., $500',
      type: 'select',
      options: ['Under $200', '$200-$500', '$500-$1000', '$1000-$2000', '$2000+']
    },
    {
      id: 'timeline',
      question: 'When do you need this launched?',
      placeholder: 'Select timeline',
      type: 'select',
      options: ['ASAP (1-2 weeks)', '2-4 weeks', '1-2 months', '2-3 months', 'Flexible']
    },
    {
      id: 'goal',
      question: 'What is your primary goal?',
      placeholder: 'Select your main goal',
      type: 'select',
      options: [
        'Generate more leads',
        'Increase conversions',
        'Automate client onboarding',
        'Scale revenue',
        'Save time on operations'
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      generateBlueprint();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const generateBlueprint = async () => {
    setLoading(true);

    try {
      if (!ai) {
        // Demo blueprint
        const demoBlueprint: Blueprint = {
          funnelStructure: [
            'Lead Magnet Landing Page',
            'Email Opt-in',
            'Welcome Email Sequence (3 emails)',
            'Tripwire Offer ($27)',
            'Core Offer ($297)',
            'Upsell ($497)'
          ],
          landingPageSections: [
            { section: 'Hero', copy: 'Transform Your [Problem] in 30 Days or Less' },
            { section: 'Problem Agitation', copy: 'Tired of [pain point]? You\'re not alone...' },
            { section: 'Solution', copy: 'Introducing [Your Solution]' },
            { section: 'Benefits', copy: '3 key benefits that solve their problem' },
            { section: 'Social Proof', copy: 'Testimonials from happy clients' },
            { section: 'CTA', copy: 'Get Your Free [Lead Magnet] Now' }
          ],
          emailFlow: [
            { day: 0, subject: 'Welcome! Here\'s your [Lead Magnet]', purpose: 'Deliver value immediately' },
            { day: 2, subject: 'The #1 mistake people make with [topic]', purpose: 'Build authority' },
            { day: 4, subject: 'Case Study: How [Name] achieved [result]', purpose: 'Social proof' },
            { day: 6, subject: 'Special offer: [Tripwire] for only $27', purpose: 'Convert to customer' }
          ],
          automations: [
            { trigger: 'New lead from landing page', action: 'Add to email sequence', tool: 'ConvertKit/Mailchimp' },
            { trigger: 'Tripwire purchase', action: 'Send onboarding email + Slack notification', tool: 'Zapier' },
            { trigger: 'Core offer purchase', action: 'Create client in CRM + Schedule onboarding call', tool: 'Make.com' },
            { trigger: 'Abandoned cart', action: 'Send reminder email after 24h', tool: 'Stripe + Email' }
          ],
          recommendedPlan: 'Pro Plan ($97/mo)',
          techStack: ['Next.js', 'Supabase', 'Stripe', 'ConvertKit', 'Calendly', 'Make.com'],
          timeline: '14-21 days',
          estimatedCost: '$400-600/mo (tools + hosting)'
        };

        setTimeout(() => {
          setBlueprint(demoBlueprint);
          setLoading(false);
          addToast('Blueprint generated successfully!', 'success');
        }, 2000);
        return;
      }

      const prompt = `
You are a business systems architect. Generate a comprehensive service blueprint based on these details:

Niche: ${answers.niche}
Target Audience: ${answers.audience}
Current Leads/Month: ${answers.leads_per_month}
Current Tools: ${answers.current_tools}
Budget: ${answers.budget}
Timeline: ${answers.timeline}
Primary Goal: ${answers.goal}
Service Category: ${serviceCategory}

Create a detailed blueprint with:
1. Funnel structure (6-8 steps from lead magnet to upsell)
2. Landing page sections with copy outlines
3. Email flow (4-6 emails with subjects and purposes)
4. Automation map (trigger → action → tool)
5. Recommended tech stack
6. Recommended KeySpark plan
7. Timeline estimate
8. Monthly cost estimate

Return ONLY valid JSON in this exact structure:
{
  "funnelStructure": ["step1", "step2", ...],
  "landingPageSections": [{"section": "name", "copy": "outline"}, ...],
  "emailFlow": [{"day": 0, "subject": "...", "purpose": "..."}, ...],
  "automations": [{"trigger": "...", "action": "...", "tool": "..."}, ...],
  "recommendedPlan": "plan name",
  "techStack": ["tool1", "tool2", ...],
  "timeline": "X-Y days/weeks",
  "estimatedCost": "$X-Y/mo"
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || '{}');
      setBlueprint(result);
      addToast('Blueprint generated successfully!', 'success');
    } catch (error) {
      console.error('Blueprint generation error:', error);
      addToast('Failed to generate blueprint. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlueprint = async () => {
    // TODO: Save to database
    addToast('Blueprint saved to your projects!', 'success');
  };

  const handleDownloadBlueprint = () => {
    const content = JSON.stringify({ answers, blueprint }, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blueprint-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Blueprint downloaded!', 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-dark-card border border-dark-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border bg-gradient-to-r from-brand-900/20 to-dark-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
              <Sparkles className="text-brand-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Blueprint Generator</h2>
              <p className="text-sm text-gray-400">
                {blueprint ? 'Your Custom Blueprint' : `Question ${step + 1} of ${questions.length}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <LoadingSpinner size="lg" />
              <p className="text-white font-medium mt-4">Generating your custom blueprint...</p>
              <p className="text-sm text-gray-400 mt-2">This may take 10-15 seconds</p>
            </div>
          ) : blueprint ? (
            <div className="space-y-6">
              {/* Funnel Structure */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={20} />
                  Funnel Structure
                </h3>
                <div className="space-y-2">
                  {blueprint.funnelStructure.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-dark-bg rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-gray-200">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landing Page Sections */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Landing Page Outline</h3>
                <div className="space-y-3">
                  {blueprint.landingPageSections.map((section, i) => (
                    <div key={i} className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                      <h4 className="text-brand-400 font-semibold mb-1">{section.section}</h4>
                      <p className="text-sm text-gray-300">{section.copy}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Flow */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Email Sequence</h3>
                <div className="space-y-3">
                  {blueprint.emailFlow.map((email, i) => (
                    <div key={i} className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-brand-500/20 text-brand-400 rounded">
                          Day {email.day}
                        </span>
                        <h4 className="text-white font-medium">{email.subject}</h4>
                      </div>
                      <p className="text-sm text-gray-400">{email.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automations */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Automation Map</h3>
                <div className="space-y-3">
                  {blueprint.automations.map((auto, i) => (
                    <div key={i} className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-300">{auto.trigger}</span>
                        <ArrowRight className="text-brand-400" size={16} />
                        <span className="text-gray-300">{auto.action}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Tool: {auto.tool}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <h4 className="text-white font-semibold mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {blueprint.techStack.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded border border-brand-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <h4 className="text-white font-semibold mb-2">Recommended Plan</h4>
                  <p className="text-brand-400 font-bold">{blueprint.recommendedPlan}</p>
                </div>

                <div className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <h4 className="text-white font-semibold mb-2">Timeline</h4>
                  <p className="text-gray-300">{blueprint.timeline}</p>
                </div>

                <div className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <h4 className="text-white font-semibold mb-2">Estimated Cost</h4>
                  <p className="text-gray-300">{blueprint.estimatedCost}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3 text-lg">
                  {questions[step].question}
                </label>
                
                {questions[step].type === 'text' && (
                  <input
                    type="text"
                    value={answers[questions[step].id] || ''}
                    onChange={(e) => handleAnswer(questions[step].id, e.target.value)}
                    placeholder={questions[step].placeholder}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                  />
                )}

                {questions[step].type === 'number' && (
                  <input
                    type="number"
                    value={answers[questions[step].id] || ''}
                    onChange={(e) => handleAnswer(questions[step].id, e.target.value)}
                    placeholder={questions[step].placeholder}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                  />
                )}

                {questions[step].type === 'select' && (
                  <select
                    value={answers[questions[step].id] || ''}
                    onChange={(e) => handleAnswer(questions[step].id, e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                  >
                    <option value="">{questions[step].placeholder}</option>
                    {questions[step].options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Progress */}
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i <= step ? 'bg-brand-500' : 'bg-dark-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-dark-border bg-dark-bg/50">
          {blueprint ? (
            <div className="flex gap-3">
              <button
                onClick={handleSaveBlueprint}
                className="flex-1 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save to Projects
              </button>
              <button
                onClick={handleDownloadBlueprint}
                className="px-6 py-3 bg-dark-card border border-dark-border hover:border-brand-500/30 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Download
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-dark-card border border-dark-border hover:border-brand-500/30 text-white font-semibold rounded-xl transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!answers[questions[step].id]}
                className="flex-1 px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {step === questions.length - 1 ? (
                  <>
                    <Sparkles size={18} />
                    Generate Blueprint
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceBlueprintGenerator;
