const express = require("express");
const router = express.Router();
const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generatePassToken,
  verifyPassToken,
} = require("../../middlewares/jwt");
const User = require("../../models/user");
const { checkPassword, createPassword } = require("../../middlewares/bcrypt");
const Token = require("../../models/token");
const { sendMail } = require("./mailer");

router.get("/", (req, res) => {
  res.json({ msg: "Login Sucessfully" });
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    if (!username && !password)
      throw { status: 404, message: "Misiing Cridentials" };
    // console.log(username,password)
    let user = await User.findOne({ username });
    if (!user) user = await User.findOne({ email: username });
    if (!user) throw { status: 404, message: "User doesn't exisits" };
    // console.log(user);
    if (!checkPassword(password, user?.password))
      throw { status: 403, message: "Wrong Password!" };
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

// router.post("/", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username)
//       throw {
//         status: 404,
//         message: "Need an Username for the Authentication!",
//       };
//     if (!password)
//       throw { status: 403, message: "Need a Password for the Authorization!" };

//     const user = await User.findOne({ username });
//     if (!user?.username)
//       throw { status: 404, message: "User doesn't belong to us" };
//     if (!checkPassword(password, user?.password))
//       throw { status: 403, message: "Wrong Password!" };

//     const token = new Token({
//       refreshToken: generateRefreshToken({ username: user.username }),
//     });
//     await token.save();
//     req.session.access = generateAccessToken({ username: user.username });
//     req.session.refresh = token.refreshToken;
//     req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
//     // res.cookie("access", generateAccessToken({ username: user.username }), {
//     //   expires: new Date(Date.now() + 900000),
//     //   httpOnly: true,
//     //   secure: true,
//     // });
//     // res.cookie("refresh", token.refreshToken, {
//     //   httpOnly: true,
//     //   secure: true,
//     // });
//     res.status(200).send(req.session);
//   } catch (err) {
//     res.status(err.status || 500).json(err.message);
//   }
// });

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
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

// router.post("/check", (req, res) => {
//   try {
//     // if(!req.session.access) throw {status: 404, message: "Token Not Found!"}
//     res.status(200).json({ session: req.sessionID });
//   } catch (err) {
//     res.status(err.status || 500).json(err.message);
//   }
// });

router.post("/password", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username)
      throw { status: 404, message: "Provide Required Credentials!" };
    let user = await User.findOne({ username });
    if (!user) user = await User.findOne({ email: username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    let token = await Token.findOne({ username: user.username }).select({
      updatedAt: 1,
    });

    if (token) {
      let diff = Math.floor(
        ((Date.now() - new Date(token?.updatedAt)) / 1000 / 60) << 0
      );
      if (diff < 5)
        throw { status: 401, message: `Try Again in ${5 - diff} minutes` };
      else {
        token.passToken = generatePassToken({ username: user.username });
      }
    } else {
      token = new Token({
        passToken: generatePassToken({ username: user.username }),
        username: user.username,
      });
    }
    let mailResponse = await sendMail(user.email, token.passToken);
    let data = await token.save();
    res.status(201).json({
      message: `Verification Mail Sent to ${mailResponse.accepted[0]}`,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.get("/password", verifyPassToken, async (req, res) => {
  try {
    const { username } = req.user;
    res.status(200).json({ username });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

router.put("/password", verifyPassToken, async (req, res) => {
  try {
    const { username } = req.user;
    const { pass } = req.body;
    let user = await User.findOne({ username });
    if (!user) throw { status: 404, message: "User doesn't exists" };
    user.password = createPassword(pass);
    await user.save();
    await Token.deleteOne({ username });
    res.status(201).json({ message: "Password Changed!"})
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
});

module.exports = router;
