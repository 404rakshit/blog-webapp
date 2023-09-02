const express = require("express");
const Article = require("../../models/article");
const User = require("../../models/user");
const { verifyToken, verifyRefreshToken } = require("../../middlewares/jwt");
const Comment = require("../../models/comment");
const { Types } = require("mongoose");
const Draft = require("../../models/draft");
const { notify } = require("../../middlewares/notify");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const articles = await Article.find({})
      .select({
        title: 1,
        permalink: 1,
        description: 1,
        cover: 1,
        tags: 1,
        author: 1,
        createdAt: 1,
      })
      .limit(limit)
      .populate("author", [
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

router.get("/new", async (req, res) => {
  try {
    const { page } = req.query;
    let skipNum = +page * 6;
    const count = Math.ceil((await Article.countDocuments()) / 6);
    const articles = await Article.find({})
      .select({
        title: 1,
        permalink: 1,
        description: 1,
        cover: 1,
        tags: 1,
        author: 1,
        createdAt: 1,
      })
      .sort({
        createdAt: -1,
      })
      .skip(skipNum)
      .limit(6)
      .populate("author", [
        "name",
        "username",
        "profile",
        "designation",
        "company",
      ]);
    res.status(200).json({ articles, count });
  } catch (err) {
    res.status(403).send(err);
  }
});

router.get("/latest", async (req, res) => {
  try {
    const articles = await Article.find({})
      .select({
        title: 1,
        permalink: 1,
        description: 1,
        cover: 1,
        tags: 1,
        author: 1,
        createdAt: 1,
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", [
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
    let draft = await Draft.find({ author: user._id }).select({
      title: 1,
      cover: 1,
      createdAt: 1,
    });
    res.status(200).json({ draft: draft });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/liked", verifyRefreshToken, async (req, res) => {
  try {
    const { username } = req.user;
    let user = await User.findOne({ username })
      .populate({
        path: "liked",
        select: ["title", "cover", "permalink"],
        populate: {
          path: "author",
          model: "user",
          select: ["profile", "name", "username"],
        },
      })
      .select({
        _id: 0,
        liked: 1,
      });
    // console.log(user?.liked);
    res.status(200).json({ liked: user?.liked });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/:username/:articleLink", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let article = await Article.findOne({
      author: new Types.ObjectId(user._id),
      permalink: encodeURIComponent(req.params.articleLink),
    })
      .populate("author", ["name", "username", "profile", "followers"])
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "user",
        },
      });
    // if (!user.equals(article?.author))
    //   throw { status: 404, message: "Article doesn't exists" };
    res.status(200).json(article);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.post("/", verifyRefreshToken, async (req, res) => {
  try {
    const { title, cover, permalink, description, body, tags, draftId } =
      req.body;
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    if (draftId) await Draft.findByIdAndDelete({ _id: draftId });
    let newArticle = new Article({
      title,
      description,
      cover,
      permalink,
      body,
      tags,
      author: user._id,
    });
    await User.findOneAndUpdate(
      { username: req.user.username },
      {
        $push: { articles: newArticle._id },
      }
    );
    const data = await newArticle.save();
    res.status(201).json({
      title: data.title,
      cover: data.cover,
      link: `/user/${user.username}/${data.permalink}`,
      description: data.description,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ username: req.user.username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let article = await Article.findById(id);
    if (!article) throw { status: 404, message: "Article Not Found" };
    let newDraft = new Draft({
      title: article.title,
      description: article.description,
      cover: article.cover,
      body: article.body,
      author: article.author,
      comments: article.comments,
    });
    await newDraft.save();
    await Article.findByIdAndDelete(article._id);
    await User.findByIdAndUpdate(user._id, { $pull: { articles: id } });
    res.status(200).json({ message: "Shifted to Draft" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
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

router.post("/like/:id", verifyToken, async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.params;
    if (!id) throw { status: 404, message: "Provide Id" };
    let user = await User.findOne({ username });
    if (!user) throw { status: 404, message: "User doesn't Exists" };
    let article = await Article.findOne({
      _id: id,
      likes: { $eq: user.username },
    }).count();
    let response;
    article
      ? (await Article.findByIdAndUpdate(id, {
          $pull: { likes: user.username },
        }),
        await User.findByIdAndUpdate(user._id, {
          $pull: { liked: new Types.ObjectId(id) },
        }),
        (response = "Unliked"))
      : (await Article.findByIdAndUpdate(id, {
          $push: { likes: user.username },
        }),
        await User.findByIdAndUpdate(user._id, {
          $push: { liked: new Types.ObjectId(id) },
        }),
        notify(username, null, "liked", id),
        (response = "Liked"));
    res.status(200).json({ message: response, state: !article });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

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
    notify(user.username, null, "comment", article);
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
