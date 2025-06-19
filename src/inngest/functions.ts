import Project, { IProject } from "@/model/project";
import { inngest } from "./client";
import startProject from "@/utils/start";
import generateChapters from "@/utils/question";
import generateContent from "@/utils/generate";


export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const StartProject = inngest.createFunction(
    { id: "start-project" },
    { event: "project/start" },
    async ({ event, step }) => {
        try {
            const { projectId } = event.data;

            const projectData = await step.run("fetch-project-data", async () => {
                // Simulate fetching project data from a database or external service
                const project = await Project.findById(projectId);
                if (!project) {
                    throw new Error("Project not found");
                }
                return project as IProject;
            });

            const questions = await startProject({
                title: projectData.title,
                description: projectData.description,
                domain: projectData.domain,
            });


            const answersToUpdate = questions.map((question: any) => ({
                question: question,
                answer: "",
            }));

            await step.run("update-project-answers", async () => {
                // Update the project with the answers
                if (questions) {
                    await Project.findByIdAndUpdate(
                        projectId,
                        { $set: { answers: answersToUpdate } },
                        { new: true },
                    );
                }
            });

            return { success: true };

        } catch (error) {
            console.error("Error in StartProject function:", error);
            return { success: false, error: "Failed to start project" };
        }
    }

)

export const GenerateChapters = inngest.createFunction(
    { id: "generate-chapters" },
    { event: "project/generate-chapters" },
    async ({ event, step }) => {
        try {
            const { projectId } = event.data;

            const projectData = await step.run("fetch-project-data", async () => {
                // Simulate fetching project data from a database or external service
                const project = await Project.findById(projectId);
                if (!project) {
                    throw new Error("Project not found");
                }
                return project as IProject;
            });
            const chaptersResponse = await generateChapters({
                projectData: {
                    title: projectData.title,
                    description: projectData.description,
                    domain: projectData.domain,
                },
                answers: projectData.answers,
            });

            if (!chaptersResponse || !chaptersResponse.chapters || chaptersResponse.chapters.length === 0) {
                throw new Error("No chapters generated");
            }

            const chapters = chaptersResponse.chapters;

            await step.run("update-project-chapters", async () => {
                if (chapters) {
                    await Project.findByIdAndUpdate(
                        projectId,
                        { $set: { chapters: chapters } },
                        { new: true },
                    );
                }
            }
            );

            return { success: true };

        } catch (error) {
            console.error("Error in GenerateChapters function:", error);
            return { success: false, error: "Failed to generate chapters" };
        }
    }
)

