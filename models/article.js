const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: "Invalid URL",
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (email) => validator.isURL(email),
      message: "Invalid URL",
    },
  },
  date: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    select: false,
  },
});

articleSchema.index({ url: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model("Article", articleSchema);
