import { createAgent, gemini } from "@inngest/agent-kit"

const dummyProjectQuestions = [
    "Given the decentralized nature of MediChain, what specific blockchain platform(e.g., Ethereum, Hyperledger Fabric, Corda) are you considering, and why ? How will scalability and transaction throughput be addressed for high volumes of medical records ?",
    "Beyond basic record access, what specific use cases and functionalities will MediChain support ? For example, are there plans for secure data aggregation for research purposes or interoperability with existing EMR systems ? How can we prioritize these use cases based on projected user demand and business value ?",
    "Who are the primary target users(patients, doctors, hospitals) and how will each interact with the MediChain platform ? Specifically, what are their anticipated workflows, required functionalities, and potential pain points that MediChain needs to address ?",
    "What existing data formats and standards(e.g., HL7, FHIR) must MediChain support for seamless interoperability with existing healthcare systems ? How will data transformation and mapping be handled across disparate systems to ensure accurate and consistent data transfer ?",
    "What are the key performance indicators(KPIs) that will be used to measure the success of MediChain in terms of security, data integrity, user adoption, and system performance(response time, transaction speed, etc.) ?",
    "What regulatory considerations and compliance requirements(e.g., HIPAA, GDPR) need to be addressed in the design and implementation of MediChain, and how will these be integrated into the system architecture ?",
    "Considering the potential complexities of interfacing with various healthcare providers, what are your current plans for testing the platform's interoperability with different types of EMR systems and patient portals? What are the timelines and milestones involved for this testing phase?"
]

const startProject = async ({ title, description, domain }: { title: string, description: string, domain: string }) => {

    // return dummyProjectQuestions;

    const supportAgent = createAgent({
        model: gemini({
            model: "gemini-1.5-flash-8b",
            apiKey: process.env.GEMINI_API_KEY,
        }),
        name: "AI Project Starter Assistant",
        system: `You are an expert project file maker and strategic planning assistant, skilled at analyzing project briefs to identify missing details, clarify requirements, and guide project development. Based on the provided project information — including the title, domain/category, and description — your task is to generate a set of 5 to 7 intelligent, specific, and actionable follow-up questions that will help refine and expand the scope of the project.

Your questions should serve the following purposes:
1. Clarify technical requirements, such as technologies, integrations, or system architecture.
2. Understand the target audience more deeply, including their needs, goals, and potential use cases.
3. Help define the project scope and prioritize features based on the project's objectives.
4. Identify any challenges, risks, constraints, or dependencies that should be addressed early.
5. Explore implementation details, such as tools, workflows, platforms, or team responsibilities.
Each question must be context-aware, directly relevant to the input project details, and phrased to encourage meaningful and insightful responses. Avoid vague or generic questions. Return the final list of questions as a JSON array of strings, with each string containing one clearly written question.`
    })

    const response =
        await supportAgent.run(`Based on the provided project details, generate a list of 5 to 7 insightful and targeted follow-up questions aimed at refining and expanding the project's scope.
Project Information:
Title: ${title}
Domain/Category: ${domain}
Description: ${description}
The questions should be:
-Specific to the context and purpose of the project
-Designed to uncover assumptions, clarify ambiguity, and improve planning
-Framed to support the following goals:
--Clarify technical requirements and system architecture
--Understand the target audience and user needs more deeply
--Help define and prioritize the project scope and key features
--Identify potential challenges, constraints, or dependencies
--Explore viable implementation details, tools, or workflows
Return the questions as a JSON array of strings. Ensure each question is:
-Actionable and relevant
-Free from generic phrasing
-Adapted to the context of the project description

The final output should be returned as a JSON array of strings, where each string is a single well-formed question designed to facilitate productive discussion and informed decision-making.`);

    const firstMessage = response.output[0];
    const raw = firstMessage?.type === "text" ? (firstMessage?.content as string) : "";
    // const raw = "```json\n" + firstMessage + "\n```"
    // FIXME: The above line is a placeholder for the actual response content from the AI agent.


    try {

        const isMatch = raw.match(/```json\s*([\s\S]*?)\s*```/i)
        const jsonString = isMatch ? isMatch[1] : raw;
        // const jsonString ="";
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error parsing JSON response:", error);
        // throw new Error("Failed to parse AI response");
        return null
    }

}



export default startProject;