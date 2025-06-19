"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Define the User type based on our database model
export type AuthUser = {
  _id: string;
  username: string;
  email: string;
  remainingProjects: number;
  projects: string[];
};

// Define the shape of our context
type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  updateLocalUserData: (data: Partial<AuthUser>) => void;
  logout: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  fetchUserData: async () => {},
  updateLocalUserData: () => {},
  logout: async () => {},
});

// Create a custom hook to use the context
export const useAuthContext = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  // Fetch user data from our database
  const fetchUserData = async () => {
    if (!clerkUser?.emailAddresses[0]?.emailAddress) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const email = clerkUser.emailAddresses[0].emailAddress;
      const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update local user data (without making API calls)
  const updateLocalUserData = (data: Partial<AuthUser>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  // Handle logout
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // Fetch user data when authenticated
  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      fetchUserData();
    } else if (isLoaded && !isSignedIn) {
      setUser(null);
      setIsLoading(false);
    }
  }, [isSignedIn, isLoaded, clerkUser?.id]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        fetchUserData,
        updateLocalUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};