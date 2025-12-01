
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { SERVICES, FAQS } from '../constants';
import { Check, Copy, HelpCircle } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { useToast } from '../components/ToastContext';
import Accordion from '../components/Accordion';

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingService, setBookingService] = useState<string | null>(null);
  const { addToast } = useToast();

  const categories = ['All', ...Array.from(new Set(SERVICES.map(s => s.category)))];
  const filteredServices = selectedCategory === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedCategory);

  const handleCopyLink = (title: string) => {
    // Construct URL for HashRouter
    const baseUrl = window.location.href.split('#')[0];
    const link = `${baseUrl}#/book?service=${encodeURIComponent(title)}`;
    
    navigator.clipboard.writeText(link).then(() => {
      addToast('Booking link copied to clipboard!');
    });
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto">
      <SEO title="Services" description="Explore my services: Custom Websites, Notion Systems, and AI Automations." />
      
      <FadeIn>
        <SectionHeader 
            title="Services & Consulting" 
            subtitle="Professional solutions tailored for ambitious creators and businesses."
        />
      </FadeIn>

      {/* Filter */}
      <FadeIn delay={100}>
        <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
            <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat 
                    ? 'bg-brand-600 text-white' 
                    : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
                }`}
            >
                {cat}
            </button>
            ))}
        </div>
      </FadeIn>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {filteredServices.map((service, index) => (
          <FadeIn key={service.id} delay={index * 100}>
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 flex flex-col hover:border-brand-500/30 transition-colors h-full">
                <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-brand-900/20 text-brand-400 rounded-xl border border-brand-500/20">
                    <service.icon size={32} />
                </div>
                <div className="text-right">
                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-1">Starting At</span>
                    <span className="text-xl font-bold text-white">{service.priceStart}</span>
                </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
                {service.description}
                </p>

                <div className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check size={16} className="text-brand-500 flex-shrink-0" />
                    <span>{feature}</span>
                    </div>
                ))}
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                <button 
                    onClick={() => setBookingService(service.title)}
                    className="block w-full text-center py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Book Service
                </button>
                <Link 
                    to={`/book?service=${encodeURIComponent(service.title)}`}
                    className="block w-full text-center py-3 bg-transparent border border-dark-border text-white font-bold rounded-lg hover:border-brand-500 hover:text-brand-400 transition-colors"
                >
                    Apply to work with me
                </Link>
                
                <button 
                    onClick={() => handleCopyLink(service.title)}
                    className="flex items-center justify-center gap-2 py-2 text-sm text-gray-500 hover:text-brand-400 transition-colors mt-1"
                >
                    <Copy size={16} />
                    <span className="font-medium">Copy Booking Link</span>
                </button>
                </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* FAQ Section */}
      <FadeIn>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
             <HelpCircle size={28} className="text-brand-400" />
             <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <Accordion items={FAQS} />
        </div>
      </FadeIn>

      <BookingModal 
        isOpen={!!bookingService} 
        onClose={() => setBookingService(null)} 
        initialService={bookingService || ''} 
      />
    </div>
  );
};

export default Services;
