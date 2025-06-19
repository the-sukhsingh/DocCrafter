import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import User from '@/model/user';
import Project from '@/model/project';

// Opt out of caching; every request should send fresh data
export const dynamic = "force-dynamic";

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
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get projects associated with user
    const projects = await Project.find({ user: user._id })
      .select('_id title description domain createdAt updatedAt') // Select only needed fields
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
    
    return NextResponse.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
