import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Zap,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

interface Prediction {
  metric: string;
  current: number;
  predicted: number;
  confidence: number;
  timeframe: string;
}

const AdvancedAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(false);

  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: 23.5,
      trend: 'up',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: 12.3,
      trend: 'up',
      icon: <Users className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: -2.1,
      trend: 'down',
      icon: <Target className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Engagement Score',
      value: '87.5',
      change: 8.7,
      trend: 'up',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const predictions: Prediction[] = [
    {
      metric: 'Revenue',
      current: 12450,
      predicted: 18675,
      confidence: 87,
      timeframe: 'Next 30 days'
    },
    {
      metric: 'User Growth',
      current: 2847,
      predicted: 4271,
      confidence: 82,
      timeframe: 'Next 30 days'
    },
    {
      metric: 'Conversion Rate',
      current: 3.8,
      predicted: 4.5,
      confidence: 75,
      timeframe: 'Next 30 days'
    }
  ];

  const topProducts = [
    { name: 'SaaS Business Hub', revenue: '$3,240', sales: 112, growth: 34 },
    { name: 'Freelance Business Hub', revenue: '$2,856', sales: 102, growth: 28 },
    { name: 'AI Prompt Power Pack', revenue: '$2,125', sales: 125, growth: 45 },
    { name: 'Content Creator Dashboard', revenue: '$1,920', sales: 80, growth: 22 },
    { name: 'Real Estate Portfolio', revenue: '$1,485', sales: 55, growth: 18 }
  ];

  const revenueBySource = [
    { source: 'Digital Products', amount: 7200, percentage: 58 },
    { source: 'Services', amount: 3600, percentage: 29 },
    { source: 'Subscriptions', amount: 1200, percentage: 10 },
    { source: 'Affiliates', amount: 450, percentage: 3 }
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'High-Performing Product',
      description: 'AI Prompt Power Pack has 45% growth. Consider creating similar products.',
      action: 'Explore Product Ideas'
    },
    {
      type: 'warning',
      title: 'Conversion Rate Dip',
      description: 'Conversion rate dropped 2.1%. Review checkout flow and pricing.',
      action: 'Analyze Funnel'
    },
    {
      type: 'success',
      title: 'Revenue Milestone',
      description: 'On track to hit $15K this month - 20% above target!',
      action: 'View Forecast'
    },
    {
      type: 'tip',
      title: 'Seasonal Trend',
      description: 'Sales typically increase 35% in Q4. Prepare inventory and marketing.',
      action: 'Plan Campaign'
    }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-green-500/30 bg-green-500/5';
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'success': return 'border-blue-500/30 bg-blue-500/5';
      case 'tip': return 'border-purple-500/30 bg-purple-500/5';
      default: return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'warning': return <TrendingDown className="w-5 h-5 text-yellow-400" />;
      case 'success': return <Target className="w-5 h-5 text-blue-400" />;
      case 'tip': return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Advanced Analytics
            </h1>
            <p className="text-gray-400">
              AI-powered insights and predictions for your business
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-purple-500 text-white'
                    : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
                }`}
              >
                {range === '7d' && 'Last 7 Days'}
                {range === '30d' && 'Last 30 Days'}
                {range === '90d' && 'Last 90 Days'}
                {range === '1y' && 'Last Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} bg-opacity-10`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* AI Predictions */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">AI Predictions</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => (
              <div key={index} className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                <h3 className="text-gray-400 text-sm mb-2">{prediction.metric}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-white">
                    {prediction.metric === 'Revenue' ? '$' : ''}
                    {prediction.predicted.toLocaleString()}
                    {prediction.metric === 'Conversion Rate' ? '%' : ''}
                  </span>
                  <span className="text-sm text-gray-500">
                    from {prediction.metric === 'Revenue' ? '$' : ''}
                    {prediction.current.toLocaleString()}
                    {prediction.metric === 'Conversion Rate' ? '%' : ''}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{prediction.timeframe}</span>
                  <span className="text-green-400 font-medium">{prediction.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{product.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{product.sales} sales</span>
                      <span className="text-green-400">+{product.growth}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Source */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Revenue by Source</h2>
            <div className="space-y-4">
              {revenueBySource.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{source.source}</span>
                    <span className="text-gray-400">${source.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm text-gray-500">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">AI Insights & Recommendations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{insight.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{insight.description}</p>
                    <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                      {insight.action} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
