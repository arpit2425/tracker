const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.send("Post route");
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
module.exports = router;
