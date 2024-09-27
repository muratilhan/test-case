const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Answer = require("./Answer");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    answers: [],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
