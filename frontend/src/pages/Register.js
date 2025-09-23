// src/pages/Register.js
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      first_name: firstName,
      email,
      password,
      phone_number: phoneNumber
    };

    try {
      const res = await API.post("/auth/register", payload);
      alert("Registration successful!");
      navigate("/login"); // redirect to login
    } catch (err) {
      console.log(err.response?.data); // backend error object

      // Backend validation errors (array) kaatu
      if (err.response?.data?.errors) {
        const messages = err.response.data.errors
          .map(e => `${e.path}: ${e.msg}`)
          .join("\n");
        alert(messages);
      } else {
        // Generic message
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div
  className="d-flex justify-content-center align-items-center"
  style={{ minHeight: "100vh" }}
>
  <form className="border shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }} onSubmit={handleRegister}>
    <div className="text-center mb-3">
      <h2>Register</h2>
    </div>

    <div className="mb-3">
      <label className="form-label">Name</label>
      <input
        type="text"
        className="form-control"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="Enter your name"
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Phone Number</label>
      <input
        type="text"
        className="form-control"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
    </div>

    <div className="form-check mb-3">
      <input type="checkbox" className="form-check-input" id="terms" required />
      <label className="form-check-label" htmlFor="terms">
        I agree to the Terms & Conditions
      </label>
    </div>

    <button type="submit" className="btn btn-primary w-100">
      Register
    </button>
  </form>
</div>
    
  );
};

export default Register;
