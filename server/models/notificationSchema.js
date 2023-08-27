const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User Required"]
    },
    notificationType: String,
    article: Schema.Types.ObjectId
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    },
    versionKey: false,
    _id: false
  }
);

module.exports = NotificationSchema;
