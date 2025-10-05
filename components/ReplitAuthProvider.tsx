'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ReplitUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

interface ReplitAuthContextType {
  user: ReplitUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const ReplitAuthContext = createContext<ReplitAuthContextType | undefined>(undefined);

export function ReplitAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ReplitUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if we're in a Replit environment
      if (typeof window !== 'undefined' && (window as any).replit) {
        const replit = (window as any).replit;
        
        // Check if Replit Auth is available
        if (replit.auth) {
          // Listen for auth state changes
          replit.auth.onAuthStateChange((user: any) => {
            if (user) {
              setUser({
                id: user.id || user.sub,
                email: user.email,
                firstName: user.firstName || user.first_name,
                lastName: user.lastName || user.last_name,
                profileImageUrl: user.profileImageUrl || user.profile_image_url
              });
            } else {
              setUser(null);
            }
            setIsLoading(false);
          });

          // Get current user
          const currentUser = replit.auth.getCurrentUser();
          if (currentUser) {
            setUser({
              id: currentUser.id || currentUser.sub,
              email: currentUser.email,
              firstName: currentUser.firstName || currentUser.first_name,
              lastName: currentUser.lastName || currentUser.last_name,
              profileImageUrl: currentUser.profileImageUrl || currentUser.profile_image_url
            });
          }
        } else {
          // Fallback: try to get user from our API
          const response = await fetch('/api/auth/user');
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        }
      } else {
        // Not in Replit environment, use our API
        const response = await fetch('/api/auth/user');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    if (typeof window !== 'undefined' && (window as any).replit?.auth) {
      // Use Replit Auth login
      (window as any).replit.auth.login();
    } else {
      // Fallback to our API login
      window.location.href = '/api/login';
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined' && (window as any).replit?.auth) {
      // Use Replit Auth logout
      (window as any).replit.auth.logout();
    } else {
      // Fallback to our API logout
      window.location.href = '/api/logout';
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };

  return (
    <ReplitAuthContext.Provider value={value}>
      {children}
    </ReplitAuthContext.Provider>
  );
}

export function useReplitAuth() {
  const context = useContext(ReplitAuthContext);
  if (context === undefined) {
    throw new Error('useReplitAuth must be used within a ReplitAuthProvider');
  }
  return context;
}


