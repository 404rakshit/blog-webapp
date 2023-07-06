const express = require("express");
const router = express.Router();
const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
  generateMailToken,
  verifyMailToken,
} = require("../../middlewares/jwt");
const User = require("../../models/user");
const Token = require("../../models/token");
const { createPassword } = require("../../middlewares/bcrypt");
const { sendMail, sendTestMail } = require("./mailer");

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
      refreshToken: generateRefreshToken({ username: user.username }),
    });
    await token.save();
    res.cookie("access", generateAccessToken({ username: user.username }), {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      secure: true,
    });
    res.cookie("refresh", token.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.send(data);
  } catch (err) {
    res.status(500).send(err.errors || err);
  }
});

// router.post("/mail", sendTestMail);
router.post("/mail", async (req, res) => {
  try {
    let email = req.body.email;
    if (!email)
      throw { status: 404, message: "Provide an Emailfor Verification" };
    const token = new Token({
      mailToken: generateMailToken({ email }),
    });
    let data = await token.save();
    res.status(201).json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json(err.message || { message: "Internal Sever Error" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { token } = req.query;
    if(!token) throw {status: 404, message: "Provide Token"}
    let data = await Token.findOne({ mailToken: token });
    if (!data) throw { status: 404, message: "Token not found" };
    let respose = verifyMailToken(data.mailToken)
    res.status(201).json(respose);
  } catch (err) {
    res
      .status(err.status || 500)
      .json(err.message || { message: "Internal Sever Error" });
  }
});

// [Object.keys(err.errors)[0]].message

module.exports = router;
