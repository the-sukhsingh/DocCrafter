"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserData } from '@/hooks/useUserData';
import Image from 'next/image';
import Link from 'next/link';

const Dashboard = () => {
  const { user, projects, isLoading, error } = useUserData();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-primary">Loading your creative space...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-error/10 border border-error p-8 rounded-xl max-w-md text-center">
          <div className="text-5xl mb-4">😢</div>
          <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="text-error mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-error">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="card-title justify-center mb-4">Authentication Required</h2>
            <p className="mb-6">Please log in to access your creative dashboard</p>
            <div className="card-actions justify-center">
              <button 
                onClick={() => router.push('/login')} 
                className="btn btn-primary">
                Login Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Welcome back, {user.username}!
            </h1>
            <p className="text-base-content/70">Your creative journey continues here</p>
          </div>
          <div className="stats shadow mt-6 md:mt-0 bg-base-100">
            <div className="stat">
              <div className="stat-title">Available Credits</div>
              <div className="stat-value text-primary">{user.remainingProjects}</div>
              <div className="stat-desc">Projects you can create</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Image src="/file.svg" alt="Profile" width={24} height={24} className='invert' />
              </div>
              <div>
                <h3 className="card-title text-lg">{user.username}</h3>
                <p className="text-sm opacity-70">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Image src="/globe.svg" alt="Projects" width={24} height={24} className='invert' />
              </div>
              <div>
                <h3 className="card-title text-lg">{projects.length}</h3>
                <p className="text-sm opacity-70">Total Projects</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Image src="/window.svg" alt="Credits" width={24} height={24} className='invert' />
              </div>
              <div>
                <h3 className="card-title text-lg">{user.remainingProjects}</h3>
                <p className="text-sm opacity-70">Available Credits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-base-100 rounded-xl shadow-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-base-300 pb-4">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Image src="/file.svg" alt="Projects" width={20} height={20} className='invert' />
            </div>
            <h2 className="text-2xl font-bold">My Projects</h2>
          </div>
          
          <Link href="/build">
          <button 
            className={`btn ${user.remainingProjects <= 0 ? 'btn-disabled' : 'btn-primary'} btn-wide`}
            disabled={user.remainingProjects <= 0}
            >
            {user.remainingProjects <= 0 ? 'No credits left' : '+ Create New Project'}
          </button>
            </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center py-12 bg-base-200 rounded-xl">
            <div className="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center mb-4">
                <Image src="/file.svg" alt="No Projects" width={32} height={32} className='invert' />
            </div>
            <h3 className="text-xl font-medium mb-2">No projects yet</h3>
            <p className="text-base-content/70 mb-6 text-center max-w-md">
              Create your first project to begin your creative journey!
            </p>
            <Link href="/build">
            <button 
              className={`btn ${user.remainingProjects <= 0 ? 'btn-disabled' : 'btn-primary'}`}
              disabled={user.remainingProjects <= 0}
            >
              {user.remainingProjects <= 0 ? 'No credits left' : 'Start Creating'}
            </button>
          </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <Link key={project._id} href={`/project/${project._id}`}>
                <div
                  className="card bg-base-200 hover:bg-base-300 transition-all cursor-pointer hover:scale-[1.02] border border-base-300"
                >
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="card-title text-lg">{project.title}</h3>
                      <div className="badge badge-accent">{project.domain}</div>
                    </div>
                    <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                    {project.description || 'No description provided'}
                  </p>
                  <div className="card-actions justify-between items-center mt-auto">
                    <div className="text-xs opacity-60">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <button className="btn btn-sm btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;