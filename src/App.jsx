
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/Signup/Signup";
import HeroSection from "./components/Hero/Hero";
import Jobs from "./components/Jobs/Jobs";
import Companies from "./components/Companies/Companies";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

export default function App() {
  // Load user from localStorage (if logged in)
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  console.log(storedUser.name);
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HeroSection user={storedUser} />} />
        <Route path="/home" element={<HeroSection user={storedUser} />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />

        {/* Companies */}
        <Route path="/companies" element={<Companies />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Auth */}
        <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        </>
      </Routes>
    </Router>
  );
}
