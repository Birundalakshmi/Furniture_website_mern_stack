import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Plus, Edit, Package, Hash, Tag, Image } from 'lucide-react';
import { IndianRupee } from 'lucide-react';
import API from "../utils/api";
const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const adminToken = localStorage.getItem('adminToken');
      const userToken = localStorage.getItem('userToken');
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      

      if (!adminToken && !(userToken && userData.role === 'admin')) {
        navigate('/admin/login');
        return;
      }
      
      const token = adminToken || userToken;
      const response = await fetch(`${API}/api/admin/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        })
      });

      if (response.ok) {
        window.dispatchEvent(new Event('productUpdated'));
        navigate('/admin/products');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-terracotta-100 flex">

      <div className="w-64 bg-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-charcoal-800 to-terracotta-600 bg-clip-text text-transparent mb-2">
            Furnix
          </h1>
          <p className="text-sm text-gray-500">Furniture Admin Panel</p>
        </div>
        
        <nav className="px-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-all ${
              isActive('/admin/dashboard') ? 'bg-terracotta-100 text-charcoal-800' : 'text-gray-600 hover:bg-terracotta-50'
            }`}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link
            to="/admin/add-product"
            className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-all ${
              isActive('/admin/add-product') ? 'bg-terracotta-100 text-charcoal-800' : 'text-gray-600 hover:bg-terracotta-50'
            }`}
          >
            <Plus size={20} />
            <span className="font-medium">Add Product</span>
          </Link>
          
          <Link
            to="/admin/products"
            className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-all ${
              isActive('/admin/products') ? 'bg-terracotta-100 text-charcoal-800' : 'text-gray-600 hover:bg-terracotta-50'
            }`}
          >
            <Edit size={20} />
            <span className="font-medium">Edit Products</span>
          </Link>
        </nav>
      </div>


      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Add Product</h1>
            <p className="text-gray-600">Create a new furniture product for your store</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              localStorage.removeItem('userToken');
              localStorage.removeItem('userData');
              navigate('/');
            }}
            className="bg-gradient-to-r from-charcoal-700 to-terracotta-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="flex items-center text-gray-700 font-medium mb-3">
                <Package className="mr-2 text-terracotta-600" size={20} />
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                placeholder="Enter product name"
                required
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-3">
                  <IndianRupee className="mr-2 text-charcoal-600" size={20} />
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-3">
                  <Hash className="mr-2 text-terracotta-600" size={20} />
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                  placeholder="0"
                  required
                />
              </div>
            </div>


            <div>
              <label className="flex items-center text-gray-700 font-medium mb-3">
                <Tag className="mr-2 text-charcoal-600" size={20} />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select Category</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
                <option value="Wardrobes">Wardrobes</option>
                <option value="Dressing Tables">Dressing Tables</option>
                <option value="Dining Tables">Dining Tables</option>
                <option value="Study Tables">Study Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="TV and Media Units">TV and Media Units</option>
              </select>
            </div>


            <div>
              <label className="flex items-center text-gray-700 font-medium mb-3">
                <Image className="mr-2 text-charcoal-600" size={20} />
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.image && (
                <div className="mt-3">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-2xl border border-gray-200"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>


            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-charcoal-700 to-terracotta-600 text-white py-4 rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adding Product...</span>
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;