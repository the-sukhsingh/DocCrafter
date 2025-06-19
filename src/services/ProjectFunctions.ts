import { IProject } from "@/model/project";

type ProjectData = {
    projectName: string;
    projectDescription: string;
    projectCategory: string;
}

type QuestionData = {
    question: string;
    answer: string;
}

type ChapterOutline = {
    title: string;
    description: string;
    chapterNo?: number;
    content?: string;
    images?: string[];
}

interface ChapterContent {
    title: string;
    content: string;
    imagePrompts: string[];
}

interface GeneratedContent {
    content: string;
    htmlContent?: string;
    chapters: ChapterContent[];
    imagePrompts: string[];
}
  

/**
 * Manages API interactions and data processing for the project management lifecycle
 */
export class ProjectService {
  private static API_ENDPOINTS = {
    START: '/api/start',
    QUESTIONS: '/api/questions',
    GENERATE: '/api/generate',
    PROJECT_STATUS: '/api/project-status',
  };

  private static DEFAULT_QUESTIONS = [
    "What is your target audience for this project?",
    "What key features are most important to you?",
    "Do you have any specific technical requirements or constraints?",
    "What is your expected timeline for this project?",
    "How do you plan to measure the success of this project?"
  ];

  private static DEFAULT_CHAPTERS = [
    {
      title: "Introduction",
      description: "Project overview and objectives"
    },
    {
      title: "Literature Review",
      description: "Review of existing research and solutions"
    },
    {
      title: "Methodology",
      description: "Approach and methods used in the project"
    }
  ];

  /**
   * Creates a new project and initiates question generation
   * 
   * @param data Project data with title, description and domain
   * @returns Promise with project ID if successful
   */
  public static async createProject(data: ProjectData): Promise<{ 
    success: boolean; 
    project?: IProject; 
    
    error?: string; 
  }> {
    try {
      const response = await fetch(this.API_ENDPOINTS.START, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.projectName,
          domain: data.projectCategory,
          description: data.projectDescription,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { 
          success: false, 
          error: result.error || 'Failed to create project' 
        };
      }

      return { 
        success: true, 
        project: result.project
      };
    } catch (error) {
      console.error('Project creation failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  /**
   * Submits questions and answers and triggers chapter generation
   * 
   * @param projectId The project identifier
   * @param questionData Array of questions and answers
   * @returns Promise with success status
   */
  public static async submitQuestionsAndGenerateChapters(
    projectId: string,
    questionData: QuestionData[]
  ): Promise<{ 
    success: boolean; 
    error?: string; 
  }> {
    try {

      // Then trigger chapter generation
      const response = await fetch(this.API_ENDPOINTS.QUESTIONS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: projectId,
          answers: questionData,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { 
          success: false, 
          error: data.error || 'Failed to generate chapters' 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Question submission failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  /**
   * Generates content based on project chapters
   * 
   * @param projectId The project identifier
   * @param chapters Array of chapter outlines
   * @returns Promise with success status
   */
  public static async generateProjectContent(
    projectId: string,
    chapters: ChapterOutline[]
  ): Promise<{ 
    success: boolean; 
    error?: string; 
  }> {
    try {
      const response = await fetch(this.API_ENDPOINTS.GENERATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          chapters
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { 
          success: false, 
          error: result.error || 'Failed to generate content' 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Content generation failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  /**
   * Polls project status until completion or timeout
   * 
   * @param projectId The project identifier
   * @param expectedStage The stage to wait for completion ('questions'|'chapters'|'content')
   * @param options Configuration options for polling
   * @returns Promise resolving to the polling result
   */
  public static async pollProjectStatus(
    projectId: string,
    expectedStage: 'questions' | 'chapters' | 'content',
    options: {
      maxAttempts?: number;
      interval?: number;
      onProgress?: (progress: number) => void;
    } = {}
  ): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    const maxAttempts = options.maxAttempts || 30; // Default: 30 attempts
    const interval = options.interval || 7000; // Default: 7 seconds
    let attempts = 0;
    
    return new Promise((resolve) => {
      const timer = setInterval(async () => {
        try {
          attempts++;
          
          // Calculate and report progress
          if (options.onProgress) {
            const progress = Math.min(20 + (attempts / maxAttempts) * 70, 90);
            options.onProgress(progress);
          }

          const response = await fetch(`${this.API_ENDPOINTS.PROJECT_STATUS}?projectId=${projectId}`);
          
          if (!response.ok) {
            console.error('Failed to check project status:', response.statusText);
            return;
          }

          const result = await response.json();
          
          if (result.success && result.status) {
            let completed = false;
            let data = null;
            
            // Check if the expected stage is completed
            switch (expectedStage) {
              case 'questions':
                if (result.status.questionsGenerated && result.status.questions && result.status.questions.length > 0) {
                  data = result.status.questions.map((q: any) => q.question);
                  completed = true;
                }
                break;
              
              case 'chapters':
                if (result.status.chaptersGenerated && result.status.chapters && result.status.chapters.length > 0) {
                  data = result.status.chapters;
                  completed = true;
                }
                break;
              
              case 'content':
                if (result.status.contentGenerated && result.project) {
                  data = {project: result.project};
                  completed = true;
                }
                break;
            }

            if (completed) {
              clearInterval(timer);
              if (options.onProgress) options.onProgress(100);
              resolve({ success: true, data });
              return;
            }
          }

          if (attempts >= maxAttempts) {
            clearInterval(timer);
            if (options.onProgress) options.onProgress(0);
            resolve({ 
              success: false, 
              error: 'Generation timeout - please try again' 
            });
          }
        } catch (error) {
          console.error('Error polling project status:', error);
          attempts++;
          
          if (attempts >= maxAttempts) {
            clearInterval(timer);
            if (options.onProgress) options.onProgress(0);
            resolve({ 
              success: false, 
              error: 'Connection error - please try again' 
            });
          }
        }
      }, interval);
    });
  }

  /**
   * Checks if the project has the necessary data to proceed to the next step
   * This method continuously checks the project status until the expected content is available
   *
   * @param projectId The project identifier
   * @param currentStep The current step in the workflow
   * @param options Configuration options for polling
   * @returns Promise resolving to the project data needed for the next step
   */
  public static async checkProjectReadiness(
    projectId: string,
    currentStep: 'start' | 'questions' | 'chapters' | 'content',
    options: {
      maxAttempts?: number;
      interval?: number;
      onProgress?: (progress: number) => void;
      onStepReady?: (nextStep: string, data: any) => void;
    } = {}
  ): Promise<{
    success: boolean;
    nextStep?: 'questions' | 'chapters' | 'content';
    data?: any;
    error?: string;
  }> {
    if (!projectId) {
      return { success: false, error: 'No project ID provided' };
    }

    const maxAttempts = options.maxAttempts || 30; // Default: 30 attempts
    const interval = options.interval || 7000;    // Default: 7 seconds
    let attempts = 0;
    
    return new Promise((resolve) => {
      const timer = setInterval(async () => {
        try {
          attempts++;
          
          // Calculate and report progress
          if (options.onProgress) {
            const progress = Math.min(10 + (attempts / maxAttempts) * 80, 90);
            options.onProgress(progress);
          }

          const response = await fetch(`${this.API_ENDPOINTS.PROJECT_STATUS}?projectId=${projectId}`);
          
          if (!response.ok) {
            console.error('Failed to check project status:', response.statusText);
            
            if (attempts >= maxAttempts) {
              clearInterval(timer);
              resolve({ 
                success: false, 
                error: 'Failed to check project status' 
              });
            }
            return;
          }

          const result = await response.json();
          console.log('Project status check result:', result);
          if (result.success && result.status) {
            const status = result.status;
            let nextStep = null;
            let stepData = null;
            
            // Check which step the project is ready for based on current step
            switch (currentStep) {
              case 'start':
                if (status.questionsGenerated && status.questions && status.questions.length > 0) {
                  nextStep = 'questions';
                  stepData = {
                    questions: status.questions,
                    project: result.project
                  };
                }
                break;
              
              case 'questions':
                if (status.chaptersGenerated && status.chapters && status.chapters.length > 0) {
                  nextStep = 'chapters';
                  stepData = {
                    chapters: status.chapters,
                    project: result.project
                  };
                }
                break;
              
              case 'chapters':
                if (status.contentGenerated && status.contentUrl) {
                  nextStep = 'content';
                  stepData = {
                    contentUrl: status.contentUrl,
                    project: result.project
                  };
                }
                break;
            }
            console.log('Project status:', status);
            console.log('Next step:', nextStep, 'with data:', stepData);
            if (nextStep) {
              clearInterval(timer);
              if (options.onProgress) options.onProgress(100);
              if (options.onStepReady) options.onStepReady(nextStep, stepData);
              
              resolve({
                success: true,
                nextStep: nextStep as 'questions' | 'chapters' | 'content',
                data: stepData
              });
              return;
            }
          }

          if (attempts >= maxAttempts) {
            clearInterval(timer);
            if (options.onProgress) options.onProgress(0);
            resolve({ 
              success: false, 
              error: 'Generation timeout - please try again' 
            });
          }
        } catch (error) {
          console.error('Error checking project readiness:', error);
          attempts++;
          
          if (attempts >= maxAttempts) {
            clearInterval(timer);
            resolve({ 
              success: false, 
              error: 'Connection error - please try again' 
            });
          }
        }
      }, interval);
    });
  }

  /**
   * Retrieves fallback questions when API fails
   * @returns Array of default questions
   */
  // public static getFallbackQuestions(): string[] {
  //   return [...this.DEFAULT_QUESTIONS];
  // }

  /**
   * Retrieves fallback chapters when API fails
   * @returns Array of default chapter outlines
   */
  public static getFallbackChapters(): ChapterOutline[] {
    return [...this.DEFAULT_CHAPTERS];
  }

  /**
   * Loads project data from localStorage
   * @returns Parsed project data or null if not found/invalid
   */
  public static loadProjectFromLocalStorage(): any | null {
    try {
      const storedProject = localStorage.getItem("Project");
      if (!storedProject) return null;
      
      return JSON.parse(storedProject);
    } catch (error) {
      console.error('Error loading project data:', error);
      return null;
    }
  }

  /**
   * Processes chapter content into a formatted output
   * 
   * @param project The project metadata
   * @param chapterContents Array of chapter contents
   * @returns Processed and formatted content
   */
  public static processChapterContent(
    project: {
      title: string;
      domain: string;
      description: string;
    },
    chapterContents: ChapterContent[]
  ): GeneratedContent {
    try {
      let fullContent = '';
      const imagePrompts: string[] = [];
      
      // Build content from individual chapters
      chapterContents.forEach((chapter, index) => {
        fullContent += `## ${index + 1}. ${chapter.title}\n\n${chapter.content}\n\n`;
        
        if (chapter.imagePrompts && chapter.imagePrompts.length > 0) {
          imagePrompts.push(...chapter.imagePrompts);
        }
      });
      
      // Generate HTML representation
      const htmlContent = this.generateFullHTML(project, chapterContents);
      
      return {
        content: this.cleanMarkdownContent(fullContent),
        htmlContent,
        chapters: chapterContents,
        imagePrompts
      };
    } catch (error) {
      console.error('Error processing chapter content:', error);
      return {
        content: '',
        chapters: [],
        imagePrompts: []
      };
    }
  }
  
  /**
   * Cleans markdown content for consistent formatting
   * 
   * @param content The markdown content to clean
   * @returns Cleaned markdown content
   */
  private static cleanMarkdownContent(content: string): string {
    // Remove extra line breaks and normalize spacing
    return content
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
  
  /**
   * Generates full HTML document from project and chapter contents
   * 
   * @param project The project metadata
   * @param chapters Array of chapter contents
   * @returns HTML document as string
   */
  public static generateFullHTML(
    project: {
      title: string;
      domain: string;
      description: string;
    },
    chapters: ChapterContent[]
  ): string {
    // Convert markdown to HTML (simplified version)
    const markdownToHTML = (md: string) => {
      return md
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br />');
    };
    
    let chaptersHTML = '';
    chapters.forEach((chapter, index) => {
      chaptersHTML += `
        <div class="chapter">
          <h2>${index + 1}. ${chapter.title}</h2>
          <div class="content">
            ${markdownToHTML(chapter.content)}
          </div>
        </div>
      `;
    });
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${project.title}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 { color: #2c3e50; }
          h2 { color: #3498db; border-bottom: 1px solid #eee; padding-bottom: 10px; }
          h3 { color: #2980b9; }
          .chapter { margin-bottom: 40px; }
        </style>
      </head>
      <body>
        <h1>${project.title}</h1>
        <p><strong>Domain:</strong> ${project.domain}</p>
        <p><strong>Description:</strong> ${project.description}</p>
        <div class="chapters">
          ${chaptersHTML}
        </div>
      </body>
      </html>
    `;
  }
}