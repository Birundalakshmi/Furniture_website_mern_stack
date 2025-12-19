import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, X, CheckCircle } from 'lucide-react';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('Please login to place an order');
      return;
    }

    try {
      const orderItems = cart.map(item => ({
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const total = getTotalPrice();
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: orderItems,
          total: total
        })
      });

      if (response.ok) {
        setOrderTotal(total);
        setShowSuccess(true);
        clearCart();
        
        // Redirect to home page after 5 seconds
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center bg-white rounded-lg shadow-lg p-8">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-lg text-green-600 mb-4">Your order has been placed successfully</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Order Total</h3>
            <p className="text-2xl font-bold text-terracotta-600">₹{orderTotal.toLocaleString()}</p>
          </div>
          
          <div className="text-gray-600 mb-4">
            <p className="font-medium mb-2">We appreciate your business</p>
          </div>
          
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link to="/products" className="bg-terracotta-600 text-white px-6 py-3 rounded-lg hover:bg-terracotta-700 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-terracotta-600 hover:text-terracotta-700">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <button onClick={clearCart}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition">
            <X size={18} />
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-terracotta-600 font-bold">₹{item.price.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100">
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 mt-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total: ₹{getTotalPrice().toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-terracotta-600 text-white py-3 rounded-lg hover:bg-terracotta-700 transition font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;