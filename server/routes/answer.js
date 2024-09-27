const express = require("express");
const Answer = require("../models/Answer");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/add-answer", async (req, res) => {
  try {
    const newAnswer = new Answer({
      questions: req.body.questions,
      answers: req.body.answers,
      userId: req.body.userId,
    });
    const answer = await newAnswer.save();
    let user = await User.findById(req.body.userId);
    user.answers.push(answer._id);
    await user.save();

    res.status(200).json(answer);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/get-answers", async (req, res) => {
  const answer = await Answer.find({ userId: req.body.userId });
  res.status(200).json(answer);
});

module.exports = router;
