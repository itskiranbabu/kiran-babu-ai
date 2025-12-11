import { 
  Cpu, 
  Layout, 
  Video, 
  Zap, 
  BookOpen, 
  Users, 
  Monitor, 
  Database,
  TrendingUp,
  MapPin,
  Search,
  Share2,
  Mail,
  Palette
} from 'lucide-react';
import { Brand, ProductType, Service, Product, CaseStudy } from './types';

export const APP_NAME = "KeySpark AI";
export const APP_TAGLINE = "The Creator OS — by Kiran Babu";

export const NAVIGATION_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Store', path: '/products' },
  { label: 'Playground', path: '/playground' },
  { label: 'Portfolio', path: '/portfolio' },
];

export const SAAS_LINKS = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'AI Assistant', path: '/ai-assistant' },
    { label: 'Copilot Suite', path: '/copilot' },
    { label: 'Repurposer', path: '/repurpose' },
    { label: 'Calendar', path: '/calendar' },
    { label: 'CRM', path: '/crm' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Advanced Analytics', path: '/advanced-analytics' },
    { label: 'Funnels', path: '/funnels' },
    { label: 'Templates', path: '/templates' },
];

// Active Discount Codes
export const DISCOUNT_CODES: Record<string, number> = {
  'SAVE20': 0.20, // 20% off
  'WELCOME': 0.10, // 10% off
  'PRO50': 0.50,  // 50% off
};

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Custom High-Convert Websites',
    description: 'Modern, mobile-first websites designed to convert visitors into clients.',
    priceStart: '$1,500',
    features: ['Next.js / React Tech Stack', 'SEO Optimization', 'CMS Integration', 'Mobile Responsive'],
    icon: Monitor,
    category: 'Development'
  },
  {
    id: 's2',
    title: 'Notion Operating Systems',
    description: 'Centralize your life and business with a custom Notion workspace.',
    priceStart: '$800',
    features: ['Content OS', 'CRM & Client Portal', 'Second Brain Setup', 'Team Training'],
    icon: Database,
    category: 'Systems'
  },
  {
    id: 's3',
    title: 'AI Automation Pipelines',
    description: 'Remove manual work with Make.com and Zapier automations.',
    priceStart: '$1,200',
    features: ['Lead Capture Automation', 'Content Repurposing', 'Client Onboarding', 'Email Sequences'],
    icon: Zap,
    category: 'Systems'
  },
  {
    id: 's4',
    title: 'Cinematic AI Content',
    description: 'High-end short-form video production for personal brands.',
    priceStart: '$2,000 / mo',
    features: ['Scripting & Hooks', 'AI Visuals & Editing', 'Sound Design', 'Trend Analysis'],
    icon: Video,
    category: 'Content'
  },
  {
    id: 's5',
    title: 'RevenuePilot - Revenue Optimization',
    description: 'AI-powered revenue optimization platform to maximize your business growth and profitability.',
    priceStart: '$999 / mo',
    features: ['Revenue Analytics', 'Pricing Optimization', 'Conversion Tracking', 'Growth Forecasting'],
    icon: TrendingUp,
    category: 'Growth',
    url: 'https://revenue-pilot-mkme0tsjf-babukiranb-3308s-projects.vercel.app/'
  },
  {
    id: 's6',
    title: 'LocalLead Engine - Lead Generation',
    description: 'Automated local lead generation system to fill your pipeline with qualified prospects.',
    priceStart: '$799 / mo',
    features: ['Local SEO Optimization', 'Lead Capture Forms', 'CRM Integration', 'Automated Follow-ups'],
    icon: MapPin,
    category: 'Marketing',
    url: 'https://local-lead-engine.vercel.app/'
  },
  {
    id: 's7',
    title: 'SEO Optimization Service',
    description: 'Comprehensive SEO strategy to dominate search rankings and drive organic traffic.',
    priceStart: '$1,500 / mo',
    features: ['Technical SEO Audit', 'Keyword Research', 'Content Optimization', 'Link Building Strategy'],
    icon: Search,
    category: 'Marketing'
  },
  {
    id: 's8',
    title: 'Social Media Management',
    description: 'Full-service social media management to build your brand and engage your audience.',
    priceStart: '$1,200 / mo',
    features: ['Content Calendar Creation', 'Post Scheduling', 'Engagement Tracking', 'Analytics Reporting'],
    icon: Share2,
    category: 'Marketing'
  },
  {
    id: 's9',
    title: 'Email Marketing Automation',
    description: 'Strategic email campaigns that nurture leads and drive conversions on autopilot.',
    priceStart: '$899 / mo',
    features: ['Campaign Setup', 'List Segmentation', 'A/B Testing', 'Performance Tracking'],
    icon: Mail,
    category: 'Marketing'
  },
  {
    id: 's10',
    title: 'Brand Identity Design',
    description: 'Professional brand identity that makes you stand out and attracts your ideal clients.',
    priceStart: '$2,500',
    features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Social Media Assets'],
    icon: Palette,
    category: 'Design'
  }
];

export const PRODUCTS: Product[] = [
  // NEW PRODUCTS - Featured
  {
    id: 'p1',
    title: 'Creator Revenue HQ',
    description: 'Digital Product Business OS - Complete system to manage and scale your digital product empire.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/uwjgas',
    featured: true
  },
  {
    id: 'p2',
    title: 'Habit Stacker Pro',
    description: '90-Day Challenge - Transform your life with proven habit-building frameworks and daily tracking.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/lekonw',
    featured: true
  },
  {
    id: 'p3',
    title: 'Affiliate Marketing Tracker',
    description: 'Complete dashboard to track campaigns, commissions, and optimize your affiliate revenue streams.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/eilcwh',
    featured: true
  },
  
  // EXISTING PRODUCTS - Updated Pricing
  {
    id: 'p4',
    title: 'SaaS Business Hub',
    description: 'Complete Notion Template for Digital Product Creators | 15+ Components for SaaS operations.',
    price: '$29',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/crcrq',
    featured: true
  },
  {
    id: 'p5',
    title: 'Freelance Business Hub',
    description: 'Notion Template for Client & Project Management - Manage clients, projects, and invoices seamlessly.',
    price: '$28+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/zkpdwi',
    featured: true
  },
  {
    id: 'p6',
    title: 'Real Estate Portfolio Manager',
    description: 'Professional Notion Template | Property Tracking & Investment Analysis for real estate investors.',
    price: '$27+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/dwicxr'
  },
  {
    id: 'p7',
    title: 'Ultimate Productivity System',
    description: 'Notion Template for Life & Goal Management - Comprehensive system for peak productivity.',
    price: '$26+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/skjhz'
  },
  {
    id: 'p8',
    title: 'Content Creator Dashboard',
    description: 'Notion Template for YouTube, TikTok & Instagram - Ultimate planner for content creators.',
    price: '$24+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/xxstk'
  },
  {
    id: 'p9',
    title: 'Social Media Content Planner',
    description: 'Notion Template for Instagram, TikTok, YouTube & More - Streamline your content pipeline.',
    price: '$24+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/ynnxj'
  },
  {
    id: 'p10',
    title: 'Personal Finance Tracker',
    description: 'Complete Notion Template | Budget Planning & Expense Management - Take control of your finances.',
    price: '$22+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/haebsi'
  },
  {
    id: 'p11',
    title: 'Fitness & Wellness Planner',
    description: 'Notion Template - Track workouts, nutrition, and wellness habits for optimal health.',
    price: '$21+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/armdis'
  },
  {
    id: 'p12',
    title: 'Meal Planning & Recipe Manager',
    description: 'Notion Template - Plan weekly meals and organize your favorite recipes effortlessly.',
    price: '$19+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/lcstdth'
  },
  {
    id: 'p13',
    title: 'Wedding Planner System',
    description: 'Complete Notion Template | Comprehensive Event Organization for your perfect wedding day.',
    price: '$18+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/tvpwgvp'
  },
  {
    id: 'p14',
    title: 'AI Prompt Power Pack',
    description: '100+ Pro Templates for ChatGPT, Claude & Midjourney - Unlock AI productivity.',
    price: '$17+',
    type: ProductType.PROMPT_PACK,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/shlhrb'
  },
  {
    id: 'p15',
    title: 'Job Search & Career Tracker',
    description: 'Notion Template - Organize applications, interviews, and networking contacts efficiently.',
    price: '$16+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/knvwn'
  },
  {
    id: 'p16',
    title: 'Student Success System',
    description: 'Notion Template for Academic Organization - Essential tool for academic excellence.',
    price: '$15+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/apvhdn'
  },
  {
    id: 'p17',
    title: 'Ultimate Productivity Hub',
    description: 'Notion Template for Goal Tracking & KPI Dashboard - Master your productivity game.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/hquiq'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'c1',
    client: 'Coach Sarah',
    title: 'Automated Lead Gen System',
    category: 'Automation',
    result: '+40% Leads / Month',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c2',
    client: 'TechFlow Agency',
    title: 'Rebranding & Website Overhaul',
    category: 'Web Design',
    result: '2x Conversion Rate',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c3',
    client: 'Creator Mark',
    title: 'Short-Form Content Strategy',
    category: 'Content',
    result: '100k Views in 30 Days',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Alex Rivera',
    role: 'Digital Creator',
    text: "KeySpark AI's Notion system completely saved my sanity. I went from scattered notes to a fully automated content machine. Worth every penny.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't2',
    name: 'Sarah Chen',
    role: 'SaaS Founder',
    text: 'The workflow automation is a game-changer. What used to take me 3 hours now happens in 10 minutes. My team loves it.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't3',
    name: 'Marcus Johnson',
    role: 'Freelance Designer',
    text: 'Best investment I made this year. The CRM alone has helped me close 3x more deals. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

export const BRANDS: Brand[] = [
  Brand.PERSONAL,
  Brand.PRODUCT,
  Brand.COMMUNITY
];

export const FAQ_ITEMS = [
  {
    question: 'What is KeySpark AI?',
    answer: 'KeySpark AI is an all-in-one Creator OS that combines AI-powered content repurposing, workflow automation, CRM, analytics, and productivity tools to help creators and entrepreneurs scale their digital businesses.'
  },
  {
    question: 'How does the AI content repurposing work?',
    answer: 'Our AI analyzes your content and transforms it into platform-specific formats (Instagram Reels, LinkedIn posts, Twitter threads, YouTube Shorts) while maintaining your brand voice and optimizing for engagement.'
  },
  {
    question: 'Can I try it before purchasing?',
    answer: 'Yes! We offer a free tier with limited features so you can experience the platform. You can upgrade anytime to unlock unlimited access.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure Razorpay payment gateway.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 7-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us for a full refund.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption, secure authentication via Supabase, and follow best practices for data protection. Your data is never shared with third parties.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time from your dashboard. You\'ll retain access until the end of your billing period.'
  },
  {
    question: 'Do you provide customer support?',
    answer: 'Yes! We offer email support for all users, with priority support for paid subscribers. Enterprise customers get dedicated account managers.'
  }
];

// Export alias for backward compatibility
export const FAQS = FAQ_ITEMS;
