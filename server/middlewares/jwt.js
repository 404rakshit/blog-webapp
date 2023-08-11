require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const crypto = require("crypto");
const Token = require("../models/token");
// let token = jwt.sign({ foo: 'bar' }, 'shhhhh');

// let Key = fs.readFileSync("privateKey.key");
// const privateKey = crypto.createPrivateKey(Key);
// console.log(privateKey.toLocaleString());
// let token = jwt.sign({ foo: "bar" }, process.env.accessToken , { algorithm: "RS256" });
// console.log(token);

exports.generateAccessToken = generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.accessToken, { expiresIn: "1h" });
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.refreshToken, { expiresIn: "30d" });
};

exports.generateMailToken = (payload) => {
  return jwt.sign(payload, process.env.mailToken, { expiresIn: "60m" });
};

exports.generatePassToken = (payload) => {
  return jwt.sign(payload, process.env.passToken, { expiresIn: "60m" });
};

exports.verifyToken = async (req, res, next) => {
  try {
    const autHeader = req.headers["authorization"];
    const token = autHeader && autHeader.split(" ")[1];
    if (!token) throw { status: 401, message: "Token Missing" };

    jwt.verify(token, process.env.accessToken, (err, user) => {
      if (err) throw { status: 403, message: "Token Expired!" };
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
};

exports.verifyRefreshToken = async (req, res, next) => {
  try {
    const autHeader = req.headers["authorization"];
    const token = autHeader && autHeader.split(" ")[1];
    if (!token) throw { status: 401, message: "Token Missing" };
    if (!(await Token.countDocuments({ refreshToken: token })))
      throw { status: 404, message: "Token Not Found" };

    jwt.verify(token, process.env.refreshToken, (err, user) => {
      if (err) throw { status: 403, message: "Token Expired!", token };
      req.user = user;
      next();
    });
  } catch (err) {
    // if (err.token) await Token.deleteOne({ refreshToken: err.token });

    res.status(err.status || 500).json(err.message);
  }
};

exports.verifyMailToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    if (!token) throw { status: 404, message: "Provide Token!" };
    if (!(await Token.countDocuments({ mailToken: token })))
      throw { status: 404, message: "Token Not Found" };

    jwt.verify(token, process.env.mailToken, (err, user) => {
      if (err) throw { status: 403, message: "Token Expired!", token };
      req.user = user;
      next();
    });
  } catch (err) {
    if (err.token) await Token.deleteOne({ mailToken: err.token });
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
};

exports.verifyPassToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    if (!token) throw { status: 404, message: "Provide Token!" };
    if (!(await Token.countDocuments({ passToken: token })))
      throw { status: 404, message: "Token Not Found" };

    jwt.verify(token, process.env.passToken, (err, user) => {
      if (err) throw { status: 403, message: "Token Expired!", token };
      req.user = user;
      next();
    });
  } catch (err) {
    if (err.token) await Token.deleteOne({ passToken: err.token });
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
};

exports.verifyGoogleToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    if (!token) throw { status: 404, message: "Provide Token!" };

    req.user = jwt.decode(token);
    next();

  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Error" });
  }
};
