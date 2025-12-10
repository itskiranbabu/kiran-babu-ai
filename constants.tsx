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
    { label: 'Copilot Suite', path: '/copilot' },
    { label: 'Repurposer', path: '/repurpose' },
    { label: 'Calendar', path: '/calendar' },
    { label: 'CRM', path: '/crm' },
    { label: 'Analytics', path: '/analytics' },
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
  // NEW SERVICES
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
  {
    id: 'p1',
    title: 'SaaS Business Hub',
    description: 'The complete Notion system to manage your SaaS operations and growth.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/crcrq',
    featured: true
  },
  {
    id: 'p2',
    title: 'Freelance Business Hub',
    description: 'Manage clients, projects, and invoices in one unified dashboard.',
    price: '$29',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/zkpdwi',
    featured: true
  },
  {
    id: 'p3',
    title: 'AI Prompt Power Pack',
    description: '100+ Pro Templates for ChatGPT, Claude & Midjourney.',
    price: '$49',
    type: ProductType.PROMPT_PACK,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/shlhrb',
    featured: true
  },
  {
    id: 'p4',
    title: 'Content Creator Dashboard',
    description: 'The ultimate planner for YouTube, TikTok & Instagram content.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/xxstk',
    featured: true
  },
  {
    id: 'p5',
    title: 'Social Media Content Planner',
    description: 'Streamline your content pipeline across all major platforms.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/ynnxj'
  },
  {
    id: 'p6',
    title: 'Ultimate Productivity Hub',
    description: 'Goal tracking, KPI dashboards, and daily task management.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/hquiq'
  },
  {
    id: 'p7',
    title: 'Real Estate Portfolio Manager',
    description: 'Track properties, tenants, and income with ease.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/dwicxr'
  },
  {
    id: 'p8',
    title: 'Wedding Planner System',
    description: 'A comprehensive event management system for your big day.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/tvpwgvp'
  },
  {
    id: 'p9',
    title: 'Personal Finance Tracker',
    description: 'Take control of your budget, expenses, and savings goals.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/haebsi'
  },
  {
    id: 'p10',
    title: 'Job Search & Career Tracker',
    description: 'Organize applications, interviews, and networking contacts.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/knvwn'
  },
  {
    id: 'p11',
    title: 'Meal Planning & Recipe Manager',
    description: 'Plan weekly meals and organize your favorite recipes.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/lcstdth'
  },
  {
    id: 'p12',
    title: 'Fitness & Wellness Planner',
    description: 'Track workouts, nutrition, and wellness habits.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/armdis'
  },
  {
    id: 'p13',
    title: 'Ultimate Productivity System',
    description: 'For comprehensive life and goal management.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/skjhz'
  },
  {
    id: 'p14',
    title: 'Student Success System',
    description: 'The essential tool for academic organization and grades.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/apvhdn'
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
  },
  // NEW CASE STUDIES
  {
    id: 'c4',
    client: 'E-commerce Brand',
    title: 'RevenuePilot Implementation',
    category: 'Growth',
    result: '+65% Revenue in 90 Days',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c5',
    client: 'Local Service Business',
    title: 'LocalLead Engine Deployment',
    category: 'Marketing',
    result: '150+ Qualified Leads/Month',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'
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
    role: 'Startup Founder',
    text: "The website redesign was flawless. It's fast, looks premium, and we've seen a 30% increase in demo bookings since launch.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't3',
    name: 'Marcus Johnson',
    role: 'Fitness Coach',
    text: "The AI prompt pack is a game changer. I used to spend hours on captions, now I generate a week's worth of content in 15 minutes.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

export const FAQS = [
  {
    question: "What platforms do you build websites on?",
    answer: "I specialize in modern, high-performance web development using Next.js and React. These technologies allow for blazing-fast speeds, SEO optimization, and completely custom designs that drag-and-drop builders like Wix or Squarespace can't match."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines vary by scope. A custom Notion system or simple landing page can be ready in 3-7 days. Full-scale websites and complex automation pipelines typically take 2-4 weeks. We'll agree on a strict timeline during our discovery call."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Absolutely. Every custom build comes with 30 days of complimentary support to ensure everything runs smoothly. I also offer monthly maintenance retainers for ongoing updates, content uploads, and system tweaks."
  },
  {
    question: "How does the Notion 'Second Brain' work?",
    answer: "The Second Brain system is designed to capture ideas, manage projects, and organize resources all in one place. It uses the PARA method (Projects, Areas, Resources, Archives) to ensure you never lose a thought and always know what to work on next."
  },
  {
    question: "Can you automate my specific workflow?",
    answer: "Yes. I use tools like Make.com (formerly Integromat) and Zapier to connect your favorite apps. Whether it's auto-posting to socials, syncing leads to your CRM, or generating contracts, if it has an API, I can likely automate it."
  },
  {
    question: "What is your refund policy for digital products?",
    answer: "Due to the digital nature of Notion templates and prompt packs, all sales are final. However, I provide comprehensive video walkthroughs and guides with every purchase to ensure you get maximum value from the product."
  }
];