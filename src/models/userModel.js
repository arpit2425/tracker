const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePasswords = function (pass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      } else if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};
const User = mongoose.model("User", userSchema);
module.exports = User;
