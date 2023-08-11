const mongoose = require("mongoose");
const NotificationSchema = require("./notificationSchema");
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
      lowercase: true,
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
      validate: {
        validator: (password) => password.length > 7,
        message: "{VALUE} is too short to be a password",
      },
    },
    profile: {
      type: String,
    },
    cover: {
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
    followers: [
      {
        type: Schema.Types.String,
        ref: "user",
      },
    ],
    following: [
      {
        type: Schema.Types.String,
        ref: "user",
      },
    ],
    socials: [
      {
        type: String,
        max: 3,
      },
    ],
    notifications: [NotificationSchema],
    draft: [
      {
        type: Schema.Types.ObjectId,
        ref: "draft",
      },
    ],
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "article",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    liked: [
      {
        type: Schema.Types.ObjectId,
        ref: "article",
        unique: true,
      },
    ],
    googleVerified: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.virtual('followersCount').get(function(){
  // console.log('Run the console')
  return this.followers.length
})

const User = mongoose.model("user", userSchema);

module.exports = User;
