import { createAgent, gemini } from "@inngest/agent-kit"

interface ChapterOutline {
  title: string;
  description: string;
}

const dummyProjectChapterOutline: ChapterOutline[] = [
  {
    title: "Introduction and Project Overview: EcoLocal – A Sustainable Living Marketplace",
    description: "This chapter introduces EcoLocal, outlining its purpose, goals, and the context of the project within the sustainable living domain.  It will provide a high-level overview of the platform's functionalities and target users, setting the stage for the subsequent chapters.",
  },
  {
    title: "Technical Specifications and Methodology:  Platform Architecture and Technology Stack",
    description: "This chapter details the chosen technological stack for EcoLocal, including programming languages, database systems, APIs, and cloud deployment strategy.  It will document the rationale behind selecting specific technologies and illustrate the architecture diagram, outlining the communication flow between various components.",
  },
  {
    title: "Implementation Details: EcoLocal's Development Approach",
    description: "This chapter elaborates on the implementation process, outlining the development phases for the marketplace, directory, and community events modules. It will describe the design choices, the sequence of development tasks, and the chosen methodology (e.g., Agile).",
  },
  {
    title: "Transaction Processing and Payment Integration: Secure Financial Transactions",
    description: "This chapter focuses specifically on the transaction and payment handling mechanisms for EcoLocal's marketplace. It will detail the integration process with selected payment gateways, security protocols, and the escrow mechanism to secure transactions for users and businesses.",
  },
  {
    title: "User Onboarding and Educational Content: Fostering Sustainable Practices",
    description: "This chapter details the user onboarding process and the integration of educational resources within EcoLocal. It will outline the content curation strategy, accessibility of educational materials, and the planned mechanisms for user engagement with these resources to promote sustainable living practices.",
  },
  {
    title: "Conclusion and Future Enhancements: Looking Ahead for EcoLocal",
    description: "This chapter summarizes the project's achievements and contributions to the sustainable living community.  It will highlight lessons learned during the project lifecycle and outline potential future enhancements, feature additions, and research directions to enhance EcoLocal's long-term impact and sustainability.",
  }
]

const generateChapters = async ({ projectData, answers }: { projectData: { title: string, description: string, domain: string }, answers: Array<{ question: string, answer: string }> }) => {

  // return {chapters: dummyProjectChapterOutline}

    const supportAgent = createAgent({
        model: gemini({
            model: "gemini-1.5-flash-8b",
            apiKey: process.env.GEMINI_API_KEY,
        }),
        name: "AI Project Starter Assistant",
        system: `You are an experienced technical report writer and academic project documentation expert. Your role is to generate a clear, professional, and comprehensive chapter-wise outline for a project report, based on the provided project details and the user's responses to follow-up questions. The outline you produce should be well-structured, relevant to the domain, and aligned with standard academic or professional reporting practices.

You will receive two key inputs:
-Project Details, including the title, domain/category, and description of the project.
-User Responses, which contain additional context, clarifications, and preferences gathered through a follow-up question process.
Your task is to analyze both inputs and generate a complete project report outline, broken down into clearly defined chapters. Each chapter should include:
-A concise and descriptive title
-A brief explanation (1–2 sentences) describing what the chapter will cover and its purpose within the report.
Ensure the outline includes standard and appropriate chapters for technical or research-based projects, such as:
-Introduction and project overview
-Requirements analysis
-Technical specifications or methodology
-Implementation details or system design
-Testing and validation (if applicable)
-Results and deliverables
-Conclusion and future enhancements

Output your response strictly as a JSON object in the following format:
{
  "chapters": [
    {
      "title": "Chapter Title",
      "description": "Brief description of what this chapter will cover"
    }
  ]
}
Make sure all chapter titles are informative and the descriptions are tailored to the provided project context. Avoid generic content—your outline should reflect the specific nature of the project and the goals expressed by the user.`
    })
  const answersText = answers.map((qa, index) =>
    `${index + 1}. ${qa.question}\n   Answer: ${qa.answer}`
  ).join('\n\n');


    const response =
      await supportAgent.run(`Based on the following project information and the corresponding user responses to follow-up questions, generate a comprehensive and professional chapter-wise outline for a project report. The goal is to create a structured, domain-appropriate outline that reflects both the technical aspects and user-defined requirements of the project.
PROJECT DETAILS:
Title: ${projectData.title}
Domain/Category: ${projectData.domain}
Description: ${projectData.description}
USER RESPONSES TO FOLLOW-UP QUESTIONS:
${answersText}
Using the information above, analyze the project context and user intentions to generate a well-organized outline that includes clearly labeled chapters. Each chapter should contain:
A clear and descriptive title
A brief description (1–2 sentences) explaining the chapter’s purpose and what content it will cover
The outline should be tailored to the specific nature and goals of the project while also adhering to general project report structure standards. Include chapters commonly expected in academic or technical project reports, such as:
Introduction and Project Overview
Requirements Analysis
Technical Specifications or Methodology
Implementation Details or Approach
Testing and Validation (if applicable)
Results and Deliverables
Conclusion and Future Work
Return the final output strictly as a JSON object in the format below:

{
  "chapters": [
    {
      "title": "Chapter Title",
      "description": "Brief description of what this chapter will cover"
    }
  ]
}
Ensure all chapter titles are informative and specific to the project context. Avoid vague or generic phrasing. The descriptions should clearly convey the purpose and scope of each chapter in the context of the given project.`)

    const firstMessage = response.output[0];
    const raw = firstMessage?.type === "text" ? (firstMessage?.content as string) : "";

    try {

        const isMatch = raw.match(/```json\s*([\s\S]*?)\s*```/i)
        const jsonString = isMatch ? isMatch[1] : raw;
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error parsing JSON response:", error);
        // throw new Error("Failed to parse AI response");
        return null
    }

}



export default generateChapters;