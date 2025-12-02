
import { Lead, Product } from '../types';

// Extended Types
export interface OnboardingData {
  completed: boolean;
  type: string;
  platforms: string[];
  revenueRange: string;
  goal: string;
  plan?: string;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  platform: string;
  status: 'Idea' | 'Scheduled' | 'Published';
}

export interface Campaign {
  id: string;
  name: string;
  summary: string;
  plan: any; // JSON structure
  createdAt: number;
}

export { Lead }; 
// Re-exporting Lead type from previous file if it was defined there, 
// otherwise defining here for safety based on previous context.
export interface Funnel {
  id: string;
  name: string;
  niche: string;
  goal: string;
  steps: string[];
  createdAt: number;
}

export interface AnalyticsData {
  visitors: number;
  pageViews: number;
  conversions: number;
  revenue: number;
  aiGenerations: number;
  campaignsCreated: number;
}

// Initial Data
const INITIAL_LEADS: Lead[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'New Lead', value: '$2,500', source: 'Website', createdAt: Date.now() },
  { id: '2', name: 'Alice Smith', email: 'alice@agency.com', status: 'Qualified', value: '$5,000', source: 'LinkedIn', createdAt: Date.now() },
];

const INITIAL_ANALYTICS: AnalyticsData = {
  visitors: 1240,
  pageViews: 4500,
  conversions: 35,
  revenue: 12500,
  aiGenerations: 12,
  campaignsCreated: 2
};

// Database Service
export const mockDb = {
  // --- User / Onboarding ---
  getOnboarding: (): OnboardingData | null => {
    const stored = localStorage.getItem('kb_onboarding');
    return stored ? JSON.parse(stored) : null;
  },
  
  saveOnboarding: (data: OnboardingData) => {
    localStorage.setItem('kb_onboarding', JSON.stringify(data));
  },

  // --- Leads ---
  getLeads: (): Lead[] => {
    const stored = localStorage.getItem('kb_leads');
    if (!stored) {
      localStorage.setItem('kb_leads', JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(stored);
  },

  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>): Lead => {
    const leads = mockDb.getLeads();
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    leads.push(newLead);
    localStorage.setItem('kb_leads', JSON.stringify(leads));
    return newLead;
  },

  updateLead: (id: string, updates: Partial<Lead>): Lead | null => {
    const leads = mockDb.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return null;
    
    leads[index] = { ...leads[index], ...updates };
    localStorage.setItem('kb_leads', JSON.stringify(leads));
    return leads[index];
  },

  deleteLead: (id: string): void => {
    const leads = mockDb.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem('kb_leads', JSON.stringify(filtered));
  },

  // --- Funnels ---
  getFunnels: (): Funnel[] => {
    const stored = localStorage.getItem('kb_funnels');
    return stored ? JSON.parse(stored) : [];
  },

  addFunnel: (funnel: Omit<Funnel, 'id' | 'createdAt'>): Funnel => {
    const funnels = mockDb.getFunnels();
    const newFunnel: Funnel = {
      ...funnel,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    funnels.push(newFunnel);
    localStorage.setItem('kb_funnels', JSON.stringify(funnels));
    return newFunnel;
  },

  // --- Campaigns (Copilot) ---
  getCampaigns: (): Campaign[] => {
    const stored = localStorage.getItem('kb_campaigns');
    return stored ? JSON.parse(stored) : [];
  },

  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>): Campaign => {
    const list = mockDb.getCampaigns();
    const newItem: Campaign = {
      ...campaign,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    list.push(newItem);
    localStorage.setItem('kb_campaigns', JSON.stringify(list));
    mockDb.logEvent('campaign_created');
    return newItem;
  },

  // --- Calendar ---
  getEvents: (): CalendarEvent[] => {
    const stored = localStorage.getItem('kb_events');
    return stored ? JSON.parse(stored) : [];
  },

  addEvent: (evt: Omit<CalendarEvent, 'id'>): CalendarEvent => {
    const list = mockDb.getEvents();
    const newItem = { ...evt, id: Math.random().toString(36).substr(2, 9) };
    list.push(newItem);
    localStorage.setItem('kb_events', JSON.stringify(list));
    return newItem;
  },

  // --- Analytics & Logging ---
  getAnalytics: (): AnalyticsData => {
    const stored = localStorage.getItem('kb_analytics');
    if (!stored) {
      localStorage.setItem('kb_analytics', JSON.stringify(INITIAL_ANALYTICS));
      return INITIAL_ANALYTICS;
    }
    return JSON.parse(stored);
  },

  logEvent: (type: 'generation' | 'campaign_created' | 'conversion') => {
    const data = mockDb.getAnalytics();
    if (type === 'generation') data.aiGenerations += 1;
    if (type === 'campaign_created') data.campaignsCreated += 1;
    if (type === 'conversion') data.conversions += 1;
    localStorage.setItem('kb_analytics', JSON.stringify(data));
  },
  
  // User Stats (Ideas generated)
  getUserStats: () => {
    const stored = localStorage.getItem('kb_user_stats');
    return stored ? JSON.parse(stored) : { ideasGenerated: 0, savedPrompts: 0 };
  },

  incrementUserStat: (stat: 'ideasGenerated' | 'savedPrompts') => {
    const stats = mockDb.getUserStats();
    stats[stat] = (stats[stat] || 0) + 1;
    localStorage.setItem('kb_user_stats', JSON.stringify(stats));
    mockDb.logEvent('generation');
  }
};
