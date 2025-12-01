
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { PRODUCTS } from '../constants';
import { ShoppingBag } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Product } from '../types';
import ProductCheckoutModal from '../components/ProductCheckoutModal';

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto">
      <SEO title="Store" description="Premium Notion templates, prompt packs, and assets to speed up your workflow." />
      
      <FadeIn>
        <SectionHeader 
            title="Store" 
            subtitle="Premium Notion templates, prompt packs, and assets to speed up your workflow."
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product, index) => (
          <FadeIn key={product.id} delay={index * 50}>
            <div className="bg-dark-card rounded-2xl overflow-hidden border border-dark-border flex flex-col group hover:border-brand-500/50 transition-colors h-full">
                <div className="h-56 overflow-hidden relative flex-shrink-0">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    />
                    {product.featured && (
                        <div className="absolute top-3 right-3 bg-brand-600 text-xs font-bold px-2 py-1 rounded text-white shadow-lg">
                            Best Seller
                        </div>
                    )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-brand-400 mb-2 uppercase tracking-wide">
                    {product.type}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">{product.description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-dark-border mt-auto">
                    <span className="text-2xl font-bold text-white">{product.price}</span>
                    <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                    <ShoppingBag size={16} /> Get It
                    </button>
                </div>
                </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <ProductCheckoutModal 
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
