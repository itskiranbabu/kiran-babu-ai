import React from 'react';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const ShippingDelivery: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
      <SEO 
        title="Shipping & Delivery Policy" 
        description="Shipping and Delivery Policy for KeySpark AI digital products and services." 
      />
      
      <FadeIn>
        <SectionHeader 
          title="Shipping & Delivery Policy" 
          subtitle="Last updated: December 2024" 
        />
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h3>1. Overview</h3>
          <p>
            KeySpark AI (operated by Kiran Babu) primarily offers digital products and services. 
            This policy outlines our delivery procedures for all offerings.
          </p>

          <h3>2. Digital Products - Instant Delivery</h3>
          <p>
            All digital products are delivered electronically and instantly upon successful payment:
          </p>
          <ul>
            <li>
              <strong>Delivery Method:</strong> Products are delivered via email to the address provided during checkout
            </li>
            <li>
              <strong>Delivery Time:</strong> Immediate (within 5 minutes of payment confirmation)
            </li>
            <li>
              <strong>Access Links:</strong> You will receive download links or access credentials via email
            </li>
            <li>
              <strong>Backup Access:</strong> Login to your account dashboard to re-download products at any time
            </li>
          </ul>

          <h4>Digital Products Include:</h4>
          <ul>
            <li>Notion Templates</li>
            <li>AI Prompt Packs</li>
            <li>E-books and PDF Guides</li>
            <li>Software Tools and Scripts</li>
            <li>Video Courses and Tutorials</li>
            <li>Automation Workflows</li>
          </ul>

          <h3>3. Service Delivery</h3>
          
          <h4>3.1 Consultation Calls</h4>
          <ul>
            <li>
              <strong>Scheduling:</strong> You will receive a calendar invite within 24 hours of booking
            </li>
            <li>
              <strong>Meeting Link:</strong> Video call link (Google Meet/Zoom) sent 24 hours before the session
            </li>
            <li>
              <strong>Reminder:</strong> Automated reminder sent 1 hour before the call
            </li>
            <li>
              <strong>Recording:</strong> Session recording (if applicable) delivered within 48 hours
            </li>
          </ul>

          <h4>3.2 Custom Development Projects</h4>
          <ul>
            <li>
              <strong>Timeline:</strong> Project timeline agreed upon in the service agreement
            </li>
            <li>
              <strong>Milestones:</strong> Deliverables provided at agreed milestones
            </li>
            <li>
              <strong>Delivery Method:</strong> Via GitHub, Google Drive, or client's preferred platform
            </li>
            <li>
              <strong>Final Delivery:</strong> Complete project files with documentation
            </li>
          </ul>

          <h4>3.3 Subscription Services</h4>
          <ul>
            <li>
              <strong>Activation:</strong> Immediate upon successful payment
            </li>
            <li>
              <strong>Access:</strong> Login credentials sent to your email
            </li>
            <li>
              <strong>Dashboard:</strong> Access all features through your account dashboard
            </li>
            <li>
              <strong>Updates:</strong> Automatic access to new features and updates
            </li>
          </ul>

          <h3>4. Delivery Confirmation</h3>
          <p>
            Upon successful delivery, you will receive:
          </p>
          <ul>
            <li>Email confirmation with order details</li>
            <li>Download links or access credentials</li>
            <li>Invoice/receipt for your records</li>
            <li>Instructions for accessing your purchase</li>
          </ul>

          <h3>5. Delivery Issues</h3>
          
          <h4>5.1 Email Not Received</h4>
          <p>
            If you don't receive your digital product within 15 minutes:
          </p>
          <ul>
            <li>Check your spam/junk folder</li>
            <li>Verify the email address used during checkout</li>
            <li>Check your account dashboard for download links</li>
            <li>Contact support at <span className="text-brand-400">itskiranbabu.ai@gmail.com</span></li>
          </ul>

          <h4>5.2 Access Problems</h4>
          <p>
            If you experience issues accessing your purchase:
          </p>
          <ul>
            <li>Ensure you're using the correct login credentials</li>
            <li>Try a different browser or device</li>
            <li>Clear your browser cache and cookies</li>
            <li>Contact support with your order number for immediate assistance</li>
          </ul>

          <h4>5.3 Technical Issues</h4>
          <p>
            For technical problems with digital products:
          </p>
          <ul>
            <li>We provide free technical support for 30 days after purchase</li>
            <li>Email us with detailed description of the issue</li>
            <li>Include screenshots or error messages if applicable</li>
            <li>We aim to resolve technical issues within 24-48 hours</li>
          </ul>

          <h3>6. Re-Delivery & Backup Access</h3>
          <p>
            Lost your download link or access credentials?
          </p>
          <ul>
            <li>
              <strong>Account Dashboard:</strong> Login to your account to re-download any purchased products
            </li>
            <li>
              <strong>Email Request:</strong> Contact us with your order number for re-delivery
            </li>
            <li>
              <strong>Lifetime Access:</strong> Digital products include lifetime download access
            </li>
            <li>
              <strong>No Additional Charge:</strong> Re-delivery is always free for valid purchases
            </li>
          </ul>

          <h3>7. International Delivery</h3>
          <p>
            Since all products are digital:
          </p>
          <ul>
            <li>Available worldwide with internet access</li>
            <li>No shipping charges or customs fees</li>
            <li>Instant delivery regardless of location</li>
            <li>Support available in English</li>
          </ul>

          <h3>8. Physical Products (If Applicable)</h3>
          <p>
            In rare cases where physical items are offered (merchandise, printed materials):
          </p>
          <ul>
            <li>
              <strong>Shipping Method:</strong> Standard courier service (details provided at checkout)
            </li>
            <li>
              <strong>Delivery Time:</strong> 5-10 business days (domestic), 10-20 business days (international)
            </li>
            <li>
              <strong>Tracking:</strong> Tracking number provided via email
            </li>
            <li>
              <strong>Shipping Costs:</strong> Calculated at checkout based on location
            </li>
          </ul>

          <h3>9. Delivery Guarantee</h3>
          <p>
            We guarantee:
          </p>
          <ul>
            <li>Digital products delivered within 15 minutes of payment</li>
            <li>Working download links for all purchases</li>
            <li>24/7 access to your account dashboard</li>
            <li>Prompt support for any delivery issues</li>
            <li>Re-delivery at no cost if original delivery fails</li>
          </ul>

          <h3>10. Updates & Improvements</h3>
          <p>
            For digital products that receive updates:
          </p>
          <ul>
            <li>Updates delivered automatically to your account</li>
            <li>Email notification when major updates are available</li>
            <li>No additional charge for updates and improvements</li>
            <li>Access to latest version always available in your dashboard</li>
          </ul>

          <h3>11. Contact for Delivery Support</h3>
          <p>
            For any delivery-related questions or issues:
          </p>
          <ul>
            <li><strong>Email:</strong> <span className="text-brand-400">itskiranbabu.ai@gmail.com</span></li>
            <li><strong>Subject Line:</strong> "Delivery Issue - [Order Number]"</li>
            <li><strong>Response Time:</strong> Within 24 hours (usually much faster)</li>
            <li><strong>Include:</strong> Order number, email used for purchase, description of issue</li>
          </ul>

          <div className="mt-8 p-6 bg-dark-card border border-dark-border rounded-xl">
            <p className="text-sm text-gray-400 mb-0">
              <strong className="text-white">Important:</strong> Since we offer digital products, there are no 
              physical shipping delays, lost packages, or customs issues. All products are delivered electronically 
              for instant access. If you experience any delivery issues, our support team is ready to help immediately.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ShippingDelivery;
