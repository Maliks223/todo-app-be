const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const colors = require("colors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// todo Api
app.use("/api/todo", require("./Routes/todoRoutes"));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`.green.underline);
});
