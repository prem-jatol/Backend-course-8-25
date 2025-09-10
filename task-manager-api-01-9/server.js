const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { Server } = require("socket.io");
// new socket.Server()

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/tasks", require("./routes/taskRouter"));

const server = http.createServer(app);

// setup of socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // frontend ka URL
        methods: ["GET", "POST"],
    },
})

// Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for joining room (based on userId)
    socket.on("joinRoom", (userId) => {
        socket.join(userId); // har user ke liye ek private room
        console.log(`User ${socket.id} joined room: ${userId}`);
    });

    // Listen for chat messages
    socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
        const Chat = require("./models/Chat");

        // Save to DB
        const newMessage = new Chat({
            senderId,
            receiverId,
            message,
        });
        await newMessage.save();

        // Send message only to receiverId
        io.to(receiverId).emit("receiveMessage", newMessage);
        // Optional: also emit to sender so unko apna message dikhe
        io.to(senderId).emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));