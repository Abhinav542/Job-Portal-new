import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <div className="logo">JobPortal</div>

      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/companies">Companies</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="auth-section">
        {storedUser ? (
          <span className="welcome">Welcome, {storedUser.name} 👋</span>
        ) : (
          <>
            <Link className="login-btn" to="/login">Login</Link>
            <Link className="signup-btn" to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
