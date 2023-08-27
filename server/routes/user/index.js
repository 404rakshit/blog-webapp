const express = require("express");
const User = require("../../models/user");
const {
  verifyToken,
  verifyRefreshToken,
  generateAccessToken,
} = require("../../middlewares/jwt");
const {
  formReader,
  uploadBufferImg,
} = require("../../middlewares/imageUpload");
const { Types } = require("mongoose");
const { notify } = require("../../middlewares/notify");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const users = limit
      ? await User.find().sort({ createdAt: 1 }).limit(limit)
      : await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/new", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select({
      username: 1,
      name: 1,
      profile: 1,
      createdAt: 1,
    });
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", verifyRefreshToken, async (req, res) => {
  try {
    // console.log();
    const user = await User.findOne({ username: req.user.username }).populate(
      "articles",
      ["_id", "title", "createdAt", "description", "cover", "permalink"]
    );
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    res.status(200).json(user);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.post("/edit", verifyRefreshToken, async (req, res) => {
  try {
    // console.log();
    const user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    res.status(200).json({
      name: user?.name,
      profile: user?.profile,
      cover: user?.cover,
      about: user?.about,
      company: user?.company,
      designation: user?.designation,
      socials: user?.socials,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.put("/", formReader.any(), verifyToken, async (req, res) => {
  try {
    const {
      name,
      cover,
      profile,
      company,
      about,
      designation,
      twitter,
      linkedin,
      insta,
    } = req.body;
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let data = {
      name,
      company,
      about,
      designation,
      socials: [twitter, linkedin, insta],
    };
    if (user?.profile != profile) {
      if (profile == "null") data.profile = null;
      else
        data.profile = (
          await uploadBufferImg(profile, "profile", user?.username)
        ).secure_url;
    }
    if (user?.cover != cover) {
      if (cover == "null") data.cover = null;
      else
        data.cover = (
          await uploadBufferImg(cover, "cover", user?.username)
        ).secure_url;
    }
    const updateRes = await User.findOneAndUpdate(
      { username: user?.username },
      data
    );
    res.status(200).send(updateRes);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/refresh", verifyRefreshToken, (req, res) => {
  try {
    res.cookie(
      "parallel",
      generateAccessToken({ username: req.user.username }),
      {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      }
    );
    res.status(201).json({ message: "Verified and Generated" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/followers", verifyToken, async (req, res) => {
  try {
    const { username } = req.user;
    let user = await User.findOne({ username });
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    let followers = await User.find({
      username: { $in: user.followers },
    }).select({
      _id: 0,
      name: 1,
      username: 1,
      profile: 1,
    });
    res.status(200).json({ message: "OK", followers });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/following", verifyToken, async (req, res) => {
  try {
    const { username } = req.user;
    let user = await User.findOne({ username });
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    let following = await User.find({
      username: { $in: user.following },
    }).select({
      _id: 0,
      name: 1,
      username: 1,
      profile: 1,
    });
    // console.log(following);
    res.status(200).json({ message: "OK", following });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/comments", verifyToken, async (req, res) => {
  try {
    const { username } = req.user;
    let user = await User.findOne({ username });
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    let comments = await User.find({
      username: { $in: user.comments },
    })
      .select({
        _id: 0,
        comments: 1,
      })
      .populate("comments", ["_id", "review"]);
    // console.log(following);
    res.status(200).json({ message: "OK", comments });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/notifications", verifyRefreshToken, async (req, res) => {
  try {
    const { username } = req.user;
    if (!username) throw { status: 404, message: "Provide User" };
    let user = await User.findOne({ username })
      .select({
        notifications: 1,
      })
      .populate({
        path: "notifications",
        populate: {
          path: "user",
          model: "user",
          select: "name username -_id",
        },
      })
      .populate({
        path: "notifications",
        populate: {
          path: "article",
          model: "article",
          select: "title permalink -_id",
        },
      });
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    res.status(200).json(user.notifications.reverse());
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/notifications/:username", async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) throw { status: 404, message: "Provide User" };
    let user = await User.findOne({ username })
      .select({
        notifications: 1,
      })
      .populate({
        path: "notifications",
        populate: {
          path: "user",
          model: "user",
          select: "name username -_id",
        },
      })
      .populate({
        path: "notifications",
        populate: {
          path: "article",
          model: "article",
          select: "title permalink -_id",
        },
      });
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    let notifications = user.notifications.reverse()
    res.status(200).json([notifications[0], notifications[1]]);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id })
      .select({
        name: 1,
        username: 1,
        email: 1,
        cover: 1,
        about: 1,
        profile: 1,
        company: 1,
        designation: 1,
        articles: 1,
        createdAt: 1,
        followers: 1,
      })
      .populate("articles", [
        "_id",
        "title",
        "createdAt",
        "description",
        "cover",
        "permalink",
      ]);
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    res.status(200).json(user);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.post("/follow/:id", verifyToken, async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.params;
    if (!id) throw { status: 404, message: "Provide Id" };
    let user = await User.findOne({ username });
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    let following = await User.findOne({ username })
      .all("following", [id])
      .countDocuments();
    let response;
    following
      ? (await User.findByIdAndUpdate(user._id, {
          $pull: { following: id },
        }),
        await User.findOneAndUpdate(
          { username: id },
          {
            $pull: { followers: username },
          }
        ),
        (response = "Unfollow"))
      : (await User.findByIdAndUpdate(user._id, {
          $push: { following: id },
        }),
        await User.findOneAndUpdate(
          { username: id },
          {
            $push: { followers: username },
          }
        ),
        notify(username, id, "follow"),
        (response = "Follow"));
    res.status(200).json({ message: response, state: !following });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

module.exports = router;
