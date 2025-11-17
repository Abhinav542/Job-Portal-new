import React from "react";
import "./TrendingSection.css";

const TrendingSection = () => {
  const scrollLeft = (id) => {
    document.getElementById(id).scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = (id) => {
    document.getElementById(id).scrollBy({ left: 220, behavior: "smooth" });
  };

  return (
    <>
      {/* Trending Skills */}
      <section className="section">
        <h2> Trending Skills</h2>
        <div className="slider-container">
          <button
            className="arrow left"
            onClick={() => scrollLeft("skills")}
          >
            &#10094;
          </button>
          <div className="slider" id="skills">
            <div className="card">React.js</div>
            <div className="card">Node.js</div>
            <div className="card">Python</div>
            <div className="card">Java</div>
            <div className="card">SQL</div>
            <div className="card">AWS</div>
            <div className="card">DevOps</div>
            <div className="card">Machine Learning</div>
            <div className="card">UI/UX</div>
            <div className="card">Data Science</div>
          </div>
          <button
            className="arrow right"
            onClick={() => scrollRight("skills")}
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* Trending Job Titles */}
      <section className="section">
        <h2>Trending Job Titles</h2>
        <div className="slider-container">
          <button
            className="arrow left"
            onClick={() => scrollLeft("jobs")}
          >
            &#10094;
          </button>
          <div className="slider" id="jobs">
            <div className="card">Software Engineer</div>
            <div className="card">Data Analyst</div>
            <div className="card">Cloud Architect</div>
            <div className="card">Frontend Developer</div>
            <div className="card">Backend Developer</div>
            <div className="card">Product Manager</div>
            <div className="card">AI Engineer</div>
            <div className="card">Business Analyst</div>
            <div className="card">System Admin</div>
            <div className="card">Project Manager</div>
          </div>
          <button
            className="arrow right"
            onClick={() => scrollRight("jobs")}
          >
            &#10095;
          </button>
        </div>
      </section>
    </>
  );
};

export default TrendingSection;
