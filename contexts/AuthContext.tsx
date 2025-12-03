import React, { createContext, useContext, useState, useEffect } from 'react';

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
  login: (email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for persisted session
    const storedUser = localStorage.getItem('kb_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract name from email for demo purposes
    const derivedName = email.split('@')[0].replace(/[0-9]/g, '');
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    const newUser: User = {
      id: 'u1',
      name: formattedName || 'Creator', 
      email: email,
      // Updated to a professional AI-style or clean portrait
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      role: 'admin'
    };
    
    setUser(newUser);
    localStorage.setItem('kb_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kb_user');
  };

  const updateProfile = (updates: Partial<User>) => {
      if (user) {
          const updatedUser = { ...user, ...updates };
          setUser(updatedUser);
          localStorage.setItem('kb_user', JSON.stringify(updatedUser));
      }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>
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