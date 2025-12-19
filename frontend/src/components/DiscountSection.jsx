import React from 'react';
import { Check } from 'lucide-react';

const DiscountSection = () => {
  const discountFeatures = [
    'Premium quality materials',
    'Modern design aesthetics',
    'Eco-friendly manufacturing',
    'Free shipping nationwide'
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-charcoal-50 to-terracotta-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Special Discount Items
          </h2>
          <p className="text-terracotta-600 font-medium">Limited Time Offer</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Up to 30% Off on All Furniture
            </h3>
            <p className="text-gray-600">
              Premium Designer Collection
            </p>
            <p className="text-gray-600">
              Elevate your home with our exclusive designer furniture collection. Each piece is crafted with attention to detail and built to last.
            </p>
            <ul className="space-y-3">
              {discountFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <Check className="text-terracotta-600" size={20} />
                  {feature}
                </li>
              ))}
            </ul>

          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop" 
              alt="Discount Furniture" 
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;