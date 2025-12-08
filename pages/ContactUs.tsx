import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Linkedin, Twitter, Github } from 'lucide-react';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { useToast } from '../components/ToastContext';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      addToast('Message sent successfully! We will get back to you within 24 hours.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <SEO
        title="Contact Us - KeySpark AI"
        description="Get in touch with KeySpark AI. We're here to help with your questions, support needs, and business inquiries."
      />

      <div className="min-h-screen bg-dark-bg py-20 px-4">
        <FadeIn>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="sales">Sales & Pricing</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Contact Details */}
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                        <Mail className="text-brand-400" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <a href="mailto:support@keyspark.ai" className="text-white hover:text-brand-400 transition-colors">
                          support@keyspark.ai
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                        <Phone className="text-brand-400" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                        <a href="tel:+1234567890" className="text-white hover:text-brand-400 transition-colors">
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                        <MapPin className="text-brand-400" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Address</p>
                        <p className="text-white">
                          123 Innovation Street<br />
                          Tech Hub, CA 94000<br />
                          United States
                        </p>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                        <Clock className="text-brand-400" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Business Hours</p>
                        <p className="text-white">
                          Monday - Friday<br />
                          9:00 AM - 6:00 PM PST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                  
                  <div className="space-y-3">
                    <a href="/#/faq" className="block text-gray-300 hover:text-brand-400 transition-colors">
                      → Frequently Asked Questions
                    </a>
                    <a href="/#/support" className="block text-gray-300 hover:text-brand-400 transition-colors">
                      → Support Center
                    </a>
                    <a href="/#/pricing" className="block text-gray-300 hover:text-brand-400 transition-colors">
                      → Pricing Plans
                    </a>
                    <a href="/#/terms" className="block text-gray-300 hover:text-brand-400 transition-colors">
                      → Terms of Service
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                  
                  <div className="flex gap-3">
                    <a
                      href="https://twitter.com/keysparkai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-dark-bg border border-dark-border hover:border-brand-500 flex items-center justify-center transition-colors"
                    >
                      <Twitter className="text-gray-400 hover:text-brand-400" size={18} />
                    </a>
                    <a
                      href="https://linkedin.com/company/keysparkai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-dark-bg border border-dark-border hover:border-brand-500 flex items-center justify-center transition-colors"
                    >
                      <Linkedin className="text-gray-400 hover:text-brand-400" size={18} />
                    </a>
                    <a
                      href="https://github.com/keysparkai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-dark-bg border border-dark-border hover:border-brand-500 flex items-center justify-center transition-colors"
                    >
                      <Github className="text-gray-400 hover:text-brand-400" size={18} />
                    </a>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="bg-gradient-to-br from-brand-900/20 to-dark-card border border-brand-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="text-brand-400" size={24} />
                    <h3 className="text-lg font-bold text-white">Need Immediate Help?</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    Chat with our support team in real-time. Available for Pro and Agency plan users.
                  </p>
                  <button className="w-full px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors">
                    Start Live Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Response Time Notice */}
            <div className="mt-12 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
              <p className="text-blue-400 font-medium">
                📧 We typically respond within 24 hours. For urgent matters, please use live chat or call us directly.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default ContactUs;
