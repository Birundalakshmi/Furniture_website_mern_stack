import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminEditProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const products = await response.json();
      const product = products.find(p => p._id === id);
      
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          category: product.category,
          stock: product.stock.toString(),
          image: product.image
        });
      }
    } catch (error) {
      console.error('Failed to fetch product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: 'PUT',
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
        navigate('/admin/products');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-terracotta-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <Link to="/admin/dashboard" className="text-2xl font-bold bg-gradient-to-r from-charcoal-800 to-terracotta-600 bg-clip-text text-transparent">
            Furnix Admin
          </Link>
          <Link
            to="/admin/products"
            className="bg-gradient-to-r from-charcoal-700 to-terracotta-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition"
          >
            Back to Products
          </Link>
        </div>
      </nav>

      <div className="p-8 flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-2xl mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Edit Product</h2>
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
        
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Category</label>
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

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-charcoal-700 to-terracotta-600 text-white py-3 rounded-full hover:shadow-lg disabled:opacity-50 font-medium transition-all"
            >
              {loading ? 'Updating Product...' : 'Update Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;