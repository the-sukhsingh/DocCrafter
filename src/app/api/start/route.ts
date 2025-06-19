import { NextRequest, NextResponse } from "next/server";
import { inngest } from "../../../inngest/client"; // Import our client
import Project from "@/model/project";
import dbConnect from "@/lib/db";
import { currentUser } from '@clerk/nextjs/server'
import User from "@/model/user";

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export async function POST(request: NextRequest) {
  // Send your event payload to Inngest

  const { title, description, domain } = await request.json();


  // Validate the input data
  if (!title || !description || !domain) {
    return NextResponse.json(
      { error: "Title, description, and domain are required." },
      { status: 400 }
    );
  }
  await dbConnect();
  // Save the project data to the database or perform any other necessary operations


  
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated." },
      { status: 401 }
    );
  }
  console.log("User ID:", user);

  const dbUser = await User.findOne({ 
    $or: [
      { clerkId: user?.id },
      { email: user?.emailAddresses[0]?.emailAddress }
    ]
  });

  if (!dbUser) {
    return NextResponse.json(
      { error: "User not found." },
      { status: 404 }
    );
  }


  // Check if the user has remaining projects

  if (dbUser.remainingProjects <= 0) {
    return NextResponse.json(
      { error: "You have no remaining projects." },
      { status: 403 }
    );
  }

  // Decrement the user's remaining projects
  dbUser.remainingProjects -= 1;
  

  const project = new Project({
    title,
    description,
    domain,
    user: dbUser._id,
    currentStep: "questions",
    answers: [],
    chapters: [],
  });

  dbUser.projects.push(project._id);
  await dbUser.save();

  await project.save();

  await inngest.send({
    name: "project/start",
    data: {
      projectId: project._id.toString(),
    },
  });



  return NextResponse.json(
    { 
      message: "Project started successfully", 
      project: project,
      projectId: project._id.toString()
    },
    { status: 200 }
  );
}