import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  Maximize2,
  Lightbulb,
  Zap,
  FileText
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { getEnv } from '../utils/env';
import LoadingSpinner from './LoadingSpinner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface CopilotMode {
  id: 'explain' | 'design' | 'implement';
  label: string;
  icon: React.ReactNode;
  systemPrompt: string;
}

interface AICopilotProps {
  userContext?: {
    persona?: string;
    projects?: any[];
    currentPage?: string;
  };
}

const AICopilot: React.FC<AICopilotProps> = ({ userContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<CopilotMode['id']>('design');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiKey = getEnv('API_KEY')?.replace(/[\"']/g, '').trim() || '';
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const modes: CopilotMode[] = [
    {
      id: 'explain',
      label: 'Explain',
      icon: <Lightbulb size={16} />,
      systemPrompt: `You are a patient teacher explaining concepts simply and clearly. 
      Break down complex ideas into easy-to-understand steps. Use analogies and examples.`
    },
    {
      id: 'design',
      label: 'Design',
      icon: <Sparkles size={16} />,
      systemPrompt: `You are a creative strategist and systems architect. 
      Design funnels, pages, offers, and automation flows. 
      Always provide concrete, actionable blueprints.`
    },
    {
      id: 'implement',
      label: 'Implement',
      icon: <Zap size={16} />,
      systemPrompt: `You are an implementation specialist. 
      Output step-by-step checklists, SOPs, and technical instructions. 
      Be specific about tools, integrations, and exact steps.`
    }
  ];

  const currentMode = modes.find(m => m.id === mode)!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildSystemPrompt = () => {
    const contextInfo = userContext ? `
User Context:
- Persona: ${userContext.persona || 'Not specified'}
- Current Page: ${userContext.currentPage || 'Unknown'}
- Active Projects: ${userContext.projects?.length || 0}
` : '';

    return `${currentMode.systemPrompt}

${contextInfo}

You are the AI Copilot for KeySpark AI - The Creator OS.
Your goal is to help users build automated client-getting systems.
Always be practical, actionable, and move users toward concrete assets.
Keep responses concise but comprehensive.`;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      if (!ai) {
        // Demo mode
        const demoResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I understand you want to ${input}. In demo mode, I can help you plan this out. Here's what I suggest:\n\n1. Define your target audience\n2. Create a compelling offer\n3. Build a simple funnel\n4. Set up automation\n\nWould you like me to elaborate on any of these steps?`,
          timestamp: new Date()
        };
        
        setTimeout(() => {
          setMessages(prev => [...prev, demoResponse]);
          setLoading(false);
        }, 1500);
        return;
      }

      const conversationHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: buildSystemPrompt() }] },
          ...conversationHistory,
          { role: 'user', parts: [{ text: input }] }
        ]
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'I apologize, but I could not generate a response.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Copilot error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "Design a funnel for my coaching business",
    "Create an automation for lead follow-up",
    "Generate landing page copy",
    "Build a content calendar"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 text-white font-semibold rounded-full shadow-2xl shadow-brand-500/30 transition-all hover:scale-105"
      >
        <Sparkles size={20} />
        <span className="hidden sm:inline">AI Copilot</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-dark-card border border-dark-border rounded-2xl shadow-2xl transition-all ${
        isMinimized
          ? 'bottom-6 right-6 w-80 h-16'
          : 'bottom-6 right-6 w-[90vw] sm:w-96 h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border bg-gradient-to-r from-brand-900/20 to-dark-card">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
            <Sparkles className="text-brand-400" size={16} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Copilot</h3>
            <p className="text-xs text-gray-400">{currentMode.label} Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            {isMinimized ? <Maximize2 size={16} className="text-gray-400" /> : <Minimize2 size={16} className="text-gray-400" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Mode Selector */}
          <div className="flex gap-2 p-3 border-b border-dark-border bg-dark-bg/50">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === m.id
                    ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                    : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
                }`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[380px]">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="text-brand-400" size={32} />
                </div>
                <h4 className="text-white font-semibold mb-2">How can I help you today?</h4>
                <p className="text-sm text-gray-400 mb-4">Try one of these quick actions:</p>
                <div className="space-y-2">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(action)}
                      className="block w-full text-left px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-sm text-gray-300 hover:border-brand-500/30 hover:text-white transition-all"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-brand-600 text-white'
                      : 'bg-dark-bg border border-dark-border text-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-dark-bg border border-dark-border rounded-2xl px-4 py-3">
                  <LoadingSpinner size="sm" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-dark-border bg-dark-bg/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:outline-none"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AICopilot;
