import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Heart, ShoppingCart } from 'lucide-react';

const ProductsPage = () => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [perPage, setPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true
  });
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setCart(savedCart);
    setWishlist(savedWishlist);
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleProductUpdate = () => {
      fetchProducts();
      fetchCategories();
    };
    
    window.addEventListener('productUpdated', handleProductUpdate);
    return () => window.removeEventListener('productUpdated', handleProductUpdate);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existing = updatedCart.find(item => item._id === product._id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const toggleWishlist = (product) => {
    let updatedWishlist;
    const existingProduct = wishlist.find(item => item._id === product._id);
    
    if (existingProduct) {
      updatedWishlist = wishlist.filter(item => item._id !== product._id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const ratingMatch = selectedRating === 0 || product.rating >= selectedRating;
    return categoryMatch && priceMatch && ratingMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + perPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              <div className="mb-6">
                <button onClick={() => toggleSection('category')}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3">
                  <span>Category</span>
                  {expandedSections.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.category && (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input type="checkbox" checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-terracotta-600 border-gray-300 rounded focus:ring-terracotta-500" />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <button onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3">
                  <span>Price</span>
                  {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.price && (
                  <div>
                    <input type="range" min="0" max="50000" value={priceRange[1]}
                      onChange={(e) => { setPriceRange([0, Number(e.target.value)]); setCurrentPage(1); }}
                      className="w-full accent-terracotta-600" />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => { setSelectedCategories([]); setPriceRange([0, 50000]); setSelectedRating(0); setCurrentPage(1); }}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition">
                Clear All Filters
              </button>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div key={product._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative overflow-hidden bg-gray-100">
                    <img src={product.image} alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
                    <button onClick={() => toggleWishlist(product)}
                      className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                      <Heart size={20} className={isInWishlist(product._id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                    </button>
                    <div className="absolute top-4 right-4 bg-terracotta-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-terracotta-600 transition">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-terracotta-600">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-terracotta-600 text-white py-2 rounded hover:bg-terracotta-700 transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && !loading && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found. Add some products from the admin panel!</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                  className={`px-4 py-2 border border-gray-300 rounded-md transition ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-700'}`}>
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button key={index + 1} onClick={() => goToPage(index + 1)}
                    className={`px-4 py-2 rounded-md transition ${currentPage === index + 1 ? 'bg-terracotta-600 text-white' : 'border border-gray-300 hover:bg-gray-50 text-gray-700'}`}>
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                  className={`px-4 py-2 border border-gray-300 rounded-md transition ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-700'}`}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {totalCartItems > 0 && (
        <div className="fixed bottom-6 right-6 bg-terracotta-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2">
          <ShoppingCart size={24} />
          <span className="font-bold">{totalCartItems}</span>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;