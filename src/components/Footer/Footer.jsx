import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-col">
          <h3 className="footer-title">CareerConnect</h3>
          <p className="footer-text">
            CareerConnect is a modern job portal helping candidates find their dream job and 
            enabling companies to hire top talent. Fast, reliable, and user-focused.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li><a href="/">Home</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="/companies">Companies</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Job Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">Top Categories</h4>
          <ul className="footer-list">
            <li>IT & Software</li>
            <li>Sales & Marketing</li>
            <li>Finance</li>
            <li>HR & Admin</li>
            <li>Customer Support</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-col">
          <h4 className="footer-heading">Get in Touch</h4>

          <p className="footer-contact">
            <FaEnvelope className="footer-icon" /> support@careerconnect.com
          </p>

          <p className="footer-contact">
            <FaPhone className="footer-icon" /> +91 98765 43210
          </p>

          <p className="footer-contact">
            <FaMapMarkerAlt className="footer-icon" /> New Delhi, India
          </p>

          {/* Social Icons */}
          <div className="footer-social">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CareerConnect. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
