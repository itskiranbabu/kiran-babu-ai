import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle, Loader2, Calendar, ClipboardList } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { SERVICES } from '../constants';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';

const BookCall: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: serviceParam || 'General Inquiry',
    budget: '',
    timeline: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [refId, setRefId] = useState('');

  // Update selected service if URL parameter changes
  useEffect(() => {
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [serviceParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Generate Reference ID immediately
    const newRefId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const submissionData = {
      ...formData,
      refId: newRefId,
      _subject: `New Inquiry: ${formData.service} from ${formData.name}`,
      _template: 'table',
      _captcha: 'false', 
    };

    try {
        await fetch('https://formsubmit.co/ajax/itskiranbabu.ai@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(submissionData)
        });
    } catch (error) {
        console.error("Form submission error:", error);
    }

    setRefId(newRefId);
    setStatus('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (status === 'success') {
    return (
      <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
        <SEO title="Request Received" />
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Request Received!</h2>
          <p className="text-gray-400 text-lg">
            Thanks <span className="text-white font-semibold">{formData.name}</span>, your inquiry has been securely recorded.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden shadow-2xl mb-8">
            <div className="bg-dark-bg/50 px-6 py-4 border-b border-dark-border flex justify-between items-center">
              <span className="text-sm text-gray-400 font-medium">Reference ID</span>
              <span className="font-mono text-brand-400 font-bold tracking-wider bg-brand-900/20 px-3 py-1 rounded border border-brand-500/20">
                #{refId}
              </span>
            </div>
            
            <div className="p-6 space-y-5">
                <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Service</span>
                    <p className="text-white font-bold text-xl">{formData.service}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-dark-border pt-4">
                     <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Budget</span>
                        <p className="text-white font-medium">{formData.budget || 'Not specified'}</p>
                    </div>
                     <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Timeline</span>
                        <p className="text-white font-medium">{formData.timeline || 'Not specified'}</p>
                    </div>
                </div>

                 <div className="border-t border-dark-border pt-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Contact Email</span>
                    <p className="text-white font-medium">{formData.email}</p>
                </div>

                <div className="border-t border-dark-border pt-4 bg-dark-bg/30 -mx-6 px-6 -mb-6 pb-6">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Project Scope</span>
                    <p className="text-gray-300 text-sm italic leading-relaxed">"{formData.message}"</p>
                </div>
            </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-dark-card to-dark-bg border border-dark-border rounded-xl p-6 mb-8">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <ClipboardList size={20} className="text-brand-400" /> What happens next?
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-900/50 text-brand-400 flex items-center justify-center text-xs font-bold border border-brand-500/30 shrink-0">1</div>
                <p className="text-gray-400 text-sm">I will review your project requirements within <span className="text-white">24 hours</span>.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-900/50 text-brand-400 flex items-center justify-center text-xs font-bold border border-brand-500/30 shrink-0">2</div>
                <p className="text-gray-400 text-sm">You'll receive an email at <span className="text-white">{formData.email}</span> with a booking link or follow-up questions.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-900/50 text-brand-400 flex items-center justify-center text-xs font-bold border border-brand-500/30 shrink-0">3</div>
                <p className="text-gray-400 text-sm">We'll hop on a discovery call to finalize the strategy and timeline.</p>
              </li>
            </ul>
        </div>

        <div className="text-center">
          <button 
            onClick={() => {
              setStatus('idle');
              setFormData({ ...formData, message: '', timeline: '', budget: '' });
            }}
            className="px-6 py-3 bg-dark-card border border-dark-border hover:border-brand-500 text-white rounded-lg transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-20 px-4 max-w-3xl mx-auto">
      <SEO title="Book a Service" />
      <FadeIn>
        <SectionHeader 
            title="Book a Service" 
            subtitle="Ready to scale your systems or brand? Provide a few details below to get started."
            center
        />
      </FadeIn>

      <FadeIn delay={100}>
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                />
                </div>
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">Service Interested In</label>
                <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                >
                    <option value="General Inquiry">General Inquiry</option>
                    {SERVICES.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                </select>
                </div>
                <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-400 mb-2">Estimated Budget</label>
                <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                >
                    <option value="">Select a range...</option>
                    <option value="< $1k">Less than $1,000</option>
                    <option value="$1k - $3k">$1,000 - $3,000</option>
                    <option value="$3k - $5k">$3,000 - $5,000</option>
                    <option value="$5k - $10k">$5,000 - $10,000</option>
                    <option value="$10k+">$10,000+</option>
                </select>
                </div>
            </div>

            <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-400 mb-2">Desired Timeline</label>
                <select
                id="timeline"
                name="timeline"
                required
                value={formData.timeline}
                onChange={handleChange}
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                >
                    <option value="">Select a timeline...</option>
                    <option value="Urgent (ASAP)">Urgent (ASAP)</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3+ months">3+ months</option>
                    <option value="Flexible">Flexible</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Project Scope / Details</label>
                <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your business goals, specific requirements, and what you're looking to achieve with this project..."
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-600/20"
            >
                {status === 'submitting' ? (
                <>
                    <Loader2 className="animate-spin" size={20} /> Sending Request...
                </>
                ) : (
                <>
                    Confirm Booking Request <Send size={18} />
                </>
                )}
            </button>
            </form>

            <div className="mt-8 pt-8 border-t border-dark-border text-center">
            <p className="text-gray-400 text-sm mb-4">Just looking for a quick chat?</p>
            <a 
                href="#" 
                className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
                <Calendar size={18} /> Book a 15-min discovery call
            </a>
            </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default BookCall;