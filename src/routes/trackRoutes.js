const mongoose = require("mongoose");
const express = require("express");
const Track = mongoose.model("Track");
const router = express.Router();
const authMiddleware = require("./../middleware/requestAuth");
router.use(authMiddleware);
router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send({ tracks });
});
router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ message: "Please provide name and location of track" });
  }
  try {
    const track = await Track.create({ name, locations, userId: req.user._id });
    res.send({ track });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});
module.exports = router;
