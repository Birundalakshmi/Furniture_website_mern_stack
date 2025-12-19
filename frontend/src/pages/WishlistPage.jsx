import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Star, X } from 'lucide-react';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setWishlist(savedWishlist);
    setCart(savedCart);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

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

  if (wishlist.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-6">Save your favorite products here!</p>
          <Link to="/products" className="bg-terracotta-600 text-white px-6 py-3 rounded-lg hover:bg-terracotta-700 transition">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-terracotta-600 hover:text-terracotta-700">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <button onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition">
            <X size={18} />
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <button onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                  <Heart size={20} className="fill-red-500 text-red-500" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{product.rating} ({product.reviews})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-terracotta-600">₹{product.price.toLocaleString()}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-charcoal-400 line-through">₹{product.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <button onClick={() => addToCart(product)}
                  className="w-full bg-terracotta-600 text-white py-2 rounded-lg hover:bg-terracotta-700 transition font-medium flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;