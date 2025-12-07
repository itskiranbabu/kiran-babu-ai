import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

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
        try {
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
        } catch (e) {
            console.warn("Supabase Auth Check Failed:", e);
        }
      } 
      // 2. Fallback to LocalStorage for Demo Mode if no Supabase or no Session
      if (!user) {
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
      try {
          // Real Supabase Login
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          
          if (error) {
            // Check if it's an email confirmation error
            if (error.message.toLowerCase().includes('email not confirmed') || 
                error.message.toLowerCase().includes('email confirmation')) {
              throw new Error('Please check your email and confirm your account before logging in. If you didn\'t receive the email, please sign up again.');
            }
            throw error;
          }
          
          // Login successful - user state will be updated by onAuthStateChange listener
          setIsLoading(false);
          return;
      } catch (err: any) {
          console.error("Supabase Login Failed:", err);
          setIsLoading(false);
          
          // Graceful fallback if it's a connection issue (status 400/500), but throw on wrong password
          if (err.status >= 500 || err.message?.includes('fetch')) {
              console.warn("Falling back to Demo Mode due to server error");
              await mockLogin(email);
          } else {
              throw err; // Wrong password or email not confirmed, let UI handle it
          }
      }
    } else {
      await mockLogin(email);
      setIsLoading(false);
    }
  };

  const mockLogin = async (email: string) => {
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
  };

  // --- Signup Logic with Auto-Confirmation ---
  const signup = async (email: string, password?: string, name?: string) => {
    if (!supabase || !password) return; // Only works with real backend
    setIsLoading(true);
    
    try {
      // Sign up with email confirmation disabled via options
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: name,
            avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
          }
        }
      });
      
      if (error) throw error;
      
      // If signup successful and user is created
      if (data.user) {
        // Check if email confirmation is required
        if (data.user.confirmed_at) {
          // User is auto-confirmed, proceed with login
          console.log('User auto-confirmed, logging in...');
        } else {
          // Email confirmation required - inform user
          console.log('Email confirmation sent to:', email);
          throw new Error('Account created! Please check your email to confirm your account before logging in.');
        }
      }
      
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      throw err;
    }
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
