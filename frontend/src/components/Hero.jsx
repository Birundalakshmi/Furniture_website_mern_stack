import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-charcoal-50 via-terracotta-50 to-charcoal-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <p className="text-terracotta-600 font-medium">Modern Furniture Collection 2025</p>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Space with <span className="text-terracotta-600">Elegance</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our curated collection of contemporary furniture designed to elevate your living spaces with style and comfort.
            </p>

          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-terracotta-400 to-charcoal-500 rounded-full blur-3xl opacity-20"></div>
            <img 
              src="https://luxmood.ca/wp-content/uploads/2024/09/Luxmood-Parma-6.jpg" 
              alt="Modern Furniture" 
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute top-10 right-10 w-20 h-20 bg-terracotta-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-charcoal-300 rounded-full opacity-30"></div>
    </section>
  );
};

export default Hero;