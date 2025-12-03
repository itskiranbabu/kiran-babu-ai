import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/mockDb';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'guest';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signup: (email: string, password?: string, name?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Initialize Auth ---
  useEffect(() => {
    const initAuth = async () => {
      // 1. If Supabase is connected, check real session
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: profile?.full_name || session.user.email?.split('@')[0] || 'Creator',
            avatar: profile?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
            role: 'admin'
          });
        }
      } 
      // 2. Fallback to LocalStorage for Demo Mode if no Supabase or no Session
      else {
        const storedUser = localStorage.getItem('kb_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setIsLoading(false);
    };

    initAuth();

    // Listen for changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'SIGNED_IN' && session?.user) {
           const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
           setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: profile?.full_name || 'Creator',
            avatar: profile?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
            role: 'admin'
          });
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  // --- Login Logic ---
  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    
    if (supabase && password) {
      // Real Supabase Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } else {
      // Mock/Demo Login
      await new Promise(resolve => setTimeout(resolve, 800));
      const derivedName = email.split('@')[0].replace(/[0-9]/g, '');
      const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
      
      const newUser: User = {
        id: 'u1',
        name: formattedName || 'Creator', 
        email: email,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
        role: 'admin'
      };
      setUser(newUser);
      localStorage.setItem('kb_user', JSON.stringify(newUser));
    }
    setIsLoading(false);
  };

  // --- Signup Logic ---
  const signup = async (email: string, password?: string, name?: string) => {
    if (!supabase || !password) return; // Only works with real backend
    setIsLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        }
      }
    });
    
    if (error) throw error;
    setIsLoading(false);
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('kb_user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      if (supabase) {
        await supabase.from('profiles').update({
          full_name: updates.name,
          avatar_url: updates.avatar
        }).eq('id', user.id);
      } else {
        localStorage.setItem('kb_user', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};