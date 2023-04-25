const Todo = require("../Models/todoModel");
const User = require("../Models/userModel");

// Get Todos
// Route GET /api/todos
const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.status(200).json(todos);
};

// Set Todos
// Route POST /api/todos
const addTodo = async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please add a text value." });
  }

  const todo = await Todo.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(todo);
};

// Edit Todos Status
// Route PUT /api/todos/:id
const toggleTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({ message: "Todo not found!" });
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== user.id) {
    res.status(401).json({ message: "User not authorized" });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
};

// DELETE Todos
// Route DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({ message: "Todo not found, cannot be deleted!" });
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== user.id) {
    res.status(401).json({ message: "User not authorized" });
  }

  await Todo.findByIdAndRemove(req.params.id);
  res
    .status(200)
    .json({ id: req.params.id, message: "Todo was deleted Successfully." });
};

module.exports = { getTodos, addTodo, toggleTodo, deleteTodo };
