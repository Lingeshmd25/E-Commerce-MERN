import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Add this
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <Navbar />
          <div className="container mt-4">
            <AppRoutes />
          </div>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
