// routes/emailRouter.js
const express = require("express");
const { sendTaskSummary } = require("../controllers/emailController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send-summary", authMiddleware, sendTaskSummary);

module.exports = router;
