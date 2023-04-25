const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");

// Register new User
// Route POST /api/users
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Check email and password fields
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ email, password: hashedPassword });
    if (user) {
      // Return a success message
      res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
        message: "User created successfully",
      });
    } else {
      res.status(500).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login
// Route POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check email and password fields
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
  }

  // Check for user email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(500).json({ message: "User does not exist" });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
      message: "User logged in successfully",
    });
  } else {
    res.status(500).json({ message: "Invalid credentials" });
  }
};

// User logout
// Route Get /api/users/me
const getMe = async (req, res) => {
  const { _id, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    email,
  });
};

// Generate JWT
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
  return token;
};

module.exports = { registerUser, loginUser, getMe };
