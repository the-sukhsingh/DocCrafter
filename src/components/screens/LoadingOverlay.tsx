import React, { useEffect, useState } from 'react';
import { useProject } from '@/context/ProjectContext';

interface LoadingOverlayProps {
  message?: string;
  progress?: number;
  currentStep?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message, progress, currentStep }) => {
  // Get loading state from context if available, or use props
  const { loadingState, projectId } = useProject();
  const [statusUpdate, setStatusUpdate] = useState<string | null>(null);
  const [statusCheckCount, setStatusCheckCount] = useState(0);

  const displayMessage = loadingState?.message || message || 'Processing...';
  const displayProgress = loadingState?.progress ?? progress ?? 20;
  
  // Periodically check project status and update the loading message
  useEffect(() => {
    if (!projectId) return;
    
    const checkStatus = async () => {
      try {
        setStatusCheckCount(prev => prev + 1);
        
        const response = await fetch(`/api/project-status?projectId=${projectId}`);
        if (!response.ok) return;
        
        const data = await response.json();
        if (data.success && data.status) {
          const status = data.status;
          
          // Set a custom status message based on what's happening
          if (status.contentGenerated && status.contentUrl) {
            setStatusUpdate('Project content is ready! Preparing to display...');
          } else if (status.chaptersGenerated && status.chapters?.length > 0) {
            setStatusUpdate('Chapters have been generated. Starting content creation...');
          } else if (status.questionsGenerated && status.questions?.length > 0) {
            setStatusUpdate('Questions have been prepared. Ready for your input...');
          } else {
            // Set encouraging messages during waiting periods
            const waitingMessages = [
              'AI models are analyzing your requirements...',
              'Processing your inputs...',
              'Creating intelligent content...',
              'Nearly there, finalizing your project...',
              'Optimizing content for your needs...'
            ];
            const messageIndex = statusCheckCount % waitingMessages.length;
            setStatusUpdate(waitingMessages[messageIndex]);
          }
        }
      } catch (error) {
        console.error('Error checking status for loading updates:', error);
      }
    };
    
    // Check immediately and then set interval
    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [projectId]);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8 max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <svg className="animate-spin w-8 h-8 text-white" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none" 
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Processing Content</h3>
          <p className="text-gray-300 text-sm">
            {displayMessage}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-gray-400">{Math.round(displayProgress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${displayProgress}%` }}
            >
              <div className="h-full bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>        {/* Status Messages - Dynamic based on progress */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${displayProgress > 10 ? "bg-green-500" : "bg-gray-500"} ${displayProgress <= 60 ? "animate-pulse" : ""}`}></div>
            <span className="text-gray-300">AI models are analyzing your requirements</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${displayProgress > 40 ? "bg-blue-500" : "bg-gray-500"} ${displayProgress > 40 && displayProgress <= 80 ? "animate-pulse" : ""}`}></div>
            <span className="text-gray-300">Processing background tasks</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${displayProgress > 70 ? "bg-purple-500" : "bg-gray-500"} ${displayProgress > 70 ? "animate-pulse" : ""}`}></div>
            <span className="text-gray-300">Preparing your content</span>
          </div>
          
          {/* Real-time status update from project status API */}
          {statusUpdate && (
            <div className="mt-4 p-3 bg-gray-700/50 border border-gray-600/30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                <span className="text-sm text-blue-200">{statusUpdate}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <p className="text-xs text-gray-400 text-center">
            This process typically takes 1-3 minutes. Please don't close this window.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
