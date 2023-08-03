const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Dude Title is missing!"],
      validate: {
        validator: (title) => title.split(" ").length > 2,
        message: "'{VALUE}' as a Title is too short!",
      },
    },
    permalink: {
      type: String,
      required: [true, "Link is missing!"],
      unique: true,
      validate: {
        validator: (permalink) => permalink.split("-").length > 2,
        message: "'{VALUE}' as a Title is too short!",
      },
    },
    description: {
      type: String,
      required: [true, "Dude description is missing!"],
    },
    cover: {
      type: String,
    },
    tags: {
      type: Array,
      of: String,
      validate: {
        validator: (tags) => tags.length < 4,
        message: "Enough Tags!"
      }
    },
    body: {
      type: Array,
      of: String,
      required: [true, "Provide a body"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Are ghost allowed to write articles. Need Humans asap."]
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
