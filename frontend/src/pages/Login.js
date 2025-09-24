import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const user = res.data.user;
      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (login) login(user);

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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <form
        className="border shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
        onSubmit={handleLogin}
      >
        <div className="text-center mb-3">
          <h2>Login</h2>
        </div>

        <div className="mb-3">
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

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* 🔹 Bootstrap Icons eye toggle */}
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            required
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
