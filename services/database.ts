import { supabase } from './supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

// ============================================
// REAL-TIME DATABASE SERVICE
// Complete CRUD operations with real-time subscriptions
// ============================================

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  client: string;
  category: string;
  result: string;
  images: string[];
  metrics: {
    revenue?: string;
    leads?: number;
    conversion?: string;
    views?: number;
  };
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface AIGeneration {
  id: string;
  user_id: string;
  type: 'content' | 'hook' | 'email' | 'workflow' | 'other';
  input: string;
  output: string;
  tokens: number;
  model: string;
  created_at: string;
}

export interface WorkflowRun {
  id: string;
  user_id: string;
  workflow_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  input_context: any;
  output: any;
  started_at: string;
  finished_at?: string;
}

export interface UserMetrics {
  totalProjects: number;
  totalGenerations: number;
  tokensUsed: number;
  activeWorkflows: number;
  revenue: number;
  leads: number;
}

// ============================================
// PROJECTS SERVICE
// ============================================

export const projectsService = {
  // Get all projects for a user
  async getAll(userId: string): Promise<Project[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    
    return data || [];
  },

  // Get single project
  async getById(id: string): Promise<Project | null> {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }
    
    return data;
  },

  // Create new project
  async create(userId: string, projectData: Partial<Project>): Promise<Project | null> {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: userId,
        ...projectData,
        status: projectData.status || 'active'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }
    
    return data;
  },

  // Update project
  async update(id: string, updates: Partial<Project>): Promise<Project | null> {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }
    
    return data;
  },

  // Delete project
  async delete(id: string): Promise<boolean> {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }
    
    return true;
  },

  // Subscribe to real-time updates
  subscribe(userId: string, callback: (payload: any) => void): RealtimeChannel | null {
    if (!supabase) return null;
    
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
    
    return channel;
  }
};

// ============================================
// AI GENERATIONS SERVICE
// ============================================

export const generationsService = {
  // Get all generations for a user
  async getAll(userId: string, limit: number = 50): Promise<AIGeneration[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('ai_generations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching generations:', error);
      return [];
    }
    
    return data || [];
  },

  // Create new generation
  async create(userId: string, generationData: Partial<AIGeneration>): Promise<AIGeneration | null> {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('ai_generations')
      .insert({
        user_id: userId,
        ...generationData,
        model: generationData.model || 'gemini-pro'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating generation:', error);
      throw error;
    }
    
    return data;
  },

  // Get generation by ID
  async getById(id: string): Promise<AIGeneration | null> {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('ai_generations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching generation:', error);
      return null;
    }
    
    return data;
  },

  // Delete generation
  async delete(id: string): Promise<boolean> {
    if (!supabase) return false;
    
    const { error } = await supabase
      .from('ai_generations')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting generation:', error);
      return false;
    }
    
    return true;
  },

  // Subscribe to real-time updates
  subscribe(userId: string, callback: (payload: any) => void): RealtimeChannel | null {
    if (!supabase) return null;
    
    const channel = supabase
      .channel('generations-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ai_generations',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
    
    return channel;
  }
};

// ============================================
// METRICS SERVICE
// ============================================

export const metricsService = {
  // Get user metrics
  async getUserMetrics(userId: string): Promise<UserMetrics> {
    if (!supabase) {
      return {
        totalProjects: 0,
        totalGenerations: 0,
        tokensUsed: 0,
        activeWorkflows: 0,
        revenue: 0,
        leads: 0
      };
    }
    
    try {
      // Parallel queries for performance
      const [projectsResult, generationsResult, workflowsResult] = await Promise.all([
        supabase.from('projects').select('count', { count: 'exact' }).eq('user_id', userId),
        supabase.from('ai_generations').select('tokens').eq('user_id', userId),
        supabase.from('workflows').select('count', { count: 'exact' }).eq('user_id', userId).eq('status', 'active')
      ]);

      const totalProjects = projectsResult.count || 0;
      const totalGenerations = generationsResult.data?.length || 0;
      const tokensUsed = generationsResult.data?.reduce((sum, g) => sum + (g.tokens || 0), 0) || 0;
      const activeWorkflows = workflowsResult.count || 0;

      return {
        totalProjects,
        totalGenerations,
        tokensUsed,
        activeWorkflows,
        revenue: 0, // TODO: Implement revenue tracking
        leads: 0 // TODO: Implement leads tracking
      };
    } catch (error) {
      console.error('Error fetching metrics:', error);
      return {
        totalProjects: 0,
        totalGenerations: 0,
        tokensUsed: 0,
        activeWorkflows: 0,
        revenue: 0,
        leads: 0
      };
    }
  },

  // Track event
  async trackEvent(userId: string, event: string, data: any): Promise<void> {
    if (!supabase) return;
    
    await supabase.from('analytics').insert({
      user_id: userId,
      event,
      data,
      timestamp: new Date().toISOString()
    });
  }
};

// ============================================
// WORKFLOW RUNS SERVICE
// ============================================

export const workflowRunsService = {
  // Get all runs for a workflow
  async getByWorkflowId(workflowId: string): Promise<WorkflowRun[]> {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('workflow_runs')
      .select('*')
      .eq('workflow_id', workflowId)
      .order('started_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching workflow runs:', error);
      return [];
    }
    
    return data || [];
  },

  // Create new run
  async create(userId: string, workflowId: string, inputContext: any): Promise<WorkflowRun | null> {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('workflow_runs')
      .insert({
        user_id: userId,
        workflow_id: workflowId,
        status: 'pending',
        input_context: inputContext,
        started_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating workflow run:', error);
      throw error;
    }
    
    return data;
  },

  // Update run status
  async updateStatus(id: string, status: WorkflowRun['status'], output?: any): Promise<WorkflowRun | null> {
    if (!supabase) return null;
    
    const updates: any = { status };
    if (status === 'completed' || status === 'failed') {
      updates.finished_at = new Date().toISOString();
    }
    if (output) {
      updates.output = output;
    }
    
    const { data, error } = await supabase
      .from('workflow_runs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating workflow run:', error);
      throw error;
    }
    
    return data;
  }
};

// ============================================
// STORAGE SERVICE (for images/files)
// ============================================

export const storageService = {
  // Upload file
  async uploadFile(bucket: string, path: string, file: File): Promise<string | null> {
    if (!supabase) return null;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return publicUrl;
  },

  // Delete file
  async deleteFile(bucket: string, path: string): Promise<boolean> {
    if (!supabase) return false;
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  },

  // Get public URL
  getPublicUrl(bucket: string, path: string): string | null {
    if (!supabase) return null;
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};

// Export all services
export const db = {
  projects: projectsService,
  generations: generationsService,
  metrics: metricsService,
  workflowRuns: workflowRunsService,
  storage: storageService
};
