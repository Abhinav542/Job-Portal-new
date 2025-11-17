import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Jobs from "../Jobs/Jobs";
import "./Navbar.css";
import "../Logout/logout"
import Logout from "../Logout/logout";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const storedUser = JSON.parse(localStorage.getItem("user"));
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

       {storedUser ? (
        <>
                <span className="welcome">Welcome, {storedUser.name} 👋</span>
                <Logout/>   
                </>
              ) : (
                <>
                  <Link className="login-btn" to="/login">Login</Link>
                  <Link className="signup-btn" to="/signup">Sign Up</Link>
                </>
              )}
         
    </header>
  );
};

export default Navbar;
