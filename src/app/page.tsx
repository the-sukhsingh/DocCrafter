import React from 'react';
import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import Features from '@/components/sections/Features';
import Testimonial from '@/components/sections/Testimonial';
import Footer from '@/components/sections/Footer';

const HomePage = () => {
  return (
    <main className="min-h-screen">

      {/* Hero Section with animated gradient background */}

      <Hero />

      {/* Process Section with creative timeline design */}
      <Process />

      {/* Features Section with creative cards */}
      <Features />

      {/* Testimonials Section with interactive cards */}
      <Testimonial />

      {/* Call to action before footer */}
      <section className="py-20 bg-gradient-to-b from-base-300 to-base-100 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Project Documentation?</h2>
            <p className="text-xl mb-8 text-base-content/80">Join thousands of professionals who are saving time and improving their documentation with ProjectForge</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/build" className="btn btn-primary btn-lg group">
                <span className="relative z-10">Get Started Now</span>
                <span className="absolute -inset-4 w-0 opacity-0 rounded-2xl bg-gradient-to-r p-4  from-primary to-secondary transition-all duration-700 ease-out group-hover:w-full group-hover:opacity-10"></span>
              </Link>
              <Link href="/about" className="btn btn-outline btn-lg">Learn More</Link>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
    <Footer />
     
    </main>
  );
};

export default HomePage;