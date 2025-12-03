import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseAvailable } from '../services/supabaseClient';

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
  demoLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Initialize Auth ---
  useEffect(() => {
    const initAuth = async () => {
      // Check if Supabase is available
      if (isSupabaseAvailable() && supabase) {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.warn('Session check failed:', error.message);
            checkLocalStorage();
          } else if (session?.user) {
            await loadUserProfile(session.user.id, session.user.email || '');
          } else {
            checkLocalStorage();
          }
        } catch (e) {
          console.warn('Supabase auth initialization failed, using local storage');
          checkLocalStorage();
        }
      } else {
        // No Supabase, check local storage
        checkLocalStorage();
      }
      
      setIsLoading(false);
    };

    const checkLocalStorage = () => {
      const storedUser = localStorage.getItem('kb_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Failed to parse stored user');
          localStorage.removeItem('kb_user');
        }
      }
    };

    const loadUserProfile = async (userId: string, email: string) => {
      if (!supabase) return;
      
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 is "not found", which is acceptable for new users
          console.warn('Profile fetch error:', error.message);
        }

        setUser({
          id: userId,
          email: email,
          name: profile?.full_name || email.split('@')[0] || 'Creator',
          avatar: profile?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
          role: 'admin'
        });
      } catch (e) {
        console.warn('Failed to load profile, using defaults');
        setUser({
          id: userId,
          email: email,
          name: email.split('@')[0] || 'Creator',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
          role: 'admin'
        });
      }
    };

    initAuth();

    // Listen for auth changes only if Supabase is available
    if (isSupabaseAvailable() && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('kb_user');
        } else if (event === 'SIGNED_IN' && session?.user) {
          await loadUserProfile(session.user.id, session.user.email || '');
        }
      });
      
      return () => subscription.unsubscribe();
    }
  }, []);

  // --- Demo Login (No Supabase) ---
  const demoLogin = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const demoUser: User = {
        id: 'demo-' + Date.now(),
        name: 'Demo Admin',
        email: 'demo@keyspark.ai',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
        role: 'admin'
      };
      
      setUser(demoUser);
      localStorage.setItem('kb_user', JSON.stringify(demoUser));
      console.log('✅ Demo login successful');
    } catch (err: any) {
      console.error('Demo login error:', err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // --- Login Logic ---
  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    
    try {
      if (isSupabaseAvailable() && supabase && password) {
        // Real Supabase Login
        const { data, error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (error) {
          // Check if it's a network/server error vs auth error
          if (error.status === 400 && error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password');
          } else if (error.status && error.status >= 500) {
            console.warn('Server error, falling back to demo mode');
            await mockLogin(email);
          } else {
            throw error;
          }
        } else if (data.user) {
          // Success - user will be set by onAuthStateChange
          console.log('✅ Login successful');
        }
      } else {
        // Demo mode login
        await mockLogin(email);
      }
    } catch (err: any) {
      console.error('Login error:', err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const mockLogin = async (email: string) => {
    // Mock/Demo Login
    await new Promise(resolve => setTimeout(resolve, 500));
    const derivedName = email.split('@')[0].replace(/[0-9]/g, '');
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    
    const newUser: User = {
      id: 'demo-' + Date.now(),
      name: formattedName || 'Creator', 
      email: email,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      role: 'admin'
    };
    
    setUser(newUser);
    localStorage.setItem('kb_user', JSON.stringify(newUser));
  };

  // --- Signup Logic ---
  const signup = async (email: string, password?: string, name?: string) => {
    if (!isSupabaseAvailable() || !supabase || !password) {
      throw new Error('Signup requires Supabase connection and password');
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
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
      
      console.log('✅ Signup successful');
    } catch (err: any) {
      console.error('Signup error:', err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseAvailable() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signout failed');
      }
    }
    
    setUser(null);
    localStorage.removeItem('kb_user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    if (isSupabaseAvailable() && supabase && !user.id.startsWith('demo-')) {
      try {
        await supabase.from('profiles').update({
          full_name: updates.name,
          avatar_url: updates.avatar
        }).eq('id', user.id);
      } catch (e) {
        console.warn('Profile update failed, saved locally only');
      }
    }
    
    localStorage.setItem('kb_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile, demoLogin }}>
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
