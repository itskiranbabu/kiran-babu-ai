import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '../components/ToastContext';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:itskiranbabu.ai@gmail.com?subject=${encodeURIComponent(
        `[KeySpark Contact] ${formData.subject} - ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\n---\nSent from KeySpark AI Contact Form`
      )}`;
      
      // Open user's email client
      window.location.href = mailtoLink;
      
      // Show success message
      addToast('Your email client has been opened. Please send the email to complete your message.', 'success');
      
      // Clear form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error opening email client:', error);
      addToast('Error opening email client. Please email us directly at itskiranbabu.ai@gmail.com', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-6xl mx-auto">
      <SEO 
        title="Contact Us - KeySpark AI" 
        description="Get in touch with KeySpark AI for support, inquiries, or collaboration opportunities." 
      />
      
      <FadeIn>
        <SectionHeader 
          title="Contact Us" 
          subtitle="We'd love to hear from you. Reach out for support, inquiries, or collaboration." 
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-brand-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a 
                      href="mailto:itskiranbabu.ai@gmail.com" 
                      className="text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      itskiranbabu.ai@gmail.com
                    </a>
                    <p className="text-sm text-gray-400 mt-1">
                      For general inquiries and support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="text-brand-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Live Chat</h4>
                    <p className="text-gray-300">Available on our website</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Monday - Friday, 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-brand-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Response Time</h4>
                    <p className="text-gray-300">Within 24 hours</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Usually much faster during business hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brand-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-gray-300">India</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Serving clients worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Help</h3>
              <div className="space-y-3">
                <a 
                  href="#/terms" 
                  className="block text-brand-400 hover:text-brand-300 transition-colors"
                >
                  → Terms of Service
                </a>
                <a 
                  href="#/privacy" 
                  className="block text-brand-400 hover:text-brand-300 transition-colors"
                >
                  → Privacy Policy
                </a>
                <a 
                  href="#/cancellation-refunds" 
                  className="block text-brand-400 hover:text-brand-300 transition-colors"
                >
                  → Cancellation & Refund Policy
                </a>
                <a 
                  href="#/shipping" 
                  className="block text-brand-400 hover:text-brand-300 transition-colors"
                >
                  → Shipping & Delivery
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-brand-500/10 to-[#FF9D0A]/10 border border-brand-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-white font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  * All times in Indian Standard Time (IST)
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#18181b] border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#18181b] border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#18181b] border border-dark-border rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing & Payments">Billing & Payments</option>
                  <option value="Refund Request">Refund Request</option>
                  <option value="Partnership Opportunity">Partnership Opportunity</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-[#18181b] border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#7B2FF7] to-[#FF9D0A] hover:opacity-90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening Email Client...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-2">
                This will open your default email client. Alternatively, email us directly at{' '}
                <a href="mailto:itskiranbabu.ai@gmail.com" className="text-brand-400 hover:text-brand-300">
                  itskiranbabu.ai@gmail.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ContactUs;
