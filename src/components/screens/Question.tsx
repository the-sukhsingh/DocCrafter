import React, { useState } from 'react'

type QuestionProps = {
    questions: string[];
    onAnswer: (question: string, answer: string) => void;
    onComplete: () => void;
    onBack?: () => void;
    projectData?: {
      projectName: string;
      projectDescription: string;
      projectCategory: string;
    } | null;
}

const Question: React.FC<QuestionProps> = ({ questions, onAnswer, onComplete, onBack, projectData }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (question: string, answer: string) => {
    const newAnswers = { ...answers, [question]: answer };
    setAnswers(newAnswers);
    onAnswer(question, answer);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-3xl'>        
        {/* Header Section */}
        <div className='text-center mb-12'>
          {/* Back Button */}
          {onBack && (
            <div className='flex justify-start mb-6'>
              <button
                onClick={onBack}
                className='flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors duration-200'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
                <span>Back to Project Setup</span>
              </button>
            </div>
          )}
          
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-teal-700 rounded-full mb-6 shadow-2xl border border-green-500/20'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          </div>
          <h1 className='text-4xl font-bold text-white mb-3'>
            Project Details
          </h1>
          <p className='text-gray-300 text-lg mb-6'>
            Help us understand your project better
          </p>

          {/* Project Context */}
          {projectData && (
            <div className='bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-4 mb-6 max-w-md mx-auto'>
              <div className='text-sm text-left space-y-1'>
                <div><span className='font-semibold text-gray-300'>Project:</span> <span className='text-gray-400'>{projectData.projectName}</span></div>
                <div><span className='font-semibold text-gray-300'>Category:</span> <span className='text-gray-400'>{projectData.projectCategory}</span></div>
              </div>
            </div>
          )}
          
          {/* Progress Bar */}
          <div className='w-full max-w-md mx-auto mb-4'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm font-medium text-gray-300'>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className='text-sm font-medium text-gray-300'>
                {Math.round(progress)}%
              </span>
            </div>
            <div className='w-full bg-gray-700 rounded-full h-2'>
              <div 
                className='bg-gradient-to-r from-green-600 to-teal-700 h-2 rounded-full transition-all duration-500 ease-out'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>        {/* Question Card */}
        <div className='bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 mb-8'>
          <div className='space-y-6'>
            {/* Question */}
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-600 to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                  {currentQuestionIndex + 1}
                </div>
                <div className='flex-1'>
                  <h2 className='text-xl font-semibold text-gray-200 leading-relaxed'>
                    {currentQuestion}
                  </h2>
                </div>
              </div>
            </div>

            {/* Answer Input */}
            <div className='space-y-3'>
              <label className='block text-sm font-semibold text-gray-300 tracking-wide uppercase'>
                Your Answer
              </label>
              <div className='relative'>
                <textarea
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                  placeholder="Share your thoughts and requirements..."
                  className="w-full px-4 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-green-500 focus:bg-gray-700 transition-all duration-300 outline-none text-gray-100 placeholder-gray-400 resize-none h-32"
                  rows={4}
                />
                <div className='absolute top-4 right-4 pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className='flex justify-between items-center pt-6'>
              <button
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  isFirstQuestion
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-[1.02]'
                }`}
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
                <span>Previous</span>
              </button>              {isLastQuestion ? (
                <button
                  onClick={onComplete}
                  className='px-8 py-3 bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 active:scale-[0.98] flex items-center space-x-2'
                >
                  <span>Complete Project</span>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className='px-6 py-3 bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 active:scale-[0.98] flex items-center space-x-2'
                >
                  <span>Next</span>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>        {/* Questions Overview */}
        <div className='bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-6'>
          <h3 className='text-lg font-semibold text-gray-200 mb-4 flex items-center space-x-2'>
            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
            </svg>
            <span>Questions Overview</span>
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {questions.map((question, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  index === currentQuestionIndex
                    ? 'border-green-500 bg-green-500/10'
                    : answers[question]
                    ? 'border-green-400/50 bg-green-400/5'
                    : 'border-gray-600 bg-gray-700/30'
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                <div className='flex items-center space-x-2'>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentQuestionIndex
                      ? 'bg-green-500 text-white'
                      : answers[question]
                      ? 'bg-green-400 text-gray-900'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {answers[question] ? '✓' : index + 1}
                  </div>
                  <span className='text-sm text-gray-300 truncate'>
                    {question.length > 40 ? `${question.substring(0, 40)}...` : question}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-8'>
          <p className='text-gray-400 text-sm'>
            Take your time to provide detailed answers for the best results
          </p>
        </div>
      </div>
    </div>
  )
}

export default Question