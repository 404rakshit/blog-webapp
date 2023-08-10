const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    refreshToken: {
      type: String,
    },
    mailToken: {
      type: String,
    },
    passToken: {
      type: String,
    },
    username: String
  },
  { versionKey: false, timestamps: true }
);

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
