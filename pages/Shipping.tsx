import React from 'react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import SectionHeader from '../components/SectionHeader';

const Shipping: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
      <SEO
        title="Shipping & Delivery Policy - KeySpark AI"
        description="Learn about our digital service delivery and access policies for KeySpark AI."
      />

      <FadeIn>
        <SectionHeader 
          title="Shipping & Delivery Policy" 
          subtitle="Last Updated: December 8, 2024" 
        />

        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
          <section>
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-6 mb-6">
              <p>
                <span className="font-semibold text-brand-400">Important Notice:</span> KeySpark AI is a digital SaaS 
                (Software as a Service) platform. We do not ship physical products. All services, features, and deliverables 
                are provided digitally through our web application.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">1. Digital Service Delivery</h3>
            <p>
              Upon successful subscription payment, you will receive immediate access to your KeySpark AI account and all 
              features included in your selected plan. No waiting period or shipping time is required.
            </p>
            <p className="font-semibold text-white mt-4">Access Method:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Web browser at https://kiran-babu-ai-unaw.vercel.app</li>
              <li>Any device with internet connection (desktop, laptop, tablet, mobile)</li>
              <li>24/7 availability from anywhere in the world</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">2. Subscription Activation Timeline</h3>
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <span className="text-brand-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Payment Processing</h4>
                  <p className="text-gray-400 text-sm">Instant - Payment verified through Razorpay/Stripe</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <span className="text-brand-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Account Activation</h4>
                  <p className="text-gray-400 text-sm">Within 1 minute - Automatic activation upon payment confirmation</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <span className="text-brand-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Welcome Email</h4>
                  <p className="text-gray-400 text-sm">Within 5 minutes - Confirmation email with getting started guide</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <span className="text-brand-400 font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Full Access</h4>
                  <p className="text-gray-400 text-sm">Immediate - All features available instantly</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">3. Custom Services Delivery</h3>
            <p className="font-semibold text-white">Custom Development Projects:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><span className="font-semibold">Timeline:</span> 7-21 days depending on project complexity</li>
              <li><span className="font-semibold">Delivery Method:</span> Digital files via secure download link or direct deployment</li>
              <li><span className="font-semibold">Progress Updates:</span> Weekly status reports via email</li>
              <li><span className="font-semibold">Final Delivery:</span> Complete project files + documentation + training</li>
            </ul>

            <p className="font-semibold text-white mt-4">AI-Generated Blueprints:</p>
            <p>
              Service blueprints generated through our AI Blueprint Generator are delivered instantly upon completion of 
              the intake questionnaire. You can download them immediately as PDF or JSON files.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">4. Service Availability & Uptime</h3>
            <p>
              We maintain a 99.9% uptime guarantee for our platform. In the rare event of service interruptions, we will 
              notify users via email and status page updates. Scheduled maintenance is performed during low-traffic hours 
              (typically 2-4 AM UTC) and announced at least 48 hours in advance.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">5. International Access</h3>
            <p>
              KeySpark AI is accessible globally from any country with internet access. There are no geographical restrictions 
              or additional fees for international users. Our platform is hosted on globally distributed servers to ensure fast 
              access regardless of your location.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">6. Technical Requirements</h3>
            <p>To access KeySpark AI, you need:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modern web browser (Chrome, Firefox, Safari, Edge - latest 2 versions)</li>
              <li>Stable internet connection (minimum 1 Mbps recommended)</li>
              <li>JavaScript enabled</li>
              <li>Cookies enabled for authentication</li>
            </ul>
            <p className="mt-4">
              For optimal experience, we recommend a broadband connection (5+ Mbps) and a device with at least 4GB RAM.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">7. Contact Us</h3>
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <p className="mb-2">
                <span className="font-semibold text-brand-400">Email:</span>{' '}
                <a href="mailto:support@keyspark.ai" className="text-white hover:text-brand-400 transition-colors">
                  support@keyspark.ai
                </a>
              </p>
              <p>
                <span className="font-semibold text-brand-400">Website:</span>{' '}
                <a href="https://kiran-babu-ai-unaw.vercel.app" className="text-white hover:text-brand-400 transition-colors">
                  https://kiran-babu-ai-unaw.vercel.app
                </a>
              </p>
            </div>
          </section>

          <section className="pt-8 border-t border-dark-border">
            <p className="text-sm text-gray-500 text-center">
              This policy is part of our Terms of Service. By using KeySpark AI, you agree to this Shipping & Delivery Policy.
            </p>
          </section>
        </div>
      </FadeIn>
    </div>
  );
};

export default Shipping;
