import { useState, useEffect, useCallback } from 'react';
import { db, Project, AIGeneration, UserMetrics } from '../services/database';
import { useAuth } from '../contexts/AuthContext';

// ============================================
// REAL-TIME DATA HOOKS
// Custom hooks for real-time data subscriptions
// ============================================

// ============================================
// useProjects - Real-time projects hook
// ============================================
export const useProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await db.projects.getAll(user.id);
      setProjects(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchProjects();

    // Subscribe to changes
    const subscription = db.projects.subscribe(user.id, (payload) => {
      console.log('Project change detected:', payload);
      
      if (payload.eventType === 'INSERT') {
        setProjects(prev => [payload.new, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setProjects(prev => prev.map(p => 
          p.id === payload.new.id ? payload.new : p
        ));
      } else if (payload.eventType === 'DELETE') {
        setProjects(prev => prev.filter(p => p.id !== payload.old.id));
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [user, fetchProjects]);

  // Add project
  const addProject = useCallback(async (projectData: Partial<Project>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const newProject = await db.projects.create(user.id, projectData);
      return newProject;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [user]);

  // Update project
  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    try {
      const updated = await db.projects.update(id, updates);
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete project
  const deleteProject = useCallback(async (id: string) => {
    try {
      const success = await db.projects.delete(id);
      return success;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};

// ============================================
// useGenerations - Real-time AI generations hook
// ============================================
export const useGenerations = (limit: number = 50) => {
  const { user } = useAuth();
  const [generations, setGenerations] = useState<AIGeneration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch generations
  const fetchGenerations = useCallback(async () => {
    if (!user) {
      setGenerations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await db.generations.getAll(user.id, limit);
      setGenerations(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching generations:', err);
    } finally {
      setLoading(false);
    }
  }, [user, limit]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchGenerations();

    // Subscribe to new generations
    const subscription = db.generations.subscribe(user.id, (payload) => {
      console.log('New generation detected:', payload);
      
      if (payload.eventType === 'INSERT') {
        setGenerations(prev => [payload.new, ...prev].slice(0, limit));
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [user, limit, fetchGenerations]);

  // Add generation
  const addGeneration = useCallback(async (generationData: Partial<AIGeneration>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const newGeneration = await db.generations.create(user.id, generationData);
      return newGeneration;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [user]);

  // Delete generation
  const deleteGeneration = useCallback(async (id: string) => {
    try {
      const success = await db.generations.delete(id);
      if (success) {
        setGenerations(prev => prev.filter(g => g.id !== id));
      }
      return success;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    generations,
    loading,
    error,
    addGeneration,
    deleteGeneration,
    refetch: fetchGenerations
  };
};

// ============================================
// useMetrics - Real-time metrics hook
// ============================================
export const useMetrics = (refreshInterval: number = 30000) => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<UserMetrics>({
    totalProjects: 0,
    totalGenerations: 0,
    tokensUsed: 0,
    activeWorkflows: 0,
    revenue: 0,
    leads: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch metrics
  const fetchMetrics = useCallback(async () => {
    if (!user) {
      setMetrics({
        totalProjects: 0,
        totalGenerations: 0,
        tokensUsed: 0,
        activeWorkflows: 0,
        revenue: 0,
        leads: 0
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await db.metrics.getUserMetrics(user.id);
      setMetrics(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Auto-refresh metrics
  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchMetrics();

    // Set up interval for auto-refresh
    const interval = setInterval(fetchMetrics, refreshInterval);

    return () => {
      clearInterval(interval);
    };
  }, [user, refreshInterval, fetchMetrics]);

  // Track event
  const trackEvent = useCallback(async (event: string, data: any) => {
    if (!user) return;
    
    try {
      await db.metrics.trackEvent(user.id, event, data);
    } catch (err: any) {
      console.error('Error tracking event:', err);
    }
  }, [user]);

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics,
    trackEvent
  };
};

// ============================================
// useStorage - File upload hook
// ============================================
export const useStorage = (bucket: string = 'projects') => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File, path?: string): Promise<string | null> => {
    setUploading(true);
    setError(null);

    try {
      const fileName = path || `${Date.now()}-${file.name}`;
      const url = await db.storage.uploadFile(bucket, fileName, file);
      return url;
    } catch (err: any) {
      setError(err.message);
      console.error('Error uploading file:', err);
      return null;
    } finally {
      setUploading(false);
    }
  }, [bucket]);

  const deleteFile = useCallback(async (path: string): Promise<boolean> => {
    try {
      const success = await db.storage.deleteFile(bucket, path);
      return success;
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting file:', err);
      return false;
    }
  }, [bucket]);

  return {
    uploadFile,
    deleteFile,
    uploading,
    error
  };
};

// ============================================
// useDebounce - Utility hook for debouncing
// ============================================
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
