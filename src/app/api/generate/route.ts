import { NextResponse } from "next/server";
import { inngest } from "../../../inngest/client"; // Import our client
import Project from "@/model/project";
import dbConnect from "@/lib/db";

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export async function POST(request: Request) {
    // Send your event payload to Inngest

    const { projectId, chapters } = await request.json();

    // Validate the input data
    if (!projectId || !chapters) {
        return NextResponse.json(
            { error: "projectId, chapters are required." },
            { status: 400 }
        );
    }


    await dbConnect();
    // Save the project data to the database or perform any other necessary operations

    let project;

    if (chapters.length === 0) {
        project = await Project.findById(projectId);
    } else {
        project = await Project.findByIdAndUpdate(
            projectId,
            {
                $set: {
                    chapters: chapters
                }
            },
            { new: true }
        );
    }

    // for (const chapter of chapters) {
    await inngest.send({
        name: "project/generate-content",
        data: {
            projectId
        },
    });
    // }

    return NextResponse.json(
        {
            message: "Content Generated Successfully.",
            project: project
        },
        { status: 200 }
    );
}