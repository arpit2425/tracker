const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = jwt.sign({ userId: user._id }, process.env.jwt_key);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "please provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Incorrect email or password" });
  }
  try {
    await user.comparePasswords(password);
    const token = jwt.sign({ userId: user._id }, process.env.jwt_key);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Incorrect email or password" });
  }
});
module.exports = router;
