import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-gradient-to-r from-charcoal-800 to-terracotta-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Furnix</h1>
          <p className="text-xl text-white/90">
            Transforming homes with premium, handcrafted furniture since 2010
          </p>
        </div>
      </div>


      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 mb-4">
                Furnix was born from a simple belief: everyone deserves access to high-quality, 
                beautifully designed furniture that transforms their living spaces into personal sanctuaries.
              </p>
              <p className="text-gray-600 mb-4">
                Founded by interior design enthusiasts who were frustrated with the lack of quality 
                and craftsmanship in mass-produced furniture, we set out to create pieces that combine 
                timeless design with modern functionality.
              </p>
              <p className="text-gray-600">
                Today, we're proud to offer a carefully curated collection of furniture that is 
                sustainably sourced, expertly crafted, and designed to last generations.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern living room" 
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>




        </div>
      </div>
    </div>
  );
};

export default AboutPage;