import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-charcoal-400 to-terracotta-400 bg-clip-text text-transparent mb-4">
              Furnix
            </h3>
            <p className="text-gray-400 mb-4">
              Basant Lok, Vasant Vihar<br />
              New Delhi, India
            </p>
            <div className="flex gap-4">
              <Facebook className="cursor-pointer hover:text-terracotta-400 transition" size={20} />
              <Twitter className="cursor-pointer hover:text-terracotta-400 transition" size={20} />
              <Instagram className="cursor-pointer hover:text-terracotta-400 transition" size={20} />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-terracotta-400 transition">Sofas</a></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">Chairs</a></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">Wardrobes</a></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">TV and Media Units</a></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">Dressing Tables</a></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">Study Tables</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-terracotta-400 transition">My Account</a></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">Discount</a></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">Orders History</a></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/products" className="hover:text-terracotta-400 transition">Products</Link></li>
              <li><Link to="/blog" className="hover:text-terracotta-400 transition">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-terracotta-400 transition">Contact</Link></li>
              <li><a href="#" className="hover:text-terracotta-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>©2025 Furnix - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;