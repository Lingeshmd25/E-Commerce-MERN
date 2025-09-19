// src/App.js
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <Navbar />
        <div className="container mt-4">
          <AppRoutes />
        </div>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
