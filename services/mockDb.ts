
import { Product } from '../types';

// Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  status: 'New Lead' | 'Qualified' | 'Proposal Sent' | 'Closed Won';
  value: string;
  source: string;
  createdAt: number;
}

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
};

// Database Service
export const mockDb = {
  // Leads
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

  // Funnels
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

  // Analytics
  getAnalytics: (): AnalyticsData => {
    const stored = localStorage.getItem('kb_analytics');
    if (!stored) {
      localStorage.setItem('kb_analytics', JSON.stringify(INITIAL_ANALYTICS));
      return INITIAL_ANALYTICS;
    }
    return JSON.parse(stored);
  }
};
