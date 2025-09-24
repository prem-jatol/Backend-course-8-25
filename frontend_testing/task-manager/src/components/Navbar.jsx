import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getSummary = async () => {
    await fetch("http://localhost:4080/api/email/send-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
      },
    });
    alert("Summary email sent!");
  };


  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Task Manager</h1>
      <div className="space-x-4">
        <button onClick={() => getSummary()} className="p-2 rounded-lg bg-yellow-600 text-white cursor-pointer">Report</button>
        <Link to="/tasks">Tasks</Link>
        <Link to="/payment">Plan</Link>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
