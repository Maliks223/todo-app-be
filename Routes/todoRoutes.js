const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} = require("../Controllers/todoController");

router.route("/").get(getTodos).post(addTodo);

router.route("/:id").delete(deleteTodo).put(toggleTodo);

module.exports = router;
