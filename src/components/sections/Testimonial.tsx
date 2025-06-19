import React from 'react'

const Testimonial = () => {
  return (
      <section className="py-24 relative overflow-hidden">
          {/* Creative background */}
          <div className="absolute inset-0 bg-gradient-to-b from-base-100 via-base-200 to-base-300">
              <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,120,255,0.1),transparent)]"></div>
                  <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_500px_at_80%_80%,rgba(120,255,200,0.1),transparent)]"></div>
              </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 flex flex-col items-center">
                  <span className="badge badge-primary mb-4">Success Stories</span>
                  <h2 className="text-4xl font-extrabold mb-4 relative inline-block">
                      <span className="absolute -left-2 -right-2 -bottom-2 h-14 bg-secondary/20 rounded-lg transform -rotate-1"></span>
                      <span className="relative">What Our Users Say</span>
                  </h2>
                  <p className="text-lg max-w-2xl mx-auto text-base-content/70">
                      Discover how ProjectForge has transformed documentation workflows across industries
                  </p>
              </div>

              <div className="testimonial-carousel relative">
                  {/* Quote marks in background */}
                  <div className="absolute -top-10 left-10 text-9xl font-serif text-primary/10">"</div>
                  <div className="absolute -bottom-10 right-10 text-9xl font-serif text-primary/10">"</div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Testimonial 1 */}
                      <div className="group">
                          <div className="card bg-base-100 shadow-xl border border-base-300 h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 group-hover:translate-y-[-8px]">
                              {/* Top colorful accent */}
                              <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>

                              {/* Content */}
                              <div className="card-body relative">
                                  <div className="flex items-center mb-6">
                                      <div className="avatar">
                                          <div className="w-14 h-14 rounded-full ring-4 ring-primary/20 ring-offset-2 ring-offset-base-100 overflow-hidden bg-gradient-to-br from-primary to-primary/40">
                                              <div className="flex items-center justify-center h-full text-xl font-bold text-primary-content">JD</div>
                                          </div>
                                      </div>
                                      <div className="ml-4">
                                          <h3 className="font-bold text-lg">Jane Doe</h3>
                                          <p className="text-sm opacity-70">Project Manager @ TechCorp</p>
                                      </div>
                                  </div>

                                  <div className="relative">
                                      <div className="text-3xl text-primary/20 absolute -top-4 -left-2">"</div>
                                      <p className="text-base-content/80 italic">ProjectForge saved me hours of documentation work. The AI-generated content was surprisingly accurate and needed minimal editing.</p>
                                      <div className="text-3xl text-primary/20 absolute -bottom-8 -right-2">"</div>
                                  </div>

                                  <div className="mt-6 flex items-center justify-between">
                                      <div className="rating rating-sm">
                                          {[...Array(5)].map((_, i) => (
                                              <input key={i} type="radio" name="rating-1" className="mask mask-star-2 bg-primary" checked readOnly />
                                          ))}
                                      </div>
                                      <div className="badge badge-outline">Verified User</div>
                                  </div>
                              </div>

                              {/* Bottom accent bar */}
                              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500 ease-out"></div>
                          </div>
                      </div>

                      {/* Testimonial 2 */}
                      <div className="group">
                          <div className="card bg-base-100 shadow-xl border border-base-300 h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-secondary/30 group-hover:translate-y-[-8px]">
                              {/* Top colorful accent */}
                              <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>

                              {/* Content */}
                              <div className="card-body relative">
                                  <div className="flex items-center mb-6">
                                      <div className="avatar">
                                          <div className="w-14 h-14 rounded-full ring-4 ring-secondary/20 ring-offset-2 ring-offset-base-100 overflow-hidden bg-gradient-to-br from-secondary to-secondary/40">
                                              <div className="flex items-center justify-center h-full text-xl font-bold text-secondary-content">MS</div>
                                          </div>
                                      </div>
                                      <div className="ml-4">
                                          <h3 className="font-bold text-lg">Michael Smith</h3>
                                          <p className="text-sm opacity-70">Software Developer @ DevStudio</p>
                                      </div>
                                  </div>

                                  <div className="relative">
                                      <div className="text-3xl text-secondary/20 absolute -top-4 -left-2">"</div>
                                      <p className="text-base-content/80 italic">The ability to export to .docx and make final edits directly in Word made this tool perfect for our team's documentation needs.</p>
                                      <div className="text-3xl text-secondary/20 absolute -bottom-8 -right-2">"</div>
                                  </div>

                                  <div className="mt-6 flex items-center justify-between">
                                      <div className="rating rating-sm">
                                          {[...Array(5)].map((_, i) => (
                                              <input key={i} type="radio" name="rating-2" className="mask mask-star-2 bg-secondary" checked readOnly />
                                          ))}
                                      </div>
                                      <div className="badge badge-outline">Verified User</div>
                                  </div>
                              </div>

                              {/* Bottom accent bar */}
                              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-500 ease-out"></div>
                          </div>
                      </div>

                      {/* Testimonial 3 */}
                      <div className="group">
                          <div className="card bg-base-100 shadow-xl border border-base-300 h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-accent/30 group-hover:translate-y-[-8px]">
                              {/* Top colorful accent */}
                              <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>

                              {/* Content */}
                              <div className="card-body relative">
                                  <div className="flex items-center mb-6">
                                      <div className="avatar">
                                          <div className="w-14 h-14 rounded-full ring-4 ring-accent/20 ring-offset-2 ring-offset-base-100 overflow-hidden bg-gradient-to-br from-accent to-accent/40">
                                              <div className="flex items-center justify-center h-full text-xl font-bold text-accent-content">AR</div>
                                          </div>
                                      </div>
                                      <div className="ml-4">
                                          <h3 className="font-bold text-lg">Alex Rodriguez</h3>
                                          <p className="text-sm opacity-70">Product Manager @ InnovateCo</p>
                                      </div>
                                  </div>

                                  <div className="relative">
                                      <div className="text-3xl text-accent/20 absolute -top-4 -left-2">"</div>
                                      <p className="text-base-content/80 italic">I was skeptical about AI-generated docs, but ProjectForge impressed me with its understanding of project requirements and attention to detail.</p>
                                      <div className="text-3xl text-accent/20 absolute -bottom-8 -right-2">"</div>
                                  </div>

                                  <div className="mt-6 flex items-center justify-between">
                                      <div className="rating rating-sm">
                                          {[...Array(5)].map((_, i) => (
                                              <input key={i} type="radio" name="rating-3" className="mask mask-star-2 bg-accent" checked readOnly />
                                          ))}
                                      </div>
                                      <div className="badge badge-outline">Verified User</div>
                                  </div>
                              </div>

                              {/* Bottom accent bar */}
                              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-500 ease-out"></div>
                          </div>
                      </div>
                  </div>

                  {/* View more testimonials button */}
                  <div className="flex justify-center mt-12">
                      <button className="btn btn-outline btn-sm gap-2 px-6 group">
                          <span>View More Success Stories</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default Testimonial