// src/pages/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const user = res.data.user;
      const token = res.data.token;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set user in AuthContext
      if (login) login(user);

      // Role-based redirect (normalize role)
      const role = user.role.toLowerCase();
      if (role === "admin") navigate("/dashboard");
      else navigate("/products");
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data?.errors) {
        const messages = err.response.data.errors
          .map((e) => `${e.path}: ${e.msg}`)
          .join("\n");
        alert(messages);
      } else if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="container-fluid mt-5" style={{ maxWidth: "400px" }}>
      <form className="container-fluid border shadow-lg" onSubmit={handleLogin}>
        <div className="my-3 text-center">
          <h2>Login</h2>
        </div>
        <div className="mb-3 px-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 px-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-check mb-3 ms-3">
          <input type="checkbox" className="form-check-input" id="rememberMe" required />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <div className="px-3">
          <button type="submit" className="btn btn-primary mb-4 w-100">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
