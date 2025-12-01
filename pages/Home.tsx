
import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Quote, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { SERVICES, PRODUCTS, CASE_STUDIES, TESTIMONIALS } from '../constants';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { useToast } from '../components/ToastContext';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
        setIsSubscribing(false);
        setEmail('');
        addToast("Welcome to the Inner Circle! 🚀", "success");
    }, 1500);
  };

  return (
    <div className="space-y-20 pb-20">
      <SEO title="Home" description="AI Creator, Prompt Engineer & Systems Builder for Creators and Solo Businesses." />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-16 px-4">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/30 border border-brand-500/30 text-brand-300 text-sm font-medium mb-8">
              <Sparkles size={14} />
              <span>Powering the Next Generation of Creators</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500">Digital Empire</span>
              <br /> With AI Systems.
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              I help creators and solopreneurs build high-converting websites, automate their workflows, and scale their content with AI.
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/book" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2"
              >
                Work With Me <ArrowRight size={18} />
              </Link>
              <Link 
                to="/products"
                className="w-full sm:w-auto px-8 py-4 bg-dark-card hover:bg-dark-border border border-dark-border text-white font-semibold rounded-xl transition-all"
              >
                Shop Templates
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Brands Strip */}
      <section className="border-y border-dark-border bg-dark-card/30 py-10">
        <FadeIn direction="none">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500">
                <span className="text-xl font-bold text-white tracking-tighter">@itskiranbabu</span>
                <span className="text-xl font-bold text-white tracking-tighter">@itskeyrun.ai</span>
                <span className="text-xl font-bold text-white tracking-tighter">@itscontentspark</span>
                <div className="hidden md:block w-px h-8 bg-dark-border" />
                <span className="text-sm font-medium text-brand-400 uppercase tracking-widest bg-brand-900/20 px-3 py-1 rounded border border-brand-500/20">Trusted by 50+ Creators</span>
            </div>
        </FadeIn>
      </section>

      {/* Services Preview */}
      <section className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <SectionHeader 
            title="How I Can Help You" 
            subtitle="From building your digital home to automating your daily grind."
            center
          />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <FadeIn key={service.id} delay={index * 100}>
              <div className="bg-dark-card border border-dark-border p-6 rounded-2xl hover:border-brand-500/50 transition-colors group h-full">
                <div className="w-12 h-12 bg-dark-bg rounded-lg border border-dark-border flex items-center justify-center text-brand-400 mb-4 group-hover:scale-110 transition-transform">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                <Link to="/services" className="text-brand-400 text-sm font-medium hover:text-brand-300 flex items-center gap-1 mt-auto">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Digital Products</h2>
              <p className="text-gray-400">Steal my systems and prompts.</p>
            </div>
            <Link to="/products" className="hidden md:flex text-brand-400 hover:text-brand-300 items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.filter(p => p.featured).slice(0, 3).map((product, index) => (
            <FadeIn key={product.id} delay={index * 100}>
              <div className="group bg-dark-card rounded-2xl overflow-hidden border border-dark-border hover:border-brand-500/50 transition-all h-full flex flex-col">
                <div className="h-48 overflow-hidden relative flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-xs font-semibold px-2 py-1 rounded text-white border border-white/10">
                    {product.type}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-white">{product.price}</span>
                    <a 
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="text-brand-400 font-medium">View All Products</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-dark-card/50 border-y border-dark-border py-20">
        <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
                <SectionHeader 
                    title="Client Love" 
                    subtitle="Don't just take my word for it. Here is what others are saying." 
                    center 
                />
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((testi, i) => (
                    <FadeIn key={testi.id} delay={i * 100}>
                        <div className="bg-dark-bg border border-dark-border p-6 rounded-2xl relative">
                            <Quote className="text-brand-900 absolute top-4 right-4" size={40} />
                            <p className="text-gray-300 mb-6 relative z-10 leading-relaxed">"{testi.text}"</p>
                            <div className="flex items-center gap-4">
                                <img src={testi.avatar} alt={testi.name} className="w-10 h-10 rounded-full border border-dark-border" />
                                <div>
                                    <h4 className="text-white font-bold text-sm">{testi.name}</h4>
                                    <span className="text-brand-400 text-xs font-medium">{testi.role}</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* Social Proof / Case Studies */}
      <section className="max-w-7xl mx-auto px-4 pt-20">
            <FadeIn>
               <SectionHeader title="Recent Work" subtitle="Real results for real creators." center />
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {CASE_STUDIES.map((cs, index) => (
                    <FadeIn key={cs.id} delay={index * 100}>
                        <div className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer border border-dark-border hover:border-brand-500/30 transition-colors">
                            <img src={cs.image} alt={cs.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-brand-400 text-xs font-bold uppercase tracking-wider mb-1 block">{cs.category}</span>
                                    <h3 className="text-xl font-bold text-white mb-1">{cs.client}</h3>
                                    <p className="text-gray-300 text-sm">{cs.title}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2 text-white font-semibold bg-white/10 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-sm">
                                            <CheckCircle size={14} className="text-green-400" /> {cs.result}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
            
            <div className="mt-10 text-center">
                 <Link to="/portfolio" className="inline-flex items-center gap-2 text-brand-400 hover:text-white transition-colors font-medium">
                    View Full Portfolio <ArrowRight size={16} />
                 </Link>
            </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="max-w-4xl mx-auto px-4 text-center pb-10 pt-20">
        <FadeIn>
            <div className="bg-gradient-to-br from-brand-900/50 to-dark-card border border-brand-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-brand-300">
                        <Mail size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the Inner Circle</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
                        Get free prompt packs, automation tips, and system templates delivered to your inbox weekly.
                    </p>
                    
                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                        <input 
                            type="email" 
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-grow bg-dark-bg/50 border border-brand-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400 focus:bg-dark-bg transition-colors"
                        />
                        <button 
                            type="submit" 
                            disabled={isSubscribing}
                            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSubscribing ? <Loader2 className="animate-spin" size={18} /> : "Subscribe Free"}
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-4">No spam. Unsubscribe anytime.</p>
                </div>
            </div>
        </FadeIn>
      </section>

    </div>
  );
};

export default Home;
