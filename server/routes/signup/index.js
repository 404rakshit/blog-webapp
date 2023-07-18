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
const { sendMail } = require("./mailer");

router.get("/", (req, res) => {
  req.session.refesh = "Hello";
  req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
  res.json({ message: "Signup", id: req.sessionID || "None" });
});

router.post("/", verifyMailToken, async (req, res) => {
  try {
    const { name, username, password, profile, socials } = req.body;
    const user = new User({
      name,
      username,
      password: createPassword(password),
      email: req.user?.email,
      profile,
      socials,
    });
    const data = await user.save();
    await Token.deleteOne({
      mailToken: req.headers["authorization"].split(" ")[1],
    });
    const token = new Token({
      refreshToken: generateRefreshToken({ username: user.username }),
    });
    await token.save();
    // req.session.access = generateAccessToken({ username: user.username });
    // req.session.refesh = token.refreshToken;
    // req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    res.cookie(
      "parallelVortex",
      {
        username: user.username,
        token: token.refreshToken,
      },
      {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      }
    );
    res.cookie("parallel", generateAccessToken({ username: user.username }), {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({
      message: "New User Created Successfully",
      name,
      username,
      email: req.user?.email,
      profile,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.post("/mail", sendTestMail);
router.post("/mail", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      throw { status: 404, message: "Provide an Email for Verification" };
    if (await User.countDocuments({ email }))
      throw { status: 401, message: "Email Alreay Registered" };
    const token = new Token({
      mailToken: generateMailToken({ email }),
    });
    let data = await token.save();
    let mailReponse = await sendMail(email, data.mailToken);
    res
      .status(201)
      .json({ message: `Email Sent to ${mailReponse.accepted[0]}` });
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

router.post("/verify", verifyMailToken, (req, res) => {
  try {
    let user = req?.user?.email;
    res.status(201).json({ email: user, error: false });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Sever Error" });
  }
});

router.post("/unique", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) throw { status: 404, message: "No Username" };
    let data = await User.findOne({ username });
    if (data) throw { status: 403, message: "Username must be unique" };
    res.status(201).json({ message: "That's Unique" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

module.exports = router;
