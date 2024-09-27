const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register
router.get("/get-users", async (req, res) => {
  const users = await User.find().populate("answer");
  res.status(200).json(users);
});

module.exports = router;
