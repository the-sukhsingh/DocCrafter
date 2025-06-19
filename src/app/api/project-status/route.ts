import { NextResponse } from "next/server";
import Project from "@/model/project";
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
        console.log(data)
        console.log('Fetched project content:', data.length, 'items');
        return data;
    } catch (error) {
        console.error('Error fetching project content:', error);
        throw error;
    }
}

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async GET route handler to check project status
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    // Validate the input data
    if (!projectId) {
        return NextResponse.json(
            { error: "projectId is required." },
            { status: 400 }
        );
    }    try {
        await dbConnect();
        
        const project = await Project.findById(projectId);
        
        if (!project) {
            return NextResponse.json(
                { error: "Project not found." },
                { status: 404 }
            );
        }
        // Determine project status based on data completeness
        const fileUrlExists = project.fileUrl && project.fileUrl.length > 0;
        
        let status = {
            projectId: project._id,
            hasQuestions: project.answers && project.answers.length > 0,
            questionsGenerated: project.answers && project.answers.length > 0,
            hasChapters: project.chapters && project.chapters.length > 0,
            chaptersGenerated: project.chapters && project.chapters.length > 0,
            hasContent: fileUrlExists,
            contentGenerated: fileUrlExists,
            questions: project.answers || [],
            chapters: project.chapters || [],
            lastUpdated: project.updatedAt,
            contentUrl: ""
        };

        let projectFromFile = null;

        if(fileUrlExists) {
            try {
                // Generate a signed URL for accessing the file
                const contentUrl = await generateSasUrl(project.fileUrl, 60);
                
                if (contentUrl) {
                    status.contentUrl = contentUrl;
                    
                    // Fetch and parse the content from Azure Blob Storage
                    const fileContent = await fetchProjectContent(contentUrl);
                    
                    // Extract the project data from the file content
                    if (fileContent && fileContent.project) {
                        projectFromFile = fileContent.project;
                        

                        status.hasContent = true;
                        status.contentGenerated = true;
                        status.lastUpdated = new Date(projectFromFile.updatedAt);
                    }
                }
            } catch (error) {
                console.error('Error fetching project content:', error);
                // Continue without the file content if there's an error
            }
        }

        // console.log('Project status:', status);


        return NextResponse.json({
            success: true,
            status,
            project: projectFromFile || project // Return the project from file if available, otherwise return the database project
        }, { status: 200 });

    } catch (error) {
        console.error('Error checking project status:', error);
        return NextResponse.json(
            { error: "Failed to check project status." },
            { status: 500 }
        );
    }
}
