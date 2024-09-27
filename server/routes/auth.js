const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  //console.log(req.body);
  console.log(req.body);
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(newUser);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("user not available");
    }
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(400).json("wrong pass");
    }

    const { password, ...others } = user._doc;

    return res.status(200).json(user);
  } catch (err) {
    return res.status(200).json("yanlış");
  }
});

module.exports = router;
