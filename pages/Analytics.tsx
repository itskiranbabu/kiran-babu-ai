import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { BarChart, Activity, Users, DollarSign, TrendingUp, Globe } from 'lucide-react';
import { mockDb, AnalyticsData } from '../services/mockDb';

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [liveVisitors, setLiveVisitors] = useState(14);

  useEffect(() => {
    const fetchData = async () => {
        const result = await mockDb.getAnalytics();
        setData(result);
    };
    fetchData();

    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveVisitors(prev => Math.max(5, prev + Math.floor(Math.random() * 3) - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="p-8">Loading analytics...</div>;

  const stats = [
    { label: 'Total Revenue', value: `$${data.revenue.toLocaleString()}`, change: '+12.5%', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Total Visitors', value: data.visitors.toLocaleString(), change: '+5.2%', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Conversion Rate', value: '2.8%', change: '+0.4%', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Active Now', value: liveVisitors, change: 'Live', icon: Globe, color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="Analytics Dashboard" />
      
      <FadeIn>
        <div className="flex justify-between items-end mb-8">
            <SectionHeader 
                title="Analytics" 
                subtitle="Real-time insights into your traffic and revenue."
            />
            <div className="flex gap-2">
                <select className="bg-dark-card border border-dark-border text-white text-sm rounded-lg px-3 py-2">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Year</option>
                </select>
            </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 100}>
                <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500/10 text-green-400'}`}>
                            {stat.change}
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                </div>
            </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <FadeIn delay={200}>
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 h-80 flex flex-col justify-center items-center text-center">
                <BarChart size={48} className="text-dark-border mb-4" />
                <h3 className="text-white font-bold mb-2">Traffic Overview</h3>
                <p className="text-gray-400 text-sm">Interactive charts would appear here using Recharts or Chart.js.</p>
            </div>
         </FadeIn>
         <FadeIn delay={300}>
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 h-80 flex flex-col justify-center items-center text-center">
                <TrendingUp size={48} className="text-dark-border mb-4" />
                <h3 className="text-white font-bold mb-2">Revenue Growth</h3>
                <p className="text-gray-400 text-sm">Detailed revenue breakdown by product and service.</p>
            </div>
         </FadeIn>
      </div>
    </div>
  );
};

export default Analytics;