import React from 'react'
import Link from 'next/link'
const Hero = () => {
    return (
        <>
            < section className="hero min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-primary/20 via-base-300 to-secondary/20 animate-gradient-x" >
                {/* Abstract shapes in background */}
                < div className="absolute inset-0 overflow-hidden opacity-20" >
                    <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary blur-3xl animate-float-delayed"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent blur-3xl opacity-20 animate-pulse"></div>
                </div >

                {/* Grid pattern overlay */}
                < div className="absolute inset-0 bg-grid-pattern opacity-10" ></div >

                <div className="hero-content text-center z-10">
                    <div className="max-w-3xl">
                        <div className="mb-4 inline-block">
                            <span className="inline-block relative">
                                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30 animate-pulse"></span>
                                <span className="relative px-4 py-1 rounded-lg text-sm font-bold bg-base-200/80 backdrop-blur-sm text-primary border border-primary/20">
                                    Powered by AI
                                </span>
                            </span>
                        </div>
                        <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient-x">
                            Generate Project Files in Minutes
                        </h1>
                        <p className="py-6 text-xl max-w-2xl mx-auto leading-relaxed">
                            Use Generative AI to create complete, editable project documentation
                            including chapters, images, and .docx export
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                            <Link href="/build">
                                <button className="btn btn-primary btn-lg group relative overflow-hidden">
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    Get Started
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="btn btn-outline btn-lg group">
                                    Learn More
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </Link>
                        </div>

                        {/* Floating document mock */}
                        <div className="mt-16 relative h-20 md:h-32">
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-64 h-40 md:w-80 md:h-48 bg-base-100 rounded-lg shadow-xl border border-base-300 transform rotate-6 animate-float-slow">
                                <div className="p-4">
                                    <div className="h-3 w-3/4 bg-base-300 rounded mb-3"></div>
                                    <div className="h-2 w-full bg-base-300 rounded mb-2"></div>
                                    <div className="h-2 w-5/6 bg-base-300 rounded mb-2"></div>
                                    <div className="h-2 w-4/6 bg-base-300 rounded"></div>
                                </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-64 h-40 md:w-80 md:h-48 bg-base-100 rounded-lg shadow-xl border border-base-300 transform -rotate-3 animate-float-slower">
                                <div className="p-4">
                                    <div className="h-3 w-3/4 bg-base-300 rounded mb-3"></div>
                                    <div className="h-2 w-full bg-base-300 rounded mb-2"></div>
                                    <div className="h-2 w-5/6 bg-base-300 rounded mb-2"></div>
                                    <div className="h-2 w-4/6 bg-base-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Hero