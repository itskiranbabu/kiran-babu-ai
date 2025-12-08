import React from 'react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const Shipping: React.FC = () => {
  return (
    <>
      <SEO
        title="Shipping & Delivery Policy - KeySpark AI"
        description="Learn about our digital service delivery and access policies for KeySpark AI."
      />

      <div className="min-h-screen bg-dark-bg py-20 px-4">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Shipping & Delivery Policy
              </h1>
              <p className="text-lg text-gray-400">
                Last Updated: December 8, 2024
              </p>
            </div>

            {/* Content */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 md:p-12 space-y-8">
              
              {/* Introduction */}
              <section>
                <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-6 mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    <span className="font-semibold text-brand-400">Important Notice:</span> KeySpark AI is a digital SaaS (Software as a Service) platform. We do not ship physical products. All services, features, and deliverables are provided digitally through our web application.
                  </p>
                </div>
              </section>

              {/* Digital Service Delivery */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Digital Service Delivery</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">1.1 Instant Access</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Upon successful subscription payment, you will receive immediate access to your KeySpark AI account and all features included in your selected plan. No waiting period or shipping time is required.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">1.2 Access Method</h3>
                    <p className="text-gray-300 leading-relaxed mb-2">
                      You can access KeySpark AI through:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                      <li>Web browser at https://kiran-babu-ai-unaw.vercel.app</li>
                      <li>Any device with internet connection (desktop, laptop, tablet, mobile)</li>
                      <li>24/7 availability from anywhere in the world</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">1.3 Account Credentials</h3>
                    <p className="text-gray-300 leading-relaxed">
                      After registration, you will receive a confirmation email with your account details and login instructions. Please keep these credentials secure and do not share them with unauthorized users.
                    </p>
                  </div>
                </div>
              </section>

              {/* Subscription Activation */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Subscription Activation Timeline</h2>
                
                <div className="space-y-4">
                  <div className="bg-dark-bg border border-dark-border rounded-xl p-6">
                    <div className="space-y-4">
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
                  </div>
                </div>
              </section>

              {/* Custom Services Delivery */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Custom Services & Project Delivery</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">3.1 Custom Development Projects</h3>
                    <p className="text-gray-300 leading-relaxed mb-2">
                      For custom development services:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                      <li><span className="font-semibold">Timeline:</span> 7-21 days depending on project complexity</li>
                      <li><span className="font-semibold">Delivery Method:</span> Digital files via secure download link or direct deployment</li>
                      <li><span className="font-semibold">Progress Updates:</span> Weekly status reports via email</li>
                      <li><span className="font-semibold">Final Delivery:</span> Complete project files + documentation + training</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">3.2 AI-Generated Blueprints</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Service blueprints generated through our AI Blueprint Generator are delivered instantly upon completion of the intake questionnaire. You can download them immediately as PDF or JSON files.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">3.3 Consulting Services</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Consulting sessions are delivered via video call (Zoom/Google Meet) at scheduled times. Session recordings and notes are provided within 24 hours after each session.
                    </p>
                  </div>
                </div>
              </section>

              {/* Digital Deliverables */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Digital Deliverables Format</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed mb-2">
                    All digital deliverables are provided in industry-standard formats:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Code & Development</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Source code (GitHub repository)</li>
                        <li>• Documentation (Markdown/PDF)</li>
                        <li>• Deployment guides</li>
                      </ul>
                    </div>

                    <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Content & Assets</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Documents (PDF, DOCX)</li>
                        <li>• Images (PNG, JPG, SVG)</li>
                        <li>• Videos (MP4, WebM)</li>
                      </ul>
                    </div>

                    <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Data & Exports</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• CSV/Excel spreadsheets</li>
                        <li>• JSON data files</li>
                        <li>• Database backups</li>
                      </ul>
                    </div>

                    <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Blueprints & Plans</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• PDF reports</li>
                        <li>• JSON structured data</li>
                        <li>• Interactive dashboards</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Download & Access */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Download & Access Policies</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">5.1 Download Links</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Secure download links for custom deliverables are valid for 30 days. After this period, you can request a new link from our support team. All files are also accessible through your account dashboard.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">5.2 File Storage</h3>
                    <p className="text-gray-300 leading-relaxed">
                      All your generated content, blueprints, and project files are stored securely in your account for the duration of your active subscription. Pro and Agency plan users receive extended storage even after cancellation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">5.3 Backup Copies</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We recommend downloading and maintaining local copies of all important deliverables. While we maintain regular backups, you are responsible for keeping your own copies of critical files.
                    </p>
                  </div>
                </div>
              </section>

              {/* Service Availability */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Service Availability & Uptime</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">6.1 Uptime Guarantee</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We maintain a 99.9% uptime guarantee for our platform. In the rare event of service interruptions, we will notify users via email and status page updates.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">6.2 Scheduled Maintenance</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Scheduled maintenance is performed during low-traffic hours (typically 2-4 AM UTC) and announced at least 48 hours in advance. Maintenance windows rarely exceed 2 hours.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-400 mb-2">6.3 Status Updates</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Real-time service status is available at our status page. Subscribe to status updates to receive notifications about any service disruptions.
                    </p>
                  </div>
                </div>
              </section>

              {/* International Access */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. International Access</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    KeySpark AI is accessible globally from any country with internet access. There are no geographical restrictions or additional fees for international users. Our platform is hosted on globally distributed servers to ensure fast access regardless of your location.
                  </p>
                </div>
              </section>

              {/* Technical Requirements */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Technical Requirements</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed mb-2">
                    To access KeySpark AI, you need:
                  </p>
                  
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Modern web browser (Chrome, Firefox, Safari, Edge - latest 2 versions)</li>
                    <li>Stable internet connection (minimum 1 Mbps recommended)</li>
                    <li>JavaScript enabled</li>
                    <li>Cookies enabled for authentication</li>
                  </ul>

                  <p className="text-gray-300 leading-relaxed mt-4">
                    For optimal experience, we recommend a broadband connection (5+ Mbps) and a device with at least 4GB RAM.
                  </p>
                </div>
              </section>

              {/* Support & Assistance */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Support & Assistance</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you experience any issues accessing our services or downloading deliverables:
                  </p>
                  
                  <div className="bg-dark-bg border border-dark-border rounded-xl p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-brand-400 font-semibold min-w-[100px]">Email:</span>
                        <a href="mailto:support@keyspark.ai" className="text-gray-300 hover:text-brand-400 transition-colors">
                          support@keyspark.ai
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-brand-400 font-semibold min-w-[100px]">Live Chat:</span>
                        <span className="text-gray-300">Available in dashboard (Pro & Agency plans)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-brand-400 font-semibold min-w-[100px]">Response Time:</span>
                        <span className="text-gray-300">Within 24 hours (Priority support: 4-8 hours)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    For questions about service delivery or access:
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
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer Note */}
              <section className="pt-8 border-t border-dark-border">
                <p className="text-sm text-gray-500 text-center">
                  This policy is part of our Terms of Service. By using KeySpark AI, you agree to this Shipping & Delivery Policy.
                </p>
              </section>
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default Shipping;
