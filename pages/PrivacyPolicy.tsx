
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
      <SEO title="Privacy Policy" description="Privacy Policy for Kiran Babu AI." />
      
      <FadeIn>
        <SectionHeader title="Privacy Policy" subtitle="Last updated: October 2023" />
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h3>1. Introduction</h3>
          <p>
            Welcome to Kiran Babu AI. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>

          <h3>2. Data We Collect</h3>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone number.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform on the devices you use to access this website.</li>
          </ul>

          <h3>3. How We Use Your Data</h3>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., Service Booking).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          </ul>

          <h3>4. Third-Party Links</h3>
          <p>
            This website may include links to third-party websites (such as Gumroad, Stripe, or Notion). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
          </p>

          <h3>5. Contact Us</h3>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <span className="text-white">itskiranbabu.ai@gmail.com</span>
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default PrivacyPolicy;
