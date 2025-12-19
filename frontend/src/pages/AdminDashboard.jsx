import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, CheckCircle, Clock, Plus, Package, TrendingUp, Users, BarChart3, Edit, IndianRupee } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
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

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  if (!stats) return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-terracotta-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-terracotta-100 flex">

      <div className="w-64 bg-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-charcoal-800 to-terracotta-600 bg-clip-text text-transparent mb-2">
            Furnix
          </h1>
          <p className="text-sm text-gray-500">Furnix Admin Panel</p>
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Overview of your furniture store performance</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-charcoal-700 to-terracotta-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
          >
            Logout
          </button>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-terracotta-600 to-terracotta-700 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <TrendingUp className="text-terracotta-400" size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-charcoal-600 to-charcoal-700 rounded-2xl flex items-center justify-center">
                <IndianRupee className="text-white" size={24} />
              </div>
              <TrendingUp className="text-charcoal-400" size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-800">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {stats.recentOrders.map((order, index) => (
                <div key={order._id} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-terracotta-500 to-charcoal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {order.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 text-lg">₹{order.total.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString('en-IN', { 
                          day: 'numeric',
                          month: 'short', 
                          year: 'numeric'
                        })} at {new Date(order.orderDate).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Items ordered:</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm text-gray-600">
                          <span>{item.productName} × {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;