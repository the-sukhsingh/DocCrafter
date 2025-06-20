import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
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
          <span className="badge badge-primary mb-4">Our Story</span>
          <h1 className="text-5xl font-extrabold mb-8 relative inline-block">
            <span className="absolute -left-4 -right-4 -bottom-2 h-16 bg-secondary/20 rounded-lg transform -rotate-1"></span>
            <span className="relative">About DocCrafter</span>
          </h1>
        </div>
        
        <div className="prose max-w-3xl mx-auto bg-base-100/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-base-300">
          <p className="text-lg mb-6 leading-relaxed">
            DocCrafter is an advanced AI-powered documentation tool designed to streamline the creation 
            of comprehensive project documentation. Our platform combines cutting-edge artificial intelligence 
            with intuitive editing tools to help professionals create detailed project files in minutes instead of hours.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Our Mission</h2>
          <p className="leading-relaxed">
            Our mission is to revolutionize the way teams document their projects by reducing the time and effort 
            spent on creating documentation, allowing professionals to focus on what matters most - building great products 
            and delivering exceptional services.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">How It Works</h2>
          <p className="leading-relaxed">
            DocCrafter uses generative AI technology to understand your project needs and create structured, 
            detailed documentation that can be easily edited and exported. Our system asks intelligent follow-up 
            questions to ensure your documentation is comprehensive and tailored to your specific project requirements.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI-powered documentation generation</li>
            <li>Interactive question-and-answer refinement</li>
            <li>Chapter reorganization and editing</li>
            <li>Image ideas generation</li>
            <li>Export to industry-standard .docx format</li>
            <li>User-friendly interface</li>
            <li>Fast and efficient documentation creation</li>
          </ul>
        </div>
        
        <div className="mt-12 w-full">
          <Link href="/" className='flex justify-center'>
            <button className="btn btn-primary">Return to Home</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
