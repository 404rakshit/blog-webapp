const express = require("express");
const Article = require("../../models/article");
const User = require("../../models/user");
const { verifyToken, verifyRefreshToken } = require("../../middlewares/jwt");
const Comment = require("../../models/comment");
const { Types } = require("mongoose");
const Draft = require("../../models/draft");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({}).populate("author", [
      "name",
      "username",
      "profile",
      "designation",
      "company",
    ]);
    res.status(200).send(articles);
  } catch (err) {
    res.status(403).send(err);
  }
});

router.get("/draft/:id", verifyRefreshToken, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let draft = await Draft.findOne({ author: user._id, _id: id });
    if (!draft) throw { status: 404, message: "Doesn't Exists" };
    res.status(200).json(draft);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/draft", verifyRefreshToken, async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let draft = await Draft.find({ author: user._id });
    res.status(200).json({ draft: draft });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/:username/:articleLink", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "articles"
    );
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let article = await Article.findOne({
      permalink: req.params.articleLink,
    })
      .populate("author", ["name", "username", "profile"])
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "user",
        },
      });
    if (!user.equals(article?.author))
      throw { status: 404, message: "Article doesn't exists" };
    res.status(200).json(article);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      cover: req.body.cover,
      tags: req.body.tags,
      author: req.cookies.userId ? { _id: req.cookies.userId } : null,
    });
    const data = await newArticle.save();
    const user = await User.findOneAndUpdate(
      { _id: req.cookies.userId },
      { $push: { articles: data._id } }
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.put("/draft/:id", verifyRefreshToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, cover, description, body } = req.body;
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let draft = await Draft.findOneAndUpdate(
      { author: user._id, _id: id },
      { title, cover, description, body }
    );
    if (!draft) throw { status: 404, message: "Draft doesn't exists" };
    res.status(200).json({ message: "Drafted Updated" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.delete("/draft/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let draft = await Draft.findOneAndDelete({ author: user._id, _id: id });
    if (!draft) throw { status: 404, message: "Draft doesn't exists" };
    res.status(200).json({ message: "Drafted Deleted" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.post("/draft", verifyRefreshToken, async (req, res) => {
  try {
    const { title, cover, description, body } = req.body;
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let draft = new Draft({
      title,
      cover,
      description,
      body,
      author: user._id,
    });
    let data = await draft.save();
    res.status(200).json({ message: "Article Drafted", id: data._id });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

// router.put("/:id", async (req,res)=>{
//   try {
//     if (!req.body.body) throw {status: 404, message: ""}
//     let data = await Article.findByIdAndUpdate(req.params.id,{body: req?.body?.body})
//     res.status(201).send(data)
//   } catch (err) {
//     res.status(err.status || 500).json({message: err.message || "Internal Error"})
//   }
// })

router.post("/comment", verifyToken, async (req, res) => {
  try {
    const { review, article } = req.body;
    if (!review) throw { status: 404, message: "Review not found" };
    if (!article) throw { status: 404, message: "Article ID Mising" };
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let newComment = new Comment({
      review,
      article,
      user: user?._id,
    });
    await Article.findByIdAndUpdate(article, {
      $push: { comments: newComment._id },
    });
    await User.findByIdAndUpdate(user._id, {
      $push: { comments: newComment._id },
    });
    let data = await newComment.save();
    let response = {
      createdAt: data.createdAt,
      review: data.review,
      user: {
        username: user.username,
        name: user.name,
        profile: user.profile,
      },
    };
    res.status(201).json(response);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

module.exports = router;
