import React from 'react';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import ContentGenerator from '../components/ContentGenerator';

const Playground: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
      <SEO title="AI Prompt Playground" description="Generate viral hook ideas instantly using Gemini AI." />

      <FadeIn>
        <SectionHeader 
            title="AI Prompt Playground" 
            subtitle="Generate viral hook ideas instantly using Gemini AI. A free tool for visitors."
            center
        />
      </FadeIn>

      <FadeIn delay={100}>
        <ContentGenerator />
      </FadeIn>
    </div>
  );
};

export default Playground;