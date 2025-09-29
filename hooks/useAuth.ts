'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For now, we'll simulate having a logged-in user
    // In full Replit Auth, this would fetch from /api/auth/user
    const mockUser: User = {
      id: "user_1",
      email: "demo@example.com",
      firstName: "Demo",
      lastName: "User"
    };
    
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  const login = () => {
    // In full Replit Auth, this would redirect to /api/login
    window.location.href = '/api/login';
  };

  const logout = () => {
    // In full Replit Auth, this would redirect to /api/logout
    setUser(null);
    window.location.href = '/api/logout';
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };
}