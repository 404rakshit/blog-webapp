const express = require("express");
const router = express.Router();
const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
  generateMailToken,
  verifyMailToken,
  verifyGoogleToken,
} = require("../../middlewares/jwt");
const User = require("../../models/user");
const Token = require("../../models/token");
const { createPassword } = require("../../middlewares/bcrypt");
const { sendMail } = require("./mailer");
const { formReader, uploadImg } = require("../../middlewares/imageUpload");

router.get("/", (req, res) => {
  req.session.refesh = "Hello";
  req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
  res.json({ message: "Signup", id: req.sessionID || "None" });
});

router.post(
  "/",
  verifyMailToken,
  formReader.single("profile"),
  async (req, res) => {
    try {
      const { name, username, password, twitter, linkedin, insta } = req.body;
      let profile = req.body.profile;

      if (!username) throw { status: 404, message: "Must Provide Username" };
      if (await User.countDocuments({ username: username }))
        throw { status: 403, message: "Already Exists" };

      if (!profile) {
        if (!req.file) throw { status: 404, message: "Provide Image" };
        profile = (
          await uploadImg(
            req.file.mimetype,
            req.file.buffer,
            "profile",
            username
          )
        ).secure_url;
      }

      const user = new User({
        name,
        username,
        password: createPassword(password),
        email: req.user?.email,
        profile: profile,
        socials: [twitter, linkedin, insta],
      });
      const data = await user.save();
      await Token.deleteOne({
        mailToken: req.headers["authorization"].split(" ")[1],
      });
      const token = new Token({
        refreshToken: generateRefreshToken({ username: user.username }),
      });
      await token.save();
      res.cookie("parallelVortex", token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
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
      res
        .status(err.status || 500)
        .json({ message: err.message || "Internal Error" });
    }
  }
);

router.post("/google", verifyGoogleToken, async (req, res) => {
  try {
    const { name, email, email_verified, picture } = req.user;
    let user = await User.findOne({ email });
    let newUser = false;
    if (user)
      if (!user?.googleVerified)
        throw { status: 401, message: "Not Google Verified" };
    if (!user) {
      user = new User({
        name,
        email,
        username: email.split("@")[0],
        profile: picture,
        googleVerified: email_verified,
      });
      newUser = true;
      await user.save();
    }
    const token = new Token({
      refreshToken: generateRefreshToken({ username: user.username }),
    });
    await token.save();
    res.cookie("parallelVortex", token.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("parallel", generateAccessToken({ username: user.username }), {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({
      message: "Logged In",
      name,
      username: user.username,
      email,
      profile: user.profile,
      newUser,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json(err.message || { message: "Internal Sever Error" });
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
