
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
          className={`border border-dark-border rounded-xl overflow-hidden transition-colors ${
            openIndex === index ? 'bg-dark-card border-brand-500/30' : 'bg-dark-card/50 hover:border-gray-600'
          }`}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
          >
            <span className={`font-semibold ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
              {item.question}
            </span>
            {openIndex === index ? (
              <ChevronUp size={20} className="text-brand-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-dark-border/50">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
