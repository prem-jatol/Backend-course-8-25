const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

const app = express();
const PORT = 5000;

// Redis client
// const client = redis.createClient();
// client.connect();

// Example schema
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String
}));

// Get user by ID with caching
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  // 1. Check Redis cache
  const cachedUser = await client.get(id);

  if (cachedUser) {
    console.log("⏩ Serving from Redis Cache");
    return res.json(JSON.parse(cachedUser));
  }

  // 2. If not cached, fetch from DB
  console.log("⚡ Fetching from Database");
  const user = await User.findById(id);

  // 3. Store in Redis with TTL (60 sec)
  await client.setEx(id, 60, JSON.stringify(user));

  res.json(user);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
