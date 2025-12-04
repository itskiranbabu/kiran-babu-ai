import { useEffect, useState, useCallback } from 'react';
import { realtimeService } from '../services/realtimeService';
import { supabase } from '../services/supabaseClient';

/**
 * Hook to subscribe to real-time table changes
 */
export function useRealtimeTable<T = any>(
  table: string,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data: fetchedData, error: fetchError } = await supabase
          .from(table)
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setData(fetchedData || []);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table]);

  // Subscribe to real-time changes
  useEffect(() => {
    const unsubscribe = realtimeService.subscribeToAll(table, {
      onInsert: (newItem) => {
        setData(prev => [newItem, ...prev]);
      },
      onUpdate: (updatedItem: any) => {
        setData(prev => 
          prev.map(item => 
            (item as any).id === updatedItem.id ? updatedItem : item
          )
        );
      },
      onDelete: (deletedItem: any) => {
        setData(prev => 
          prev.filter(item => (item as any).id !== deletedItem.id)
        );
      }
    });

    return () => unsubscribe();
  }, [table]);

  const refresh = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);
    try {
      const { data: fetchedData, error: fetchError } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setData(fetchedData || []);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [table]);

  return { data, loading, error, refresh };
}

/**
 * Hook to track user presence in a channel
 */
export function usePresence(channelName: string, userId: string, metadata: Record<string, any> = {}) {
  const [presences, setPresences] = useState<any>({});
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  useEffect(() => {
    let unsubscribePresence: (() => void) | undefined;
    let unsubscribeTrack: (() => void) | undefined;

    const setup = async () => {
      // Track own presence
      unsubscribeTrack = await realtimeService.trackPresence(channelName, userId, metadata);

      // Listen to presence changes
      unsubscribePresence = realtimeService.onPresenceChange(channelName, (state) => {
        setPresences(state);
        setOnlineUsers(Object.keys(state).length);
      });
    };

    setup();

    return () => {
      unsubscribePresence?.();
      unsubscribeTrack?.();
    };
  }, [channelName, userId, JSON.stringify(metadata)]);

  return { presences, onlineUsers };
}

/**
 * Hook to broadcast and listen to messages in a channel
 */
export function useBroadcast(channelName: string, event: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = realtimeService.onBroadcast(channelName, event, (payload) => {
      setMessages(prev => [...prev, payload]);
    });

    return () => unsubscribe();
  }, [channelName, event]);

  const broadcast = useCallback(async (payload: any) => {
    await realtimeService.broadcast(channelName, event, payload);
  }, [channelName, event]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, broadcast, clearMessages };
}

/**
 * Hook for optimistic UI updates
 */
export function useOptimisticUpdate<T extends { id: string }>(
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData);
  const [pendingUpdates, setPendingUpdates] = useState<Set<string>>(new Set());

  const optimisticAdd = useCallback((item: T) => {
    setData(prev => [item, ...prev]);
    setPendingUpdates(prev => new Set(prev).add(item.id));
  }, []);

  const optimisticUpdate = useCallback((id: string, updates: Partial<T>) => {
    setData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
    setPendingUpdates(prev => new Set(prev).add(id));
  }, []);

  const optimisticDelete = useCallback((id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
    setPendingUpdates(prev => new Set(prev).add(id));
  }, []);

  const confirmUpdate = useCallback((id: string) => {
    setPendingUpdates(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const rollback = useCallback((id: string, originalData: T[]) => {
    setData(originalData);
    setPendingUpdates(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  return {
    data,
    setData,
    pendingUpdates,
    optimisticAdd,
    optimisticUpdate,
    optimisticDelete,
    confirmUpdate,
    rollback
  };
}
