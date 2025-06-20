import React from 'react';
import Link from 'next/link';

const FAQ = () => {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      {/* Abstract shapes in background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary blur-3xl animate-float-delayed"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="badge badge-primary mb-4">Help Center</span>
          <h1 className="text-5xl font-extrabold mb-8 relative inline-block">
            <span className="absolute -left-4 -right-4 -bottom-2 h-16 bg-secondary/20 rounded-lg transform -rotate-1"></span>
            <span className="relative">Frequently Asked Questions</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-base-content/70">
            Everything you need to know about DocCrafter and how it can help you create professional documentation
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-base-100/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-base-300">
          <div className="space-y-8">
            {/* Question 1 */}
            <div className="collapse collapse-plus bg-base-200/50 rounded-lg">
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                What is DocCrafter?
              </div>
              <div className="collapse-content"> 
                <p className="py-2">
                  DocCrafter is a modern documentation generation platform that uses AI to transform project information into professional documents. It's a Next.js-powered web application that streamlines the process of creating comprehensive project documentation. By answering guided questions about your project, the platform generates professional documentation with well-structured chapters that you can export to multiple formats.
                </p>
              </div>
            </div>

            {/* Question 2 */}
            <div className="collapse collapse-plus bg-base-200/50 rounded-lg">
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                What are the key features of DocCrafter?
              </div>
              <div className="collapse-content"> 
                <ul className="py-2 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <span><strong>AI-Powered Document Generation</strong>: Transform project information into professional documentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <span><strong>Interactive Questionnaire</strong>: Guide users through structured information gathering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    </div>
                    <span><strong>Chapter-Based Organization</strong>: Automatically organize content into logical chapters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <span><strong>Multiple Export Options</strong>: Export to DOCX and other formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                      </svg>
                    </div>
                    <span><strong>Project Dashboard</strong>: Manage all your documentation projects in one place</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span><strong>Real-time Preview</strong>: View your documentation as you build it</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Question 3 */}
            <div className="collapse collapse-plus bg-base-200/50 rounded-lg">
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                What technologies does DocCrafter use?
              </div>
              <div className="collapse-content"> 
                <p className="py-2">DocCrafter uses a modern technology stack including:</p>
                <ul className="py-2 space-y-1">
                  <li>• <strong>Frontend</strong>: Next.js 15, React 19, Tailwind CSS 4, DaisyUI</li>
                  <li>• <strong>Backend</strong>: Next.js API Routes</li>
                  <li>• <strong>Database</strong>: MongoDB with Mongoose</li>
                  <li>• <strong>Authentication</strong>: Clerk</li>
                  <li>• <strong>Background Processing</strong>: Inngest</li>
                  <li>• <strong>Storage</strong>: Azure Storage Blob</li>
                  <li>• <strong>Document Generation</strong>: DOCX</li>
                </ul>
              </div>
            </div>
            
            {/* Question 4 */}
            <div className="collapse collapse-plus bg-base-200/50 rounded-lg">
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                How do I get started with DocCrafter?
              </div>
              <div className="collapse-content"> 
                <p className="py-2">Getting started with DocCrafter is simple:</p>
                <ol className="py-2 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <span><strong>Sign Up/Login</strong>: Create an account or log in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <span><strong>Create Project</strong>: Start a new documentation project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <span><strong>Answer Questions</strong>: Provide information about your project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <span><strong>Review Chapters</strong>: Review and edit generated chapter structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <span className="text-primary font-bold">5</span>
                    </div>
                    <span><strong>Generate Content</strong>: AI generates detailed content for each chapter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <span className="text-primary font-bold">6</span>
                    </div>
                    <span><strong>Preview & Export</strong>: Review the final document and export to your preferred format</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Question 5 */}
            <div className="collapse collapse-plus bg-base-200/50 rounded-lg">
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                What export formats does DocCrafter support?
              </div>
              <div className="collapse-content"> 
                <p className="py-2">
                  Currently, DocCrafter supports exporting to industry-standard .docx format, Markdown and HTML. Additional export formats are planned for future updates.
                </p>
              </div>
            </div>

          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Still have questions?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="mailto:sukhaji65@gmail.com">
              <button className="btn btn-primary">
                Contact Support
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </button>
            </Link>
            <Link href="/build">
              <button className="btn btn-secondary">
                Try DocCrafter Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-base-300">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </main>
  );
};

export default FAQ;