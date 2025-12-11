
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // Pages
// import Login from "./components/login/Login";
// import SignUp from "./components/Signup/Signup";
// import HeroSection from "./components/Hero/Hero";
// import Jobs from "./components/Jobs/Jobs";
// import Companies from "./components/Companies/Companies";
// import Contact from "./components/Contact/Contact";
// import About from "./components/About/About";
// import Navbar from "./components/Navbar/Navbar2";

// // importing admin files
// import AdminLogin from "./admin/AdminLogin";
// import Dashboard from "./admin/Dashboard";
// import Users from "./admin/Users";
// //  Just for testing purpose

// import Footer from "./components/Footer/Footer";
// import UserInfo from "./components/UserInfo/UserInfo";
// export default function App() {
//   // Load user from localStorage (if logged in)
//   const storedUser = JSON.parse(localStorage.getItem("user")) || null;
//   // console.log(storedUser.name);
// // Global Components

// // Wrapper to handle footer visibility
// // function AppLayout() {
//   const location = useLocation();

//   // ❌ Routes where Footer should NOT be shown
//   const hideFooterRoutes = ["/login", "/signup"];

//   // Check current route
//   const hideFooter = hideFooterRoutes.includes(location.pathname);

//   return (
//     <>
//       <Routes>
//         {/* Home */}
//         <Route path="/" element={<HeroSection user={storedUser} />} />
//         <Route path="/home" element={<HeroSection user={storedUser} />} />

//         {/* Jobs */}
//         <Route path="/jobs" element={<Jobs />} />

//         {/* Companies */}
//         <Route path="/companies" element={<Companies />} />

//         {/* Contact */}
//         <Route path="/contact" element={<Contact />} />

//         {/* About */}
//         <Route path="/about" element={<About />} />

//         {/* Auth */}
//         <>
//         {/* Auth Pages */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} /> 
//         </>
//         {/* admin roles */}
//         <>
//          <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<Dashboard />} />
//         <Route path="/admin/users" element={<Users />} />
//         </>
//         {/* Just for testing */}
//         <Route path="/user" element={<UserInfo />} />
//       </Routes>

//       {/* Footer shown only when allowed */}
//       {!hideFooter && <Footer />}
//     </>
//   );
// }

// // export default function App() {
// //   return (
// //     <Router>
// //       <AppLayout />
// //     </Router>
// //   );
// // }
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Login from "./components/login/Login";
import SignUp from "./components/Signup/Signup";
import HeroSection from "./components/Hero/Hero";
import Jobs from "./components/Jobs/Jobs";
import Companies from "./components/Companies/Companies";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import UserInfo from "./components/UserInfo/UserInfo";

// Navbar
// import Navbar from "./components/Navbar/Navbar2";

// Admin
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
// Create Job

import CreateJob from "./createJob/CreateJob";
export default function App() {

  // Load logged-in user
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;

  // Detect route
  const location = useLocation();

  // Routes where footer should not appear
  const hideFooterRoutes = ["/login", "/signup"];

  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar should appear on all pages except login/signup? 
          If needed, wrap this with a condition */}
      {/* <Navbar user={storedUser} /> */}

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />

        {/* Testing */}
        <Route path="/user" element={<UserInfo />} />

        {/* Create Job */}
        <Route path="/create-job" element={<CreateJob />} />
      </Routes>

      {/* Footer is hidden on login/signup */}
      {!hideFooter && <Footer />}
    </>
  );
}
