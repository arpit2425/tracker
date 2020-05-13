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
module.exports = router;
