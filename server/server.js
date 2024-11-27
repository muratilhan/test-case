const cors = require("cors");
const express = require("express");
const app = express();
const orderRoute = require("./routes/order");

app.use(express.json());
app.use(cors());

app.use("/get-order", orderRoute);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
