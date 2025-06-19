import React, { useState, useMemo } from 'react';
import { DocxExporter } from '../../utils/docxExporter';

import { 
  generateFullHTML,
  generateMarkdownContent, 
  processMarkdownForRendering,
  downloadContent as downloadContentUtil,
  copyToClipboard as copyToClipboardUtil,
  processChapters as processChaptersUtil
} from '../../utils/functions';

interface ChapterContent {
  title: string;
  description: string;
  chapterNo?: number;
  content?: string;
  images?: string[];
}

interface ContentViewerProps {
  content: string;
  htmlContent?: string;
  chapters: ChapterContent[];
  imagePrompts: string[];
  projectTitle: string;
  projectDomain?: string;
  projectDescription?: string;
  onBack: () => void;
  onExport?: () => void;
}

const ContentViewer: React.FC<ContentViewerProps> = ({
  content,
  htmlContent,
  chapters,
  imagePrompts,
  projectTitle,
  projectDomain,
  projectDescription,
  onBack,
  onExport
}) => {  const [viewMode, setViewMode] = useState<'preview' | 'markdown' | 'html'>('preview');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [showImagePrompts, setShowImagePrompts] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [navigationCollapsed, setNavigationCollapsed] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
    // Generate HTML content from current markdown
  const generatedHtmlContent = useMemo(() => {
    // If HTML content is provided and we're showing the full report, use it
    if (htmlContent && selectedChapter === null) return htmlContent;


    const chaptersToPass = chapters && chapters.map(chapter => ({
      title: chapter.title,
      content: chapter.content || '',
      imagePrompts: chapter.images || []
    })) || [];

    // Otherwise, generate HTML from the current markdown (full or chapter-specific)
    const markdownToConvert = selectedChapter === null 
      ? content 
      : (chapters && chapters[selectedChapter])?.content || '';
    
    const title = selectedChapter === null 
      ? projectTitle 
      : `${projectTitle} - ${(chapters && chapters[selectedChapter])?.title || 'Chapter'}`;

    return generateFullHTML(
      {
        title,
        domain: projectDomain || 'Content Viewer',
        description: projectDescription || 'Generated content overview',
      },
      chaptersToPass
    );
  }, [htmlContent, content, selectedChapter, chapters, projectTitle]);const processedChapters = useMemo(() => processChaptersUtil(chapters), [chapters]);
  const downloadContent = (format: 'markdown' | 'html') => {
    const safeContent = generateMarkdownContent({
      title: projectTitle,
      domain: projectDomain || 'Content Viewer',
      description: projectDescription || 'Generated content overview',
    }, processedChapters);
  const contentToDownload = format === 'markdown' ? safeContent : generatedHtmlContent;
    downloadContentUtil(contentToDownload, projectTitle, format);
  };

  const copyToClipboard = async (text: string) => {
    const success = await copyToClipboardUtil(text);
    if (success) {
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  const exportToDocx = async () => {
    try {
      await DocxExporter.exportToDocx({
        projectTitle,
        chapters,
        content,
        includeTableOfContents: (chapters && chapters.length > 0),
        includeCoverPage: true
      });
    } catch (error) {
      console.error('Error exporting to DOCX:', error);
      alert('Failed to export to DOCX. Please try again.');
    }
  };  // Process and render markdown content
  const renderMarkdownContent = (markdownText: string) => {
    const processedElements = processMarkdownForRendering(markdownText);
    
    return processedElements.map(({ type, content: lineContent, className, key }) => {
      switch (type) {
        case 'h1':
          return <h1 key={key} className={className}>{lineContent}</h1>;
        case 'h2':
          return (
            <h2 key={key} className={className}>
              <span className="absolute -left-4 top-0 w-1 h-8 bg-gray-800 rounded-full"></span>
              {lineContent}
            </h2>
          );
        case 'h3':
          return <h3 key={key} className={className}>{lineContent}</h3>;
        case 'h4':
          return <h4 key={key} className={className}>{lineContent}</h4>;
        case 'hr':
          return <div key={key} className={className}></div>;
        case 'image':
          return (
            <div key={key} className={className}>
              <div className="text-gray-500 text-3xl mb-3">📷</div>
              <div className="text-gray-50 font-light italic">{lineContent}</div>
            </div>
          );
        case 'p':
          return <p key={key} className={className}>{lineContent}</p>;
        case 'spacer':
          return <div key={key} className={className}></div>;
        default:
          return null;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Enhanced Header with Better Layout */}
      <header className="bg-gray-800/90 backdrop-blur-xl shadow-2xl border-b border-gray-700/60 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            {/* Title Section */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white tracking-tight">{projectTitle}</h1>
                <p className="text-gray-400 text-sm font-light">Generated Report</p>
              </div>
            </div>

            {/* Controls Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex gap-1 bg-gray-700/60 rounded-xl p-1.5 border border-gray-600/40 shadow-inner">
                {['preview', 'markdown', 'html'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${viewMode === mode
                        ? 'bg-gray-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                      }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadContent('markdown')}
                    className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-blue-500/20 hover:scale-105 border border-blue-600/30"
                    title="Download Markdown"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => downloadContent('html')}
                    className="p-2.5 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-green-500/20 hover:scale-105 border border-green-600/30"
                    title="Download HTML"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>

                  <button
                    onClick={exportToDocx}
                    className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-purple-500/20 hover:scale-105 border border-purple-600/30"
                    title="Export to DOCX"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>

                <div className="w-px h-8 bg-gradient-to-b from-gray-600/10 via-gray-600/40 to-gray-600/10 rounded-full"></div>

                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white bg-gray-700/30 hover:bg-gray-700/60 rounded-lg transition-all duration-200 border border-gray-600/30 shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <aside className={`lg:col-span-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:col-span-0' : ''}`}>
            <div className="sticky top-32">
              {/* Sidebar Toggle for Mobile */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="lg:hidden w-full mb-4 p-3 bg-gray-800/90 text-gray-300 rounded-xl border border-gray-700/50 flex items-center justify-between"
              >
                <span className="font-medium">Navigation</span>
                <svg
                  className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`${sidebarCollapsed ? 'hidden lg:block' : 'block'} space-y-6`}>
                {/* Navigation Card */}
                <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/60 p-4">
                  <button
                    onClick={() => setNavigationCollapsed(!navigationCollapsed)}
                    className="w-full text-left font-semibold text-gray-200 mb-4 flex items-center justify-between text-lg hover:text-white transition-colors"
                  >
                    <span>Contents</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${navigationCollapsed ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Content Overview and Chapters List */}
                  <div className={`space-y-2 transition-all overflow-auto duration-300 ${navigationCollapsed ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-96 opacity-100'}`}>
                    <button
                      onClick={() => setSelectedChapter(null)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${selectedChapter === null
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
                        Full Report
                      </div>
                    </button>
                    {chapters && chapters.length > 0 && chapters.map((chapter, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedChapter(index)}
                        className={`w-full text-left px-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${selectedChapter === index
                            ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 shadow-lg'
                            : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-1 h-1 p-4 rounded-lg  bg-gray-600/50 flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          <span className="truncate">{chapter.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Suggestions Card */}
                {imagePrompts.length > 0 && (
                  <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/60 p-6">
                    <button
                      onClick={() => setShowImagePrompts(!showImagePrompts)}
                      className="w-full text-left font-semibold text-gray-200 mb-4 flex items-center justify-between text-lg"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Visual Ideas
                      </div>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${showImagePrompts ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showImagePrompts && (
                      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                        {imagePrompts.map((prompt, index) => (
                          <div key={index} className="p-3 bg-gray-700/40 border border-gray-600/30 rounded-lg hover:bg-gray-700/60 transition-colors">
                            <div className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded bg-purple-600/20 flex items-center justify-center text-xs text-purple-300 flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <p className="text-xs text-gray-300 leading-relaxed">{prompt}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Enhanced Main Content */}
          <main className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              {/* Content Header */}
              {selectedChapter !== null && chapters && chapters[selectedChapter] && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b border-gray-200/50 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{selectedChapter + 1}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                        {chapters[selectedChapter].title}
                      </h2>
                      <p className="text-gray-500 text-sm">Chapter {selectedChapter + 1} of {chapters?.length || 0}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Body */}
              <div className="relative">
                {viewMode === 'preview' && (
                  <div className="p-8 lg:p-12">
                    {selectedChapter === null ? (
                      <div className="prose prose-lg prose-gray max-w-none">
                        {/* {renderMarkdownContent(content || '')} */}
                        {renderMarkdownContent(generateMarkdownContent({
                          title: projectTitle,
                          domain: projectDomain || 'Content Viewer',
                          description: projectDescription || 'Generated content overview',
                        }, processedChapters))}
                      </div>
                    ) : (
                      <div className="prose prose-lg prose-gray max-w-none">
                        {renderMarkdownContent((chapters && chapters[selectedChapter])?.content || 'No content available')}
                      </div>
                    )}
                  </div>
                )}

                {viewMode === 'markdown' && (
                  <div className="relative">
                    <div className="absolute top-6 right-6 z-10">
                      <button
                        onClick={() => copyToClipboard(selectedChapter === null ? (content || '') : ((chapters && chapters[selectedChapter])?.content || 'No content available'))}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${copyFeedback
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm'
                          }`}
                      >
                        {copyFeedback || 'Copy Markdown'}
                      </button>
                    </div>
                    <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100/50">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed bg-white p-6 rounded-xl border border-gray-200/50 shadow-inner overflow-auto">
                        {selectedChapter === null ? (content || 'No content available') : ((chapters && chapters[selectedChapter])?.content || 'No content available')}
                      </pre>
                    </div>
                  </div>
                )}

                {viewMode === 'html' && (
                  <div className="relative">
                    <div className="absolute top-6 right-6 z-10">
                      <button
                        onClick={() => copyToClipboard(generatedHtmlContent || '')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${copyFeedback
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm'
                          }`}
                      >
                        {copyFeedback || 'Copy HTML'}
                      </button>
                    </div>                    
                    <div className="p-8">
                      <div className="bg-white rounded-xl border border-gray-200/50 shadow-inner overflow-hidden">
                        <iframe
                          srcDoc={generatedHtmlContent}
                          className="w-full h-screen border-0"
                          title="HTML Preview"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </main>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ContentViewer;
