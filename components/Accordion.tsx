import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  items: { question: string; answer: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`border rounded-xl overflow-hidden transition-all duration-300 ${
            openIndex === index 
              ? 'bg-dark-card border-brand-500/50 shadow-lg shadow-brand-500/10' 
              : 'bg-dark-card/30 border-dark-border hover:bg-dark-card/50 hover:border-gray-600'
          }`}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
          >
            <span className={`font-semibold text-lg transition-colors ${
              openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'
            }`}>
              {item.question}
            </span>
            <div className={`p-1 rounded-full transition-colors ${
              openIndex === index ? 'bg-brand-500/20 text-brand-400' : 'bg-dark-bg text-gray-500 group-hover:text-white'
            }`}>
              {openIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-dashed border-dark-border/50 mt-2">
              <div className="pt-4">
                {item.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;