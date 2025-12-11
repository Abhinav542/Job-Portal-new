import React, { useEffect, useState } from "react";
import "./admin.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/admin/user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="table-wrapper">
      <h2>All Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteUser(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
