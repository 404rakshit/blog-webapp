const express = require("express");
const Token = require("../../models/token");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Logout");
});

router.post("/", async (req, res) => {
  try {
    if (!req?.cookies?.refresh) throw { status: 404, message: "Token Unavailable" };
    Token.deleteOne({ refreshToken: req?.cookies?.refresh })
      .then((response) => {
        res.clearCookie("refresh")
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
