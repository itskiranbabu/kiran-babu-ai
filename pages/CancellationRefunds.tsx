import React from 'react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const CancellationRefunds: React.FC = () => {
  return (
    <>
      <SEO
        title="Cancellation & Refunds Policy - KeySpark AI"
        description="Learn about our cancellation and refund policies for KeySpark AI services and subscriptions."
      />

      <div className="min-h-screen bg-dark-bg py-20 px-4">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Cancellation & Refunds Policy
              </h1>
              <p className="text-lg text-gray-400">
                Last Updated: December 8, 2024
              </p>
            </div>

            {/* Content */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 md:p-12 space-y-8">
              
              {/* Introduction */}
              <section>
                <p className="text-gray-300 leading-relaxed">
                  At KeySpark AI, we strive to provide exceptional service and value. This Cancellation & Refunds Policy outlines our terms for subscription cancellations, service terminations, and refund eligibility.
                </p>
              </section>

              {/* Subscription Cancellation */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Subscription Cancellation</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">1.1 How to Cancel</h3>
                    <p className="text-gray-300 leading-relaxed mb-2">
                      You may cancel your subscription at any time through:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                      <li>Your account dashboard under Settings → Billing</li>
                      <li>Contacting our support team at support@keyspark.ai</li>
                      <li>Using the cancellation link in your subscription confirmation email</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">1.2 Cancellation Effective Date</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Cancellations take effect at the end of your current billing period. You will retain access to all features until that date. No partial refunds are provided for unused time within the billing period.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">1.3 Data Retention After Cancellation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      After cancellation, your data will be retained for 30 days. You can reactivate your subscription within this period to restore full access. After 30 days, your data may be permanently deleted.
                    </p>
                  </div>
                </div>
              </section>

              {/* Refund Policy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Refund Policy</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">2.1 7-Day Money-Back Guarantee</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We offer a 7-day money-back guarantee for first-time subscribers. If you are not satisfied with our service within the first 7 days of your initial subscription, you may request a full refund.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">2.2 Refund Eligibility</h3>
                    <p className="text-gray-300 leading-relaxed mb-2">
                      Refunds are available under the following conditions:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                      <li>Request made within 7 days of initial subscription purchase</li>
                      <li>First-time subscribers only (not applicable to renewals)</li>
                      <li>Service was not used extensively (less than 10 AI generations or 5 projects created)</li>
                      <li>No violation of our Terms of Service</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">2.3 Non-Refundable Items</h3>
                    <p className="text-gray-300 leading-relaxed mb-2">
                      The following are not eligible for refunds:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                      <li>Subscription renewals (monthly or annual)</li>
                      <li>Add-on services or one-time purchases</li>
                      <li>Custom development work or consulting services</li>
                      <li>Subscriptions older than 7 days</li>
                      <li>Accounts suspended or terminated for Terms of Service violations</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">2.4 Refund Processing Time</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Approved refunds will be processed within 5-7 business days. The refund will be credited to the original payment method used for the purchase. Depending on your bank or payment provider, it may take an additional 3-5 business days for the refund to appear in your account.
                    </p>
                  </div>
                </div>
              </section>

              {/* How to Request a Refund */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. How to Request a Refund</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    To request a refund, please follow these steps:
                  </p>
                  
                  <ol className="list-decimal list-inside text-gray-300 space-y-3 ml-4">
                    <li>
                      <span className="font-semibold">Contact Support:</span> Email us at support@keyspark.ai with the subject line "Refund Request"
                    </li>
                    <li>
                      <span className="font-semibold">Provide Details:</span> Include your account email, subscription plan, purchase date, and reason for refund
                    </li>
                    <li>
                      <span className="font-semibold">Wait for Review:</span> Our team will review your request within 2 business days
                    </li>
                    <li>
                      <span className="font-semibold">Receive Confirmation:</span> You will receive an email confirming approval or denial with explanation
                    </li>
                    <li>
                      <span className="font-semibold">Refund Processing:</span> If approved, refund will be processed within 5-7 business days
                    </li>
                  </ol>
                </div>
              </section>

              {/* Downgrades and Plan Changes */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Downgrades and Plan Changes</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">4.1 Downgrading Your Plan</h3>
                    <p className="text-gray-300 leading-relaxed">
                      You may downgrade your subscription plan at any time. The downgrade will take effect at the end of your current billing period. No refunds or credits are provided for the difference in plan pricing.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">4.2 Upgrading Your Plan</h3>
                    <p className="text-gray-300 leading-relaxed">
                      When upgrading, you will be charged a prorated amount for the remainder of your current billing period. The upgrade takes effect immediately upon payment confirmation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Service Interruptions */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Service Interruptions and Credits</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    In the event of extended service outages or interruptions caused by KeySpark AI:
                  </p>
                  
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Outages exceeding 24 consecutive hours may qualify for service credits</li>
                    <li>Credits will be calculated as a prorated amount based on downtime</li>
                    <li>Credits are applied to your next billing cycle, not issued as cash refunds</li>
                    <li>Scheduled maintenance and third-party service issues are excluded</li>
                  </ul>
                </div>
              </section>

              {/* Annual Subscriptions */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Annual Subscriptions</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Annual subscriptions are subject to the same 7-day money-back guarantee. After 7 days, annual subscriptions are non-refundable. You may cancel at any time, but you will retain access until the end of your annual term with no refund for unused months.
                  </p>
                </div>
              </section>

              {/* Custom Services and Projects */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Custom Services and Projects</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">7.1 Custom Development</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Custom development projects require a 50% upfront deposit. This deposit is non-refundable once work has commenced. The remaining 50% is due upon project completion.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">7.2 Consulting Services</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Consulting hours are billed in advance and are non-refundable. Unused hours may be rolled over to the next month for active subscribers.
                    </p>
                  </div>
                </div>
              </section>

              {/* Exceptions */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Exceptions and Special Circumstances</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    We understand that exceptional circumstances may arise. If you believe you have a valid reason for a refund outside of our standard policy, please contact our support team. We will review your case individually and may grant exceptions at our discretion.
                  </p>
                </div>
              </section>

              {/* Chargebacks */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Chargebacks and Disputes</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    If you initiate a chargeback or payment dispute without first contacting us to resolve the issue, your account will be immediately suspended. We encourage you to reach out to our support team before taking such action. Most issues can be resolved quickly and amicably.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    For questions about cancellations, refunds, or billing:
                  </p>
                  
                  <div className="bg-dark-bg border border-dark-border rounded-xl p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-brand-400 font-semibold min-w-[80px]">Email:</span>
                        <a href="mailto:support@keyspark.ai" className="text-gray-300 hover:text-brand-400 transition-colors">
                          support@keyspark.ai
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-brand-400 font-semibold min-w-[80px]">Website:</span>
                        <a href="https://kiran-babu-ai-unaw.vercel.app" className="text-gray-300 hover:text-brand-400 transition-colors">
                          https://kiran-babu-ai-unaw.vercel.app
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-brand-400 font-semibold min-w-[80px]">Response Time:</span>
                        <span className="text-gray-300">Within 24-48 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Policy Changes */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    We reserve the right to modify this Cancellation & Refunds Policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the updated policy. We will notify active subscribers of significant changes via email.
                  </p>
                </div>
              </section>

              {/* Footer Note */}
              <section className="pt-8 border-t border-dark-border">
                <p className="text-sm text-gray-500 text-center">
                  This policy is part of our Terms of Service. By using KeySpark AI, you agree to this Cancellation & Refunds Policy.
                </p>
              </section>
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default CancellationRefunds;
