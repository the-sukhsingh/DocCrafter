"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProjectService } from '../services/ProjectFunctions';
import { IProject } from '@/model/project';

// Define types based on ProjectFunctions.ts
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

// Loading state type for different API operations
type LoadingState = {
  isLoading: boolean;
  message: string;
  progress?: number;
}

// Expanded context type with additional properties and functions
type ProjectContextType = {
  projectId: string | null;
  projectName: string | null;
  projectDescription: string | null;
  projectCategory: string | null;
  questions: QuestionData[];
  chapters: ChapterOutline[];
  isLoading: boolean;
  images: string[]; // If you need to manage images separately
  loadingState: LoadingState | null;
  error: string | null;
  currentStep: StepType;
  setProject: (project: IProject) => void;
  setCurrentStep: (step: StepType) => void;
  setChapters: (chapters: ChapterOutline[]) => void;
  clearProject: () => void;
  createProject: (data: ProjectData) => Promise<{ success: boolean; project?: IProject; error?: string }>;
  submitQuestionsAndGenerateChapters: (questionData: QuestionData[]) => Promise<{ success: boolean; error?: string }>;
  generateProjectContent: (chapters: ChapterOutline[]) => Promise<{ success: boolean; error?: string }>;
};

// Types for steps in the project flow
type StepType = 'start' | 'questions' | 'chapters' | 'content';

// Create the context with default values
const ProjectContext = createContext<ProjectContextType>({
  projectId: null,
  projectName: null,
  projectDescription: null,
  projectCategory: null,
  questions: [],
  chapters: [],
  isLoading: false,
  loadingState: null,
  error: null,
  images: [],
  currentStep: 'start',
  setProject: () => { },
  setCurrentStep: () => { },
  clearProject: () => { },
  setChapters: () => { },
  createProject: async () => ({ success: false }),
  submitQuestionsAndGenerateChapters: async () => ({ success: false }),
  generateProjectContent: async () => ({ success: false }),
});

// Create a custom hook to use the context
export const useProject = () => useContext(ProjectContext);

// Provider component
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [projectDescription, setProjectDescription] = useState<string | null>(null);
  const [projectCategory, setProjectCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [images, setImages] = useState<string[]>([]); // If you need to manage images separately
  const [chapters, setChapters] = useState<ChapterOutline[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<LoadingState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<StepType>('start');


  // Set project details
  const setProject = (project: IProject) => {
    console.log("Setting project:", project);
    setProjectId(project._id.toString());
    setProjectName(project.title);
    setProjectDescription(project.description);
    setProjectCategory(project.content ? project.content.domain || project.domain : project.domain);
    setQuestions(project.answers || []);
    setChapters(project.content ? project.content.chapters || project.chapters || [] : []);

    const imagePrompts = project.content ? project.content.chapters.map(chapter => chapter.images || []).flat() : [];
    console.log("Setting images from project content:", imagePrompts);
    setImages(imagePrompts);



  };

  // Clear project data
  const clearProject = () => {
    setProjectId(null);
    setProjectName(null);
    setProjectDescription(null);
    setProjectCategory(null);
    setQuestions([]);
    setChapters([]);
    setError(null);
    setLoadingState(null);
  };

  const setNextStep = (step: StepType) => {
    setCurrentStep(step);
  }


  // Start loading with a specific message
  const startLoading = (message: string, initialProgress?: number) => {
    setIsLoading(true);
    setLoadingState({
      isLoading: true,
      message,
      progress: initialProgress || 0
    });
  };

  // Update loading progress
  const updateLoadingProgress = (progress: number) => {
    setLoadingState(prev =>
      prev ? { ...prev, progress } : { isLoading: true, message: "Processing...", progress }
    );
  };

  // Stop loading
  const stopLoading = () => {
    setIsLoading(false);
    setLoadingState(null);
  };
  // Create new project using the ProjectService
  const createProject = async (data: ProjectData) => {
    startLoading("Creating your project...", 10);
    setError(null);

    try {
      const result = await ProjectService.createProject(data);

      if (result.success && result.project) {
        setProject(result.project);
        updateLoadingProgress(40);

        // Check if the project is ready to proceed to questions step
        setLoadingState(prev =>
          prev ? { ...prev, message: "Preparing questions for your project..." } : null
        );
        console.log("Project created successfully:", result.project);
        const pollResult = await Promise.resolve(await ProjectService.pollProjectStatus(
          result.project._id.toString(),
          'questions',
          {
            onProgress: (progress) => {
              updateLoadingProgress(40 + progress * 0.6); // Scale progress from 40% to 100%
            }
          }
        ));
        console.log("Poll result:", pollResult);
        if (pollResult.success && pollResult.data) {
          if (pollResult.data.length > 0) {
            setQuestions(pollResult.data.map((q: string) => ({ question: q, answer: '' })));
            setNextStep('questions');
          }
        } else if (pollResult.error) {
          setError(pollResult.error);
        }

        updateLoadingProgress(100);
      } else if (result.error) {
        setError(result.error);
      }

      stopLoading();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error creating project';
      setError(errorMessage);
      stopLoading();
      return { success: false, error: errorMessage };
    }
  };
  // Submit questions and generate chapters
  const submitQuestionsAndGenerateChapters = async (questionData: QuestionData[]) => {
    if (!projectId) {
      return { success: false, error: 'No active project found' };
    }

    startLoading("Submitting answers and generating chapters...", 15);
    setError(null);
    setQuestions(questionData);

    try {
      const result = await ProjectService.submitQuestionsAndGenerateChapters(
        projectId,
        questionData
      );

      if (result.success) {
        updateLoadingProgress(40);
        setLoadingState(prev =>
          prev ? { ...prev, message: "Generating chapters based on your responses..." } : null
        );

        // Poll until chapters are ready
        const pollResult = await ProjectService.pollProjectStatus(
          projectId,
          'chapters',
          {
            onProgress: (progress) => {
              updateLoadingProgress(40 + progress * 0.6); // Scale progress from 40% to 100%
            }
          }
        );

        if (pollResult.success && pollResult.data) {
          if (pollResult.data.length > 0) {
            setChapters(pollResult.data);
            setNextStep('chapters');
          }
        } else if (pollResult.error) {
          setError(pollResult.error);
        }
      } else if (result.error) {
        setError(result.error);
      }

      stopLoading();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error submitting questions';
      setError(errorMessage);
      stopLoading();
      return { success: false, error: errorMessage };
    }
  };
  // Generate project content based on chapters
  const generateProjectContent = async (chapterOutlines: ChapterOutline[]) => {
    if (!projectId) {
      return { success: false, error: 'No active project found' };
    }

    startLoading("Generating project content...", 10);
    setError(null);
    setChapters(chapterOutlines);

    try {
      const result = await ProjectService.generateProjectContent(
        projectId,
        chapterOutlines
      );

      // If successful, poll for content readiness
      if (result.success) {
        updateLoadingProgress(30);
        setLoadingState(prev =>
          prev ? { ...prev, message: "Processing your project content..." } : null
        );

        const pollResult = await ProjectService.pollProjectStatus(
          projectId,
          'content',
          {
            onProgress: (progress) => {
              updateLoadingProgress(30 + progress * 0.7); // Scale progress from 30% to 100%
            }
          }
        );

        console.log("Poll result:", pollResult);

        if (pollResult.error) {
          setError(pollResult.error);
        }

        if (!pollResult.data && !pollResult.data.project) {
          setError("No project data returned from content generation.");
          stopLoading();
          return { success: false, error: "No project data returned from content generation." };
        }

        if (pollResult.success && pollResult.data && pollResult.data.project) {

          const project = pollResult.data.project;
          console.log("Project content generated successfully:", project);
          setProject(project);
          setNextStep('content');
        }
      } else if (result.error) {
        setError(result.error);
      }

      stopLoading();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error generating content';
      setError(errorMessage);
      stopLoading();
      return { success: false, error: errorMessage };
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projectId,
        projectName,
        projectDescription,
        projectCategory,
        questions,
        chapters,
        images,
        isLoading,
        loadingState,
        error,
        currentStep,
        setProject,
        setChapters,
        clearProject,
        createProject,
        submitQuestionsAndGenerateChapters,
        generateProjectContent,
        setCurrentStep
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
