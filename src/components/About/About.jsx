import React from "react";
import "./About.css";
import aboutHero from "../../assets/about-hero.jpg";
import aboutWork from "../../assets/about-work.jpg";
import aboutTeam from "../../assets/about-team.avif";
import aboutGoal from "../../assets/about-goal.jpg";
import Navbar from "../Navbar/Navbar";

const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-wrapper">

      {/* ⭐ HERO SECTION */}
      <section className="about-hero fade-in">
        <img src={aboutHero} alt="About Banner" className="about-hero-img" />
        <div className="about-hero-text">
          <h1>Empowering Careers. Connecting Talent.</h1>
          <p>
            We are a next-generation job platform designed to help people find
            the right opportunities and companies find the right talent.
          </p>
        </div>
      </section>

      {/* ⭐ WHAT WE DO */}
      <section className="section fade-up">
        <h2 className="section-title">What We Do</h2>
        <p className="section-text">
          We bridge the gap between job seekers and companies with intelligent
          tools, verified listings, and a transparent hiring ecosystem.
        </p>

        <div className="features-premium">
          <div className="feature-card slide-left">
            <img src={aboutWork} alt="Smart Hiring" />
            <h3>AI Smart Job Matching</h3>
            <p>
              We use advanced algorithms to match users with the most relevant
              jobs based on skills, experience, and interests.
            </p>
          </div>

          <div className="feature-card slide-right">
            <img src={aboutTeam} alt="Verified Companies" />
            <h3>100% Verified Companies</h3>
            <p>
              Every company undergoes verification to ensure transparency and
              fair hiring practices for all candidates.
            </p>
          </div>

          <div className="feature-card slide-left">
            <img src={aboutGoal} alt="Realtime Hiring" />
            <h3>Realtime Hiring System</h3>
            <p>
              Stay updated with the latest job openings, application status, and
              recruiter responses — in real time.
            </p>
          </div>
        </div>
      </section>

      {/* ⭐ HOW WE WORK */}
      <section className="section fade-up">
        <h2 className="section-title">How We Work</h2>

        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>We study hiring trends and market needs using smart analytics.</p>
          </div>

          <div className="step">
            <span>2</span>
            <p>We connect companies with the right candidates instantly.</p>
          </div>

          <div className="step">
            <span>3</span>
            <p>We ensure fair, transparent & fast hiring communication.</p>
          </div>

          <div className="step">
            <span>4</span>
            <p>We support candidates at every step of job discovery.</p>
          </div>
        </div>
      </section>

      {/* ⭐ MISSION */}
      <section className="mission-section fade-in">
        <img src={aboutGoal} alt="Our Mission" />
        <div className="mission-text">
          <h2>Our Mission & Future Vision</h2>
          <p>
            Our goal is to transform hiring into a smooth, fast, and empowering
            experience. We are expanding globally with advanced hiring features,
            including video interviews, skill-tests, instant résumé scoring, and
            AI-powered candidate recommendations.
          </p>
        </div>
      </section>

      {/* ⭐ STATS */}
      <section className="stats-grid fade-up">
        <div className="stat-item">
          <h3>10,000+</h3>
          <p>Active Job Seekers</p>
        </div>

        <div className="stat-item">
          <h3>1,200+</h3>
          <p>Verified Employers</p>
        </div>

        <div className="stat-item">
          <h3>15,000+</h3>
          <p>Successful Job Matches</p>
        </div>

        <div className="stat-item">
          <h3>98%</h3>
          <p>User Satisfaction</p>
        </div>
      </section>

      {/* ⭐ FINAL CTA */}
      <section className="final-cta fade-in">
        <h2>Your Growth, Our Mission</h2>
        <p>
          Join thousands of users who trust our platform every day to find the
          perfect job or candidate.
        </p>
        <a className="cta-button" href="/jobs">Explore Jobs</a>
      </section>
    </div>
    </>
  );
};

export default About;
