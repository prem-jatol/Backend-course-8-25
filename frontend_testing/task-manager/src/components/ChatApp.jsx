import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4080");

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userList, setUserList] = useState([]);
  const [receiverId, setReceiverId] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:4080/api/auth')
      .then((success) => {
        setUserList(success.data.users);
      })

    const user = localStorage.getItem("user");
    setUserId(JSON.parse(user)._id);
  }, [])

  useEffect(() => {
    if (userId && receiverId) {
      axios.get(`http://localhost:4080/api/chats/${userId}/${receiverId}`)
        .then((success) => {
          setChat(success.data);
        })
    }
  }, [userId, receiverId])

  useEffect(() => {
    // Join room with current userId
    if (userId) {
      socket.emit("joinRoom", userId);

      // Listen for incoming messages
      socket.on("receiveMessage", (msg) => {
        setChat((prev) => [...prev, msg]);
      });
    }

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && receiverId) {
      socket.emit("sendMessage", {
        senderId: userId,
        receiverId,
        message,
      });

      setMessage("");
    }
  };

  return (
    <div className="w-[500px] bg-white p-5 rounded-lg">
      <h2 className="text-3xl font-bold text-gray-700">Chat</h2>
      {userList && (
        <select name="" id="" onChange={(e) => setReceiverId(e.target.value)} className="my-5">
          <option value="">Select user</option>
          {userList?.map((user, id) => {
            return <option key={user?._id} value={user?._id}>{user?.name}: {user?.email}</option>
          })}
        </select>
      )}
      <div className="border border-gray-200 rounded-lg p-2 h-50" style={{ overflowY: "auto" }}>
        {chat.map((msg, i) => (
          <p key={i} className="bg-gray-100 rounded-lg mb-2 p-2">
            <b>{msg.senderId === userId ? "You" : "Friend"}:</b> {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 mt-6">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
          className="w-full p-2 border-2 border-gray-500 rounded-lg"
        />
        <button className="p-2 rounded-lg bg-green-600 text-white cursor-pointer" type="submit">Send</button>
      </form>
    </div>
  );
}