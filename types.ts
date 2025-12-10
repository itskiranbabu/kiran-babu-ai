import { LucideIcon } from 'lucide-react';

export enum Brand {
  PERSONAL = 'itskiranbabu',
  PRODUCT = 'itskeyrun.ai',
  COMMUNITY = 'itscontentspark',
}

export enum ProductType {
  NOTION_TEMPLATE = 'Notion Template',
  PROMPT_PACK = 'Prompt Pack',
  BUNDLE = 'Bundle',
  MINI_TOOL = 'Mini Tool',
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceStart: string;
  features: string[];
  icon: LucideIcon;
  category: 'Development' | 'Systems' | 'Content' | 'Strategy' | 'Growth' | 'Marketing' | 'Design';
  url?: string; // Optional external URL for services like RevenuePilot
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  type: ProductType;
  image: string;
  url: string;
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  category: string;
  result: string;
  image: string;
}

export interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  value: string;
  source: string;
  createdAt: number;
}

// --- WORKFLOW ENGINE TYPES ---

export type WorkflowStatus = 'active' | 'draft' | 'paused';
export type WorkflowType = 'launch' | 'nurture' | 'custom';
export type StepType = 'generate_content' | 'send_email' | 'wait' | 'update_crm';
export type RunStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  type: WorkflowType;
  createdAt: number;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  order: number;
  type: StepType;
  title: string;
  description?: string;
  config: {
    promptTemplate?: string;
    emailSubject?: string;
    emailBody?: string;
    delaySeconds?: number;
    platform?: string;
  };
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  status: RunStatus;
  startedAt: number;
  finishedAt?: number;
  inputContext?: any;
  stepRuns: StepRun[];
}

export interface StepRun {
  id: string;
  runId: string;
  stepId: string;
  status: RunStatus;
  startedAt?: number;
  finishedAt?: number;
  output?: string;
  logs?: string[];
  error?: string;
}

// AI Plan Type from Gemini
export interface CopilotPlan {
  summary: string;
  steps: {
    title: string;
    type: StepType;
    description: string;
    prompt?: string; // For generation steps
  }[];
}
