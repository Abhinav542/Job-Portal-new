import React from "react";
import "./admin.css";

export default function Dashboard() {
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <a href="/admin/users">Manage Users</a>
    </div>
  );
}
