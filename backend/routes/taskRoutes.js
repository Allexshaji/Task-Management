const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getMyTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", createTask);

router.get("/", getTasks);

router.get("/mytasks", getMyTasks);

router.get("/:id", getTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;