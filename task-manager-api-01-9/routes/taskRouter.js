const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
// router.patch("/status/:id", auth, updateStatusTak);
// router.patch("/priority/:id", auth, updateProirityTak);

module.exports = router;
