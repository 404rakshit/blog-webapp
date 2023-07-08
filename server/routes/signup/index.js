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
    req.session.access = generateAccessToken({ username: user.username });
    req.session.refesh = token.refreshToken;
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    res.send(data);
  } catch (err) {
    res.status(500).send(err.errors || err);
  }
});

// router.post("/mail", sendTestMail);
router.post("/mail", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw { status: 404, message: "Provide an Email for Verification" };
    const token = new Token({
      mailToken: generateMailToken({ email }),
    });
    let data = await token.save();
    let mailReponse = await sendMail(email, data._id)
    res.status(201).json({message: `Email Sent to ${mailReponse.accepted[0]}`});
  } catch (err) {
    res
      .status(err.status || 500)
      .json(err.message || { message: "Internal Sever Error" });
  }
});

// router.post("/mailer",(req,res)=>{
//   console.log(req.body.email);
//   res.sendStatus(200)
// })

router.get("/verify", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) throw { status: 404, message: "Provide Token" };
    let data = await Token.findById(token);
    if (!data) throw { status: 404, message: "Token not found" };
    let respose = await verifyMailToken(data.mailToken);
    res.status(201).json(respose);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Sever Error" });
  }
});

// [Object.keys(err.errors)[0]].message

module.exports = router;
