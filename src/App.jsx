import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import HeroSection from "./components/Hero/Hero";
import Jobs from "./components/Jobs/Jobs";
import Companies from "./components/Companies/Companies";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/home" element={<HeroSection />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />

        {/* Companies */}
        <Route path="/companies" element={<Companies />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
