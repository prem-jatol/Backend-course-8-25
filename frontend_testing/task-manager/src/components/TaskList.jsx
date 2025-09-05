import React from "react";
import API from "../api";

export default function TaskList({ tasks, setTasks }) {
  const updateTask = async (id, updates) => {
    const res = await API.put(`/tasks/${id}`, updates);
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };
  

  return (
    <div className="space-y-3">
      {tasks?.tasks?.map((task) => (
        <div key={task._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm">Priority: {task.priority}</p>
            <p className="text-sm">Status: {task.status}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => updateTask(task._id, { status: task.status === "pending" ? "done" : "pending" })}
              className="bg-green-500 text-white px-2 py-1 rounded">
              {task.status === "pending" ? "Mark Done" : "Mark Pending"}
            </button>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
