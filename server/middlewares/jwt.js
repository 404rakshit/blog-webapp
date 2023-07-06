require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const crypto = require("crypto");
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
  return jwt.sign(payload, process.env.refreshToken);
};

exports.verifyRefreshToken = (token) => {
  jwt.verify(token, process.env.refreshToken, (err, user) => {
    if (err) throw { status: 403, message: "Please Login Again" };
    return generateAccessToken({ username: user.username })
  });
};

exports.verifyToken = (req, res, next) => {
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

exports.generateMailToken = (payload) => {
  return jwt.sign(payload, process.env.mailToken, {expiresIn: "15m"});
};

exports.verifyMailToken = (token) => {
  let data;
  jwt.verify(token, process.env.mailToken, (err, user) => {
    if (err) throw { status: 403, message: "Token Expired!" };
    data = user
  });
  return data
};