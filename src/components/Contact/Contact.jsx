import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import "./Contact.css";
import Navbar from "../Navbar/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Message sent successfully!");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Get In Touch</h1>
        <p>Have questions? We'd love to hear from you.</p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-grid">

          {/* LEFT — CONTACT FORM */}
          <div className="contact-form-box">
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="form-area">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="contact-send-btn">
                <Send size={18} /> Send Message
              </button>

            </form>
          </div>

          {/* RIGHT — INFO + MAP */}
          <div className="contact-right-column">

            {/* Contact Info Box */}
            <div className="contact-info-box">
              <h3>Contact Information</h3>

              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <p className="label">Email</p>
                  <p>contact@careerconnect.com</p>
                  <p>support@careerconnect.com</p>
                </div>
              </div>

              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <p className="label">Phone</p>
                  <p>+1 (555) 123-4567</p>
                  <p>Mon–Fri: 9AM – 6PM</p>
                </div>
              </div>

              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <p className="label">Address</p>
                  <p>123 Business Avenue</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
            </div>

            {/* Updated Map Box */}
            <div className="map-box">
              <iframe
                title="office-map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d70387.71230816422!2d80.94592218644698!3d26.85416402136942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1765293503473!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>
      </section>

    </>
  );
};

export default Contact;
