const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const token = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  // console.log(req.body);
  // let { name, email, password } = req.body;
  // bcrypt
  //   .hash(password, saltRounds)
  //   .then(function hashPassword(hash) {
  //     return User.create({ name, email, password: hash });
  //   })
  //   .then((user) => {
  //     console.log(user, "user is successfully created");
  //   })
  //   .catch(function failure(error) {
  //     console.log(error, "error in creating user diring signup");
  //   });
};
