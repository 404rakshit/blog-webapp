const express = require("express");
const User = require("../../models/user");
const {
  verifyToken,
  verifyRefreshToken,
  generateAccessToken,
} = require("../../middlewares/jwt");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const users = limit ? await User.find().sort({createdAt: 1}).limit(limit) : await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id }).populate("articles");
    if (!user) throw {status: 404, message: "User doesn't Exists"}
    res.status(200).json({name: user.name, username: user.username, email: user.email, profile: user.profile, company: user.company, designation: user.designation, articles: user.articles, joined: user.createdAt});
  } catch (err) {
    res.status(err.status || 500).json({message: err.message || "Internal Error"});
  }
});

router.get("/refresh", verifyRefreshToken, (req, res) => {
  try {
    res.cookie("parallel", generateAccessToken({ username: req.user.username }), {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({ message: "Verified and Generated" });
  } catch (err) {
    console.log("Error");
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

module.exports = router;
