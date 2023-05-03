const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require('cors');

connectDB();

const app = express();

// Allow requests from all origins
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// todo Api
app.use("/api/todos", require("./Routes/todoRoutes"));

// user Api
app.use("/api/users", require("./Routes/userRoutes"));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`.green.underline);
});
