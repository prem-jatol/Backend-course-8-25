import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <TaskForm onTaskCreated={(task) => setTasks([task, ...tasks])} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}
