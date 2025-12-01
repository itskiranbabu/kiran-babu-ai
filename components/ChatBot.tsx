
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Minimize2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const QUICK_STARTERS = [
  "What services do you offer?",
  "Tell me about your Notion templates.",
  "Do you build websites?",
  "How much does it cost?"
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Kiran's AI assistant. Ask me anything about my services, templates, or AI workflows." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => {
    if (!isOpen && !chatSessionRef.current) {
      try {
        chatSessionRef.current = createChatSession();
      } catch (e) {
        console.error("Failed to init chat", e);
      }
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: text }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
         chatSessionRef.current = createChatSession();
      }
      
      const response = await chatSessionRef.current.sendMessage({ message: text });
      const responseText = response.text;
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the AI right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
    setInput('');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group ${
          isOpen ? 'bg-dark-card border border-dark-border text-gray-400 rotate-90' : 'bg-brand-600 text-white hover:bg-brand-700'
        }`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-[90vw] sm:w-[380px] h-[550px] max-h-[75vh] bg-dark-card border border-dark-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-700 to-violet-700 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Kiran's AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-white/80 font-medium">Online • Gemini Pro</span>
              </div>
            </div>
          </div>
          <button onClick={toggleChat} className="text-white/70 hover:text-white transition-colors">
            <Minimize2 size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-bg/50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-br-sm' 
                    : 'bg-dark-card border border-dark-border text-gray-200 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-dark-card border border-dark-border rounded-2xl px-4 py-3 rounded-bl-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Starters */}
        {messages.length < 3 && !isLoading && (
             <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar mask-fade-right">
                 {QUICK_STARTERS.map((text, i) => (
                     <button
                        key={i}
                        onClick={() => handleSendMessage(text)}
                        className="whitespace-nowrap px-3 py-1.5 bg-dark-card border border-brand-500/30 hover:bg-brand-600/20 hover:border-brand-500 text-xs text-brand-200 rounded-full transition-all"
                     >
                        {text}
                     </button>
                 ))}
             </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 bg-dark-card border-t border-dark-border flex gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
