import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
      console.log(err.response?.data);

      if (err.response?.data?.errors) {
        const messages = err.response.data.errors
          .map(e => `${e.path}: ${e.msg}`)
          .join("\n");
        alert(messages);
      } else {
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
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

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
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

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Re-enter Password</label>
          <div className="position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />
            <i
              className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>
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
