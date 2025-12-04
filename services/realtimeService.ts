import { supabase } from './supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

type SubscriptionCallback<T> = (payload: T) => void;

export class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  /**
   * Subscribe to real-time changes on a table
   */
  subscribe<T = any>(
    table: string,
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*',
    callback: SubscriptionCallback<T>,
    filter?: string
  ): () => void {
    if (!supabase) {
      console.warn('Supabase not configured - real-time disabled');
      return () => {};
    }

    const channelName = `${table}_${event}_${Date.now()}`;
    
    let channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event,
          schema: 'public',
          table,
          filter
        },
        (payload) => {
          callback(payload.new as T);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    // Return unsubscribe function
    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  /**
   * Subscribe to multiple events on a table
   */
  subscribeToAll<T = any>(
    table: string,
    callbacks: {
      onInsert?: SubscriptionCallback<T>;
      onUpdate?: SubscriptionCallback<T>;
      onDelete?: SubscriptionCallback<T>;
    }
  ): () => void {
    const unsubscribers: Array<() => void> = [];

    if (callbacks.onInsert) {
      unsubscribers.push(this.subscribe(table, 'INSERT', callbacks.onInsert));
    }
    if (callbacks.onUpdate) {
      unsubscribers.push(this.subscribe(table, 'UPDATE', callbacks.onUpdate));
    }
    if (callbacks.onDelete) {
      unsubscribers.push(this.subscribe(table, 'DELETE', callbacks.onDelete));
    }

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }

  /**
   * Broadcast a message to a channel
   */
  async broadcast(channelName: string, event: string, payload: any): Promise<void> {
    if (!supabase) return;

    let channel = this.channels.get(channelName);
    
    if (!channel) {
      channel = supabase.channel(channelName);
      await channel.subscribe();
      this.channels.set(channelName, channel);
    }

    await channel.send({
      type: 'broadcast',
      event,
      payload
    });
  }

  /**
   * Listen to broadcast messages
   */
  onBroadcast(
    channelName: string,
    event: string,
    callback: (payload: any) => void
  ): () => void {
    if (!supabase) return () => {};

    const channel = supabase
      .channel(channelName)
      .on('broadcast', { event }, ({ payload }) => {
        callback(payload);
      })
      .subscribe();

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  /**
   * Track user presence in a channel
   */
  async trackPresence(
    channelName: string,
    userId: string,
    metadata: Record<string, any> = {}
  ): Promise<() => void> {
    if (!supabase) return () => {};

    const channel = supabase.channel(channelName, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    await channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          user_id: userId,
          online_at: new Date().toISOString(),
          ...metadata
        });
      }
    });

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  /**
   * Listen to presence changes
   */
  onPresenceChange(
    channelName: string,
    callback: (presences: any) => void
  ): () => void {
    if (!supabase) return () => {};

    const channel = supabase
      .channel(channelName)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        callback(state);
      })
      .subscribe();

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  /**
   * Cleanup all subscriptions
   */
  cleanup(): void {
    this.channels.forEach(channel => channel.unsubscribe());
    this.channels.clear();
  }
}

// Export singleton instance
export const realtimeService = new RealtimeService();
