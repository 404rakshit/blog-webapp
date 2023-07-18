const express = require("express");
const router = express.Router();
const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../middlewares/jwt");
const User = require("../../models/user");
const { checkPassword } = require("../../middlewares/bcrypt");
const Token = require("../../models/token");

router.get("/", (req, res) => {
  res.json({ msg: "Login Sucessfully" });
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    if (!username && !password)
      throw { status: 404, message: "Misiing Cridentials" };
    let user = await User.findOne({ username });
    if (!user) throw { status: 404, message: "User doesn't exisits" };
    // console.log(user);
    if (!checkPassword(password, user?.password))
      throw { status: 403, message: "Wrong Password!" };
    const token = new Token({
      refreshToken: generateRefreshToken({ username: user.username }),
    });
    await token.save();
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
    res.status(200).json({
      message: "Login Successfully",
      name: user?.name,
      username: user?.username,
      email: user?.email,
      profile: user?.profile,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

// res.header('Set-Cookie', 'cookieName=cookieValue; Path=/; Max-Age=3600');

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username)
      throw {
        status: 404,
        message: "Need an Username for the Authentication!",
      };
    if (!password)
      throw { status: 403, message: "Need a Password for the Authorization!" };

    const user = await User.findOne({ username });
    if (!user?.username)
      throw { status: 404, message: "User doesn't belong to us" };
    if (!checkPassword(password, user?.password))
      throw { status: 403, message: "Wrong Password!" };

    const token = new Token({
      refreshToken: generateRefreshToken({ username: user.username }),
    });
    await token.save();
    req.session.access = generateAccessToken({ username: user.username });
    req.session.refresh = token.refreshToken;
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    // res.cookie("access", generateAccessToken({ username: user.username }), {
    //   expires: new Date(Date.now() + 900000),
    //   httpOnly: true,
    //   secure: true,
    // });
    // res.cookie("refresh", token.refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    // });
    res.status(200).send(req.session);
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

router.post("/token", async (req, res) => {
  try {
    const { refresh } = req.session;
    console.log(req.session);
    if (!refresh) throw { status: 404, message: "Token Unavailable" };
    if (!(await Token.countDocuments({ refreshToken: refresh })))
      throw { status: 404, message: "Token Expired Login Again" };
    // res.cookie("access", verifyRefreshToken(req.cookies.refresh) , {
    //   expires: new Date(Date.now() + 900000),
    //   httpOnly: true,
    //   secure: true,
    // });
    req.session.access = verifyRefreshToken(refresh);
    // req.session.authorised = true;
    res.status(200).send("Verified");
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

router.get("/verify", verifyToken, (req, res) => {
  try {
    if (req.body.username != req.user.name)
      throw { status: 403, message: "Unauthorized" };
    res.status(200).json("Verified");
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

router.post("/check", (req, res) => {
  try {
    // if(!req.session.access) throw {status: 404, message: "Token Not Found!"}
    res.status(200).json({ session: req.sessionID });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

module.exports = router;
