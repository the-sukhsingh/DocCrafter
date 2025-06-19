"use client"
import React from 'react';
import { useProject } from '@/context/ProjectContext';
import LoadingOverlay from './screens/LoadingOverlay';

const ProjectStatus: React.FC = () => {
  const {
    projectId,
    projectName,
    projectDescription,
    projectCategory,
    questions,
    chapters,
    isLoading,
    loadingState,
    error
  } = useProject();
  
  // Determine current step based on available data
  const getCurrentStep = () => {
    if (!projectId) return 'home';
    if (questions.length === 0) return 'questions';
    if (chapters.length === 0) return 'chapters';
    return 'generate';
  };
    type Step = 'home' | 'questions' | 'chapters' | 'generate' | 'complete';
  const currentStep = getCurrentStep() as Step;
  const completedQuestionsCount = questions.length;
    // Calculate progress percentage based on current step
  const getProgressPercentage = () => {
    switch (currentStep) {
      case 'home': return 10;
      case 'questions': return 30;
      case 'chapters': return 60;
      case 'generate': return 80;
      default: return 0;
    }
  };
  
  const progressPercentage = getProgressPercentage();

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'home':
        return '🏠';
      case 'questions':
        return '❓';
      case 'chapters':
        return '📚';
      case 'generate':
        return '📄';
      case 'complete':
        return '✅';
      default:
        return '📝';
    }
  };

  const getStepName = (step: string) => {
    switch (step) {
      case 'home':
        return 'Project Setup';
      case 'questions':
        return 'Questionnaire';
      case 'chapters':
        return 'Chapter Outline';
      case 'generate':
        return 'Content Generation';
      case 'complete':
        return 'Complete';
      default:
        return 'Unknown';
    }
  };

  // Don't show status on initial home page if no project exists
  if (currentStep === 'home' && !projectId) {
    return null;
  }
  
  // Show loading overlay if loading
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-gray-700/50 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {getStepIcon(currentStep)} Project Status
        </h3>
        {projectName && (
          <div className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-lg text-sm font-medium">
            {projectName}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-gray-300">Progress</span>
          <span className="text-sm text-gray-400">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {['home', 'questions', 'chapters', 'generate', 'complete'].map((step, index) => {
          const isActive = currentStep === step;
          const isCompleted = 
            (step === 'home' && projectId) ||
            (step === 'questions' && completedQuestionsCount > 0) ||
            (step === 'chapters' && chapters.length > 0);
          
          return (
            <div 
              key={step}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600/20 border border-blue-500/30' : ''
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
              }`}>
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-200">{getStepName(step)}</div>
                <div className="text-xs text-gray-400">
                  {step === 'questions' && `${completedQuestionsCount} questions completed`}
                  {step === 'chapters' && `${chapters.length} chapters defined`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Error display */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-800/50 rounded-lg">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectStatus;
