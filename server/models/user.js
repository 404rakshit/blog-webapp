const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      validate: {
        validator: (name) => name.length > 2,
        message: "{VALUE} is too short to be a name",
      },
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      validate: {
        validator: (username) => username.length > 2,
        message: "{VALUE} is too short to be a username",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (password) => password.length > 7,
        message: "{VALUE} is too short to be a password",
      },
    },
    profile: {
      type: String,
    },
    designation: {
      type: String,
    },
    company: {
      type: String,
    },
    about: {
      type: String,
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "article",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
