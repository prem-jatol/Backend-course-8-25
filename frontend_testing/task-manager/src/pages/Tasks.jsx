import React, { useEffect, useState } from "react";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ChatApp from "../components/ChatApp";
import Navbar from "../components/NavBar";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isClose, setIsClose] = useState(false)

  useEffect(() => {
    // API.get("/tasks").then((res) => setTasks(res.data));
    axios.get('http://localhost:4080/api/tasks', { withCredentials: true }).then((res) => setTasks(res.data))
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <TaskForm onTaskCreated={(task) => setTasks([task, ...tasks])} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
      <div className="fixed bottom-10 right-10">
        {isClose ?
          <ChatApp onClose={() => setIsClose(false)} />
          :
          <span className="w-[50px] h-[50px] inline-block rounded-full bg-green-600 text-white text-center pt-3 cursor-pointer" onClick={() => setIsClose(true)}>Chat</span>
        }
      </div>
    </div>
  );
}
