import React from 'react'

const Features = () => {
  return (
      <section id='features' className="py-8 w-full bg-gradient-to-b from-base-100 to-base-200 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

              {/* Colorful orbs/blobs */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-secondary/5 to-accent/5 blur-2xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 flex flex-col items-center">
                  <span className="badge badge-secondary mb-4">Key Features</span>
                  <h2 className="text-4xl font-extrabold mb-4 relative inline-block">
                      <span className="absolute -left-4 -right-4 -bottom-2 h-14 bg-primary/20 rounded-lg transform -rotate-1"></span>
                      <span className="relative">Powerful Documentation Tools</span>
                  </h2>
                  <p className="text-lg max-w-2xl mx-auto text-base-content/70">
                      Everything you need to create comprehensive project documentation
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Feature 1 */}
                  <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300 hover:border-primary/30 transition-all duration-300 group">
                      <figure className="px-8 py-4 z-10">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                              </svg>
                          </div>
                      </figure>
                      <div className="card-body ">
                          <h2 className="card-title">AI-Generated Content</h2>
                          <p>Advanced AI algorithms create detailed project documentation tailored to your specific requirements</p>
                          <div className="card-actions justify-end mt-4">
                              <div className="badge badge-outline">Smart</div>
                              <div className="badge badge-primary badge-outline">Fast</div>
                          </div>
                      </div>
                      <div className="h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                  </div>

                  {/* Feature 2 */}
                  <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300 hover:border-secondary/30 transition-all duration-300 group">
                      <figure className="px-8 py-4 z-10">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                              </svg>
                          </div>
                      </figure>
                      <div className="card-body">
                          <h2 className="card-title">Customizable Chapters</h2>
                          <p>Easily rearrange, edit, and customize chapters to match your project's specific structure and needs</p>
                          <div className="card-actions justify-end mt-4">
                              <div className="badge badge-outline">Flexible</div>
                              <div className="badge badge-secondary badge-outline">Editable</div>
                          </div>
                      </div>
                      <div className="h-1 w-0 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-500"></div>
                  </div>

                  {/* Feature 3 */}
                  <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300 hover:border-accent/30 transition-all duration-300 group">
                      <figure className="px-8 py-4 z-10">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-20 9 9 0 0 0 0 20z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8h17.8M3.6 15h17.5" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a15 15 0 0 1 4 10 15 15 0 0 1-4 10 10 15 0 0 1-4-11 15 15 0 0 1 4-9z" />
                                </svg>
                          </div>
                      </figure>
                      <div className="card-body">
                          <h2 className="card-title">
                            Website Creation
                          </h2>
                          <p>
                                Generate a fully functional website for your project report with just a few clicks, complete with all necessary documentation
                          </p>
                          <div className="card-actions justify-end mt-4">
                              <div className="badge badge-outline">Visual</div>
                              <div className="badge badge-accent badge-outline">Media</div>
                          </div>
                      </div>
                      <div className="h-1 w-0 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-500"></div>
                  </div>

                  {/* Feature 4 */}
                  <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300 hover:border-primary/30 transition-all duration-300 group">
                      <figure className="px-8 py-4 z-10">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                <rect x="2" y="2" width="20" height="20" rx="2" fill="#2B579A" className="text-primary" />
                                <text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">W</text>
                            </svg>
                          </div>
                      </figure>
                      <div className="card-body">
                          <h2 className="card-title">Word Export</h2>
                          <p>Export your complete project documentation as a .docx file for easy sharing and further editing</p>
                          <div className="card-actions justify-end mt-4">
                              <div className="badge badge-outline">Portable</div>
                              <div className="badge badge-primary badge-outline">Editable</div>
                          </div>
                      </div>
                      <div className="h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                  </div>

                  {/* Feature 5 */}
                  <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300 hover:border-secondary/30 transition-all duration-300 group">
                      <figure className="px-8 py-4 z-10">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
                                </svg>
                          </div>
                      </figure>
                      <div className="card-body">
                          <h2 className="card-title">
                            Access Anytime
                          </h2>
                          <p>Access your project documentation from anywhere, at any time</p>
                          <div className="card-actions justify-end mt-4">
                              <div className="badge badge-outline">Team</div>
                              <div className="badge badge-secondary badge-outline">Real-time</div>
                          </div>
                      </div>
                      <div className="h-1 w-0 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-500"></div>
                  </div>

                  {/* Feature 6 */}
                  <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300 hover:border-accent/30 transition-all duration-300 group">
                      <figure className="px-8 py-4 z-10">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                              </svg>
                          </div>
                      </figure>
                      <div className="card-body">
                          <h2 className="card-title">Security & Privacy</h2>
                          <p>Your project data is securely stored and never used for training our AI systems</p>
                          <div className="card-actions justify-end mt-4">
                              <div className="badge badge-outline">Secure</div>
                              <div className="badge badge-accent badge-outline">Private</div>
                          </div>
                      </div>
                      <div className="h-1 w-0 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-500"></div>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default Features