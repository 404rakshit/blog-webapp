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

let refreshTokens = [];

router.get("/", (req, res) => {
  res.send("Login");
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.username)
      throw {
        status: 404,
        message: "Need an Username for the Authentication!",
      };

    if (!req.body.password)
      throw { status: 403, message: "Need a Password for the Authorization!" };

    const user = await User.findOne({ username: req.body.username });
    if (!user?.username) throw { status: 404, message: "User doesn't belong to us" };
    if (!checkPassword(req.body.password, user?.password)) throw { status: 403, message: "Wrong Password!" };

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

    res.status(200).send("Successfully Logged In");
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

router.post("/token", async (req, res) => {
  try {
    if (!req.cookies.refresh) throw { status: 404, message: "Token Unavailable" };
    if (!(await Token.countDocuments({refreshToken: req.cookies.refresh}))) throw { status: 404, message: "Token Expired Login Again" }
    res.cookie("access", verifyRefreshToken(req.cookies.refresh) , {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      secure: true,
    });
    res.status(200).send("Verified");
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

router.post("/verify", verifyToken, (req, res) => {
  try {
    if (req.body.username != req.user.name)
      throw { status: 403, message: "Unauthorized" };
    res.status(200).json("Verified");
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
});

module.exports = router;
