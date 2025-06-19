import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';

type Project = {
  _id: string;
  title: string;
  description: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
};

export const useUserData = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?.email) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/projects?email=${encodeURIComponent(user.email)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  return {
    user,
    projects,
    isLoading: authLoading || isLoading,
    error,
    refreshProjects: async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/projects?email=${encodeURIComponent(user?.email || '')}`);
        if (!response.ok) throw new Error('Failed to refresh projects');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Error refreshing projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to refresh projects');
      } finally {
        setIsLoading(false);
      }
    }
  };
};
