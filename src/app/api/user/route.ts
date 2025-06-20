import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import User from '@/model/user';

export async function GET(request: NextRequest) {
  // Check if user is authenticated
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get email from query params
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');
  
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Connect to database
  await dbConnect();

  try {
    // Find user by email
    const dbUser = await User.findOne({ email });
    
    if (!dbUser) {
      // If user doesn't exist in our DB but is authenticated with Clerk, create them
      // Create a new user in our DB
      const newUser = await User.create({
        username: email.split('@')[0],
        email: email,
        remainingProjects: 0, // Give new users 0 free projects
      });
      
      return NextResponse.json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        projects: newUser.projects,
        remainingProjects: newUser.remainingProjects,
      });
    }
    
    return NextResponse.json({
      _id: dbUser._id,
      username: dbUser.username,
      email: dbUser.email,
      projects: dbUser.projects,
      remainingProjects: dbUser.remainingProjects,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
