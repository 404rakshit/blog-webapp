const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, "Review is missing!"],
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'article',
        required: [true, "Reviews are for articles bro"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Are ghost allowed to review. Need Humans asap."]
    }
  },
  { versionKey: false, timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
