
import React, { useState } from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { CASE_STUDIES } from '../constants';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(CASE_STUDIES.map(c => c.category)))];
  
  const filteredProjects = filter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.category === filter);

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto">
      <SEO title="Portfolio" description="Case studies and recent work by Kiran Babu." />
      
      <FadeIn>
        <SectionHeader 
          title="Selected Work" 
          subtitle="A collection of systems, websites, and content strategies built for creators."
        />
      </FadeIn>

      {/* Filter Tabs */}
      <FadeIn delay={100}>
        <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        filter === cat 
                        ? 'bg-white text-black font-bold shadow-lg shadow-white/10 scale-105' 
                        : 'bg-dark-card text-gray-400 border border-dark-border hover:text-white hover:border-gray-500'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </FadeIn>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 100}>
            <div className="group bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all duration-300 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Category Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5">
                        <Tag size={12} className="text-brand-400" />
                        {project.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                            Client: {project.client}
                        </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-dark-border flex items-center justify-between">
                        <div>
                             <span className="block text-xs text-gray-500 uppercase tracking-wider mb-0.5">Result</span>
                             <span className="text-sm font-bold text-green-400">{project.result}</span>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-white bg-dark-bg hover:bg-white/10 rounded-lg transition-colors">
                            <ExternalLink size={18} />
                        </button>
                    </div>
                </div>
            </div>
          </FadeIn>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-dark-card/30 rounded-2xl border border-dark-border border-dashed">
              <p className="text-gray-500">No projects found in this category.</p>
          </div>
      )}
    </div>
  );
};

export default Portfolio;
