const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    notice: String,
    type: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = NotificationSchema;
