import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  center?: boolean;
}

const SectionHeader: React.FC<Props> = ({ title, subtitle, center = false }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h2>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;