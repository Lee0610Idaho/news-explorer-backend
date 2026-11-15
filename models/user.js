const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const UnauthorizedError = require("../errors/unauthorized-error");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (email) => validator.isEmail(email),
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxLength: 30,
    required: true,
  },
});

userSchema.static(
  "findUserByCredentials",
  async function findUserByCredentials(email, password) {
    const user = await this.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("E-mail or password is incorrect.");
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError("E-mail or password is incorrect.");
    }
    return user;
  },
);

module.exports = mongoose.model("User", userSchema);
