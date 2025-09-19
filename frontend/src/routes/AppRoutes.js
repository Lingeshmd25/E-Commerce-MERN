// src/routes/AppRoutes.js
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { publicRoutes, adminRoutes, customerRoutes } from "./routes";

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext) || {};

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  const role = user.role;

  // Admin can access both admin + customer routes
  const roleRoutes =
    role === "Admin"
      ? [...adminRoutes, ...customerRoutes]
      : customerRoutes;

  return (
    <Routes>
      {roleRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* Fallback routes */}
      <Route
        path="/"
        element={<Navigate to={role === "Admin" ? "/dashboard" : "/products"} />}
      />
      <Route
        path="*"
        element={<Navigate to={role === "Admin" ? "/dashboard" : "/products"} />}
      />
    </Routes>
  );
};

export default AppRoutes;
