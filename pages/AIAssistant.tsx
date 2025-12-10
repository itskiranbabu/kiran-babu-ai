import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Target, Zap, Brain, MessageSquare, BarChart3, Lightbulb } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { generateAIInsights, generateProductivityTips, analyzeUserActivity } from '../services/geminiService';

interface Insight {
  id: string;
  type: 'productivity' | 'revenue' | 'content' | 'workflow';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

const AIAssistant: React.FC = () => {
  const { user } = useAuth();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'insights' | 'tips' | 'chat'>('insights');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    setLoading(true);
    try {
      // Simulate AI-generated insights
      const mockInsights: Insight[] = [
        {
          id: '1',
          type: 'productivity',
          title: 'Optimize Your Morning Routine',
          description: 'Based on your activity patterns, you\'re most productive between 9-11 AM. Schedule your most important tasks during this window.',
          action: 'View Schedule Suggestions',
          priority: 'high'
        },
        {
          id: '2',
          type: 'revenue',
          title: 'Untapped Revenue Opportunity',
          description: 'Your "Freelance Business Hub" product has 85% conversion rate. Consider creating similar templates for other niches.',
          action: 'Explore Product Ideas',
          priority: 'high'
        },
        {
          id: '3',
          type: 'content',
          title: 'Content Gap Analysis',
          description: 'You haven\'t posted on LinkedIn in 5 days. Your engagement drops 40% after 3 days of inactivity.',
          action: 'Generate LinkedIn Post',
          priority: 'medium'
        },
        {
          id: '4',
          type: 'workflow',
          title: 'Automate Repetitive Tasks',
          description: 'You\'ve manually sent 12 similar emails this week. Create a workflow to automate this process.',
          action: 'Create Workflow',
          priority: 'medium'
        },
        {
          id: '5',
          type: 'productivity',
          title: 'Focus Time Recommendation',
          description: 'Enable "Deep Work Mode" for 2-hour blocks. Users who do this complete 3x more tasks.',
          action: 'Enable Deep Work',
          priority: 'low'
        }
      ];

      setInsights(mockInsights);
    } catch (error) {
      console.error('Error loading insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const responses: Record<string, string> = {
        'help': 'I can help you with:\n• Productivity insights and recommendations\n• Content strategy and ideas\n• Workflow automation suggestions\n• Revenue optimization tips\n• Task prioritization\n\nWhat would you like to know?',
        'productivity': 'Based on your activity, here are 3 productivity boosters:\n1. Block 9-11 AM for deep work\n2. Batch similar tasks together\n3. Use the 2-minute rule for quick tasks\n\nWould you like me to create a custom schedule?',
        'content': 'I notice you haven\'t posted on social media recently. Here are some content ideas:\n• Share your latest product launch\n• Create a tutorial on Notion templates\n• Post client success stories\n\nShould I generate a content calendar?',
        'revenue': 'To increase revenue, consider:\n1. Upsell existing customers to premium plans\n2. Create bundle offers (save 30%)\n3. Launch an affiliate program\n4. Add a subscription tier\n\nWant me to analyze your pricing strategy?'
      };

      const lowerInput = userMessage.toLowerCase();
      let response = 'I understand you\'re asking about "' + userMessage + '". ';
      
      if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
        response = responses.help;
      } else if (lowerInput.includes('productiv')) {
        response = responses.productivity;
      } else if (lowerInput.includes('content') || lowerInput.includes('post')) {
        response = responses.content;
      } else if (lowerInput.includes('revenue') || lowerInput.includes('money') || lowerInput.includes('earn')) {
        response = responses.revenue;
      } else {
        response += 'I can provide insights on productivity, content strategy, workflows, and revenue optimization. What specific area would you like help with?';
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'productivity': return <Target className="w-5 h-5" />;
      case 'revenue': return <TrendingUp className="w-5 h-5" />;
      case 'content': return <MessageSquare className="w-5 h-5" />;
      case 'workflow': return <Zap className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">AI-Powered Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your AI Assistant
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get personalized insights, productivity tips, and smart recommendations powered by AI
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-dark-border">
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'insights'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Smart Insights
            </div>
            {activeTab === 'insights' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'tips'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Productivity Tips
            </div>
            {activeTab === 'tips' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'chat'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Chat
            </div>
            {activeTab === 'chat' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'insights' && (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-400">Analyzing your activity...</p>
              </div>
            ) : (
              insights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                      {getTypeIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(insight.priority)}`}>
                          {insight.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4">{insight.description}</p>
                      {insight.action && (
                        <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                          {insight.action} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Time Blocking',
                description: 'Allocate specific time blocks for different types of work. This increases focus and reduces context switching.',
                icon: <Target className="w-6 h-6" />
              },
              {
                title: 'Batch Processing',
                description: 'Group similar tasks together and complete them in one session. This saves mental energy and improves efficiency.',
                icon: <Zap className="w-6 h-6" />
              },
              {
                title: 'Priority Matrix',
                description: 'Use the Eisenhower Matrix to categorize tasks by urgency and importance. Focus on high-impact activities first.',
                icon: <BarChart3 className="w-6 h-6" />
              },
              {
                title: 'Deep Work Sessions',
                description: 'Schedule 90-minute focused work sessions without interruptions. Take 15-minute breaks between sessions.',
                icon: <Brain className="w-6 h-6" />
              }
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/30 transition-all"
              >
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 w-fit mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{tip.title}</h3>
                <p className="text-gray-400">{tip.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Start a Conversation</h3>
                  <p className="text-gray-400 mb-6">Ask me anything about productivity, content, workflows, or revenue!</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['How can I be more productive?', 'Content ideas for this week', 'Increase my revenue'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setChatInput(suggestion)}
                        className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-sm text-gray-300 hover:border-purple-500/30 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-purple-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-dark-bg border border-dark-border text-gray-300'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                ))
              )}
              {chatLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="bg-dark-bg border border-dark-border px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="border-t border-dark-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                  disabled={chatLoading}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
