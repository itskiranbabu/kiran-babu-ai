
import React, { useState, useEffect } from 'react';
import { X, Loader2, Send, CheckCircle } from 'lucide-react';
import { SERVICES } from '../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialService,
    budget: '',
    timeline: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [refId, setRefId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, service: initialService }));
      setStatus('idle');
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Generate Reference ID
    const newRefId = Math.random().toString(36).substr(2, 9).toUpperCase();

    // Use FormData for better compatibility with FormSubmit
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email); // This sets the Reply-To automatically
    data.append('service', formData.service);
    data.append('budget', formData.budget);
    data.append('timeline', formData.timeline);
    data.append('message', formData.message);
    data.append('refId', newRefId);
    
    // FormSubmit Configuration
    data.append('_subject', `New Service Inquiry: ${formData.service} from ${formData.name}`);
    data.append('_template', 'table');
    data.append('_captcha', 'false');

    try {
        const response = await fetch('https://formsubmit.co/ajax/itskiranbabu.ai@gmail.com', {
            method: 'POST',
            body: data,
            headers: { 
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setRefId(newRefId);
            setStatus('success');
        } else {
             setStatus('error');
             console.error("Submission failed");
        }
    } catch (error) {
        console.error("Form submission error:", error);
        setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-dark-card border border-dark-border w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10"
        >
          <X size={24} />
        </button>

        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
              <p className="text-gray-400 mb-6 px-4">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Your request has been logged.
              </p>
              
               <div className="bg-dark-bg border border-dark-border rounded-lg p-5 text-left mb-6 text-sm">
                   <div className="flex justify-between items-center mb-4 pb-3 border-b border-dark-border">
                       <span className="text-gray-500 text-xs font-bold uppercase">Submission Summary</span>
                       <span className="text-brand-400 font-mono text-xs">#{refId}</span>
                   </div>
                   
                   <div className="space-y-3">
                       <div className="grid grid-cols-3 gap-2">
                           <span className="text-gray-400 col-span-1">Service:</span>
                           <span className="text-white font-medium col-span-2 text-right">{formData.service}</span>
                       </div>
                        <div className="grid grid-cols-3 gap-2">
                           <span className="text-gray-400 col-span-1">Budget:</span>
                           <span className="text-white font-medium col-span-2 text-right">{formData.budget || '-'}</span>
                       </div>
                        <div className="grid grid-cols-3 gap-2">
                           <span className="text-gray-400 col-span-1">Timeline:</span>
                           <span className="text-white font-medium col-span-2 text-right">{formData.timeline || '-'}</span>
                       </div>
                       <div className="grid grid-cols-3 gap-2">
                           <span className="text-gray-400 col-span-1">Email:</span>
                           <span className="text-white font-medium col-span-2 text-right truncate">{formData.email}</span>
                       </div>
                       <div className="pt-3 border-t border-dark-border mt-3">
                           <span className="text-gray-400 block mb-1">Scope:</span>
                           <span className="text-gray-300 italic text-xs block bg-white/5 p-2 rounded border border-white/5">
                             "{formData.message}"
                           </span>
                       </div>
                   </div>
               </div>

               <p className="text-xs text-gray-500 mb-6">
                  I'll review this and email you shortly at <span className="text-gray-300">{formData.email}</span> to discuss next steps.
               </p>

              <button 
                onClick={onClose}
                className="w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-white mb-6">Book Service</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Service</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
                    >
                        <option value="">Select range...</option>
                        <option value="< $1k">Less than $1,000</option>
                        <option value="$1k - $3k">$1,000 - $3,000</option>
                        <option value="$3k - $5k">$3,000 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k+">$10,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-400 mb-2">Timeline</label>
                   <select
                      required
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none"
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
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Scope</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none resize-none"
                    placeholder="Describe your project requirements..."
                  />
                </div>

                 {status === 'error' && (
                    <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-xs">
                        Network error. Please try again or email directly.
                    </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Processing...
                    </>
                  ) : (
                    <>
                      Submit Request <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
