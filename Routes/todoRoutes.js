const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} = require("../Controllers/todoController");
const { authMiddleware } = require("../Middleware/authMiddleware");

router.route("/").get(authMiddleware, getTodos).post(authMiddleware, addTodo);

router
  .route("/:id")
  .delete(authMiddleware, deleteTodo)
  .put(authMiddleware, toggleTodo);

module.exports = router;
