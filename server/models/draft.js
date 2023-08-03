const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const draftSchema = new Schema(
  {
    title: String,
    description: String,
    cover: String,
    body: {
      type: Array,
      of: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [
        true,
        "Are ghost allowed to write articles. Need Humans asap.",
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Draft = mongoose.model("draft", draftSchema);

module.exports = Draft;
