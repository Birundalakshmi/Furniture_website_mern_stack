import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import API from "../utils/api";
const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {

        if (data.user.role === 'admin') {
          localStorage.setItem('adminToken', data.token);
        } else {
          localStorage.setItem('userToken', data.token);
        }
        localStorage.setItem('userData', JSON.stringify(data.user));
        

        if (data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-terracotta-100 flex items-center justify-center px-4">

      <Link to="/" className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-800 transition">
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-charcoal-800 to-terracotta-600 bg-clip-text text-transparent mb-6">Furnix</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>


        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition"
                placeholder="Email Address"
              />
            </div>


            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400 hover:text-gray-600" size={20} />
                ) : (
                  <Eye className="text-gray-400 hover:text-gray-600" size={20} />
                )}
              </button>
            </div>


            <div className="text-right">
              <a href="#" className="text-terracotta-600 hover:text-terracotta-700 text-sm font-medium">
                Forgot Password?
              </a>
            </div>


            <button
              type="submit"
              className="w-full bg-gradient-to-r from-charcoal-700 to-terracotta-600 text-white py-3 rounded-xl hover:from-charcoal-800 hover:to-terracotta-700 transition font-medium text-lg"
            >
              Sign In
            </button>
          </form>


          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-terracotta-600 hover:text-terracotta-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;