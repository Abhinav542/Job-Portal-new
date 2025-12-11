import React, { useState } from "react";
import "./companies.css";
import Navbar from "../Navbar/Navbar"; // 👈 using your own navbar


const companiesData = [
  {
    id: 1,
    name: "TCS",
    industry: "IT Services",
    location: "Mumbai",
    size: "1000+",
    rating: 5,
    logo: "../public/CompaniesImg/tcs.png",
  },
  {
    id: 2,
    name: "Infosys",
    industry: "IT Services",
    location: "Bangalore",
    size: "1000+",
    rating: 4,
    logo: "../public/CompaniesImg/infosys.png",
  },
  {
    id: 3,
    name: "Airtel",
    industry: "Telecom",
    location: "Gurgaon",
    size: "1000+",
    rating: 4,
    logo: "../public/CompaniesImg/airtel.png",
  },
  {
    id: 4,
    name: "Google",
    industry: "IT Services",
    location: "Hyderabad",
    size: "1000+",
    rating: 5,
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 5,
    name: "Amazon",
    industry: "E-Commerce",
    location: "Hyderabad",
    size: "1000+",
    rating: 5,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 6,
    name: "Reliance Jio",
    industry: "Telecom",
    location: "Mumbai",
    size: "1000+",
    rating: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Reliance_Jio_Logo.svg",
  },
  {
    id: 7,
    name: "Accenture",
    industry: "Consulting",
    location: "Pune",
    size: "1000+",
    rating: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Accenture-logo.png",
  },
  {
    id: 8,
    name: "HCL",
    industry: "IT Services",
    location: "Noida",
    size: "1000+",
    rating: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/HCL_Technologies_logo.svg",
  },
  {
    id: 9,
    name: "Wipro",
    industry: "IT Services",
    location: "Bangalore",
    size: "1000+",
    rating: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Wipro_Logo.png",
  },
  {
    id: 10,
    name: "Deloitte",
    industry: "Consulting",
    location: "Gurgaon",
    size: "1000+",
    rating: 5,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Deloitte_Logo.png",
  },
  {
    id: 11,
    name: "Flipkart",
    industry: "E-Commerce",
    location: "Bangalore",
    size: "1000+",
    rating: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flipkart_logo.png",
  },
  {
    id: 12,
    name: "Capgemini",
    industry: "Consulting",
    location: "Mumbai",
    size: "1000+",
    rating: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Capgemini_201x_logo.svg",
  },
  {
    id: 13,
    name: "Tech Mahindra",
    industry: "IT Services",
    location: "Pune",
    size: "1000+",
    rating: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Tech_Mahindra_New_Logo.svg",
  },
  {
    id: 14,
    name: "L&T",
    industry: "Engineering",
    location: "Mumbai",
    size: "1000+",
    rating: 5,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/L%26T_Logo.svg",
  },
];

export default function Companies() {
  const [industry, setIndustry] = useState("All Industries");
  const [location, setLocation] = useState("All Locations");
  const [size, setSize] = useState("All");
  const [rating, setRating] = useState("All");

  const filtered = companiesData.filter((c) => {
    return (
      (industry === "All Industries" || c.industry === industry) &&
      (location === "All Locations" || c.location === location) &&
      (size === "All" || c.size === size) &&
      (rating === "All" || c.rating.toString() === rating)
    );
  });

  return (
    <>
      <Navbar />

      <div className="companies-wrapper">
        <div className="companies-header">
          <h1>Discover Top Companies</h1>
          <p>Find trusted companies with great work culture, ratings & benefits.</p>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option>All Industries</option>
            <option>IT Services</option>
            <option>Consulting</option>
            <option>Telecom</option>
            <option>Engineering</option>
            <option>E-Commerce</option>
          </select>

          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>All Locations</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Pune</option>
            <option>Noida</option>
            <option>Hyderabad</option>
            <option>Chennai</option>
          </select>

          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option>All</option>
            <option>1-100</option>
            <option>100-1000</option>
            <option>1000+</option>
          </select>

          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option>All</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
          </select>
        </div>

        {/* Company Cards */}
        <div className="companies-grid">
          {filtered.map((c) => (
            <div className="company-card" key={c.id}>
              <img src={c.logo} alt={c.name} className="company-logo" />
              {console.log(c.logo)}
              
              <h3>{c.name}</h3>
              <p className="company-industry">{c.industry}</p>
              <p className="company-meta">
                 {c.location} • 👥 {c.size}
              </p>

              <div className="rating">
                {"★".repeat(c.rating)}
                {"☆".repeat(5 - c.rating)}
              </div>

              <button className="view-jobs-btn">View Jobs</button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="companies-cta">
          <h2>Build Your Career Faster</h2>
          <p>Get matched with top companies based on your skills & experience.</p>
          <button>Create Your Profile</button>
        </div>
      </div>
     
    </>
  );
}
