"use client";
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ContentViewer from '@/components/screens/ContentViewer';
import LoadingOverlay from '@/components/screens/LoadingOverlay';
import { useProject } from '@/context/ProjectContext';


const PROJECTPAGE = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { setProject, setCurrentStep } = useProject();
    
    // Project data state
    const [parsedProject, setParsedProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
      // Content state - keeping only what's needed for content display
    const [imagePrompts, setImagePrompts] = useState<string[]>([]);
    const [content, setContent] = useState<string>('');
    const [chapters, setChapters] = useState<any[]>([]);
    
    // Generate content for building markdown content from chapters
    useEffect(() => {
        if (parsedProject) {
            let images: string[] = [];
            if (parsedProject.content?.chapters) {
                parsedProject.content.chapters.forEach((chapter: any) => {
                    // Fix: Use push instead of concat to actually add items to the array
                    if (chapter.images) {
                        images.push(...chapter.images);
                    }
                });
            }
            setImagePrompts(images);
            
            let contentData: string = "";
            if (parsedProject.content?.chapters) {
                parsedProject.content.chapters.forEach((element: any) => {
                    contentData += `## ${element.title}\n`;
                    contentData += element.content + "\n\n";
                });
            }
            setContent(contentData);
        }
    }, [parsedProject]);

    // Fetch project data from API or localStorage
    const getProject = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/project/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching project:', error);
            setError('Failed to load project');
        } finally {
            setIsLoading(false);
        }
    };    // Simplified project loading - just get the data for display
    useEffect(() => {
        const loadProject = async () => {
            if (!id) return;

            try {
                let projectData = null;

                // Fetch from API if not in localStorage
                const apiData = await getProject(id);
                projectData = apiData?.project;

                // If API fetch is successful, set project data
                if (projectData) {
                    const localProjects = localStorage.getItem('projects');
                    if (localProjects) {
                        const projects = JSON.parse(localProjects);
                        const existingProject = projects.find((project: any) => project._id === id);
                        if (existingProject) {
                            projectData = existingProject;
                        }
                    }
                }

                if (!projectData) {
                    // If API fetch fails, try to load from localStorage
                    const localProject = localStorage.getItem('projects');
                    let projects = [];

                    if(!localProject){
                        localStorage.setItem('projects', JSON.stringify([]));
                    } else {
                        projects = JSON.parse(localProject);
                    }
                    projectData = projects.find((project: any) => project._id === id);
                }

                if (!projectData) {
                    setError('Project not found');
                    return;
                }

                setParsedProject(projectData);
                
                // Just set the chapters if available
                if (projectData.content && projectData.content.chapters) {
                    setChapters(projectData.content.chapters);
                } else if (projectData.chapters && projectData.chapters.length > 0) {
                    setChapters(projectData.chapters);
                }
            } catch (error) {
                console.error('Error loading project:', error);
                setError('Failed to load project');
            }
        };

        loadProject();
    }, [id]);// Only need the handleBackToHome and handleContinueBuilding functions now

    const handleBackToHome = () => {
        router.push('/');
    };

    // Handle continue building button click - set project in context and navigate to build page
    const handleContinueBuilding = () => {
        if (parsedProject) {
            // Set project data in context before navigation
            setProject(parsedProject);
            setCurrentStep(parsedProject.currentStep);
            // Navigate to build page
            router.push('/build');
        }
    };

    // Project data object for components that need it
    const projectData = parsedProject ? {
        projectName: parsedProject.title || parsedProject.projectName || '',
        projectDescription: parsedProject.description || parsedProject.projectDescription || '',
        projectCategory: parsedProject.domain || parsedProject.projectCategory || ''
    } : null;

    // Render project content or continue button
    const renderContent = () => {
        // Check if actual content is generated by verifying there are chapters with content
        const contentGenerated = parsedProject?.content?.chapters?.some(
            (chapter: any) => chapter.content && chapter.content.trim() !== ''
        ) || (content && content.trim() !== '');
        
        if (contentGenerated) {
            return (
                <ContentViewer
                    content={content}
                    htmlContent={parsedProject?.htmlContent}
                    chapters={parsedProject?.content?.chapters || chapters}
                    imagePrompts={imagePrompts}
                    projectTitle={parsedProject?.title || parsedProject?.projectName || 'Project'}
                    projectDomain={parsedProject?.domain}
                    projectDescription={parsedProject?.description || parsedProject?.projectDescription}
                    onBack={handleBackToHome}
                    onExport={() => console.log('Export button clicked')}
                />
            );
        } else {
            return (
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
                    <div className="text-center text-white max-w-lg px-6 py-12 bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/30">
                        <h1 className="text-3xl font-bold mb-4">Content Not Generated</h1>
                        <p className="text-gray-300 mb-8">Your project has been started but the content has not been generated yet. Would you like to continue building your project?</p>
                        <button
                            onClick={handleContinueBuilding}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none"
                        >
                            Continue Building
                        </button>
                    </div>
                </div>
            );
        }
    };
    
    // Handle project not found
    const renderNotFound = () => {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-gray-300 mb-6">The requested project could not be loaded.</p>
                    <button
                        onClick={handleBackToHome}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    };    // Removed step indicator component as it's not needed for content-only view// We've removed the step-based rendering in favor of direct content rendering// Simplified render method - content only with no step indicator
    return (
        <>
            {isLoading && <LoadingOverlay />}
            
            {error && (
                <div className="fixed top-0 inset-x-0 p-4 z-50">
                    <div className="bg-red-500 text-white px-4 py-3 rounded shadow-lg mx-auto max-w-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                </div>
            )}

            {parsedProject ? renderContent() : renderNotFound()}
        </>
    );
}

export default PROJECTPAGE