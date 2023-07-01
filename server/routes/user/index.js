const express = require("express");
const User = require("../../models/user");
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

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      profile: req.body.profile,
      designation: req.body.designation,
      company: req.body.company,
      about: req.body.about,
    });
    const data = await user.save();
    res.cookie("userId", user._id.toString(), {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      secure: true,
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
