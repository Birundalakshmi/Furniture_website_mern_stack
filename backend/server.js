const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');
const { authenticateAdmin } = require('./middleware/auth');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Furnix Backend is running 🚀");
});
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedData();
  })
  .catch(err => {
  console.error('MongoDB connection error:', err.message);
});



async function seedData() {
  try {
    
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany([
        { name: 'Filton Fabric 3 Seater Sofa in Green Colour', price: 26399, category: 'Sofas', stock: 15, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop' },
        { name: 'Arisa Bedroom Set with King Size Storage Bed', price: 24999, category: 'Beds', stock: 8, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop' },
        { name: 'Carion Sheesham Wood Foldable 8 Seater Dining Table', price: 26999, category: 'Dining Tables', stock: 5, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop' },
        { name: 'Claire Sheesham Wood Writing Table In Rustic Teak Finish', price: 13999, oldPrice: 20499, category: 'Study Tables', stock: 12, image: 'https://th.bing.com/th/id/OIP.KSa3m85L76OFkYIlpu2hLAHaIJ?w=195&h=215&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Amber Cane Arm Chair in Light Walnut Finish', price: 11599, category: 'Chairs', stock: 20, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop' },
        { name: 'Specchio 2 Door Wardrobe with Mirror', price: 14999, category: 'Wardrobes', stock: 10, image: 'https://www.bing.com/th/id/OIP.2A2tw82SqOFmYiNhwYjsmwHaGA?w=235&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=2&pid=3.1&rm=2&ucfimg=1' },
        { name: 'Desire Breathable Mesh Ergonomic Chair', price: 3999, oldPrice: 9999, category: 'Chairs', stock: 25, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop' },
        { name: 'Modern TV Unit with Storage', price: 18999, category: 'TV and Media Units', stock: 15, image: 'https://www.bing.com/th/id/OIP.3OBcnw5QPvpidL_AxsJ1-QHaHa?w=210&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=2&pid=3.1&rm=2&ucfimg=1' },
        { name: 'Elegant Dressing Table with Mirror', price: 15999, category: 'Dressing Tables', stock: 8, image: 'https://www.bing.com/th/id/OIP.TI7SOG0_-CYKKifhcr7anQHaHa?w=219&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=2&pid=3.1&rm=2&ucfimg=1' },
        { name: 'Luxury King Size Bed with Headboard', price: 34999, category: 'Beds', stock: 6, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop' },
        { name: 'L-Shaped Corner Sofa in Grey', price: 42999, category: 'Sofas', stock: 4, image: 'https://th.bing.com/th/id/OIP.MdhoIyBFEdCvriyenokLAgAAAA?w=260&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Compact Study Desk', price: 8999, category: 'Study Tables', stock: 18, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop' },
        { name: 'Premium Leather Recliner Sofa', price: 54999, category: 'Sofas', stock: 3, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
        { name: 'Wooden Storage Bed Queen Size', price: 28999, category: 'Beds', stock: 7, image: 'https://th.bing.com/th/id/OIP._PMziEwjE5bMt7OBY6VPkAHaGa?w=225&h=195&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Glass Top Dining Table 6 Seater', price: 32999, category: 'Dining Tables', stock: 5, image: 'https://www.bing.com/th/id/OIP.OkOzeZT4GON-INbxO4Ao0wHaFG?w=240&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimg1&dpr=2&pid=3.1&rm=2&ucfimg=1' },
        { name: 'Executive Office Chair with Lumbar Support', price: 12999, oldPrice: 18999, category: 'Chairs', stock: 12, image: 'https://th.bing.com/th/id/OIP.BTi2c0Dt_lr0WvoZ-GRPzgHaHa?w=183&h=184&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: '3 Door Sliding Wardrobe White', price: 24999, category: 'Wardrobes', stock: 6, image: 'https://th.bing.com/th/id/OIP.pJq2I5tTKkyhLfndpLvyxwHaGI?w=259&h=214&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Modern Dressing Table with LED Mirror', price: 19999, category: 'Dressing Tables', stock: 8, image: 'https://th.bing.com/th/id/OIP.AVt7wTqxiH94-d2rKiE4VQHaHa?w=199&h=199&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Home Office Study Table', price: 9999, category: 'Study Tables', stock: 15, image: 'https://th.bing.com/th/id/OIP.e7ytZJ859GQcwmEwS9x8nQHaHa?w=176&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Wall Mounted TV Unit with Storage', price: 22999, category: 'TV and Media Units', stock: 10, image: 'https://th.bing.com/th/id/OIP.AnnVC4_WXb5GGGNcMhHEOQHaF7?w=225&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Velvet Accent Chair Pink', price: 16999, category: 'Chairs', stock: 12, image: 'https://th.bing.com/th/id/OIP.zGaVGqlkR-G6UaRjc5HuywHaHa?w=176&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Marble Top Coffee Table', price: 13999, category: 'Dining Tables', stock: 8, image: 'https://th.bing.com/th/id/OIP.KEUrxN9_p2dYwiozDsJedQHaHa?w=189&h=189&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'King Size Upholstered Bed Grey', price: 39999, category: 'Beds', stock: 4, image: 'https://th.bing.com/th/id/OIP.U3dvmHTGhPajIBHixFaMxgHaHa?w=195&h=195&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Corner Wardrobe with Mirror Door', price: 29999, category: 'Wardrobes', stock: 5, image: 'https://th.bing.com/th/id/OIP.c8Dj6pybUbc26y-zk3jG8AHaFj?w=218&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Leather 3 Seater Sofa', price: 48999, category: 'Sofas', stock: 6, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop' },
        { name: 'Gaming Chair with RGB Lights', price: 14999, oldPrice: 21999, category: 'Chairs', stock: 20, image: 'https://th.bing.com/th/id/OIP.zXXOykwMTYJYYqpPEjiOVwHaHa?w=185&h=185&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Wall Unit TV Stand Black', price: 26999, category: 'TV and Media Units', stock: 8, image: 'https://th.bing.com/th/id/OIP.t0Yj3uWaIU-8Kofl89BNyQHaHa?w=184&h=184&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'Vanity Dressing Table with Stool', price: 17999, category: 'Dressing Tables', stock: 10, image: 'https://th.bing.com/th/id/OIP.hiI1-mAFlWKb1Nt24a_AXQHaHa?w=196&h=196&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'L-Shape Computer Desk', price: 11999, category: 'Study Tables', stock: 15, image: 'https://th.bing.com/th/id/OIP.epMyweHLXu15vydXzFrXPwHaHa?w=197&h=197&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' },
        { name: 'L-Shape Gaming Table', price: 19999, category: 'Study Tables', stock: 12, image: 'https://th.bing.com/th/id/OIP.JRErb817otoIzYyP2RVQ9gHaHX?w=187&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1' }
      ]);
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {

    if (email === 'admin@furnix.com' && password === 'admin123') {
      const token = jwt.sign(
        { email, role: 'admin', name: 'Admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return res.json({ 
        success: true, 
        token,
        user: { email, role: 'admin', name: 'Admin' },
        redirectTo: '/admin/dashboard'
      });
    }
    

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true, 
      token,
      user: { email: user.email, role: user.role, name: user.name },
      redirectTo: '/'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign(
      { email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true, 
      token,
      user: { email: user.email, role: user.role, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@furnix.com' && password === 'admin123') {
    const token = jwt.sign(
      { email, role: 'admin', name: 'Admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true, 
      token,
      user: { email, role: 'admin', name: 'Admin' }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


app.get('/api/admin/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const recentOrders = await Order.find().sort({ orderDate: -1 }).limit(5);

    res.json({
      totalOrders,
      totalRevenue,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});


app.get('/api/products', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    
    const { category, minPrice, maxPrice, page, limit = 30 } = req.query;
    
    let filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    
    if (!page) {
      const products = await Product.find(filter);
      return res.json(products);
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
    const total = await Product.countDocuments(filter);
    
    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
        hasNext: skip + products.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});


app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

app.get('/api/debug/products', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const latest = await Product.find().sort({ _id: -1 }).limit(3);
    const duplicates = await Product.aggregate([
      { $group: { _id: '$name', count: { $sum: 1 }, ids: { $push: '$_id' } } },
      { $match: { count: { $gt: 1 } } }
    ]);
    res.json({ totalProducts: count, latestProducts: latest, duplicates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching debug data' });
  }
});

app.delete('/api/admin/remove-duplicates', authenticateAdmin, async (req, res) => {
  try {
    const duplicates = await Product.aggregate([
      { $group: { _id: '$name', count: { $sum: 1 }, ids: { $push: '$_id' } } },
      { $match: { count: { $gt: 1 } } }
    ]);
    
    let removedCount = 0;
    for (const duplicate of duplicates) {
      const idsToRemove = duplicate.ids.slice(1);
      await Product.deleteMany({ _id: { $in: idsToRemove } });
      removedCount += idsToRemove.length;
    }
    
    res.json({ message: `Removed ${removedCount} duplicate products` });
  } catch (error) {
    res.status(500).json({ message: 'Error removing duplicates' });
  }
});


app.delete('/api/admin/clear-orders', authenticateAdmin, async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: 'All orders cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing orders' });
  }
});


app.post('/api/orders', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { items, total } = req.body;
    
    for (const item of items) {
      await Product.findOneAndUpdate(
        { name: item.productName },
        { $inc: { stock: -item.quantity } }
      );
    }
    
    const order = new Order({
      customerName: decoded.name,
      customerEmail: decoded.email,
      items,
      total,
      status: 'completed',
      orderDate: new Date()
    });
    
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ message: 'Error creating order' });
  }
});




app.get('/api/admin/products', authenticateAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/api/admin/products', authenticateAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product' });
  }
});

app.put('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
});

app.delete('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Admin credentials: admin@furnix.com / admin123');
});