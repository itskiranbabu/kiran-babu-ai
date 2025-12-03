import { Lead, Workflow, WorkflowStep, WorkflowRun, StepRun, CopilotPlan } from '../types';
import { createClient } from '@supabase/supabase-js';
import { getEnv } from '../utils/env';

// --- Types ---
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

// --- Supabase Client ---
const supabaseUrl = getEnv('VITE_SUPABASE_URL') || getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

if (!supabase) {
  console.warn("Supabase credentials missing or invalid. Running in LocalStorage Demo Mode.");
}

// --- Initial Mock Data (Fallback) ---
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

// --- Helper Functions ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- ASYNC DATABASE SERVICE ---
export const mockDb = {
  // --- Leads ---
  getLeads: async (): Promise<Lead[]> => {
    if (supabase) {
        const { data } = await supabase.from('leads').select('*');
        return data ? data.map(d => ({ ...d, createdAt: new Date(d.created_at).getTime() })) : [];
    }
    const stored = localStorage.getItem('kb_leads');
    if (!stored) {
      localStorage.setItem('kb_leads', JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(stored);
  },
  
  addLead: async (lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> => {
    if (supabase) {
        const { data } = await supabase.from('leads').insert([{
            name: lead.name,
            email: lead.email,
            status: lead.status,
            value: lead.value,
            source: lead.source,
            created_at: new Date().toISOString()
        }]).select();
        if (data && data[0]) return { ...data[0], createdAt: new Date(data[0].created_at).getTime() };
    }

    const leads = JSON.parse(localStorage.getItem('kb_leads') || JSON.stringify(INITIAL_LEADS));
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    leads.push(newLead);
    localStorage.setItem('kb_leads', JSON.stringify(leads));
    return newLead;
  },

  updateLead: async (id: string, updates: Partial<Lead>): Promise<Lead | null> => {
    if (supabase) {
       await supabase.from('leads').update(updates).eq('id', id);
       return null; // Simplified return
    }
    const leads = await mockDb.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return null;
    leads[index] = { ...leads[index], ...updates };
    localStorage.setItem('kb_leads', JSON.stringify(leads));
    return leads[index];
  },

  deleteLead: async (id: string): Promise<void> => {
    if (supabase) {
        await supabase.from('leads').delete().eq('id', id);
        return;
    }
    const leads = await mockDb.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem('kb_leads', JSON.stringify(filtered));
  },

  // --- Workflows ---
  getWorkflows: async (): Promise<Workflow[]> => {
    if (supabase) {
        const { data } = await supabase.from('workflows').select(`
            *,
            steps:workflow_steps(*)
        `);
        return data ? data.map(w => ({
            id: w.id,
            name: w.name,
            description: w.description,
            status: w.status,
            type: w.type,
            createdAt: new Date(w.created_at).getTime(),
            steps: w.steps.sort((a:any,b:any) => a.step_order - b.step_order).map((s:any) => ({
                id: s.id,
                workflowId: s.workflow_id,
                order: s.step_order,
                type: s.type,
                title: s.title,
                description: s.description,
                config: s.config
            }))
        })) : [];
    }
    const stored = localStorage.getItem('kb_workflows');
    return stored ? JSON.parse(stored) : [];
  },

  getWorkflowById: async (id: string): Promise<Workflow | undefined> => {
    const workflows = await mockDb.getWorkflows();
    return workflows.find(w => w.id === id);
  },

  createWorkflowFromPlan: async (name: string, plan: CopilotPlan): Promise<Workflow> => {
    if (supabase) {
        // 1. Create Workflow
        const { data: wfData } = await supabase.from('workflows').insert([{
            name,
            description: plan.summary,
            status: 'active',
            type: 'custom'
        }]).select();
        const wf = wfData![0];

        // 2. Create Steps
        const stepsPayload = plan.steps.map((step, index) => ({
            workflow_id: wf.id,
            step_order: index,
            type: step.type,
            title: step.title,
            description: step.description,
            config: {
                promptTemplate: step.prompt,
                platform: 'email',
                delaySeconds: 2
            }
        }));
        const { data: stepsData } = await supabase.from('workflow_steps').insert(stepsPayload).select();

        return {
            id: wf.id,
            name: wf.name,
            description: wf.description,
            status: wf.status,
            type: wf.type,
            createdAt: new Date(wf.created_at).getTime(),
            steps: stepsData!.map(s => ({
                id: s.id,
                workflowId: s.workflow_id,
                order: s.step_order,
                type: s.type,
                title: s.title,
                description: s.description,
                config: s.config
            }))
        };
    }

    const workflows = JSON.parse(localStorage.getItem('kb_workflows') || '[]');
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

  // --- Runs ---
  createRun: async (workflowId: string): Promise<WorkflowRun> => {
    if (supabase) {
        const { data: runData } = await supabase.from('workflow_runs').insert([{
            workflow_id: workflowId,
            status: 'running',
            started_at: new Date().toISOString()
        }]).select();
        const run = runData![0];

        // Fetch steps to create step runs
        const wf = await mockDb.getWorkflowById(workflowId);
        
        const stepRunsPayload = wf!.steps.map(step => ({
            workflow_run_id: run.id,
            workflow_step_id: step.id,
            status: 'pending'
        }));
        
        const { data: srData } = await supabase.from('workflow_step_runs').insert(stepRunsPayload).select();

        return {
            id: run.id,
            workflowId,
            status: run.status,
            startedAt: new Date(run.started_at).getTime(),
            stepRuns: srData!.map(sr => ({
                id: sr.id,
                runId: sr.workflow_run_id,
                stepId: sr.workflow_step_id,
                status: sr.status,
            }))
        };
    }

    let runs = JSON.parse(localStorage.getItem('kb_runs') || '[]');
    const workflow = (await mockDb.getWorkflows()).find(w => w.id === workflowId);
    
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

  getRunById: async (id: string): Promise<WorkflowRun | undefined> => {
    if (supabase) {
        const { data } = await supabase.from('workflow_runs').select(`
            *,
            stepRuns:workflow_step_runs(*)
        `).eq('id', id).single();
        
        if (!data) return undefined;
        
        return {
            id: data.id,
            workflowId: data.workflow_id,
            status: data.status,
            startedAt: new Date(data.started_at).getTime(),
            finishedAt: data.finished_at ? new Date(data.finished_at).getTime() : undefined,
            stepRuns: data.stepRuns.map((sr:any) => ({
                id: sr.id,
                runId: sr.workflow_run_id,
                stepId: sr.workflow_step_id,
                status: sr.status,
                output: sr.output,
                startedAt: sr.started_at ? new Date(sr.started_at).getTime() : undefined,
                finishedAt: sr.finished_at ? new Date(sr.finished_at).getTime() : undefined,
            }))
        };
    }
    const runs = JSON.parse(localStorage.getItem('kb_runs') || '[]');
    return runs.find((r:any) => r.id === id);
  },

  updateRun: async (id: string, updates: Partial<WorkflowRun>) => {
    if (supabase) {
        const payload: any = {};
        if (updates.status) payload.status = updates.status;
        if (updates.finishedAt) payload.finished_at = new Date(updates.finishedAt).toISOString();
        await supabase.from('workflow_runs').update(payload).eq('id', id);
        return;
    }
    const runs = JSON.parse(localStorage.getItem('kb_runs') || '[]');
    const index = runs.findIndex((r:any) => r.id === id);
    if (index !== -1) {
        runs[index] = { ...runs[index], ...updates };
        localStorage.setItem('kb_runs', JSON.stringify(runs));
    }
  },

  updateStepRun: async (runId: string, stepId: string, updates: Partial<StepRun>) => {
    if (supabase) {
        const payload: any = {};
        if (updates.status) payload.status = updates.status;
        if (updates.output) payload.output = updates.output;
        if (updates.startedAt) payload.started_at = new Date(updates.startedAt).toISOString();
        if (updates.finishedAt) payload.finished_at = new Date(updates.finishedAt).toISOString();
        
        const { data } = await supabase.from('workflow_step_runs')
            .select('id')
            .eq('workflow_run_id', runId)
            .eq('workflow_step_id', stepId)
            .single();
            
        if (data) {
            await supabase.from('workflow_step_runs').update(payload).eq('id', data.id);
        }
        return;
    }
    const runs = JSON.parse(localStorage.getItem('kb_runs') || '[]');
    const runIndex = runs.findIndex((r:any) => r.id === runId);
    if (runIndex !== -1) {
      const stepIndex = runs[runIndex].stepRuns.findIndex((s:any) => s.stepId === stepId);
      if (stepIndex !== -1) {
        runs[runIndex].stepRuns[stepIndex] = { ...runs[runIndex].stepRuns[stepIndex], ...updates };
        localStorage.setItem('kb_runs', JSON.stringify(runs));
      }
    }
  },

  // --- Email System ---
  logEmail: async (recipient: string, subject: string, body: string) => {
    if (supabase) {
        await supabase.from('sent_emails').insert([{ recipient, subject, body }]);
    } else {
        console.log(`[MOCK EMAIL] To: ${recipient}, Subject: ${subject}`);
    }
  },

  // --- Misc Async Conversions ---
  getOnboarding: async (): Promise<OnboardingData | null> => {
    await delay(100);
    const stored = localStorage.getItem('kb_onboarding');
    return stored ? JSON.parse(stored) : null;
  },
  saveOnboarding: async (data: OnboardingData) => {
    localStorage.setItem('kb_onboarding', JSON.stringify(data));
  },
  getFunnels: async (): Promise<Funnel[]> => {
    const stored = localStorage.getItem('kb_funnels');
    return stored ? JSON.parse(stored) : [];
  },
  addFunnel: async (funnel: Omit<Funnel, 'id' | 'createdAt'>): Promise<Funnel> => {
    const funnels = await mockDb.getFunnels();
    const newFunnel = { ...funnel, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
    funnels.push(newFunnel);
    localStorage.setItem('kb_funnels', JSON.stringify(funnels));
    return newFunnel;
  },
  getEvents: async (): Promise<CalendarEvent[]> => {
    const stored = localStorage.getItem('kb_events');
    return stored ? JSON.parse(stored) : [];
  },
  addEvent: async (evt: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
    const list = await mockDb.getEvents();
    const newItem = { ...evt, id: Math.random().toString(36).substr(2, 9) };
    list.push(newItem);
    localStorage.setItem('kb_events', JSON.stringify(list));
    return newItem;
  },
  getAnalytics: async (): Promise<AnalyticsData> => {
    const stored = localStorage.getItem('kb_analytics');
    if (!stored) {
      localStorage.setItem('kb_analytics', JSON.stringify(INITIAL_ANALYTICS));
      return INITIAL_ANALYTICS;
    }
    return JSON.parse(stored);
  },
  logEvent: async (type: 'generation' | 'campaign_created' | 'conversion') => {
    const data = await mockDb.getAnalytics();
    if (type === 'generation') data.aiGenerations += 1;
    if (type === 'campaign_created') data.campaignsCreated += 1;
    if (type === 'conversion') data.conversions += 1;
    localStorage.setItem('kb_analytics', JSON.stringify(data));
  },
  getUserStats: async () => {
    const stored = localStorage.getItem('kb_user_stats');
    return stored ? JSON.parse(stored) : { ideasGenerated: 0, savedPrompts: 0 };
  },
  incrementUserStat: async (stat: 'ideasGenerated' | 'savedPrompts') => {
    const stats = await mockDb.getUserStats();
    stats[stat] = (stats[stat] || 0) + 1;
    localStorage.setItem('kb_user_stats', JSON.stringify(stats));
    await mockDb.logEvent('generation');
  }
};