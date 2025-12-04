import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  BarChart3,
  Brain,
  Sparkles,
  DollarSign,
  Users
} from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  analyzeContentPerformance,
  predictVirality,
  forecastRevenue,
  generateSmartCalendar
} from '../services/advancedAI';
import { useToast } from '../components/ToastContext';

const AIAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'virality' | 'revenue' | 'calendar'>('performance');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  // Performance Analysis State
  const [contentInput, setContentInput] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [performanceResult, setPerformanceResult] = useState<any>(null);

  // Virality Prediction State
  const [viralityContent, setViralityContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('Creators & Entrepreneurs');
  const [viralityResult, setViralityResult] = useState<any>(null);

  // Revenue Forecast State
  const [metrics, setMetrics] = useState({
    followers: 5000,
    avgEngagement: 3.5,
    conversionRate: 2.0,
    avgOrderValue: 97
  });
  const [revenueResult, setRevenueResult] = useState<any>(null);

  // Calendar State
  const [calendarNiche, setCalendarNiche] = useState('');
  const [calendarGoals, setCalendarGoals] = useState('');
  const [calendarResult, setCalendarResult] = useState<any>(null);

  const handlePerformanceAnalysis = async () => {
    if (!contentInput.trim()) {
      addToast('Please enter content to analyze', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeContentPerformance(contentInput, platform);
      setPerformanceResult(result);
      addToast('Analysis complete!', 'success');
    } catch (error) {
      addToast('Analysis failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleViralityPrediction = async () => {
    if (!viralityContent.trim()) {
      addToast('Please enter content to analyze', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = await predictVirality(viralityContent, platform, targetAudience);
      setViralityResult(result);
      addToast('Prediction complete!', 'success');
    } catch (error) {
      addToast('Prediction failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRevenueForecast = async () => {
    setLoading(true);
    try {
      const result = await forecastRevenue(metrics, 'Consistent content + engagement strategy', 90);
      setRevenueResult(result);
      addToast('Forecast generated!', 'success');
    } catch (error) {
      addToast('Forecast failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCalendar = async () => {
    if (!calendarNiche.trim() || !calendarGoals.trim()) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const goals = calendarGoals.split(',').map(g => g.trim());
      const result = await generateSmartCalendar(calendarNiche, goals, 'Daily', 7);
      setCalendarResult(result);
      addToast('Calendar generated!', 'success');
    } catch (error) {
      addToast('Calendar generation failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'performance', label: 'Performance Analysis', icon: BarChart3 },
    { id: 'virality', label: 'Virality Predictor', icon: TrendingUp },
    { id: 'revenue', label: 'Revenue Forecast', icon: DollarSign },
    { id: 'calendar', label: 'Smart Calendar', icon: Target }
  ];

  return (
    <div className="pt-16 min-h-screen bg-dark-bg">
      <SEO title="AI Analytics" description="Advanced AI-powered analytics and predictions" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full mb-4">
              <Brain className="text-brand-400" size={20} />
              <span className="text-brand-400 font-medium text-sm">AI-Powered Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Advanced Analytics
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Leverage AI to predict performance, optimize content, and forecast revenue
            </p>
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-brand-500/30'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {/* Performance Analysis */}
          {activeTab === 'performance' && (
            <FadeIn delay={200}>
              <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="text-brand-400" />
                  Content Performance Analysis
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Platform</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    >
                      <option>Instagram</option>
                      <option>LinkedIn</option>
                      <option>Twitter</option>
                      <option>TikTok</option>
                      <option>YouTube</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Content to Analyze</label>
                    <textarea
                      value={contentInput}
                      onChange={(e) => setContentInput(e.target.value)}
                      placeholder="Paste your content here..."
                      rows={6}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={handlePerformanceAnalysis}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <LoadingSpinner size="sm" /> : <Sparkles size={18} />}
                    Analyze Performance
                  </button>
                </div>

                {performanceResult && (
                  <div className="mt-8 space-y-4">
                    <div className="bg-dark-bg border border-brand-500/20 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Performance Score</h3>
                        <div className="text-3xl font-bold text-brand-400">{performanceResult.score}/100</div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Strengths</h4>
                          <ul className="space-y-1">
                            {performanceResult.strengths.map((s: string, i: number) => (
                              <li key={i} className="text-sm text-gray-300">• {s}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-red-400 mb-2">⚠️ Weaknesses</h4>
                          <ul className="space-y-1">
                            {performanceResult.weaknesses.map((w: string, i: number) => (
                              <li key={i} className="text-sm text-gray-300">• {w}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-brand-400 mb-2">💡 Suggestions</h4>
                        <ul className="space-y-1">
                          {performanceResult.suggestions.map((s: string, i: number) => (
                            <li key={i} className="text-sm text-gray-300">• {s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 p-4 bg-brand-500/10 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="font-semibold text-brand-400">Predicted Engagement:</span> {performanceResult.predictedEngagement}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Virality Predictor */}
          {activeTab === 'virality' && (
            <FadeIn delay={200}>
              <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="text-brand-400" />
                  Virality Predictor
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Platform</label>
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                      >
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>Twitter</option>
                        <option>YouTube</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Target Audience</label>
                      <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                    <textarea
                      value={viralityContent}
                      onChange={(e) => setViralityContent(e.target.value)}
                      placeholder="Enter content to predict virality..."
                      rows={6}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={handleViralityPrediction}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <LoadingSpinner size="sm" /> : <Zap size={18} />}
                    Predict Virality
                  </button>
                </div>

                {viralityResult && (
                  <div className="mt-8 space-y-4">
                    <div className="bg-gradient-to-r from-brand-900/40 to-dark-bg border border-brand-500/20 rounded-xl p-6">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-brand-400 mb-2">{viralityResult.viralityScore}%</div>
                        <p className="text-gray-400">Virality Potential</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">Key Factors</h4>
                        {viralityResult.factors.map((factor: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                            <span className="text-sm text-gray-300">{factor.factor}</span>
                            <div className="flex items-center gap-3">
                              <span className={`text-xs px-2 py-1 rounded ${
                                factor.impact === 'High' ? 'bg-green-500/20 text-green-400' :
                                factor.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {factor.impact}
                              </span>
                              <span className="text-sm font-semibold text-white">{factor.score}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-brand-400">Recommendations</h4>
                        {viralityResult.recommendations.map((rec: string, i: number) => (
                          <p key={i} className="text-sm text-gray-300">• {rec}</p>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-brand-500/10 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="font-semibold text-brand-400">Best Posting Time:</span> {viralityResult.bestPostingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Revenue Forecast */}
          {activeTab === 'revenue' && (
            <FadeIn delay={200}>
              <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <DollarSign className="text-brand-400" />
                  Revenue Forecast (90 Days)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Followers</label>
                    <input
                      type="number"
                      value={metrics.followers}
                      onChange={(e) => setMetrics({...metrics, followers: parseInt(e.target.value)})}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Avg Engagement (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={metrics.avgEngagement}
                      onChange={(e) => setMetrics({...metrics, avgEngagement: parseFloat(e.target.value)})}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Conversion Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={metrics.conversionRate}
                      onChange={(e) => setMetrics({...metrics, conversionRate: parseFloat(e.target.value)})}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Avg Order Value ($)</label>
                    <input
                      type="number"
                      value={metrics.avgOrderValue}
                      onChange={(e) => setMetrics({...metrics, avgOrderValue: parseInt(e.target.value)})}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleRevenueForecast}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <LoadingSpinner size="sm" /> : <DollarSign size={18} />}
                  Generate Forecast
                </button>

                {revenueResult && (
                  <div className="mt-8 space-y-4">
                    <div className="bg-gradient-to-r from-green-900/20 to-dark-bg border border-green-500/20 rounded-xl p-6">
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-green-400 mb-2">
                          ${revenueResult.projectedRevenue.toLocaleString()}
                        </div>
                        <p className="text-gray-400">Projected Revenue (90 days)</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {(revenueResult.confidence * 100).toFixed(0)}% Confidence
                        </p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">Monthly Breakdown</h4>
                        {revenueResult.breakdown.map((month: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                            <div>
                              <span className="text-sm font-medium text-white">Month {month.month}</span>
                              <p className="text-xs text-gray-500">{month.followers.toLocaleString()} followers</p>
                            </div>
                            <span className="text-lg font-bold text-green-400">${month.revenue.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-brand-400">Recommendations</h4>
                        {revenueResult.recommendations.map((rec: string, i: number) => (
                          <p key={i} className="text-sm text-gray-300">• {rec}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Smart Calendar */}
          {activeTab === 'calendar' && (
            <FadeIn delay={200}>
              <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Target className="text-brand-400" />
                  AI-Generated Content Calendar
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Your Niche</label>
                    <input
                      type="text"
                      value={calendarNiche}
                      onChange={(e) => setCalendarNiche(e.target.value)}
                      placeholder="e.g., Fitness, Marketing, Tech"
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Goals (comma-separated)</label>
                    <input
                      type="text"
                      value={calendarGoals}
                      onChange={(e) => setCalendarGoals(e.target.value)}
                      placeholder="e.g., Grow audience, Increase engagement, Drive sales"
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerateCalendar}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <LoadingSpinner size="sm" /> : <Target size={18} />}
                    Generate 7-Day Calendar
                  </button>
                </div>

                {calendarResult && calendarResult.length > 0 && (
                  <div className="mt-8 space-y-3">
                    {calendarResult.map((day: any, i: number) => (
                      <div key={i} className="bg-dark-bg border border-dark-border rounded-xl p-4 hover:border-brand-500/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-brand-400">{day.date}</span>
                              <span className="text-xs px-2 py-1 bg-brand-500/20 text-brand-400 rounded">
                                {day.contentType}
                              </span>
                            </div>
                            <h4 className="text-white font-medium">{day.topic}</h4>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{day.reasoning}</p>
                        <div className="flex gap-2">
                          {day.platform.map((p: string, j: number) => (
                            <span key={j} className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;
