const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../Controllers/userController");
const { authMiddleware } = require("../Middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);

module.exports = router;
