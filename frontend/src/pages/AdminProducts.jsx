import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart3, Plus, Edit, Package, Star, Trash2 } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    

    if (!adminToken && !(userToken && userData.role === 'admin')) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
        await fetch(`http://localhost:5000/api/admin/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product');
      }
    }
  };

  const isActive = (path) => location.pathname === path;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-terracotta-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600"></div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Products</h1>
            <p className="text-gray-600">Manage and update your furniture listings</p>
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

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first product</p>
            <Link
              to="/admin/add-product"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-charcoal-700 to-terracotta-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
            >
              <Plus size={20} />
              <span>Add Your First Product</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover" 
                  />
                  <div className="absolute top-4 right-4 bg-terracotta-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>

                  
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                  </div>
                  
                  <div className="text-2xl font-bold text-terracotta-600 mb-4">
                    ₹{product.price.toLocaleString()}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="flex-1 bg-white border-2 border-terracotta-200 text-terracotta-700 py-3 px-4 rounded-full hover:bg-terracotta-50 transition-all flex items-center justify-center space-x-2 font-medium"
                    >
                      <Edit size={18} />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="w-12 h-12 border-2 border-terracotta-200 text-terracotta-700 rounded-full hover:bg-terracotta-50 transition-all flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;