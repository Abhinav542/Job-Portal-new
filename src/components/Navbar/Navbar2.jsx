import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
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
    
  );
}
