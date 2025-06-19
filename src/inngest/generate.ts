import Project, { IProject } from "@/model/project";
import { inngest } from "./client";
import generateContent from "@/utils/generate";
import { uploadProjectContent } from "@/services/ProjectServices";

export const GenerateContent = inngest.createFunction(
    { id: "generate-content" },
    { event: "project/generate-content" },
    async ({ event, step }) => {
        try {
            const { projectId } = event.data;

            const chaptersWithContent: {
                title: string;
                description: string;
                content: string;
                images: string[];
                chapterNo: number;
            }[] = [];

            // Step 1: Fetch project data using deterministic step
            const projectData = await step.run("fetch-project-data", async () => {
                const project = await Project.findById(projectId);
                if (!project) throw new Error("Project not found");
                return project as IProject;
            });            // Use existing chapters
            const chaptersToGenerate = projectData.chapters;
            console.log(`📚 Found ${chaptersToGenerate.length} chapters to generate content for`);
            if (chaptersToGenerate.length === 0) {
                throw new Error("No chapters to generate content for");
            }

            // Prepare chapter data for content generation
            chaptersToGenerate.forEach((ch, index) => {
                const chapterData = {
                    title: ch.title,
                    description: ch.description,
                    chapterNo: index,
                };
                chaptersWithContent.push({
                    ...chapterData,
                    content: "",
                    images: [],
                });
            });            // Validate chapters before content generation
            for (const chapter of chaptersWithContent) {
                if (!chapter.title || !chapter.description) {
                    throw new Error("Chapter title or description is missing");
                }
            }

            // Generate content for all chapters sequentially (not using step.run)
            console.log(`🔄 Starting content generation for ${chaptersWithContent.length} chapters`);
            
            for (let i = 0; i < chaptersWithContent.length; i++) {
                const chapter = chaptersWithContent[i];
                console.log(`🚀 Generating content for chapter ${chapter.chapterNo} (${i + 1}/${chaptersWithContent.length})`);
                
                const content = await generateContent({
                    projectInfo: {
                        title: chapter.title,
                        description: chapter.description,
                        domain: projectData.domain
                    },
                    answers: projectData.answers,
                    chapterData: {
                        index: chapter.chapterNo,
                        title: chapter.title,
                        description: chapter.description
                    }
                });
                
                if (!content) {
                    throw new Error(`Failed to generate content for chapter ${chapter.chapterNo}`);
                }

                const imagePrompts: string[] = [];
                const processedContent = String(content);

                // Process image tags deterministically
                const cleanedContent = processedContent.replace(
                    /\[IMAGE:\s*([^\]]+)\]/g,
                    (_match: string, desc: string) => {
                        imagePrompts.push(desc.trim());
                        return `*[Image: ${desc.trim()}]*`;
                    }
                );

                // Update the chapter with generated content
                chaptersWithContent[i] = {
                    ...chapter,
                    content: cleanedContent,
                    images: imagePrompts
                };

                console.log(
                    `✅ Chapter ${chapter.chapterNo} completed - Length: ${cleanedContent.length}, Images: ${imagePrompts.length}`
                );
            }

            console.log(`✅ All ${chaptersWithContent.length} chapters content generation completed`);

            // Upload the JSON file to Azure Blob Storage
            await step.run("upload-project-json", async () => {
                // Prepare project data for JSON upload
                const projectForUpload = {
                    project: {
                        _id: projectData._id.toString(),
                        title: projectData.title,
                        description: projectData.description,
                        domain: projectData.domain,
                        answers: projectData.answers,
                        chapters: chaptersWithContent, // Full chapters with content for the JSON file
                        createdAt: projectData.createdAt,
                        updatedAt: new Date()
                    }
                };

                // Convert the project data to a JSON string and then to a buffer
                const jsonContent = JSON.stringify(projectForUpload, null, 2);
                const contentBuffer = Buffer.from(jsonContent);

                const fileName = `project-${projectData._id.toString()}.json`;
                const uploadedProject = await uploadProjectContent(
                    projectId,
                    contentBuffer,
                    fileName,
                    "application/json"
                );
                
                // Prepare chapters without content for DB update
                const chaptersForDb = projectData.chapters.map((ch, index) => {
                    return {
                        _id: ch._id,
                        title: ch.title,
                        description: ch.description,
                        chapterNo: index + 1
                    };
                });
                
                // Update project with content URL but don't save content in chapters
                await Project.updateOne(
                    { _id: projectId },
                    { 
                        $set: { 
                            chapters: chaptersForDb,
                            fileUrl: uploadedProject.url,
                            currentStep: "content"
                        } 
                    }
                );

                return { url: uploadedProject.url };
            });

            return { success: true };

        } catch (error) {
            console.error("❌ Error in GenerateContent function:", error);
            return {
                success: false,
                error: (error as Error).message || "Failed to generate content",
            };
        }
    }
)