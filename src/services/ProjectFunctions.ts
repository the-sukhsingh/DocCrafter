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
   * Retrieves fallback chapters when API fails
   * @returns Array of default chapter outlines
   */
  public static getFallbackChapters(): ChapterOutline[] {
    return [...this.DEFAULT_CHAPTERS];
  }

}