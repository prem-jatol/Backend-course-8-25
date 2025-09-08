import React, { useEffect, useState } from "react";
import API from "../api";
import { db } from "../firebase";
import { ref, onValue, update, remove } from "firebase/database";

export default function TaskList({ tasks, setTasks }) {
  const [realtimeTask, setRealtimeTask] = useState([])

  const updateTask = async (id, updates) => {
    // const res = await API.put(`/tasks/${id}`, updates);
    // setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    update(ref(db, "tasks/" + id), updates);
  };

  const deleteTask = async (id) => {
    // await API.delete(`/tasks/${id}
    // setTasks(tasks.filter((t) => t._id !== id)`);
    remove(ref(db, "tasks/" + id));
  };

  useEffect(() => {
    const getTasks = () => {
      const tasksRef = ref(db, "tasks");
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();

        const tasksArray = Object.entries(data).map(
          ([id, value]) => {
            return {
              id, ...value
            }
          }
        )

        setRealtimeTask(tasksArray);
      });
    };

    getTasks();
  }, [])

  return (
    <div className="space-y-3">
      {/* {tasks?.tasks?.map((task) => ( */}
      {realtimeTask?.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task?.title}</h3>
            <p>{task?.description}</p>
            <p className="text-sm">Priority: {task?.priority}</p>
            <p className="text-sm">Status: {task?.status}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => updateTask(task?.id, { status: task?.status === "pending" ? "done" : "pending" })}
              className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer">
              {task.status === "pending" ? "Mark Done" : "Mark Pending"}
            </button>
            <button onClick={() => deleteTask(task?.id)} className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
