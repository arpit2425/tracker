const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: "You must  login " });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.jwt_key, async (err, payload) => {
    if (err) {
      return res.status(401).send({ message: "You must  login " });
    }
    const { userId } = payload;
    const user = await User.findById(userId);

    req.user = user;
    next();
  });
};
