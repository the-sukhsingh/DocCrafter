import Link from 'next/link'
import React from 'react'

const Process = () => {
  return (
      <section id='howitworks' className="py-24 bg-base-100 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-base-200 to-transparent"></div>
          <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"></div>
          <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-secondary/10 to-accent/10 blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                  <h2 className="inline-block text-4xl font-extrabold relative">
                      <span className="absolute -left-4 -right-4 -bottom-2 h-12 bg-primary/20 rounded-lg transform -rotate-1"></span>
                      <span className="relative">How It Works</span>
                  </h2>
                  <p className="mt-4 text-lg max-w-2xl mx-auto text-base-content/70">
                      Four simple steps to transform your project idea into comprehensive documentation
                  </p>
              </div>

              {/* Hexagonal process timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
                  {/* Connecting line */}
                  <div className="hidden lg:block absolute top-24 left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

                  {/* Step 1 */}
                  <div className="relative group">
                      <div className="card bg-base-100 shadow-xl border border-base-300 group-hover:border-primary/50 transition-all duration-300 transform group-hover:-translate-y-2">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl transform rotate-45 shadow-lg flex items-center justify-center group-hover:rotate-[135deg] transition-transform duration-500">
                              <span className="text-2xl font-bold text-primary-content transform -rotate-45 group-hover:rotate-[-135deg] transition-transform duration-500">1</span>
                          </div>
                          <div className="card-body pt-10 items-center text-center">
                              <div className="w-16 h-16 mb-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-primary">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                              </div>
                              <h3 className="card-title text-xl">Enter Project Idea</h3>
                              <p className="text-base-content/70">Describe your project and let our AI understand your requirements</p>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></div>
                      </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative group">
                      <div className="card bg-base-100 shadow-xl border border-base-300 group-hover:border-secondary/50 transition-all duration-300 transform group-hover:-translate-y-2">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl transform rotate-45 shadow-lg flex items-center justify-center group-hover:rotate-[135deg] transition-transform duration-500">
                              <span className="text-2xl font-bold text-secondary-content transform -rotate-45 group-hover:rotate-[-135deg] transition-transform duration-500">2</span>
                          </div>
                          <div className="card-body pt-10 items-center text-center">
                              <div className="w-16 h-16 mb-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-secondary">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                  </svg>
                              </div>
                              <h3 className="card-title text-xl">Answer AI Questions</h3>
                              <p className="text-base-content/70">Refine your project with our AI's tailored follow-up questions</p>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full"></div>
                      </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative group">
                      <div className="card bg-base-100 shadow-xl border border-base-300 group-hover:border-accent/50 transition-all duration-300 transform group-hover:-translate-y-2">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl transform rotate-45 shadow-lg flex items-center justify-center group-hover:rotate-[135deg] transition-transform duration-500">
                              <span className="text-2xl font-bold text-accent-content transform -rotate-45 group-hover:rotate-[-135deg] transition-transform duration-500">3</span>
                          </div>
                          <div className="card-body pt-10 items-center text-center">
                              <div className="w-16 h-16 mb-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-accent">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                  </svg>
                              </div>
                              <h3 className="card-title text-xl">Edit Chapters</h3>
                              <p className="text-base-content/70">Rearrange and modify generated content to fit your exact needs</p>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-accent transition-all duration-300 group-hover:w-full"></div>
                      </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative group">
                      <div className="card bg-base-100 shadow-xl border border-base-300 group-hover:border-primary/50 transition-all duration-300 transform group-hover:-translate-y-2">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl transform rotate-45 shadow-lg flex items-center justify-center group-hover:rotate-[135deg] transition-transform duration-500">
                              <span className="text-2xl font-bold text-primary-content transform -rotate-45 group-hover:rotate-[-135deg] transition-transform duration-500">4</span>
                          </div>
                          <div className="card-body pt-10 items-center text-center">
                              <div className="w-16 h-16 mb-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-primary">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                  </svg>
                              </div>
                              <h3 className="card-title text-xl">Download File</h3>
                              <p className="text-base-content/70">Export your complete project documentation as a .docx file</p>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
                      </div>
                  </div>
              </div>

              <div className="flex justify-center mt-20">
                  <Link href="/build">
                      <button className="btn btn-primary btn-lg group relative overflow-hidden">
                          <span className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full opacity-10"></span>
                          Start Your Project
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                      </button>
                  </Link>
              </div>
          </div>
      </section>
  )
}

export default Process