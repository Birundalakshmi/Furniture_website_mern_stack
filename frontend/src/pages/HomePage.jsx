import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import DiscountSection from '../components/DiscountSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <DiscountSection />
    </>
  );
};

export default HomePage;