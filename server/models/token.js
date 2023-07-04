const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    refreshToken: {
      type: String,
      required: [true, "Token is required"],
    }
  },
  { versionKey: false, timestamps: true }
);

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
