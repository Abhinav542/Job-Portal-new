import React from "react";
import "./Contact.css";
import Navbar from '../Navbar/Navbar'

const Contact = () => {
    
  return (
    <>
     {/* ✅ Navbar */}
      <Navbar />
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>Have questions? We'd love to hear from you!</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contact;
