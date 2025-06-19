import { NextResponse } from "next/server";
import { inngest } from "../../../inngest/client"; // Import our client
import Project from "@/model/project";
import dbConnect from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export async function POST(request: Request) {
    // Send your event payload to Inngest

    const { projectId, answers } = await request.json();


    // Validate the input data
    if (!projectId || !answers) {
        return NextResponse.json(
            { error: "projectId, answers are required." },
            { status: 400 }
        );
    } await dbConnect();

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            $set: {
                answers: answers,
                currentStep: "chapters"
            }
        },
        { new: true }
    );
    // const project = await Project.findById(projectId);

    if (!project) {
        return NextResponse.json(
            { error: "Project not found." },
            { status: 404 }
        );
    }

    // Then trigger the background job to generate chapters

    await inngest.send({
        name: "project/generate-chapters",
        data: {
            projectId: project._id.toString(),
        },
    });



    return NextResponse.json(
        {
            message: "Chapters Generated successfully.",
            project: project
        },
        { status: 200 }
    );
}