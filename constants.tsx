import { 
  Cpu, 
  Layout, 
  Video, 
  Zap, 
  BookOpen, 
  Users, 
  Monitor, 
  Database 
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
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'SaaS Business Hub',
    description: 'The complete Notion system to manage your SaaS operations and growth.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/crcrq',
    featured: true
  },
  {
    id: 'p2',
    title: 'Freelance Business Hub',
    description: 'Manage clients, projects, and invoices in one unified dashboard.',
    price: '$29',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1499750310159-52f0f83ad497?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/zkpdwi',
    featured: true
  },
  {
    id: 'p3',
    title: 'AI Prompt Power Pack',
    description: '100+ Pro Templates for ChatGPT, Claude & Midjourney.',
    price: '$49',
    type: ProductType.PROMPT_PACK,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/shlhrb',
    featured: true
  },
  {
    id: 'p4',
    title: 'Content Creator Dashboard',
    description: 'The ultimate planner for YouTube, TikTok & Instagram content.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/xxstk',
    featured: true
  },
  {
    id: 'p5',
    title: 'Social Media Content Planner',
    description: 'Streamline your content pipeline across all major platforms.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/tvpwgvp'
  },
  {
    id: 'p9',
    title: 'Personal Finance Tracker',
    description: 'Take control of your budget, expenses, and savings goals.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/haebsi'
  },
  {
    id: 'p10',
    title: 'Job Search & Career Tracker',
    description: 'Organize applications, interviews, and networking contacts.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/armdis'
  },
  {
    id: 'p13',
    title: 'Ultimate Productivity System',
    description: 'For comprehensive life and goal management.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
    url: 'https://kiranbabuai.gumroad.com/l/skjhz'
  },
  {
    id: 'p14',
    title: 'Student Success System',
    description: 'The essential tool for academic organization and grades.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c3',
    client: 'Creator Mark',
    title: 'Short-Form Content Strategy',
    category: 'Content',
    result: '100k Views in 30 Days',
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Alex Rivera',
    role: 'Digital Creator',
    text: "KeySpark AI's Notion system completely saved my sanity. I went from scattered notes to a fully automated content machine. Worth every penny.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't2',
    name: 'Sarah Chen',
    role: 'Startup Founder',
    text: "The website redesign was flawless. It's fast, looks premium, and we've seen a 30% increase in demo bookings since launch.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
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
    answer: "Next.js and React."
  }
];