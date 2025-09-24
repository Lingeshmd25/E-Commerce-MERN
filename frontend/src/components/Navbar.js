import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-primary"
      }`}
    >
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">E-Commerce</Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Theme Toggle */}
            <li className="nav-item me-2">
              <button
                className={`btn btn-outline-${
                  theme === "light" ? "dark" : "light"
                }`}
                onClick={toggleTheme}
              >
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </li>

            {/* Auth Links */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

            {user && (
              <>
                {user.role?.toLowerCase() === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/products">Products</Link>
                    </li>
                  </>
                )}
                {user.role?.toLowerCase() === "customer" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                  </li>
                )}

                {/* Logout always visible for logged-in users */}
                <li className="nav-item ms-2">
                  <button
                    className={`btn btn-outline-${theme === "light" ? "dark" : "light"}`}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
