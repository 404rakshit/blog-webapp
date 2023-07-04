const express = require("express");
const router = express.Router();
const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/jwt");
const User = require("../../models/user");
const Token = require("../../models/token");
const { createPassword } = require("../../middlewares/bcrypt");

router.get("/", (req, res) => {
  res.send("Signup");
});

router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: createPassword(req.body.password),
      email: req.body.email,
      profile: req.body.profile,
      designation: req.body.designation,
      company: req.body.company,
      about: req.body.about,
    });
    const data = await user.save();
    const token = new Token({
      refreshToken: generateRefreshToken({username: user.username})
    }) 
    await token.save()
    res.cookie("access", generateAccessToken({ username: user.username }), {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      secure: true,
    });
    res.cookie("refresh", token.refreshToken , {
      httpOnly: true,
      secure: true,
    });
    res.send(data);
  } catch (err) {
    res.status(500).send(err.errors || err);
  }
});

// [Object.keys(err.errors)[0]].message

module.exports = router;
