// src/routes/routes.js
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Public routes
export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/products", element: <Products /> },   // now public
];

// Admin routes
export const adminRoutes = [
  { path: "/dashboard", element: <Dashboard /> },  // Admin
];

// Customer routes
export const customerRoutes = [
  { path: "/products", element: <Products /> },      // Customer product list
  { path: "/product/:id", element: <ProductDetails /> }, // Customer view product details
];

