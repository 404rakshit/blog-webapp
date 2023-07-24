const express = require("express");
const Token = require("../../models/token");
const { verifyRefreshToken } = require("../../middlewares/jwt");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Logout");
});

router.post("/", verifyRefreshToken, async (req, res) => {
  try {
    // if (req?.user?.parallelVortex) throw { status: 404, message: "Token Unavailable" };
    // console.log(req.cookies)
    Token.deleteOne({ refreshToken: req.headers["authorization"].split(" ")[1] })
      .then((response) => {
        // res.clearCookie("parallelVortex");
        res.status(200).send("Logged Out");
      })
      .catch((err) => {
        throw { status: 404, message: "Token Not Found!" };
      });
  } catch (err) {
    res.status(500).send(err.errors || err);
  }
});

// [Object.keys(err.errors)[0]].message

module.exports = router;
