const express = require("express");
const router = express.Router();
const order = require("../orders.json");

// Create a new Note
router.get("/", async (req, res) => {
  res.status(200).json(order.orders);
});
module.exports = router;
