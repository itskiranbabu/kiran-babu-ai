
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { ShoppingBag, Download, Star } from 'lucide-react';
import { PRODUCTS } from '../constants';

const Templates: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="Template Marketplace" />
      <FadeIn>
        <SectionHeader title="Template Marketplace" subtitle="High-quality assets to accelerate your workflow." />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product, i) => (
            <FadeIn key={product.id} delay={i * 50}>
                <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden group hover:border-brand-500/50 transition-colors">
                    <div className="aspect-video bg-dark-bg relative overflow-hidden">
                         <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                             <Star size={10} className="text-yellow-400" fill="currentColor" /> 4.9
                         </div>
                    </div>
                    <div className="p-4">
                        <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">{product.type}</div>
                        <h3 className="font-bold text-white text-sm mb-2 line-clamp-1">{product.title}</h3>
                        <div className="flex items-center justify-between mt-4">
                            <span className="font-bold text-white">{product.price}</span>
                            <a href={product.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                                <Download size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default Templates;
