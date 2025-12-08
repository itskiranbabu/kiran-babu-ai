import React from 'react';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const CancellationRefund: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
      <SEO 
        title="Cancellation & Refund Policy" 
        description="Cancellation and Refund Policy for KeySpark AI services and products." 
      />
      
      <FadeIn>
        <SectionHeader 
          title="Cancellation & Refund Policy" 
          subtitle="Last updated: December 2024" 
        />
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h3>1. Overview</h3>
          <p>
            At KeySpark AI (operated by Kiran Babu), we strive to provide exceptional digital products and services. 
            This policy outlines our cancellation and refund procedures for various offerings.
          </p>

          <h3>2. Digital Products (Templates, Prompt Packs, etc.)</h3>
          <p>
            Due to the nature of digital products, all sales are <strong>final and non-refundable</strong> once the product has been delivered or accessed. This includes:
          </p>
          <ul>
            <li>Notion Templates</li>
            <li>AI Prompt Packs</li>
            <li>Digital Downloads</li>
            <li>E-books and Guides</li>
            <li>Software Tools and Scripts</li>
          </ul>
          <p>
            <strong>Exception:</strong> If you experience technical issues preventing access to your purchase, 
            please contact us within 7 days of purchase at <span className="text-brand-400">itskiranbabu.ai@gmail.com</span> 
            and we will work to resolve the issue or provide a refund at our discretion.
          </p>

          <h3>3. Consultation & Service Bookings</h3>
          <p>
            For consultation calls, strategy sessions, and service bookings:
          </p>
          <ul>
            <li>
              <strong>Cancellation Window:</strong> You may cancel or reschedule up to 24 hours before the scheduled appointment 
              without penalty.
            </li>
            <li>
              <strong>Late Cancellation:</strong> Cancellations made less than 24 hours before the appointment will forfeit 
              50% of the booking fee.
            </li>
            <li>
              <strong>No-Show:</strong> Failure to attend a scheduled appointment without prior notice will result in 
              forfeiture of the full booking fee.
            </li>
            <li>
              <strong>Rescheduling:</strong> You may reschedule once without penalty if done 24+ hours in advance. 
              Additional rescheduling requests may incur a fee.
            </li>
          </ul>

          <h3>4. Subscription Services</h3>
          <p>
            For monthly or annual subscription plans:
          </p>
          <ul>
            <li>
              <strong>Cancellation:</strong> You may cancel your subscription at any time. Cancellation will take effect 
              at the end of the current billing period.
            </li>
            <li>
              <strong>No Partial Refunds:</strong> We do not provide refunds for partial months or unused portions of 
              subscription periods.
            </li>
            <li>
              <strong>Access:</strong> You will retain access to subscription features until the end of your paid period.
            </li>
            <li>
              <strong>Reactivation:</strong> Cancelled subscriptions can be reactivated at any time at the current pricing.
            </li>
          </ul>

          <h3>5. Custom Development & Project Work</h3>
          <p>
            For custom development projects, automation builds, or bespoke services:
          </p>
          <ul>
            <li>
              <strong>Deposit:</strong> A non-refundable deposit (typically 30-50%) is required to begin work.
            </li>
            <li>
              <strong>Milestone Payments:</strong> Payments made upon completion of project milestones are non-refundable.
            </li>
            <li>
              <strong>Project Cancellation:</strong> If you cancel a project mid-way, you will be charged for all completed 
              work plus any non-recoverable expenses incurred.
            </li>
            <li>
              <strong>Scope Changes:</strong> Changes to project scope may result in additional charges and timeline adjustments.
            </li>
          </ul>

          <h3>6. Refund Process</h3>
          <p>
            If you are eligible for a refund based on the above policies:
          </p>
          <ul>
            <li>Contact us at <span className="text-brand-400">itskiranbabu.ai@gmail.com</span> with your order details</li>
            <li>Provide a clear explanation of the issue or reason for refund request</li>
            <li>Include proof of purchase (order number, receipt, or confirmation email)</li>
            <li>Refunds will be processed within 7-10 business days to the original payment method</li>
            <li>You will receive an email confirmation once the refund has been processed</li>
          </ul>

          <h3>7. Quality Guarantee</h3>
          <p>
            We stand behind the quality of our work. If you are unsatisfied with a service or product due to:
          </p>
          <ul>
            <li>Technical defects or errors</li>
            <li>Missing content or features as described</li>
            <li>Failure to deliver as promised</li>
          </ul>
          <p>
            Please contact us within 7 days and we will work to resolve the issue through fixes, replacements, 
            or refunds as appropriate.
          </p>

          <h3>8. Force Majeure</h3>
          <p>
            We are not liable for delays or inability to perform services due to circumstances beyond our control, 
            including but not limited to: natural disasters, pandemics, government actions, internet outages, 
            or third-party service failures. In such cases, we will work with you to reschedule or provide 
            alternative solutions.
          </p>

          <h3>9. Dispute Resolution</h3>
          <p>
            If you have a dispute regarding a charge or service, please contact us first to resolve the matter 
            amicably. We are committed to fair and transparent business practices and will work in good faith 
            to address your concerns.
          </p>

          <h3>10. Contact Information</h3>
          <p>
            For cancellations, refund requests, or questions about this policy:
          </p>
          <ul>
            <li><strong>Email:</strong> <span className="text-brand-400">itskiranbabu.ai@gmail.com</span></li>
            <li><strong>Website:</strong> <span className="text-brand-400">https://kiran-babu-ai-unaw.vercel.app</span></li>
            <li><strong>Response Time:</strong> We aim to respond to all inquiries within 24-48 hours</li>
          </ul>

          <h3>11. Policy Updates</h3>
          <p>
            We reserve the right to update this policy at any time. Changes will be posted on this page with 
            an updated "Last updated" date. Continued use of our services after changes constitutes acceptance 
            of the updated policy.
          </p>

          <div className="mt-8 p-6 bg-dark-card border border-dark-border rounded-xl">
            <p className="text-sm text-gray-400 mb-0">
              <strong className="text-white">Note:</strong> This policy applies to all purchases made through 
              KeySpark AI, including those processed via third-party payment processors (Razorpay, Stripe, PayPal, etc.). 
              For questions specific to payment processing, please refer to the respective payment provider's terms.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default CancellationRefund;
