const express = require("express");
const { OpenAI } = require("openai");
const router = express.Router();
const axios = require("axios").default;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const generateQuestion = require("../utils/chatbot.js"); // Ensure correct path

router.get("/generate-question", async (req, res) => {
  try {
    const response = await generateQuestion();
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
