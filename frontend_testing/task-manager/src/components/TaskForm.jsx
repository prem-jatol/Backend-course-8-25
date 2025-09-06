import React, { useState } from "react";
import { db } from "../firebase";
import { ref, set, push, update } from "firebase/database";
// import API from "../api";

export default function TaskForm({ onTaskCreated }) {
  const [task, setTask] = useState({ title: "", description: "", priority: "medium" });

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await API.post("/tasks", task);
    const tasksRef = ref(db, "tasks");
    const newTaskRef = push(tasksRef);
    set(newTaskRef, task);

    // onTaskCreated(res.data);
    setTask({ title: "", description: "", priority: "medium" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input className="border p-2 w-full mb-2" name="title" placeholder="Task title" value={task.title} onChange={handleChange} required />
      <textarea className="border p-2 w-full mb-2" name="description" placeholder="Description" value={task.description} onChange={handleChange} />
      <select name="priority" value={task.priority} onChange={handleChange} className="border p-2 w-full mb-2">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
}
