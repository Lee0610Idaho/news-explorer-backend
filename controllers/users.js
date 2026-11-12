const bcrypt = require("bcryptjs");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found-error");
const ConflictError = require("../errors/conflict-error");
//const { generateToken } = require("../utils/authTokens");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    //const token = generateToken(user);
    //res.status(200).send({ token });
    res.status(200).send("hello");
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hash, name });
    res.status(201).send({ email: newUser.email });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError("Email already exists."));
    } else {
      next(err);
    }
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).orFail(() => {
      throw new NotFoundError("User not found. Please Login again.");
    });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
