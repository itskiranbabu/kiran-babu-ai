
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const TermsOfService: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
      <SEO title="Terms of Service" description="Terms of Service for Kiran Babu AI." />
      
      <FadeIn>
        <SectionHeader title="Terms of Service" subtitle="Last updated: October 2023" />
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h3>1. Agreement to Terms</h3>
          <p>
            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Kiran Babu AI ("we", "us", or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>

          <h3>2. Intellectual Property Rights</h3>
          <p>
            Unless otherwise indicated, the Site and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>

          <h3>3. Digital Products</h3>
          <p>
            All digital products (Notion Templates, Prompt Packs, etc.) sold via this site or our third-party partners (e.g., Gumroad) are subject to the specific licensing terms provided at the point of sale. Generally, these are for personal use only and may not be resold or redistributed.
          </p>

          <h3>4. Service Bookings</h3>
          <p>
            Booking a consultation or service via our forms does not constitute a binding contract until a separate Service Agreement is signed and a deposit is paid. We reserve the right to refuse service to anyone for any reason at any time.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <span className="text-white">itskiranbabu.ai@gmail.com</span>
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default TermsOfService;
