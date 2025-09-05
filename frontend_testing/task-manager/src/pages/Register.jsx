import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="border p-2 w-full mb-3" name="name" placeholder="Name" onChange={handleChange} />
        <input className="border p-2 w-full mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border p-2 w-full mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="bg-blue-500 text-white w-full py-2 rounded">Register</button>
      </form>
    </div>
  );
}
