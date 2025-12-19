import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import API from "../utils/api";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
      const response = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        alert('Registration successful!');
        navigate('/');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 via-terracotta-50 to-charcoal-100 flex items-center justify-center py-12 px-4">

      <Link to="/" className="absolute top-6 left-6 flex items-center text-charcoal-700 hover:text-charcoal-800 transition">
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to Home</span>
      </Link>

      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-charcoal-800 to-terracotta-600 bg-clip-text text-transparent mb-4">
            Furnix
          </h1>
          <h2 className="text-2xl font-bold text-charcoal-800 mb-2">Create Account</h2>
        </div>


        <div className="bg-gradient-to-b from-terracotta-50 to-charcoal-50 rounded-2xl shadow-2xl p-8 border border-terracotta-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-terracotta-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent bg-white/80 text-charcoal-800 placeholder-charcoal-600"
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-terracotta-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent bg-white/80 text-charcoal-800 placeholder-charcoal-600"
                  placeholder="Last Name"
                />
              </div>
            </div>


            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-terracotta-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent bg-white/80 text-charcoal-800 placeholder-charcoal-600"
                placeholder="Email Address"
              />
            </div>


            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-terracotta-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent bg-white/80 text-charcoal-800 placeholder-charcoal-600"
                placeholder="Phone Number"
              />
            </div>


            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-12 border border-terracotta-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent bg-white/80 text-charcoal-800 placeholder-charcoal-600"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="text-terracotta-600 hover:text-terracotta-700" size={20} />
                ) : (
                  <Eye className="text-terracotta-600 hover:text-terracotta-700" size={20} />
                )}
              </button>
            </div>


            <button
              type="submit"
              className="w-full bg-gradient-to-r from-charcoal-700 to-terracotta-600 text-white py-4 rounded-2xl hover:from-charcoal-800 hover:to-terracotta-700 transition-all duration-200 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>


          <p className="mt-8 text-center text-charcoal-700">
            Already have an account?{' '}
            <Link to="/login" className="text-terracotta-600 hover:text-terracotta-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;