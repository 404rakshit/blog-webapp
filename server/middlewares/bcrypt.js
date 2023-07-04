const bcrypt = require("bcryptjs");

let salt = bcrypt.genSaltSync(10);

exports.createPassword = (password) => {
  if (!password) return null;
  if (password.length < 8) return password;
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

exports.checkPassword = (userPassword, exisisting) => {
  return bcrypt.compareSync(userPassword, exisisting);
};
