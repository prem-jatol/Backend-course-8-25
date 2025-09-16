import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/auth/login", form, { withCredentials: true });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // navigate("/tasks");
        window.location.href = "/tasks"
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input className="border p-2 w-full mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input className="border p-2 w-full mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button className="bg-green-500 text-white w-full py-2 rounded">Login</button>
            </form>
        </div>
    );
}
