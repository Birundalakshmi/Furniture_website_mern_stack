import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <HomePage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/products" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <ProductsPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/blog" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <BlogPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <AboutPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <ContactPage />
              </main>
              <Footer />
            </>
          } />

          <Route path="/cart" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <CartPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/wishlist" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <WishlistPage />
              </main>
              <Footer />
            </>
          } />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />
          <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
