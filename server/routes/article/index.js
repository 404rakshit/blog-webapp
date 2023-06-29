const express = require("express");
const Article = require("../../models/article");
const User = require("../../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({}).populate("author", [
      "name",
      "profile",
      "designation",
      "company",
    ]);
    res.status(200).send(articles);
  } catch (err) {
    res.status(403).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id }).populate(
      "author"
    );
    res.status(200).send(article);
  } catch (err) {
    res.status(404).send(err);
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

module.exports = router;
