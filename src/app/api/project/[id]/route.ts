import { NextRequest, NextResponse } from "next/server";
import { getAuth } from '@clerk/nextjs/server';
import Project from "@/model/project";
import User from "@/model/user";
import dbConnect from "@/lib/db";
import { generateSasUrl } from "@/services/azureStorageService";

// Function to fetch and parse JSON content from a URL
async function fetchProjectContent(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched project content:', data.length, 'items');
        return data;
    } catch (error) {
        console.error('Error fetching project content:', error);
        throw error;
    }
}

// Opt out of caching; every request should send fresh data
export const dynamic = "force-dynamic";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Check if user is authenticated
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const projectId = id;

    // Validate the project ID
    if (!projectId) {
        return NextResponse.json(
            { error: "Project ID is required." },
            { status: 400 }
        );
    }

    try {
        await dbConnect();
        
        // Find the project by ID
        const project = await Project.findById(projectId);
        
        if (!project) {
            return NextResponse.json(
                { error: "Project not found." },
                { status: 404 }
            );
        }

        // Get email from query params for authorization check
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email');
        
        if (email) {
            // Verify that the project belongs to the user with the given email
            const user = await User.findOne({ email });
            
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            
            // Check if the project belongs to the user
            if (project.user.toString() !== user._id.toString()) {
                return NextResponse.json({ error: 'Unauthorized access to project' }, { status: 403 });
            }
        }

        let projectContent = null;
        let contentUrl = "";

        // If the project has a file URL, fetch the content
        if (project.fileUrl && project.fileUrl.length > 0) {
            try {
                // Generate a signed URL for accessing the file (valid for 60 minutes)
                contentUrl = await generateSasUrl(project.fileUrl, 60);
                
                if (contentUrl) {
                    // Fetch and parse the content from Azure Blob Storage
                    const fileContent = await fetchProjectContent(contentUrl);
                    
                    // Extract the project data from the file content
                    if (fileContent && fileContent.project) {
                        projectContent = fileContent.project;
                    }
                }
            } catch (error) {
                console.error('Error fetching project content:', error);
                // Continue without the file content if there's an error
            }
        }

        return NextResponse.json({
            success: true,
            project: {
                ...project.toObject(), // Base project data from the database
                content: projectContent, // Additional content from the file if available
                contentUrl: contentUrl // The URL to access the content directly
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json(
            { error: "Failed to fetch project data." },
            { status: 500 }
        );
    }
}
