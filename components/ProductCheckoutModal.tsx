
import React, { useState, useEffect } from 'react';
import { X, Tag, ArrowRight, ExternalLink, ShoppingBag, AlertCircle, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { DISCOUNT_CODES } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductCheckoutModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [error, setError] = useState('');

  // Reset state when modal opens/closes or product changes
  useEffect(() => {
    if (isOpen) {
      setDiscountCode('');
      setAppliedDiscount(null);
      setError('');
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  // Helper to parse price string (e.g., "$29" -> 29)
  const parsePrice = (priceStr: string): number => {
    if (priceStr.includes('$0+')) return 0;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const originalPrice = parsePrice(product.price);
  const isFree = originalPrice === 0;
  
  const discountAmount = appliedDiscount ? originalPrice * appliedDiscount.percent : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountCode.trim()) return;

    const codeUpper = discountCode.trim().toUpperCase();
    if (DISCOUNT_CODES[codeUpper]) {
      setAppliedDiscount({ code: codeUpper, percent: DISCOUNT_CODES[codeUpper] });
      setError('');
    } else {
      setError('Invalid discount code');
      setAppliedDiscount(null);
    }
  };

  const handleProceed = () => {
    // In a real app, you might pass the code to the URL if supported:
    // const url = `${product.url}?offer_code=${appliedDiscount?.code || ''}`;
    // For now, we just open the standard URL
    window.open(product.url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-dark-card border border-dark-border w-full max-w-lg rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-dark-border flex items-center justify-between bg-dark-bg/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand-400" /> Checkout
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6 flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-dark-border">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-1">
              {product.type}
            </div>
            <h4 className="text-white font-bold leading-tight mb-1">{product.title}</h4>
            <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
          </div>
        </div>

        {/* Discount Section */}
        <div className="px-6 py-4 bg-dark-bg/30 border-y border-dark-border">
          {!isFree ? (
            <form onSubmit={handleApplyDiscount} className="relative">
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                Discount Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                   <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                   <input 
                     type="text" 
                     placeholder="Ex: SAVE20" 
                     value={discountCode}
                     onChange={(e) => setDiscountCode(e.target.value)}
                     disabled={!!appliedDiscount}
                     className={`w-full bg-dark-bg border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none transition-all ${
                       error ? 'border-red-500 focus:border-red-500' : 
                       appliedDiscount ? 'border-green-500/50 text-green-400' : 'border-dark-border focus:border-brand-500'
                     }`}
                   />
                </div>
                {!appliedDiscount ? (
                  <button 
                    type="submit"
                    disabled={!discountCode.trim()}
                    className="px-4 py-2 bg-dark-card border border-dark-border hover:bg-white/5 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                ) : (
                   <button 
                    type="button"
                    onClick={() => {
                        setAppliedDiscount(null);
                        setDiscountCode('');
                    }}
                    className="px-4 py-2 bg-dark-card border border-dark-border hover:bg-white/5 text-gray-400 hover:text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              {/* Feedback Messages */}
              {error && (
                <div className="flex items-center gap-1.5 text-red-400 text-xs mt-2 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={12} /> {error}
                </div>
              )}
              {appliedDiscount && (
                 <div className="flex items-center gap-1.5 text-green-400 text-xs mt-2 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle size={12} /> Code <strong>{appliedDiscount.code}</strong> applied! (-{appliedDiscount.percent * 100}%)
                </div>
              )}
              
              {/* Demo Hint */}
              {!appliedDiscount && !error && (
                <div className="mt-2 text-[10px] text-gray-600">
                    Try codes: <span className="font-mono text-brand-500/80">SAVE20</span>, <span className="font-mono text-brand-500/80">PRO50</span>
                </div>
              )}

            </form>
          ) : (
             <div className="text-sm text-gray-400 italic">
               Discount codes are not applicable for "Pay what you want" items.
             </div>
          )}
        </div>

        {/* Pricing Summary */}
        <div className="p-6 space-y-3">
            <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>{isFree ? '$0+' : `$${originalPrice.toFixed(2)}`}</span>
            </div>
            {appliedDiscount && (
                <div className="flex justify-between text-sm text-green-400">
                    <span>Discount ({appliedDiscount.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                </div>
            )}
            <div className="flex justify-between items-end pt-3 border-t border-dark-border">
                <span className="text-white font-bold">Total</span>
                <span className="text-2xl font-bold text-white">
                    {isFree ? '$0+' : `$${finalPrice.toFixed(2)}`}
                </span>
            </div>

            <button 
                onClick={handleProceed}
                className="w-full mt-4 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
            >
                Proceed to Payment <ArrowRight size={18} />
            </button>
            <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                Processed securely via Gumroad <ExternalLink size={10} />
            </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckoutModal;
