import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqSectionProps {
  title?: string;
  items: FaqItem[];
  className?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({
  title = "Frequently Asked Questions",
  items,
  className = ""
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`w-full max-w-4xl mx-auto py-12 px-4 ${className}`}>
      <div className="flex items-center gap-3 justify-center mb-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/10">
          <HelpCircle className="text-brand-400" size={24} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const isOpen = item.id === openId;
          return (
            <div
              key={item.id}
              className="rounded-xl border border-dark-border bg-dark-card backdrop-blur-sm hover:border-brand-500/30 transition-all"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left group"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
              >
                <span className="text-base md:text-lg font-medium text-white group-hover:text-brand-400 transition-colors pr-4">
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-dark-border bg-dark-bg text-brand-400 transition-all duration-300 ${
                    isOpen ? "rotate-180 border-brand-500/50 bg-brand-500/10" : "group-hover:border-brand-500/30"
                  }`}
                >
                  <ChevronDown size={18} />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div
                  id={`faq-panel-${item.id}`}
                  className="border-t border-dark-border px-6 pb-5 pt-4 text-sm md:text-base text-gray-300 leading-relaxed"
                >
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No FAQs available at the moment.</p>
        </div>
      )}
    </section>
  );
};

export default FaqSection;
