import { Lead, Workflow, WorkflowStep, WorkflowRun, StepRun, CopilotPlan } from '../types';

// Extended Types for existing mock usage
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
  date: string;
  title: string;
  platform: string;
  status: 'Idea' | 'Scheduled' | 'Published';
}

export interface Campaign {
  id: string;
  name: string;
  summary: string;
  plan: any;
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

// Mock Database Service
export const mockDb = {
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

  // --- Workflows ---
  getWorkflows: (): Workflow[] => {
    const stored = localStorage.getItem('kb_workflows');
    return stored ? JSON.parse(stored) : [];
  },

  getWorkflowById: (id: string): Workflow | undefined => {
    const workflows = mockDb.getWorkflows();
    return workflows.find(w => w.id === id);
  },

  createWorkflowFromPlan: (name: string, plan: CopilotPlan): Workflow => {
    const workflows = mockDb.getWorkflows();
    const workflowId = Math.random().toString(36).substr(2, 9);
    
    const steps: WorkflowStep[] = plan.steps.map((step, index) => ({
      id: Math.random().toString(36).substr(2, 9),
      workflowId,
      order: index,
      type: step.type,
      title: step.title,
      description: step.description,
      config: {
        promptTemplate: step.prompt,
        platform: 'email', 
        delaySeconds: 2
      }
    }));

    const newWorkflow: Workflow = {
      id: workflowId,
      name,
      description: plan.summary,
      status: 'active',
      type: 'custom',
      createdAt: Date.now(),
      steps
    };

    workflows.push(newWorkflow);
    localStorage.setItem('kb_workflows', JSON.stringify(workflows));
    return newWorkflow;
  },

  updateWorkflow: (id: string, updates: Partial<Workflow>) => {
      const workflows = mockDb.getWorkflows();
      const index = workflows.findIndex(w => w.id === id);
      if (index !== -1) {
          workflows[index] = { ...workflows[index], ...updates };
          localStorage.setItem('kb_workflows', JSON.stringify(workflows));
      }
  },

  // --- Runs ---
  createRun: (workflowId: string): WorkflowRun => {
    let runs = mockDb.getRuns();
    const workflow = mockDb.getWorkflowById(workflowId);
    
    if (!workflow) throw new Error("Workflow not found");

    const runId = Math.random().toString(36).substr(2, 9);
    const stepRuns: StepRun[] = workflow.steps.map(step => ({
      id: Math.random().toString(36).substr(2, 9),
      runId,
      stepId: step.id,
      status: 'pending'
    }));

    const newRun: WorkflowRun = {
      id: runId,
      workflowId,
      status: 'running',
      startedAt: Date.now(),
      stepRuns
    };

    runs.push(newRun);
    localStorage.setItem('kb_runs', JSON.stringify(runs));
    return newRun;
  },

  getRuns: (): WorkflowRun[] => {
    const stored = localStorage.getItem('kb_runs');
    return stored ? JSON.parse(stored) : [];
  },

  getRunById: (id: string): WorkflowRun | undefined => {
    const runs = mockDb.getRuns();
    return runs.find(r => r.id === id);
  },

  updateRun: (id: string, updates: Partial<WorkflowRun>) => {
    const runs = mockDb.getRuns();
    const index = runs.findIndex(r => r.id === id);
    if (index !== -1) {
        runs[index] = { ...runs[index], ...updates };
        localStorage.setItem('kb_runs', JSON.stringify(runs));
    }
  },

  updateStepRun: (runId: string, stepId: string, updates: Partial<StepRun>) => {
    const runs = mockDb.getRuns();
    const runIndex = runs.findIndex(r => r.id === runId);
    if (runIndex !== -1) {
      const stepIndex = runs[runIndex].stepRuns.findIndex(s => s.stepId === stepId);
      if (stepIndex !== -1) {
        runs[runIndex].stepRuns[stepIndex] = { ...runs[runIndex].stepRuns[stepIndex], ...updates };
        localStorage.setItem('kb_runs', JSON.stringify(runs));
      }
    }
  },

  // --- Other Existing Methods ---
  getOnboarding: (): OnboardingData | null => {
    const stored = localStorage.getItem('kb_onboarding');
    return stored ? JSON.parse(stored) : null;
  },
  saveOnboarding: (data: OnboardingData) => {
    localStorage.setItem('kb_onboarding', JSON.stringify(data));
  },
  getFunnels: (): Funnel[] => {
    const stored = localStorage.getItem('kb_funnels');
    return stored ? JSON.parse(stored) : [];
  },
  addFunnel: (funnel: Omit<Funnel, 'id' | 'createdAt'>): Funnel => {
    const funnels = mockDb.getFunnels();
    const newFunnel = { ...funnel, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
    funnels.push(newFunnel);
    localStorage.setItem('kb_funnels', JSON.stringify(funnels));
    return newFunnel;
  },
  getCampaigns: (): Campaign[] => {
    const stored = localStorage.getItem('kb_campaigns');
    return stored ? JSON.parse(stored) : [];
  },
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>): Campaign => {
    const list = mockDb.getCampaigns();
    const newItem = { ...campaign, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
    list.push(newItem);
    localStorage.setItem('kb_campaigns', JSON.stringify(list));
    mockDb.logEvent('campaign_created');
    return newItem;
  },
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