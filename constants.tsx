
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

export const APP_NAME = "Kiran Babu";
export const APP_TAGLINE = "AI Creator, Prompt Engineer & Systems Builder";

export const NAVIGATION_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Store', path: '/products' },
  { label: 'Playground', path: '/playground' },
  { label: 'Portfolio', path: '/portfolio' },
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
    image: 'https://picsum.photos/400/300?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/crcrq',
    featured: true
  },
  {
    id: 'p2',
    title: 'Freelance Business Hub',
    description: 'Manage clients, projects, and invoices in one unified dashboard.',
    price: '$29',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/310?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/zkpdwi',
    featured: true
  },
  {
    id: 'p3',
    title: 'AI Prompt Power Pack',
    description: '100+ Pro Templates for ChatGPT, Claude & Midjourney.',
    price: '$49',
    type: ProductType.PROMPT_PACK,
    image: 'https://picsum.photos/400/307?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/shlhrb',
    featured: true
  },
  {
    id: 'p4',
    title: 'Content Creator Dashboard',
    description: 'The ultimate planner for YouTube, TikTok & Instagram content.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/312?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/xxstk',
    featured: true
  },
  {
    id: 'p5',
    title: 'Social Media Content Planner',
    description: 'Streamline your content pipeline across all major platforms.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/311?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/ynnxj'
  },
  {
    id: 'p6',
    title: 'Ultimate Productivity Hub',
    description: 'Goal tracking, KPI dashboards, and daily task management.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/313?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/hquiq'
  },
  {
    id: 'p7',
    title: 'Real Estate Portfolio Manager',
    description: 'Track properties, tenants, and income with ease.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/301?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/dwicxr'
  },
  {
    id: 'p8',
    title: 'Wedding Planner System',
    description: 'A comprehensive event management system for your big day.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/302?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/tvpwgvp'
  },
  {
    id: 'p9',
    title: 'Personal Finance Tracker',
    description: 'Take control of your budget, expenses, and savings goals.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/303?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/haebsi'
  },
  {
    id: 'p10',
    title: 'Job Search & Career Tracker',
    description: 'Organize applications, interviews, and networking contacts.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/304?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/knvwn'
  },
  {
    id: 'p11',
    title: 'Meal Planning & Recipe Manager',
    description: 'Plan weekly meals and organize your favorite recipes.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/305?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/lcstdth'
  },
  {
    id: 'p12',
    title: 'Fitness & Wellness Planner',
    description: 'Track workouts, nutrition, and wellness habits.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/306?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/armdis'
  },
  {
    id: 'p13',
    title: 'Ultimate Productivity System',
    description: 'For comprehensive life and goal management.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/308?grayscale',
    url: 'https://kiranbabuai.gumroad.com/l/skjhz'
  },
  {
    id: 'p14',
    title: 'Student Success System',
    description: 'The essential tool for academic organization and grades.',
    price: '$0+',
    type: ProductType.NOTION_TEMPLATE,
    image: 'https://picsum.photos/400/309?grayscale',
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
    image: 'https://picsum.photos/600/400?grayscale&blur=2'
  },
  {
    id: 'c2',
    client: 'TechFlow Agency',
    title: 'Rebranding & Website Overhaul',
    category: 'Web Design',
    result: '2x Conversion Rate',
    image: 'https://picsum.photos/600/401?grayscale&blur=2'
  },
  {
    id: 'c3',
    client: 'Creator Mark',
    title: 'Short-Form Content Strategy',
    category: 'Content',
    result: '100k Views in 30 Days',
    image: 'https://picsum.photos/600/402?grayscale&blur=2'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Alex Rivera',
    role: 'Digital Creator',
    text: "Kiran's Notion system completely saved my sanity. I went from scattered notes to a fully automated content machine. Worth every penny.",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    id: 't2',
    name: 'Sarah Chen',
    role: 'Startup Founder',
    text: "The website redesign was flawless. It's fast, looks premium, and we've seen a 30% increase in demo bookings since launch.",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    id: 't3',
    name: 'Marcus Johnson',
    role: 'Fitness Coach',
    text: "The AI prompt pack is a game changer. I used to spend hours on captions, now I generate a week's worth of content in 15 minutes.",
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d'
  }
];

export const FAQS = [
  {
    question: "What platforms do you build websites on?",
    answer: "I primarily specialize in Next.js and React for high-performance, custom web applications. However, I can also build on Framer or Webflow depending on your specific needs and budget."
  },
  {
    question: "Do you offer ongoing support for Notion systems?",
    answer: "Yes! All custom Notion builds come with a 30-day support window. I also offer a 'System Maintenance' retainer for teams that need regular updates and training."
  },
  {
    question: "How long does a typical project take?",
    answer: "Notion systems usually take 1-2 weeks. Custom websites range from 2-4 weeks depending on complexity. Automations can often be set up in a few days."
  },
  {
    question: "Do you offer refunds on digital products?",
    answer: "Due to the digital nature of Notion templates and prompt packs, I cannot offer refunds once the files have been downloaded. However, I'm happy to help you get set up if you have issues."
  }
];
