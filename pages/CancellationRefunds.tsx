import React from 'react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import SectionHeader from '../components/SectionHeader';

const CancellationRefunds: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
      <SEO
        title="Cancellation & Refunds Policy - KeySpark AI"
        description="Learn about our cancellation and refund policies for KeySpark AI services and subscriptions."
      />

      <FadeIn>
        <SectionHeader 
          title="Cancellation & Refunds Policy" 
          subtitle="Last Updated: December 8, 2024" 
        />

        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">1. Subscription Cancellation</h3>
            <p>
              You may cancel your subscription at any time through your account dashboard under Settings → Billing, 
              by contacting our support team at support@keyspark.ai, or using the cancellation link in your subscription 
              confirmation email.
            </p>
            <p>
              Cancellations take effect at the end of your current billing period. You will retain access to all features 
              until that date. No partial refunds are provided for unused time within the billing period.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">2. 7-Day Money-Back Guarantee</h3>
            <p>
              We offer a 7-day money-back guarantee for first-time subscribers. If you are not satisfied with our service 
              within the first 7 days of your initial subscription, you may request a full refund.
            </p>
            <p className="font-semibold text-brand-400">
              Refund Eligibility:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Request made within 7 days of initial subscription purchase</li>
              <li>First-time subscribers only (not applicable to renewals)</li>
              <li>Service was not used extensively (less than 10 AI generations or 5 projects created)</li>
              <li>No violation of our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">3. Non-Refundable Items</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Subscription renewals (monthly or annual)</li>
              <li>Add-on services or one-time purchases</li>
              <li>Custom development work or consulting services</li>
              <li>Subscriptions older than 7 days</li>
              <li>Accounts suspended or terminated for Terms of Service violations</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">4. How to Request a Refund</h3>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>Email us at support@keyspark.ai with the subject line "Refund Request"</li>
              <li>Include your account email, subscription plan, purchase date, and reason for refund</li>
              <li>Our team will review your request within 2 business days</li>
              <li>You will receive an email confirming approval or denial with explanation</li>
              <li>If approved, refund will be processed within 5-7 business days</li>
            </ol>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">5. Refund Processing Time</h3>
            <p>
              Approved refunds will be processed within 5-7 business days. The refund will be credited to the original 
              payment method used for the purchase. Depending on your bank or payment provider, it may take an additional 
              3-5 business days for the refund to appear in your account.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">6. Plan Changes</h3>
            <p>
              <span className="font-semibold text-white">Downgrading:</span> You may downgrade your subscription plan at any time. 
              The downgrade will take effect at the end of your current billing period. No refunds or credits are provided 
              for the difference in plan pricing.
            </p>
            <p>
              <span className="font-semibold text-white">Upgrading:</span> When upgrading, you will be charged a prorated amount 
              for the remainder of your current billing period. The upgrade takes effect immediately upon payment confirmation.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">7. Service Interruptions</h3>
            <p>
              In the event of extended service outages or interruptions caused by KeySpark AI, outages exceeding 24 consecutive 
              hours may qualify for service credits. Credits will be calculated as a prorated amount based on downtime and applied 
              to your next billing cycle, not issued as cash refunds.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">8. Contact Us</h3>
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <p className="mb-2">
                <span className="font-semibold text-brand-400">Email:</span>{' '}
                <a href="mailto:support@keyspark.ai" className="text-white hover:text-brand-400 transition-colors">
                  support@keyspark.ai
                </a>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-brand-400">Website:</span>{' '}
                <a href="https://kiran-babu-ai-unaw.vercel.app" className="text-white hover:text-brand-400 transition-colors">
                  https://kiran-babu-ai-unaw.vercel.app
                </a>
              </p>
              <p>
                <span className="font-semibold text-brand-400">Response Time:</span> Within 24-48 hours
              </p>
            </div>
          </section>

          <section className="pt-8 border-t border-dark-border">
            <p className="text-sm text-gray-500 text-center">
              This policy is part of our Terms of Service. By using KeySpark AI, you agree to this Cancellation & Refunds Policy.
            </p>
          </section>
        </div>
      </FadeIn>
    </div>
  );
};

export default CancellationRefunds;
