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
    description: {
      type: String,
      required: [true, "Dude Title is missing!"],
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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Are ghost allowed to write articles. Need Humans asap."]
    }
  },
  { versionKey: false, timestamps: true }
);

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
