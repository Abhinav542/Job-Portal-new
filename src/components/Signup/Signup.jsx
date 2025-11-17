
import React, { useState } from "react";
import "./SignUp.css";
import bgImage1 from "../../assets/Signup-bg.webp";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // SEND DATA TO BACKEND
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed!");
        return;
      }

      // ⭐ SAVE USER + TOKEN
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ Signup Successful!");
      navigate("/home");

    } catch (err) {
      console.error(err);
      setError("Failed to connect to server.");
    }
  };

  const closeError = () => setError("");

  return (
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${bgImage1})` }}
    >
      {error && (
        <div className="error-popup">
          <p>{error}</p>
          <button onClick={closeError}>OK</button>
        </div>
      )}

      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>

        <form onSubmit={handleSubmit} className="signup-form">

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
