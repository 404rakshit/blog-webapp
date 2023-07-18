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
    const users = limit ? await User.find().limit(limit) : await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/followers", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req?.user?.username });
    res.status(200).send(user.followers);
  } catch (err) {
    res.status(404).send(err);
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
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

module.exports = router;
