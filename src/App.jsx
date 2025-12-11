import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import HeroSection from "./components/Hero/Hero";
import Jobs from "./components/Jobs/Jobs";
import Companies from "./components/Companies/Companies";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

// Global Components
import Footer from "./components/Footer/Footer";

// Wrapper to handle footer visibility
function AppLayout() {
  const location = useLocation();

  // ❌ Routes where Footer should NOT be shown
  const hideFooterRoutes = ["/login", "/signup"];

  // Check current route
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
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

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {/* Footer shown only when allowed */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
