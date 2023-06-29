const express = require("express");
const User = require("../../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello User");
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
    res.cookie("userId", user._id.toString() , {
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
