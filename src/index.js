require("./models/userModel");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/requestAuth");

const authRoute = require("./routes/authRoute");
const trackRoutes = require("./routes/trackRoutes");
require("dotenv").config({ path: `${__dirname}/../config.env` });
const app = express();
app.use(express.json());
app.use(authRoute);
app.use(trackRoutes);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
app.get("/", authMiddleware, (req, res) => {
  res.send(req.user);
});
app.listen(3000, () => {
  console.log("listening");
});
