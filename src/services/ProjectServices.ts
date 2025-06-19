import dbConnect from '@/lib/db';
import Project from '@/model/project';
import { uploadFile, deleteFile, generateSasUrl } from './azureStorageService';

/**
 * Upload project content to Azure
 * @param {string} projectId - The ID of the project
 * @param {Buffer} contentBuffer - The content buffer to upload
 * @param {string} fileName - The name of the file
 * @param {string} contentType - The content type
 * @returns {Promise<object>} - The updated project with content URL
 */
export async function uploadProjectContent(projectId: string, contentBuffer: Buffer, fileName: string, contentType: string) {
    await dbConnect();

    try {
        // Find the project
        const project = await Project.findById(projectId);
        
        if (!project) {
            throw new Error('Project not found');
        }
        
        // Upload content to Azure Blob Storage
        const fileInfo = await uploadFile({
            fileBuffer: contentBuffer,
            fileName: fileName,
            contentType: contentType
        });

        // Update project with the content URL
        project.fileUrl = (fileInfo as any).url;
        await project.save();
        
        return project;
    } catch (error) {
        console.error('Error uploading project content:', error);
        throw error;
    }
}




/**
 * Get a signed URL for viewing the project content
 * @param {string} projectId - The ID of the project
 * @returns {Promise<string>} - The signed URL
 */
export async function getProjectContentUrl(projectId: string) {
    await dbConnect();

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        if (!project.fileUrl) {
            throw new Error('Project has no content file');
        }

        // Generate a SAS URL that expires after 60 minutes
        const sasUrl = await generateSasUrl(project.fileUrl, 60);

        return sasUrl;
    } catch (error) {
        console.error('Error getting project content URL:', error);
        throw error;
    }
}