import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Heart, LogOut } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const updateData = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCartItems);
      setWishlistCount(wishlist.length);
      setUser(userData);
    };


    updateData();


    window.addEventListener('storage', updateData);


    window.addEventListener('cartUpdated', updateData);
    window.addEventListener('wishlistUpdated', updateData);
    window.addEventListener('userUpdated', updateData);

    return () => {
      window.removeEventListener('storage', updateData);
      window.removeEventListener('cartUpdated', updateData);
      window.removeEventListener('wishlistUpdated', updateData);
      window.removeEventListener('userUpdated', updateData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('adminToken');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
    window.dispatchEvent(new Event('userUpdated'));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-charcoal-800 to-terracotta-600 bg-clip-text text-transparent cursor-pointer">
                Furnix
              </h1>
            </Link>
          </div>


          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`transition ${
                isActive('/') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`transition ${
                isActive('/products') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/blog" 
              className={`transition ${
                isActive('/blog') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className={`transition ${
                isActive('/about') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`transition ${
                isActive('/contact') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
            >
              Contact
            </Link>
          </div>


          <div className="flex items-center space-x-4">

            <Link 
              to="/wishlist" 
              className="relative text-charcoal-700 hover:text-terracotta-600 transition"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-terracotta-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>


            <Link 
              to="/cart" 
              className="relative text-charcoal-700 hover:text-terracotta-600 transition"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-terracotta-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>


            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-terracotta-600 to-terracotta-700 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-terracotta-700 hover:to-terracotta-800"
                >
                  <User size={18} />
                  <span className="hidden sm:block text-sm">
                    {user.role === 'admin' ? 'Admin' : user.name}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-terracotta-100 text-terracotta-800 rounded">
                          Admin
                        </span>
                      )}
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 bg-gradient-to-r from-terracotta-600 to-terracotta-700 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-terracotta-700 hover:to-terracotta-800"
                aria-label="Login"
              >
                <User size={18} />
                <span className="text-sm">Login</span>
              </Link>
            )}


            <button 
              className="md:hidden text-charcoal-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>


      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link 
              to="/" 
              className={`block transition ${
                isActive('/') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`block transition ${
                isActive('/products') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/blog" 
              className={`block transition ${
                isActive('/blog') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className={`block transition ${
                isActive('/about') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block transition ${
                isActive('/contact') 
                  ? 'text-terracotta-600 font-medium' 
                  : 'text-charcoal-700 hover:text-terracotta-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t pt-3">
              {user ? (
                <div>
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="block text-terracotta-600 font-medium hover:text-terracotta-700 transition mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block text-red-600 font-medium hover:text-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 bg-gradient-to-r from-terracotta-600 to-terracotta-700 text-white px-4 py-2 rounded-full font-bold shadow-lg w-fit" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} />
                  <span className="text-sm">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;