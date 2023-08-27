const { Types } = require("mongoose");
const User = require("../models/user");

exports.notify = async (sender, receiver, type, articleId = null) => {
  let user = receiver
    ? await User.findOne({ username: receiver }).select({
        _id: 1,
        username: 1
      })
    : await User.findOne({ articles: { $eq: new Types.ObjectId(articleId) } });
  let user2 = await User.findOne({ username: sender }).select({
    _id: 1,
  });
  let data = await User.findOne({
    username: user.username,
    "notifications.user": new Types.ObjectId(user2._id),
    "notifications.notificationType": type,
    "notifications.article": articleId ? new Types.ObjectId(articleId) : null,
  }).countDocuments();
  if (sender == user.username) return 0;
  if (!data)
    await user.updateOne({
      $push: {
        notifications: {
          user: user2._id,
          notificationType: type,
          article: articleId ? new Types.ObjectId(articleId) : null,
        },
      },
    });
};
