import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Jobs from "../Jobs/Jobs";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">JobPortal</div>

      {/* Hamburger menu for mobile */}
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={isOpen ? "open" : ""}>
        <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link>
        <Link to="/companies" onClick={() => setIsOpen(false)}>Companies</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
      </nav>

      <div className="nav-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
