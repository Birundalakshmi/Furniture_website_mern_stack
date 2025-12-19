# Furniture E-commerce Website

A full-stack furniture e-commerce website with admin dashboard built with React.js frontend and Node.js backend.

## Project Structure

furniture-project/
├── frontend/          # React.js frontend
├── backend/           # Node.js backend
└── README.md


## Features

### Frontend
- Modern furniture showcase
- Product catalog with filtering
- Shopping cart and wishlist
- User authentication
- Blog section
- About and Contact pages
- Responsive design

### Admin Dashboard
- Admin authentication
- Dashboard with order and revenue statistics
- Product management (CRUD operations)
- Add new products
- Edit existing products

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:

cd backend


2. Install dependencies:

npm install


3. Start the server:

npm run dev


The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

cd frontend


2. Install dependencies:

npm install


3. Start the development server:

npm run dev


The frontend will run on `http://localhost:5173`

## Admin Access

- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@furnix.com`
- **Password**: `admin123`

## API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Admin login

### Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics

### Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Add new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

## Technologies Used

### Frontend
- React.js
- React Router
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- CORS
- bcryptjs
- jsonwebtoken

## Demo Data

The application includes mock data for:
- 3 sample products
- 3 sample orders
- Dashboard statistics

## Future Enhancements

- Database integration (MongoDB)
- User order management
- Payment integration
- Email notifications
- Image upload functionality
- Advanced filtering and search