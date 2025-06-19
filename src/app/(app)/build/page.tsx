"use client";

import React, { useState, useEffect } from 'react';
import StartPage from '../../../components/screens/Start';
import Question from '../../../components/screens/Question';
import Chapters from '../../../components/screens/Chapters';
import ContentViewer from '../../../components/screens/ContentViewer';
import { useProject } from '../../../context/ProjectContext';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../../../components/screens/LoadingOverlay';

// Type for form data from Start component
type FormData = {
  projectName: string;
  projectDescription: string;
  projectCategory: string;
};

// Types for steps in the project flow
type StepType = 'start' | 'questions' | 'chapters' | 'content';

// Default questions for the project
const DEFAULT_QUESTIONS = [
  "What is your target audience for this project?",
  "What key features are most important to you?",
  "Do you have any specific technical requirements or constraints?",
  "What is your expected timeline for this project?",
  "How do you plan to measure the success of this project?"
];

// Default chapter outline if none is provided
const DEFAULT_CHAPTERS = [
  { title: "Introduction", description: "Overview of the project and its objectives" },
  { title: "Requirements Analysis", description: "Detailed analysis of functional and non-functional requirements" },
  { title: "System Architecture", description: "High-level design of the system architecture" },
  { title: "Implementation Plan", description: "Step-by-step implementation strategy and timeline" },
  { title: "Testing Strategy", description: "Approach for testing and quality assurance" },
  { title: "Deployment Plan", description: "Process for deploying the solution" },
  { title: "Maintenance and Support", description: "Ongoing maintenance and support considerations" }
];

const Build = () => {
  const router = useRouter();
  const { 
    createProject, 
    submitQuestionsAndGenerateChapters,
    generateProjectContent,
    setChapters,
    isLoading, 
    projectId,
    chapters,
    images,
    projectName,
    projectDescription,
    projectCategory,
    questions,
    currentStep
  } = useProject();
  
  const [formError, setFormError] = useState<string | null>(null);
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState<{
    content: string;
    chapters: any[];
  }>({
    content: '',
    chapters: [],
  });



  // Create a project data object for passing to components
  const projectData = projectId ? {
    projectName: projectName || '',
    projectDescription: projectDescription || '',
    projectCategory: projectCategory || ''
  } : null;

  // Handle form submission from the Start component
  const handleProjectSubmit = async (data: FormData) => {
    setFormError(null);
    const result = await createProject({
      projectName: data.projectName,
      projectDescription: data.projectDescription,
      projectCategory: data.projectCategory,
    });
    if (!result.success) {
      // Handle project creation error
      setFormError(result.error || 'Failed to create project. Please try again.');
    }
    // Note: We no longer immediately set currentStep here, this will be handled by the readiness check
  };

  // Handle answer changes from the Question component
  const handleAnswerChange = (question: string, answer: string) => {
    setQuestionAnswers(prev => ({ ...prev, [question]: answer }));
  };

  // Handle completion of the questions step
  const handleQuestionsComplete = async () => {
    // Convert answers to the format expected by the API
    const questionData = Object.entries(questionAnswers).map(([question, answer]) => ({
      question,
      answer
    }));

    // Submit questions and generate chapters
    const result = await submitQuestionsAndGenerateChapters(questionData);
    
    // The submitQuestionsAndGenerateChapters function now includes project readiness checking
    // The loading screen will show and the useEffect that monitors project readiness
    // will automatically handle the transition to the chapters step
    
    if (!result.success) {
      setFormError(result.error || 'Failed to process questions. Please try again.');
    }
  };

  // Handle chapters change
  const handleChaptersChange = (updatedChapters: any[]) => {
    setChapters(updatedChapters);
  };  
  // Handle generate content
  const handleGenerateContent = async () => {
    const result = await generateProjectContent(chapters);

    if (!result.success) {
      setFormError(result.error || 'Failed to generate content. Please try again.');
    }
  };

  useEffect(() => {
    let contentData: string = "";
    chapters.forEach((element: any) => {
      console.log("Chapter Element:", element);
      contentData += `## ${element.title}\n`;
      contentData += element.content + "\n\n";
    });
    setGeneratedContent({
      content: contentData,
      chapters: chapters,
    });
  }, [chapters, images]);

  // Handle back navigation (not allowing going back between steps)
  const handleBackToHome = () => {
    router.push('/');
  };
  

  // Progress indicator component
  const StepIndicator = () => {
    const steps: { id: StepType; label: string }[] = [
      { id: 'start', label: 'Project Info' },
      { id: 'questions', label: 'Questions' },
      { id: 'chapters', label: 'Chapter Outlines' },
      { id: 'content', label: 'Content' }
    ];
    
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);
    
    return (
      <div className="bg-gray-800/70 backdrop-blur-xl fixed top-4 left-1/2 transform -translate-x-1/2 z-30 rounded-xl border border-gray-700/50 shadow-xl px-2 py-3 flex gap-1">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`flex items-center ${index > 0 ? 'ml-1' : ''}`}
          >
            {index > 0 && (
              <div className="h-px w-4 bg-gray-600 mx-1"></div>
            )}
            <div 
              className={`flex items-center justify-center rounded-full w-7 h-7 text-xs font-semibold ${
                index === currentStepIndex
                  ? 'bg-blue-600 text-white' 
                  : index < currentStepIndex
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
              }`}
            >
              {index < currentStepIndex ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span 
              className={`hidden sm:inline-block text-xs font-medium ml-1 ${
                index === currentStepIndex ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 'start':
        return <StartPage onProjectSubmit={handleProjectSubmit} />;
        case 'questions':
        return (
          <Question 
            questions={questions.length > 0 ? questions.map(q => q.question) : DEFAULT_QUESTIONS}
            onAnswer={handleAnswerChange}
            onComplete={handleQuestionsComplete}
            projectData={projectData}
          />
        );
        case 'chapters':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 px-4 py-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">
                  Chapter Outlines
                </h1>
                <p className="text-gray-300">
                  Review and customize your project chapters
                </p>
              </div>

              <Chapters
                chapters={chapters.length > 0 ? chapters : DEFAULT_CHAPTERS}
                onChaptersChange={handleChaptersChange}
              />
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleGenerateContent}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none"
                >
                  Generate Content
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'content':
        return (
          <ContentViewer
            content={generatedContent.content}
            chapters={chapters}
            imagePrompts={images}
            projectTitle={projectName || 'Project'}
            projectDomain={projectCategory || 'General'}
            projectDescription={projectDescription || 'No description provided'}
            onBack={handleBackToHome}
          />
        );
      
      default:
        return <StartPage onProjectSubmit={handleProjectSubmit} />;
    }
  };
  return (
    <>
      {isLoading && <LoadingOverlay />}
      
      {formError && (
        <div className="fixed top-0 inset-x-0 p-4 z-50">
          <div className="bg-red-500 text-white px-4 py-3 rounded shadow-lg mx-auto max-w-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formError}</span>
            </div>
          </div>
        </div>
      )}

      {/* Show step indicator for non-content steps */}
      {currentStep !== 'content' && <StepIndicator />}

      {renderStep()}
    </>
  );
};

export default Build;