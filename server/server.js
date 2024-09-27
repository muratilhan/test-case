const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const answerRoute = require("./routes/answer");
const chatbotRoute = require("./routes/chatbot");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/answer", answerRoute);
app.use("/chatbot", chatbotRoute);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(8800, () => {
      console.log("connected to mongoDB");
    });
  })
  .catch((err) => {
    console.log(err);
  });
