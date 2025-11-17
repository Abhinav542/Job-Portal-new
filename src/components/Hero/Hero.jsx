// import React, { useState } from "react";
// import "./Hero.css";
// import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
// import bgImage from "../../assets/hero-bg.jpg";
// import FeaturedCompanies from "../FeaturedCompanies/FeaturedCompanies";
// import Navbar from "../Navbar/Navbar";
// import TrendingSection from "../TrendingSection/TrendingSection";
// import Homeimg from "../../assets/Homepage-image.webp";
// import Howwework from "../../assets/How we work.png";
// import TopHire from "../../assets/top hiring.jpg";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const [jobTitle, setJobTitle] = useState("");
//   const [location, setLocation] = useState("");
//   const [experience, setExperience] = useState("");

//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/jobs?title=${jobTitle}&location=${location}&exp=${experience}`);
//   };

//   return (
//     <>
//       <Navbar />

//       {/* HERO SECTION */}
//       <div
//         className="hero-section"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="Data">
//           <h1 className="hero-title">Find Your Dream Job</h1>
//           <p className="hero-subtitle">
//             Search jobs by title, location, and experience
//           </p>

//           {/* SEARCH BOX */}
//           <form className="search-box" onSubmit={handleSearch}>
//             <div className="input-group">
//               <FaBriefcase className="icon" />
//               <input
//                 type="text"
//                 placeholder="Job Title"
//                 value={jobTitle}
//                 onChange={(e) => setJobTitle(e.target.value)}
//               />
//             </div>

//             <div className="input-group">
//               <FaMapMarkerAlt className="icon" />
//               <select
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               >
//                 <option value="">Select Location</option>
//                 <option value="Bangalore">Bangalore</option>
//                 <option value="Hyderabad">Hyderabad</option>
//                 <option value="Delhi">Delhi</option>
//                 <option value="Mumbai">Mumbai</option>
//                 <option value="Chennai">Chennai</option>
//               </select>
//             </div>

//             <div className="input-group">
//               <FaBriefcase className="icon" />
//               <select
//                 value={experience}
//                 onChange={(e) => setExperience(e.target.value)}
//               >
//                 <option value="">Select Experience</option>
//                 <option value="Fresher">Fresher</option>
//                 <option value="0-1 years">0-1 years</option>
//                 <option value="1-3 years">1-3 years</option>
//                 <option value="3-5 years">3-5 years</option>
//                 <option value="5-10 years">5-10 years</option>
//                 <option value="10+ years">10+ years</option>
//               </select>
//             </div>

//             <button type="submit" className="search-btn">
//               <FaSearch className="btn-icon" /> Search
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Featured Companies */}
//       <FeaturedCompanies />

//       {/* Popular Categories */}
//       <section className="popular-categories">
//         <h2>Popular Categories</h2>
//         <div className="categories-grid">
//           {[
//             "Banking",
//             "Work From Home",
//             "HR",
//             "Sales",
//             "Accounting",
//             "Customer Support",
//             "Event Management",
//             "IT",
//             "SQL",
//             "Oracle",
//           ].map((category, index) => (
//             <div key={index} className="category-card">
//               <div className="icon">
//                 <i className="fa-solid fa-briefcase"></i>
//               </div>
//               <span>{category}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Homepage Image */}
//       <section className="homepage-bottom">
//         <img src={Homeimg} alt="Homepage" className="homepage-img" />
//       </section>

//       {/* How We Work */}
//       <section className="how-we-work">
//         <div className="heading">
//           <h2>How We Work</h2>
//           <img src={Howwework} alt="How We Work" className="work-img" />
//         </div>
//         <div className="content">
//           <p>
//             "This dynamic section showcases the most in-demand and rapidly
//             growing job categories..."
//           </p>
//         </div>
//       </section>

//       <TrendingSection />

//       {/* Top Hiring */}
//       <section className="top-hiring">
//         <img src={TopHire} alt="Top Hiring Companies" className="top-hiring-img" />
//       </section>

//       {/* CTA Bottom */}
//       <section className="bottom-cta">
//         <div className="cta-container">
//           <div className="cta-text">
//             <h2>Ready to Take the Next Step in Your Career?</h2>
//             <p>Join thousands of professionals finding their dream jobs every day.</p>

//             <button className="cta-btn" onClick={() => navigate("/jobs")}>
//               Explore Jobs
//             </button>
//           </div>

//           <div className="cta-image">
//             <img src={Homeimg} alt="Career Growth" />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero;
import React, { useState } from "react";
import "./Hero.css";
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import bgImage from "../../assets/hero-bg.jpg";
import FeaturedCompanies from "../FeaturedCompanies/FeaturedCompanies";
import Navbar from "../Navbar/Navbar";
import TrendingSection from "../TrendingSection/TrendingSection";
import Homeimg from "../../assets/Homepage-image.webp";
import Howwework from "../../assets/How we work.png";
import TopHire from "../../assets/top hiring.jpg";
import { useNavigate } from "react-router-dom";

const Hero = ({ user }) => {   // 🟢 Accept user prop
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?title=${jobTitle}&location=${location}&exp=${experience}`);
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="Data">

          {/* 🟢 Show logged-in user's name */}
          {user && (
            <h2 className="welcome-text" style={{ color: "#fff", marginBottom: "10px" }}>
              Welcome, {user.name} 👋
            </h2>
          )}

          <h1 className="hero-title">Find Your Dream Job</h1>
          <p className="hero-subtitle">
            Search jobs by title, location, and experience
          </p>

          {/* SEARCH BOX */}
          <form className="search-box" onSubmit={handleSearch}>
            <div className="input-group">
              <FaBriefcase className="icon" />
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <FaMapMarkerAlt className="icon" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div className="input-group">
              <FaBriefcase className="icon" />
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>

            <button type="submit" className="search-btn">
              <FaSearch className="btn-icon" /> Search
            </button>
          </form>
        </div>
      </div>

      {/* Featured Companies */}
      <FeaturedCompanies />

      {/* Popular Categories */}
      <section className="popular-categories">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          {[
            "Banking",
            "Work From Home",
            "HR",
            "Sales",
            "Accounting",
            "Customer Support",
            "Event Management",
            "IT",
            "SQL",
            "Oracle",
          ].map((category, index) => (
            <div key={index} className="category-card">
              <div className="icon">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <span>{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Homepage Image */}
      <section className="homepage-bottom">
        <img src={Homeimg} alt="Homepage" className="homepage-img" />
      </section>

      {/* How We Work */}
      <section className="how-we-work">
        <div className="heading">
          <h2>How We Work</h2>
          <img src={Howwework} alt="How We Work" className="work-img" />
        </div>
        <div className="content">
          <p>
            "This dynamic section showcases the most in-demand and rapidly
            growing job categories..."
          </p>
        </div>
      </section>

      <TrendingSection />

      {/* Top Hiring */}
      <section className="top-hiring">
        <img src={TopHire} alt="Top Hiring Companies" className="top-hiring-img" />
      </section>

      {/* CTA Bottom */}
      <section className="bottom-cta">
        <div className="cta-container">
          <div className="cta-text">
            <h2>Ready to Take the Next Step in Your Career?</h2>
            <p>Join thousands of professionals finding their dream jobs every day.</p>

            <button className="cta-btn" onClick={() => navigate("/jobs")}>
              Explore Jobs
            </button>
          </div>

          <div className="cta-image">
            <img src={Homeimg} alt="Career Growth" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
