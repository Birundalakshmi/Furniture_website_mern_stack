import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

const FeaturedProducts = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existing = updatedCart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const featuredProducts = [
    { id: 1, name: 'Modern Lounge Chair', price: 299, oldPrice: 399, image: 'https://th.bing.com/th/id/OIP.KbfHQz9peUEBPRNFvBVhqgHaHa?w=193&h=193&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1', rating: 4.5 },
    { id: 2, name: 'Velvet Sofa Set', price: 899, oldPrice: 1199, image: 'https://th.bing.com/th/id/OIP.PR8OnMEzLigHersmkr9cfAHaFj?w=204&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1', rating: 5 },
    { id: 3, name: 'Scandinavian Table', price: 189, oldPrice: 249, image: 'https://th.bing.com/th/id/OIP.fknUWT9CHJzweti-yz1OHgHaHa?w=195&h=195&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1', rating: 4 },
    { id: 4, name: 'Office Desk Chair', price: 159, oldPrice: 199, image: 'https://th.bing.com/th/id/OIP.nGFMuv8tF5IWtJawZxN8VQHaHa?w=184&h=184&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1', rating: 4.5 },
    { id: 5, name: 'Wooden Bookshelf', price: 249, oldPrice: 329, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop', rating: 4 },
    { id: 6, name: 'Kids Study Table', price: 799, oldPrice: 999, image: 'https://th.bing.com/th/id/OIP.6Vv53jQ9qLHGUMNC8Ws7bAHaGl?w=215&h=191&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1', rating: 5 },
    { id: 7, name: 'Vintage Vanity Tables', price: 349, oldPrice: 449, image: 'https://th.bing.com/th/id/OIP.EZkZSWBB6NNMHHiVOZweKgHaHY?w=188&h=187&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1', rating: 4.5 },
    { id: 8, name: 'Coffee Table', price: 179, oldPrice: 229, image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop', rating: 4 },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Featured Products
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="relative bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-terracotta-600 transition">
                  {product.name}
                </h3>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-bold text-terracotta-600">₹{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{product.oldPrice}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-terracotta-600 text-white px-2 py-1 rounded text-xs hover:bg-terracotta-700 transition ml-2"
                  >
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;