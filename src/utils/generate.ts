import { createAgent, gemini } from "@inngest/agent-kit"

const generateContent = async ({ projectInfo, answers, chapterData }: { projectInfo: { title: string, description: string, domain: string }, answers: Array<{ question: string, answer: string }>, chapterData: { index: number, title: string, description: string } }) => {
  try {

    const supportAgent = createAgent({
      model: gemini({
        model: "gemini-2.0-flash",
        apiKey: process.env.GEMINI_API_KEY,
      }),
      name: "AI Project Starter Assistant",
      system: `You are a professional technical writer and subject matter expert skilled in creating in-depth, academically formatted project report chapters. Your task is to write a comprehensive, well-structured, and technically sound chapter for a professional project report, based on detailed project information, user-provided context, and a specific chapter brief.
You will receive:
The project information, including the title, domain/category, and a description
Additional user responses or contextual notes, providing further insights or specifications
A chapter brief, including the title and a short description of the chapter’s purpose
Your output must meet the following criteria:
Write a detailed chapter ranging between 1500 to 2500 words
Maintain a professional and academic tone, appropriate for the project’s domain
Incorporate relevant technical concepts, tools, methods, or frameworks tied to the subject matter
Use markdown formatting with clear structure:
Use ### for main sections and #### for subsections
Format lists, code blocks, and inline emphasis appropriately
When applicable, describe visual elements using the format:
[IMAGE: Description of diagram/chart that would appear here]
Include practical examples, case studies, implementation insights, or best practices where relevant
Ensure that the chapter flows logically and connects to the overall goals of the project
Do not include the main chapter title as a top-level heading — start directly with the content
Important: Return only the markdown content of the chapter. Do not wrap it in any JSON or additional commentary. The first paragraph should act as an introduction to the chapter, followed by appropriately structured sections.
Your writing should reflect deep understanding of the topic, clear communication, and technical accuracy appropriate for a formal project report.`})

    const answersText = answers.map((qa, index) =>
      `**Q${index + 1}:** ${qa.question}\n**A:** ${qa.answer}`
    ).join("\n\n");

    const response =
      await supportAgent.run(`You are a professional technical writer with expertise in crafting detailed, well-structured project report chapters. Your task is to write a comprehensive and technically sound chapter based on the provided inputs, which include the project title "${projectInfo.title}", domain/category "${projectInfo.domain}", and description "${projectInfo.description}", along with additional user-provided context: ${answersText}. The chapter to write is Chapter ${chapterData.index + 1}: ${chapterData.title}, described as "${chapterData.description}". The content should be between 1500–2500 words, written in a formal academic tone appropriate for the ${projectInfo.domain} domain. It must be clearly organized using markdown, with ### for main sections and #### for subsections. Include detailed technical information, relevant methodologies, best practices, and both theoretical and practical insights. Where appropriate, incorporate real-world examples, case studies, and visual aids using the format [IMAGE: Description]. Ensure the content flows logically, with each subsection building on the previous one, and maintain a clear connection to the project’s overall goals. Use correct markdown formatting for lists, code blocks, bold or italic text, and other elements to enhance clarity and readability. Return only the markdown content of the chapter. Do not include the chapter title as a top-level header, as it will be added automatically. Begin with an introductory paragraph, followed by well-structured and clearly labeled sections and subsections.`);
    const firstMessage = response.output[0];
    const raw = firstMessage?.type === "text" ? (firstMessage?.content as string) : "";


    const isMatch = raw.match(/```json\s*([\s\S]*?)\s*```/i)
    const jsonString = isMatch ? isMatch[1] : raw;
    return jsonString;

  } catch (error) {
    console.error("Error parsing JSON response:", error);
    // throw new Error("Failed to parse AI response");
    return null
  }

}

export default generateContent;