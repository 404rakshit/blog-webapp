const jwt = require("jsonwebtoken");
const fs = require("fs");
const crypto = require("crypto");
// let token = jwt.sign({ foo: 'bar' }, 'shhhhh');

let Key = fs.readFileSync('privateKey.key');
// const privateKey = crypto.createPrivateKey(Key);
// console.log(privateKey.toLocaleString());
let token = jwt.sign({ foo: 'bar' }, Key, { algorithm: 'RS256' });
console.log(token);