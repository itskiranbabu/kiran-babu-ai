import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text, 
  fullScreen = false,
  className = ''
}) => {
  const spinnerSize = sizeMap[size];

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 
        size={spinnerSize} 
        className="text-brand-500 animate-spin" 
      />
      {text && (
        <p className="text-gray-400 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
