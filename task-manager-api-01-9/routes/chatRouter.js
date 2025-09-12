// routes/chatRouter.js
const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

// Get chats between two users
router.get("/:userId/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const chats = await Chat.find({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
