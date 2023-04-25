const Todo = require("../Models/todoModel");

// Get Todos
// Route GET /api/goals
const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
};

// Set Todos
// Route POST /api/goals
const addTodo = async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please add a text value." });
  }

  const todo = await Todo.create({
    text: req.body.text,
  });
  res.status(200).json(todo);
};

// Edit Todos Status
// Route PUT /api/goals/:id
const toggleTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({ message: "Todo not found!" });
  }
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
};

// DELETE Todos
// Route DELETE /api/goals/:id
const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({ message: "Todo not found, cannot be deleted!" });
  }
  await Todo.findByIdAndRemove(req.params.id);
  res.status(200).json({id: req.params.id, message:"Todo was deleted Successfully."})
};

module.exports = { getTodos, addTodo, toggleTodo, deleteTodo };
