"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import { useAuthContext } from '@/context/AuthContext';

const Navbar = () => {
  const { user } = useAuthContext(); 
  return (
  <nav className="flex justify-between items-center p-4 bg-base-100">
    <div className="text-2xl font-bold"><Link href="/">ProjectForge</Link>
    </div>

    <div className="flex items-center gap-6">
      <SignedIn>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
          <button className='btn btn-secondary'>
            
            Dashboard
          </button>
          </Link>
        </div>
        <UserButton  />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton mode="modal">
            <button className="btn btn-sm">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-sm btn-primary">Sign Up</button>
          </SignUpButton>
        </div>
      </SignedOut>
    </div>
  </nav>
  )
}

export default Navbar