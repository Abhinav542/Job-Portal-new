import React, { useState } from "react";
import "./admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/admin/dashboard";
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Login</h2>
      <input
        className="admin-input"
        type="email"
        placeholder="Admin Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="admin-input"
        type="password"
        placeholder="Admin Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="admin-btn" onClick={loginAdmin}>Login</button>
    </div>
  );
}
