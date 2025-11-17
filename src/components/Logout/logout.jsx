import React from "react";

function Logout({ onLogout }) {
  const handleLogout = () => {
      
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    if (onLogout) onLogout();

    window.location.href = "/";
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
