import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-brand-500" size={32} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-400 max-w-md mb-6">
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-gradient-to-r from-[#7B2FF7] to-[#FF9D0A] hover:opacity-90 text-white font-semibold rounded-xl transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
