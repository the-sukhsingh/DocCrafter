import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">About ProjectForge</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            ProjectForge is an advanced AI-powered documentation tool designed to streamline the creation 
            of comprehensive project documentation. Our platform combines cutting-edge artificial intelligence 
            with intuitive editing tools to help professionals create detailed project files in minutes instead of hours.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to revolutionize the way teams document their projects by reducing the time and effort 
            spent on creating documentation, allowing professionals to focus on what matters most - building great products 
            and delivering exceptional services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
          <p>
            ProjectForge uses generative AI technology to understand your project needs and create structured, 
            detailed documentation that can be easily edited and exported. Our system asks intelligent follow-up 
            questions to ensure your documentation is comprehensive and tailored to your specific project requirements.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI-powered documentation generation</li>
            <li>Interactive question-and-answer refinement</li>
            <li>Chapter reorganization and editing</li>
            <li>Image inclusion capabilities</li>
            <li>Export to industry-standard .docx format</li>
            <li>User-friendly interface</li>
            <li>Fast and efficient documentation creation</li>
          </ul>
        </div>
        
        <div className="mt-12">
          <Link href="/">
            <button className="btn btn-primary">Return to Home</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
